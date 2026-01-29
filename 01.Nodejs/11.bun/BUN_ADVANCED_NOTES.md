# Bun Internal Notes - Advanced Topics

## Table of Contents
1. [Memory Management](#memory-management)
2. [Async Programming in Bun](#async-programming)
3. [Bun vs Node.js Differences](#bun-vs-nodejs)
4. [HTTP Server with WebSockets](#websockets)
5. [Bun SQL & Database](#sql-database)
6. [Advanced Bun Topics](#advanced-topics)

---

## Memory Management

### JavaScriptCore Engine
Bun uses **JavaScriptCore (JSC)** from WebKit, not V8 like Node.js.

**Key Differences:**
- **Garbage Collection**: JSC uses a generational garbage collector
- **Memory Footprint**: Generally lower than V8
- **JIT Compilation**: Different optimization strategies

### Memory Management in Bun

```typescript
// 1. Buffer Management - Zero-copy operations
const buffer = Buffer.from("Hello World");
// Bun optimizes buffer operations for zero-copy when possible

// 2. Bun.file() - Memory-efficient file operations
const file = Bun.file("large-file.txt");
// Doesn't load entire file into memory
const text = await file.text(); // Streams internally

// 3. Memory mapping for large files
const bigFile = Bun.file("10GB-file.bin");
const slice = bigFile.slice(0, 1024); // No full load
```

### Garbage Collection

```typescript
// JSC GC is different from V8
// No manual GC exposure like V8's global.gc()

// Best practices:
// 1. Let objects go out of scope naturally
function processData() {
  let largeArray = new Array(1000000);
  // Process data
  largeArray = null; // Explicit nulling helps GC
}

// 2. Use WeakMap/WeakSet for caching
const cache = new WeakMap();
function memoize(obj, result) {
  cache.set(obj, result);
  // Automatically cleaned when obj is GC'd
}

// 3. Stream large data instead of loading all
const stream = Bun.file("large.json").stream();
for await (const chunk of stream) {
  // Process chunks, not entire file
}
```

### Memory Pooling

```typescript
// Bun automatically pools some operations
// Example: HTTP request/response objects are pooled

// Manual pooling for performance-critical code
class ObjectPool {
  private pool: any[] = [];
  private factory: () => any;
  
  constructor(factory: () => any, initialSize = 10) {
    this.factory = factory;
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(factory());
    }
  }
  
  acquire() {
    return this.pool.pop() || this.factory();
  }
  
  release(obj: any) {
    // Reset object state
    this.pool.push(obj);
  }
}

// Usage
const bufferPool = new ObjectPool(() => Buffer.alloc(1024));
```

---

## Async Programming

### Event Loop Architecture

Bun's event loop is built on **libuv** + **JavaScriptCore**, with optimizations:

```typescript
// 1. Microtasks (Promises) - Highest Priority
Promise.resolve().then(() => console.log("Microtask"));

// 2. Timers (setTimeout/setInterval)
setTimeout(() => console.log("Timer"), 0);

// 3. I/O Operations
fetch("https://api.example.com");

// 4. setImmediate (macrotask)
setImmediate(() => console.log("Immediate"));

// Output order in Bun:
// 1. Microtask
// 2. Timer
// 3. Immediate
```

### Async/Await Optimization

```typescript
// Bun optimizes async/await at the engine level

// BAD: Sequential awaits
async function slow() {
  const user = await fetchUser();      // 100ms
  const posts = await fetchPosts();    // 100ms
  const comments = await fetchComments(); // 100ms
  // Total: 300ms
}

// GOOD: Parallel execution
async function fast() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchComments()
  ]);
  // Total: 100ms
}

// ADVANCED: Promise.allSettled for error handling
async function robust() {
  const results = await Promise.allSettled([
    fetchUser(),
    fetchPosts(),
    fetchComments()
  ]);
  
  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      console.log(`Result ${i}:`, result.value);
    } else {
      console.error(`Error ${i}:`, result.reason);
    }
  });
}
```

### Async Iterators & Generators

```typescript
// Async generators in Bun
async function* asyncGenerator() {
  for (let i = 0; i < 5; i++) {
    await Bun.sleep(100);
    yield i;
  }
}

// Usage
for await (const value of asyncGenerator()) {
  console.log(value);
}

// Practical example: Paginated API
async function* fetchAllPages(url: string) {
  let page = 1;
  while (true) {
    const response = await fetch(`${url}?page=${page}`);
    const data = await response.json();
    
    if (data.items.length === 0) break;
    
    yield* data.items; // yield each item
    page++;
  }
}

// Process all items without loading all pages
for await (const item of fetchAllPages("/api/items")) {
  processItem(item);
}
```

### Structured Concurrency with AbortController

```typescript
// Bun supports AbortController for cancellation
async function fetchWithTimeout(url: string, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      signal: controller.signal
    });
    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

// Advanced: Parallel requests with shared cancellation
async function fetchMultipleWithCancellation(urls: string[]) {
  const controller = new AbortController();
  
  // Cancel all on first error
  const promises = urls.map(async (url) => {
    try {
      return await fetch(url, { signal: controller.signal });
    } catch (error) {
      controller.abort(); // Cancel all other requests
      throw error;
    }
  });
  
  return await Promise.all(promises);
}
```

### Worker Threads in Bun

```typescript
// main.ts
const worker = new Worker(new URL("./worker.ts", import.meta.url).href);

worker.postMessage({ type: "compute", data: [1, 2, 3, 4, 5] });

worker.onmessage = (event) => {
  console.log("Result from worker:", event.data);
};

// worker.ts
self.onmessage = (event) => {
  if (event.data.type === "compute") {
    const result = event.data.data.reduce((a: number, b: number) => a + b, 0);
    self.postMessage({ result });
  }
};

// Advanced: Worker pool
class WorkerPool {
  private workers: Worker[] = [];
  private queue: Array<{ task: any; resolve: Function; reject: Function }> = [];
  
  constructor(workerPath: string, size = 4) {
    for (let i = 0; i < size; i++) {
      const worker = new Worker(workerPath);
      worker.onmessage = (e) => this.handleMessage(i, e);
      this.workers.push(worker);
    }
  }
  
  async execute(task: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.processQueue();
    });
  }
  
  private processQueue() {
    // Implementation of round-robin task distribution
  }
  
  private handleMessage(workerId: number, event: MessageEvent) {
    // Handle worker responses
  }
}
```

---

## Bun vs Node.js

### Performance Differences

| Feature | Node.js (V8) | Bun (JSC) |
|---------|--------------|-----------|
| Startup Time | ~50ms | ~5ms (10x faster) |
| Module Resolution | CommonJS first | ESM native |
| File I/O | ~2x slower | Optimized syscalls |
| HTTP Server | ~60k req/s | ~100k req/s |
| Memory Usage | Higher | Lower (~30% less) |

### API Differences

```typescript
// 1. File System Operations
// Node.js
import fs from "fs/promises";
const content = await fs.readFile("file.txt", "utf-8");

// Bun (much faster)
const file = Bun.file("file.txt");
const content = await file.text();

// 2. Environment Variables
// Node.js
process.env.API_KEY

// Bun (both work, but Bun.env is typed)
Bun.env.API_KEY
process.env.API_KEY

// 3. Password Hashing
// Node.js (requires bcrypt package)
import bcrypt from "bcrypt";
const hash = await bcrypt.hash(password, 10);

// Bun (built-in, faster)
const hash = await Bun.password.hash(password);
const isValid = await Bun.password.verify(password, hash);

// 4. SQLite
// Node.js (requires better-sqlite3)
import Database from "better-sqlite3";
const db = new Database("db.sqlite");

// Bun (built-in)
import { Database } from "bun:sqlite";
const db = new Database("db.sqlite");

// 5. Testing
// Node.js (requires jest/mocha)
import { describe, it, expect } from "@jest/globals";

// Bun (built-in test runner)
import { test, expect, describe } from "bun:test";
```

### Module System

```typescript
// Bun prioritizes ESM and handles both seamlessly

// ESM (recommended)
import { something } from "./module.js";
export const value = 42;

// CommonJS (still works)
const something = require("./module.js");
module.exports = { value: 42 };

// Top-level await (works in Bun, not in Node without --experimental-modules)
const data = await fetch("https://api.example.com").then(r => r.json());
console.log(data);

// Bun automatically resolves:
import React from "react"; // No need for .js extension
import utils from "./utils"; // No need for .ts/.tsx extension
```

---

## HTTP Server with WebSockets

### Basic HTTP Server

```typescript
// Simple HTTP server
const server = Bun.serve({
  port: 3000,
  
  fetch(req) {
    const url = new URL(req.url);
    
    if (url.pathname === "/") {
      return new Response("Hello Bun!");
    }
    
    if (url.pathname === "/json") {
      return Response.json({ message: "JSON response" });
    }
    
    if (url.pathname === "/file") {
      return new Response(Bun.file("./file.txt"));
    }
    
    return new Response("Not Found", { status: 404 });
  },
  
  error(error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
});

console.log(`Server running at http://localhost:${server.port}`);
```

### Advanced HTTP Features

```typescript
// Advanced server with routing, middleware, streaming
const server = Bun.serve({
  port: 3000,
  
  async fetch(req, server) {
    const url = new URL(req.url);
    
    // CORS handling
    if (req.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          "Access-Control-Allow-Headers": "Content-Type",
        }
      });
    }
    
    // File upload handling
    if (url.pathname === "/upload" && req.method === "POST") {
      const formData = await req.formData();
      const file = formData.get("file") as File;
      
      // Write file efficiently
      await Bun.write(`./uploads/${file.name}`, file);
      
      return Response.json({ 
        success: true, 
        filename: file.name,
        size: file.size 
      });
    }
    
    // Streaming response
    if (url.pathname === "/stream") {
      const stream = new ReadableStream({
        async start(controller) {
          for (let i = 0; i < 10; i++) {
            controller.enqueue(`Chunk ${i}\n`);
            await Bun.sleep(100);
          }
          controller.close();
        }
      });
      
      return new Response(stream, {
        headers: { "Content-Type": "text/plain" }
      });
    }
    
    // Server-Sent Events (SSE)
    if (url.pathname === "/events") {
      const stream = new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();
          
          for (let i = 0; i < 100; i++) {
            const data = `data: ${JSON.stringify({ count: i })}\n\n`;
            controller.enqueue(encoder.encode(data));
            await Bun.sleep(1000);
          }
          
          controller.close();
        }
      });
      
      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
        }
      });
    }
    
    return new Response("Not Found", { status: 404 });
  }
});
```

### WebSocket Server

```typescript
// Complete WebSocket implementation
interface ServerData {
  userId: string;
}

