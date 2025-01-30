//Generics:

//now lets see why we need genrics via a example:
//suppose we have a function take take a numeric array:

function consoleElement(items:number[],index:number):number
{
    return items[index];
}

console.log(consoleElement([5,6,7],1));


//but this consoleElement function will only work for array which is of type number 
//what if we need to do the same for a array of type string pr boolean then we would have 
//to make a whole new other function:


// function consoleElement(items:string[],index:number):string
// {
//     return items[index];
// }

//this where generics come in handy :

function consoleElementGeneric<T>(items:T[],index:number):T{
    return items[index]
}

console.log(consoleElementGeneric<number>([5,6,7],1));
console.log(consoleElementGeneric<string>(["a","shiv","bcd"],1));


// TypeScript Generics 🚀
// 🔹 What Are Generics?
// Generics in TypeScript allow you to write flexible, reusable, and 
// type-safe code by defining placeholders for types. Instead of using a specific type, 
// you use a generic type parameter (e.g., <T>) that can be specified when the function, 
// class, or interface is used.



// 🔹 Why Use Generics?
// ✔ Type Safety: Prevents errors by maintaining strict type checking.
// ✔ Code Reusability: Works with multiple data types without duplicating code.
// ✔ Better Readability: Makes function/class behavior more explicit.


// TypeScript Generics 🚀
// 🔹 What Are Generics?
// Generics in TypeScript allow you to write flexible, reusable, and type-safe code 
// by defining placeholders for types. Instead of using a specific type, you use a 
// generic type parameter (e.g., <T>) that can be specified when the function, class, 
// or interface is used.

// 🔹 Why Use Generics?
// ✔ Type Safety: Prevents errors by maintaining strict type checking.
// ✔ Code Reusability: Works with multiple data types without duplicating code.
// ✔ Better Readability: Makes function/class behavior more explicit.

// 🔹 1️⃣ Generic Function Example
// Instead of writing separate functions for different data types, we use generics:

function identity<T>(value: T): T {
    return value;
  }
  
  // Usage with different types
  console.log(identity<number>(42));      // 42 (number)
  console.log(identity<string>("Hello")); // "Hello" (string)
  console.log(identity<boolean>(true));   // true (boolean)
  


//   🔹 2️⃣ Generic Function with Arrays
//   Generics work great with arrays:

function getFirstElement<T>(arr: T[]): T {
    return arr[0];
  }
  
  console.log(getFirstElement<number>([10, 20, 30])); // 10
  console.log(getFirstElement<string>(["A", "B", "C"])); // "A"

  
// 🔹 3️⃣ Generic Interfaces
// Generics can be used in interfaces to enforce type safety across 
// different data types:
  

interface Box<T> {
    value: T;
  }
  
  const numberBox: Box<number> = { value: 100 };
  const stringBox: Box<string> = { value: "Hello" };
  
  console.log(numberBox.value); // 100
  console.log(stringBox.value); // "Hello"
  

//   🔹 4️⃣ Generic Classes
//   Generics can be used in classes for type-safe object storage:


class Storagee<T> {
    private data: T;
  
    constructor(value: T) {
      this.data = value;
    }
  
    getData(): T {
      return this.data;
    }
}
  
  // Create instances with different types
  const numberStorage = new Storagee<number>(123);
  console.log(numberStorage.getData()); // 123
  
  const stringStorage = new Storagee<string>("Hello");
  console.log(stringStorage.getData()); // "Hello"
  



//   🔹 5️⃣ Generic Constraints
//   Sometimes, we want to restrict the allowed types. We 
// can use extends to enforce constraints.
  

  // Constraint: T must have a 'length' property
  function getLength<T extends { length: number }>(item: T): number {
    return item.length;
  }
  
  console.log(getLength("Hello")); // ✅ 5 (string has length)
  console.log(getLength([1, 2, 3])); // ✅ 3 (array has length)
  // console.log(getLength(42)); ❌ Error: Number has no 'length' property



  //✅ Now, only types that have a .length property (like arrays, strings, 
  // objects with length) can be passed.
  
  


// 🔹 6️⃣ Generic Types with Multiple Parameters
// We can use multiple generic parameters:


function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

console.log(pair<number, string>(1, "One")); // [1, "One"]
console.log(pair<string, boolean>("isDone", true)); // ["isDone", true]
// ✅ <K, V> allows us to work with two different types.




// 🔹 7️⃣ Generic Utility Types (Built-in in TypeScript)
// TypeScript provides utility types that use generics to manipulate types.

// ✅ Partial<T> (Make All Properties Optional)

interface User {
  name: string;
  age: number;
}

const partialUser: Partial<User> = { name: "Alice" }; // 'age' is optional


// ✅ Readonly<T> (Make All Properties Read-Only)

const user: Readonly<User> = { name: "Bob", age: 30 };
// user.age = 31; ❌ Error: Cannot assign to 'age' because it is a read-only property.



// ✅ Record<K, V> (Create Object Type with Fixed Keys)

const users: Record<string, number> = {
  Alice: 25,
  Bob: 30,
};