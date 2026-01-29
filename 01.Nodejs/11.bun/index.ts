// Todo API Server using Bun
interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

// In-memory storage
const todos: Todo[] = [];

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;

    // CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle preflight
    if (req.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // Serve frontend
    if (path === "/" || path === "/index.html") {
      const file = Bun.file("./frontend.html");
      return new Response(file, {
        headers: {
          "Content-Type": "text/html",
        },
      });
    }

    if (path === "/frontend.js") {
      const file = Bun.file("./frontend.js");
      return new Response(file, {
        headers: {
          "Content-Type": "application/javascript",
        },
      });
    }

    if (path === "/index.css") {
      const file = Bun.file("./index.css");
      return new Response(file, {
        headers: {
          "Content-Type": "text/css",
        },
      });
    }

    // API Routes
    if (path === "/api/todos" && req.method === "GET") {
      return new Response(JSON.stringify(todos), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (path === "/api/todos" && req.method === "POST") {
      const body = await req.json();
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        title: body.title,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      todos.push(newTodo);
      return new Response(JSON.stringify(newTodo), {
        status: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (path.startsWith("/api/todos/") && req.method === "PUT") {
      const id = path.split("/").pop();
      const todoIndex = todos.findIndex((t) => t.id === id);

      if (todoIndex === -1) {
        return new Response(JSON.stringify({ error: "Todo not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const body = await req.json();
      todos[todoIndex] = { ...todos[todoIndex], ...body };

      return new Response(JSON.stringify(todos[todoIndex]), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (path.startsWith("/api/todos/") && req.method === "DELETE") {
      const id = path.split("/").pop();
      const todoIndex = todos.findIndex((t) => t.id === id);

      if (todoIndex === -1) {
        return new Response(JSON.stringify({ error: "Todo not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      todos.splice(todoIndex, 1);

      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    return new Response("Not Found", { status: 404, headers: corsHeaders });
  },
});

console.log(`🚀 Todo API server running at http://localhost:${server.port}`);
console.log(`📋 Frontend available at http://localhost:${server.port}`);
console.log(`🔗 API endpoints:`);
console.log(`   GET    /api/todos       - List all todos`);
console.log(`   POST   /api/todos       - Create a new todo`);
console.log(`   PUT    /api/todos/:id   - Update a todo`);
console.log(`   DELETE /api/todos/:id   - Delete a todo`);