const server = Bun.serve<ServerData>({
  port: 3000,
  
  fetch(req, server) {
    const url = new URL(req.url);
    
    // Upgrade HTTP to WebSocket
    if (url.pathname === "/ws") {
      const userId = url.searchParams.get("userId") || "anonymous";
      
      const upgraded = server.upgrade(req, {
        data: { userId }
      });
      
      if (!upgraded) {
        return new Response("WebSocket upgrade failed", { status: 400 });
      }
      
      return undefined; // Don't return a Response for WebSocket
    }
    
    // Serve WebSocket client HTML
    if (url.pathname === "/") {
      return new Response(Bun.file("./ws-client.html"));
    }
    
    return new Response("Not Found", { status: 404 });
  },
  
  websocket: {
    // Called when connection opens
    open(ws) {
      console.log(`User ${ws.data.userId} connected`);
      
      // Subscribe to a channel
      ws.subscribe("global-chat");
      
      // Send welcome message
      ws.send(JSON.stringify({
        type: "welcome",
        message: `Welcome ${ws.data.userId}!`
      }));
      
      // Broadcast to others
      server.publish("global-chat", JSON.stringify({
        type: "user-joined",
        userId: ws.data.userId
      }));
    },
    
    // Called when message received
    message(ws, message) {
      console.log(`Received from ${ws.data.userId}:`, message);
      
      let data;
      try {
        data = JSON.parse(message as string);
      } catch {
        ws.send(JSON.stringify({ type: "error", message: "Invalid JSON" }));
        return;
      }
      
      // Handle different message types
      switch (data.type) {
        case "chat":
          // Broadcast to all subscribers
          server.publish("global-chat", JSON.stringify({
            type: "chat",
            userId: ws.data.userId,
            message: data.message,
            timestamp: Date.now()
          }));
          break;
          
        case "private":
          // Send to specific user (would need user tracking)
          ws.send(JSON.stringify({
            type: "private",
            from: ws.data.userId,
            message: data.message
          }));
          break;
          
        case "ping":
          ws.send(JSON.stringify({ type: "pong" }));
          break;
      }
    },
    
    // Called when connection closes
    close(ws, code, reason) {
      console.log(`User ${ws.data.userId} disconnected`);
      
      // Notify others
      server.publish("global-chat", JSON.stringify({
        type: "user-left",
        userId: ws.data.userId
      }));
    },
    
    // Called on error
    error(ws, error) {
      console.error(`WebSocket error for ${ws.data.userId}:`, error);
    },
    
    // Optional: Handle backpressure
    drain(ws) {
      console.log(`Drain called for ${ws.data.userId}`);
    },
    
    // Message size limits
    maxPayloadLength: 16 * 1024 * 1024, // 16MB
    
    // Compression
    perMessageDeflate: true,
    
    // Idle timeout
    idleTimeout: 120 // seconds
  }
});

