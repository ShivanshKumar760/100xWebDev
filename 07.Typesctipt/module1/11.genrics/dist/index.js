"use strict";
//Generics:
//now lets see why we need genrics via a example:
//suppose we have a function take take a numeric array:
function consoleElement(items, index) {
    return items[index];
}
console.log(consoleElement([5, 6, 7], 1));
//but this consoleElement function will only work for array which is of type number 
//what if we need to do the same for a array of type string pr boolean then we would have 
//to make a whole new other function:
// function consoleElement(items:string[],index:number):string
// {
//     return items[index];
// }
//this where generics come in handy :
function consoleElementGeneric(items, index) {
    return items[index];
}
console.log(consoleElementGeneric([5, 6, 7], 1));
console.log(consoleElementGeneric(["a", "shiv", "bcd"], 1));
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
function identity(value) {
    return value;
}
// Usage with different types
console.log(identity(42)); // 42 (number)
console.log(identity("Hello")); // "Hello" (string)
console.log(identity(true)); // true (boolean)
//   🔹 2️⃣ Generic Function with Arrays
//   Generics work great with arrays:
function getFirstElement(arr) {
    return arr[0];
}
console.log(getFirstElement([10, 20, 30])); // 10
console.log(getFirstElement(["A", "B", "C"])); // "A"
const numberBox = { value: 100 };
const stringBox = { value: "Hello" };
console.log(numberBox.value); // 100
console.log(stringBox.value); // "Hello"
//   🔹 4️⃣ Generic Classes
//   Generics can be used in classes for type-safe object storage:
class Storagee {
    constructor(value) {
        this.data = value;
    }
    getData() {
        return this.data;
    }
}
// Create instances with different types
const numberStorage = new Storagee(123);
console.log(numberStorage.getData()); // 123
const stringStorage = new Storagee("Hello");
console.log(stringStorage.getData()); // "Hello"
//   🔹 5️⃣ Generic Constraints
//   Sometimes, we want to restrict the allowed types. We 
// can use extends to enforce constraints.
// Constraint: T must have a 'length' property
function getLength(item) {
    return item.length;
}
console.log(getLength("Hello")); // ✅ 5 (string has length)
console.log(getLength([1, 2, 3])); // ✅ 3 (array has length)
// console.log(getLength(42)); ❌ Error: Number has no 'length' property
//✅ Now, only types that have a .length property (like arrays, strings, 
// objects with length) can be passed.
// 🔹 6️⃣ Generic Types with Multiple Parameters
// We can use multiple generic parameters:
function pair(key, value) {
    return [key, value];
}
console.log(pair(1, "One")); // [1, "One"]
console.log(pair("isDone", true)); // ["isDone", true]
const partialUser = { name: "Alice" }; // 'age' is optional
// ✅ Readonly<T> (Make All Properties Read-Only)
const user = { name: "Bob", age: 30 };
// user.age = 31; ❌ Error: Cannot assign to 'age' because it is a read-only property.
// ✅ Record<K, V> (Create Object Type with Fixed Keys)
const users = {
    Alice: 25,
    Bob: 30,
};
