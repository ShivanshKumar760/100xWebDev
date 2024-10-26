/*
In JavaScript, arrays are considered a type of object basically in js we have a class define Array() and we can initiate that class
using new Array() or array literal []. This means that they inherit properties and methods from the 
Object prototype, which is the foundation for all objects in JavaScript. Here’s how arrays function as objects:

1. Arrays are Objects
Definition: An array is a special type of object that is used to store multiple values in a single variable.
Type Check: You can verify that an array is an object using the typeof operator:
javascript*/

let arr = new Array();
arr[0]=1;
arr[1]=2
arr[2]=3;
console.log(arr);
console.log(typeof arr); // Output: "object"

/*
2. Array Properties
Arrays come with a special property called length, 
which keeps track of the number of elements in the array. 
This property is dynamically updated as elements are added or removed.*/

console.log(arr.length);

/*
3. Array Methods
Arrays have their own built-in methods (like push, pop, map, filter, etc.) that allow for various operations. 
These methods are also part of the Array.prototype, which is a prototype object for all arrays.*/

let fruits = ['apple', 'banana', 'cherry'];
fruits.push('date'); // Adds 'date' to the end
console.log(fruits); // Output: ['apple', 'banana', 'cherry', 'date']


/*
4. Arrays and Object Behavior
Since arrays are objects, you can also add custom properties or methods to them, just 
like you would with any other object:*/

let myArray = [1, 2, 3];
myArray.customProperty = "Hello";
console.log(myArray.customProperty); // Output: "Hello"