console.log(`Server with WebSocket running at http://localhost:${server.port}`);
```

### Advanced WebSocket Patterns

```typescript
// 1. Room-based chat system
class ChatRoom {
  private rooms = new Map<string, Set<any>>();
  
  joinRoom(ws: any, roomId: string) {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, new Set());
    }
    this.rooms.get(roomId)!.add(ws);
    ws.subscribe(`room:${roomId}`);
  }
  
  leaveRoom(ws: any, roomId: string) {
    this.rooms.get(roomId)?.delete(ws);
    ws.unsubscribe(`room:${roomId}`);
  }
  
  broadcast(roomId: string, message: any, except?: any) {
    const room = this.rooms.get(roomId);
    if (!room) return;
    
    const encoded = JSON.stringify(message);
    for (const ws of room) {
      if (ws !== except) {
        ws.send(encoded);
      }
    }
  }
}

// 2. Presence system
class PresenceManager {
  private presence = new Map<string, {
    userId: string;
    status: "online" | "away" | "offline";
    lastSeen: number;
  }>();
  
  setOnline(userId: string) {
    this.presence.set(userId, {
      userId,
      status: "online",
      lastSeen: Date.now()
    });
  }
  
  setOffline(userId: string) {
    const user = this.presence.get(userId);
    if (user) {
      user.status = "offline";
      user.lastSeen = Date.now();
    }
  }
  
