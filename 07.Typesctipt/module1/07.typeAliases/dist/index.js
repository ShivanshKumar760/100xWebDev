"use strict";
//type aliases :
//what are type aliases :
//Just like interface ,type aliases are a way to create a user define datatype/structure
const object1 = { name: "Shivansh", age: 19 };
const object2 = { name: "Alex", age: 20 };
console.log(object1);
console.log(object2);
const personObject1 = { name: "Rishi" };
const employeeObject1 = { name: "Rishi", employeeId: 9 };
const personObject2 = { name: "Aaryansh" };
const employeeObject2 = { name: "Aaryansh", employeeId: 3 };
console.log(employeeObject1);
console.log(employeeObject2);
const add = (num1, num2) => {
    return num1 + num2;
};
const sub = (num1, num2) => {
    return num2 - num1;
};
console.log(add(1, 2));
console.log(sub(4, 6));
// Implement the Extended interface
const extendedFunction = Object.assign((a, b) => {
    return a + b; // Function implementation
}, { description: "This function adds two numbers" } // Add additional property
);
// Usage
console.log(extendedFunction(3, 7)); // Output: 10
console.log(extendedFunction.description); // Output: "This function adds two numbers"
// Implement the Extended type
const extendedFunctionType = Object.assign((a, b) => {
    return a * b; // Function implementation
}, { description: "This function adds two numbers" } // Additional property
);
// Usage
console.log(extendedFunctionType(5, 10)); // Output: 15
console.log(extendedFunctionType.description); // Output: "This function adds two numbers"
