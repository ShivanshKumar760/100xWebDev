// 1. forEach()
// The forEach() method executes a provided function once for each array element.

// javascript
// Copy code
// const fruits = ['apple', 'banana', 'cherry'];

// fruits.forEach((fruit) => {
//     console.log(fruit);
// });

let numArray=[1,2,3];
numArray.forEach(function(elementOfArray){
    console.log(elementOfArray+2);
})

// The forEach() method in JavaScript does not inherently modify the original array. 
//It simply iterates over each element and executes a provided function on it. However, 
//if the callback function you provide to forEach() modifies the elements of the array directly 
//(if they are objects, for example), then those changes will reflect in the original array.

// Example 1: No Modification
// If you use forEach() with a primitive type (like numbers or strings), the original array remains unchanged:

// javascript
// Copy code
// const numbers = [1, 2, 3];

// numbers.forEach((num) => {
//     num = num * 2; // This does not affect the original array
// });

// console.log(numbers); // Output: [1, 2, 3]
// Example 2: Modifying Objects
// If you have an array of objects and modify the properties of those objects, the original array will be affected:

// javascript
// Copy code
// const fruits = [{ name: 'apple' }, { name: 'banana' }];

// fruits.forEach((fruit) => {
//     fruit.name = fruit.name.toUpperCase(); // Modifying object property
// });

// console.log(fruits); // Output: [{ name: 'APPLE' }, { name: 'BANANA' }]
// Summary
// forEach() does not change the original array unless you modify the elements directly within the 
//callback (e.g., changing properties of objects).
// It is primarily used for executing side effects, such as logging or calling functions, without returning a new array.