  getPresence(userId: string) {
    return this.presence.get(userId);
  }
  
  getAllOnline() {
    return Array.from(this.presence.values())
      .filter(u => u.status === "online");
  }
}

// 3. Rate limiting
class RateLimiter {
  private requests = new Map<string, number[]>();
  
  checkLimit(userId: string, limit = 10, window = 1000): boolean {
    const now = Date.now();
    const userRequests = this.requests.get(userId) || [];
    
    // Remove old requests outside window
    const recent = userRequests.filter(time => now - time < window);
    
    if (recent.length >= limit) {
      return false; // Rate limit exceeded
    }
    
    recent.push(now);
    this.requests.set(userId, recent);
    return true;
  }
}
```

---

## SQL & Database

### Built-in SQLite

```typescript
import { Database } from "bun:sqlite";

// Create/open database
const db = new Database("mydb.sqlite", { create: true });

// Create table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s', 'now'))
  )
`);

// Insert data
const insert = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
insert.run("John Doe", "john@example.com");

// Batch insert (transaction)
const insertMany = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");

db.transaction((users) => {
  for (const user of users) {
    insertMany.run(user.name, user.email);
  }
})([
  { name: "Alice", email: "alice@example.com" },
  { name: "Bob", email: "bob@example.com" }
]);

// Query data
const query = db.prepare("SELECT * FROM users WHERE id = ?");
const user = query.get(1);
console.log(user);

// Query multiple rows
const allUsers = db.prepare("SELECT * FROM users").all();
console.log(allUsers);

// Iterate over large result sets
const iter = db.prepare("SELECT * FROM users").iterate();
for (const user of iter) {
  console.log(user);
}

// Close database
db.close();
```

