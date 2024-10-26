// Function Expressions
// A function expression defines a function that can be assigned to a variable. It can be anonymous or named.

// Anonymous Function Expression:

const greet = function() {
    console.log("Hello, World!");
};

greet(); // Output: Hello, World!

// Named Function Expression:
const greet2 = function greetFunction() {
    console.log("Hello, World second time!");
};

greet2(); // Output: Hello, World!



// Arrow functions provide a concise syntax for writing functions. They also lexically bind the this value.


const greet3 = () => {
    console.log("Hello, World! third time this time arrow");
};

greet3(); // Output: Hello, World!