### Advanced SQLite Features

```typescript
// 1. Prepared statements with named parameters
const db = new Database("app.db");

const insertUser = db.prepare(`
  INSERT INTO users (name, email, age)
  VALUES ($name, $email, $age)
  RETURNING *
`);

const newUser = insertUser.get({
  $name: "Charlie",
  $email: "charlie@example.com",
  $age: 30
});

// 2. Complex queries with joins
const getUserWithPosts = db.prepare(`
  SELECT 
    users.id,
    users.name,
    users.email,
    json_group_array(
      json_object('id', posts.id, 'title', posts.title)
    ) as posts
  FROM users
  LEFT JOIN posts ON posts.user_id = users.id
  WHERE users.id = ?
  GROUP BY users.id
`);

// 3. Full-text search
db.run(`
  CREATE VIRTUAL TABLE IF NOT EXISTS articles_fts 
  USING fts5(title, content)
`);

db.run(`
  INSERT INTO articles_fts (title, content)
  VALUES ('Bun Guide', 'This is a comprehensive guide to Bun')
`);

const searchResults = db.prepare(`
  SELECT * FROM articles_fts 
  WHERE articles_fts MATCH ?
  ORDER BY rank
`).all("guide");

// 4. Database migrations
class Migration {
  private db: Database;
  
  constructor(db: Database) {
    this.db = db;
    this.createMigrationsTable();
  }
  
  private createMigrationsTable() {
    this.db.run(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        executed_at INTEGER DEFAULT (strftime('%s', 'now'))
      )
    `);
  }
  
  async run(name: string, up: () => void) {
    const exists = this.db.prepare(
      "SELECT 1 FROM migrations WHERE name = ?"
    ).get(name);
    
    if (exists) {
      console.log(`Migration ${name} already executed`);
      return;
    }
    
    try {
      up();
      this.db.prepare("INSERT INTO migrations (name) VALUES (?)").run(name);
      console.log(`Migration ${name} executed successfully`);
    } catch (error) {
      console.error(`Migration ${name} failed:`, error);
      throw error;
    }
  }
}

// Usage
const migration = new Migration(db);
migration.run("add_users_table", () => {
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL
    )
  `);
});

// 5. Connection pooling pattern
class DatabasePool {
  private connections: Database[] = [];
  private size: number;
  private available: Database[] = [];
  
  constructor(dbPath: string, size = 5) {
    this.size = size;
    for (let i = 0; i < size; i++) {
      const conn = new Database(dbPath);
      this.connections.push(conn);
      this.available.push(conn);
    }
  }
  
  async execute<T>(callback: (db: Database) => T): Promise<T> {
    while (this.available.length === 0) {
      await Bun.sleep(10); // Wait for available connection
    }
    
    const db = this.available.pop()!;
    try {
      return callback(db);
    } finally {
      this.available.push(db);
    }
  }
  
  close() {
    this.connections.forEach(conn => conn.close());
  }
}

// 6. Query builder pattern
class QueryBuilder {
  private db: Database;
  private table: string = "";
  private whereClause: string[] = [];
  private params: any[] = [];
  
  constructor(db: Database) {
    this.db = db;
  }
  
  from(table: string) {
    this.table = table;
    return this;
  }
  
  where(condition: string, ...params: any[]) {
    this.whereClause.push(condition);
    this.params.push(...params);
    return this;
  }
  
  get() {
    const where = this.whereClause.length > 0 
      ? `WHERE ${this.whereClause.join(" AND ")}`
      : "";
    
    const sql = `SELECT * FROM ${this.table} ${where}`;
    return this.db.prepare(sql).get(...this.params);
  }
  
  all() {
    const where = this.whereClause.length > 0 
      ? `WHERE ${this.whereClause.join(" AND ")}`
      : "";
    
    const sql = `SELECT * FROM ${this.table} ${where}`;
    return this.db.prepare(sql).all(...this.params);
  }
}

// Usage
const qb = new QueryBuilder(db);
const user = qb
  .from("users")
  .where("email = ?", "john@example.com")
  .where("age > ?", 18)
  .get();
```

### Working with PostgreSQL/MySQL

```typescript
// Bun doesn't have built-in PostgreSQL/MySQL
// But you can use standard drivers

// PostgreSQL with pg
import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "mydb",
  user: "postgres",
  password: "password",
  max: 20, // connection pool size
});

// Query
const result = await pool.query("SELECT * FROM users WHERE id = $1", [1]);
console.log(result.rows);

// Transaction
const client = await pool.connect();
try {
  await client.query("BEGIN");
  await client.query("INSERT INTO users (name) VALUES ($1)", ["Alice"]);
  await client.query("INSERT INTO posts (user_id, title) VALUES ($1, $2)", [1, "Post"]);
  await client.query("COMMIT");
} catch (e) {
  await client.query("ROLLBACK");
  throw e;
} finally {
  client.release();
}

// MySQL with mysql2
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mydb"
});

const [rows] = await connection.execute(
  "SELECT * FROM users WHERE id = ?",
  [1]
);
```

---

## Advanced Topics

### 1. Custom Loaders and Plugins

```typescript
// Bun supports custom import behavior
// Example: YAML loader

// bunfig.toml or bun.config.ts
export default {
  plugins: [{
    name: "yaml-loader",
    setup(build) {
      build.onLoad({ filter: /\.yaml$/ }, async (args) => {
        const text = await Bun.file(args.path).text();
        const yaml = parseYAML(text);
        return {
          contents: JSON.stringify(yaml),
          loader: "json"
        };
      });
    }
  }]
};

// Now you can import YAML files
import config from "./config.yaml";
```

### 2. FFI (Foreign Function Interface)

```typescript
// Call C/Rust libraries directly from Bun
import { dlopen, FFIType, suffix } from "bun:ffi";

// Load shared library
const lib = dlopen(`libexample.${suffix}`, {
  add: {
    args: [FFIType.i32, FFIType.i32],
    returns: FFIType.i32
  },
  sqrt: {
    args: [FFIType.f64],
    returns: FFIType.f64
  }
});

// Call functions
const result = lib.symbols.add(5, 3);
console.log(result); // 8

const sqrtResult = lib.symbols.sqrt(16);
console.log(sqrtResult); // 4.0
```

### 3. Transpiler API

```typescript
// Use Bun's transpiler programmatically
const transpiler = new Bun.Transpiler({
  loader: "tsx",
  target: "browser"
});

const code = `
  const Component = () => <div>Hello</div>;
  export default Component;
`;

const output = await transpiler.transform(code);
console.log(output);
```

### 4. Build API

```typescript
// Programmatic bundling
const result = await Bun.build({
  entrypoints: ["./src/index.tsx"],
  outdir: "./dist",
  target: "browser",
  minify: true,
  splitting: true,
  sourcemap: "external",
  external: ["react", "react-dom"],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production")
  }
});

if (!result.success) {
  console.error("Build failed");
  for (const message of result.logs) {
    console.error(message);
  }
}
```

### 5. Hot Module Replacement (HMR)

```typescript
// Bun supports HMR natively
// Enable with --hot flag: bun --hot server.ts

// server.ts
let count = 0;

const server = Bun.serve({
  port: 3000,
  fetch() {
    count++;
    return new Response(`Count: ${count}`);
  }
});

// When you edit this file, the server reloads
// but the `count` state is preserved!

// You can also listen to reload events
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    console.log("Module reloaded!");
  });
  
  import.meta.hot.dispose(() => {
    console.log("Cleaning up before reload");
  });
}
```

### 6. Testing with bun:test

```typescript
import { test, expect, describe, beforeAll, afterAll } from "bun:test";

describe("Math operations", () => {
  test("addition", () => {
    expect(1 + 1).toBe(2);
  });
  
  test("async operations", async () => {
    const result = await Promise.resolve(42);
    expect(result).toBe(42);
  });
});

// Mocking
import { mock } from "bun:test";

test("mock functions", () => {
  const mockFn = mock((x: number) => x * 2);
  
  mockFn(5);
  mockFn(10);
  
  expect(mockFn).toHaveBeenCalledTimes(2);
  expect(mockFn).toHaveBeenCalledWith(5);
});

// Snapshot testing
test("snapshot", () => {
  const data = { name: "John", age: 30 };
  expect(data).toMatchSnapshot();
});
```

### 7. Performance Optimization Tips

```typescript
// 1. Use Bun.file() for file operations
// BAD
const fs = require("fs/promises");
const content = await fs.readFile("file.txt", "utf-8");

// GOOD
const content = await Bun.file("file.txt").text();

// 2. Stream large responses
// BAD
const bigData = await fetchLargeData();
return Response.json(bigData); // Loads all in memory

// GOOD
const stream = createReadableStream();
return new Response(stream);

// 3. Use prepared statements
// BAD
for (const user of users) {
  db.run(`INSERT INTO users (name) VALUES ('${user.name}')`);
}

// GOOD
const stmt = db.prepare("INSERT INTO users (name) VALUES (?)");
const insert = db.transaction((users) => {
  for (const user of users) stmt.run(user.name);
});
insert(users);

// 4. Batch WebSocket messages
// BAD
for (const message of messages) {
  ws.send(JSON.stringify(message));
}

// GOOD
const batch = messages.map(m => JSON.stringify(m)).join("\n");
ws.send(batch);

// 5. Use Bun.sleep() instead of setTimeout for delays
// BAD
await new Promise(resolve => setTimeout(resolve, 1000));

// GOOD
await Bun.sleep(1000);
```

### 8. Production Deployment

```typescript
// Environment-specific configuration
const config = {
  development: {
    port: 3000,
    db: "dev.db",
    logLevel: "debug"
  },
  production: {
    port: parseInt(Bun.env.PORT || "8080"),
    db: Bun.env.DATABASE_URL,
    logLevel: "error"
  }
};

const env = Bun.env.NODE_ENV || "development";
const appConfig = config[env as keyof typeof config];

// Graceful shutdown
const server = Bun.serve({
  port: appConfig.port,
  fetch(req) {
    return new Response("OK");
  }
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.stop();
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  server.stop();
  process.exit(0);
});
```

---

## Performance Benchmarks

### Startup Time
```
Node.js: ~50ms
Bun: ~5ms (10x faster)
```

### Module Loading
```
Node.js (require): 100ms for 100 modules
Bun (import): 10ms for 100 modules (10x faster)
```

### HTTP Throughput
```
Node.js: ~60,000 req/s
Bun: ~100,000 req/s (1.6x faster)
```

### SQLite Operations
```
Node.js (better-sqlite3): 50,000 inserts/s
Bun: 150,000 inserts/s (3x faster)
```

---

## Resources

- Official Docs: https://bun.sh/docs
- GitHub: https://github.com/oven-sh/bun
- Discord: https://bun.sh/discord
- Examples: https://github.com/oven-sh/bun/tree/main/examples

---

## Conclusion

Bun represents a significant evolution in JavaScript runtimes:
- **Faster**: Better performance across the board
- **Simpler**: Built-in tools reduce dependency hell
- **Modern**: ESM-first, TypeScript native
- **Complete**: Runtime + bundler + test runner + package manager

The future of JavaScript tooling is fast, and it's here with Bun.
