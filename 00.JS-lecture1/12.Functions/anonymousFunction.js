/*
An anonymous function is a function that does not have a name. It is often used in situations where a function is required but you don't need to reuse it. Here are some key points and examples regarding anonymous functions in JavaScript:

Characteristics of Anonymous Functions

1.No Name: As the name suggests, anonymous functions do not have a name assigned to them.
2.Used in Expressions: They are often used as function expressions, passed as arguments to other functions, or returned from other functions.
3.Closure: They can create closures and capture variables from their surrounding scope.*/

// Now unlike named function they cannot be called directly just by defining

// function(name){
//     console.log(name);
// }//this is a anonymous function now since it has no name we can't call it directly it will give error


//so in order to use them we assign it to a variable
if(true)
{
    // try{
    //     function(name)
    //     { console.log(name);}//here this try block will not run cause error is not returned but in order to use catch block we 
    //     //need to throw error for it to catch
    // }

    try{
        throw new Error(function(name)
        { console.log(name);})
    }
    catch(error){
        let namePrinter=function(name){console.log(name)};
        namePrinter("alex");
    }
}

// As Arguments to Other Functions:

// javascript

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(function(num) {//this is a anonymous function and it will not called immediately it will be 
    //called after the execution of whole map() function line and then class Array method backend logic will
    //execute it 
    return num * 2;
});
console.log(doubled); 


// As Part of Object Methods:

// javascript
const obj = {
    greet: function() {
        console.log("Hello!");
    }
};

obj.greet(); // Output: Hello!


//In ES6 a new type of anonymous function was introduced which was arrow function which just removes the burden of writing
//function


/*

Arrow functions are a concise way to write function expressions in JavaScript. 
They were introduced in ES6 (ECMAScript 2015) and provide a more streamlined syntax compared to traditional function expressions. 
Here are the key features and examples of arrow functions:

Key Features
Concise Syntax: Arrow functions allow you to write functions without the function keyword and use a shorter syntax.

Lexical this: Arrow functions do not have their own this context. Instead, they inherit this from the surrounding (lexical) scope, 
which can be particularly useful in certain scenarios (like in event handlers or callbacks).

Implicit Returns: If the function body consists of a single expression, you can omit the braces and the return keyword.
The expression's result is returned implicitly.

Syntax
The basic syntax of an arrow function is:

javascript
Copy code
const functionName = (parameters) => {
    // function body
};

*/

// Basic Arrow Function:
const add = (a, b) => {
    return a + b;
};

console.log(add(2, 3)); // Output: 5

// Implicit Return
const multiply = (a, b) => a * b;
console.log(multiply(4, 5)); // Output: 20


// Single Parameter:
// If there's only one parameter, you can omit the parentheses:
const square = x => x * x;

console.log(square(6)); // Output: 36


// No Parameters:
// If there are no parameters, you need to use empty parentheses:


const greet = () => "Hello, World!";
console.log(greet()); // Output: Hello, World!


// Lexical this:
// Using an arrow function preserves the context of this:


function Person(age) {//This constructor function may be converted to a class declaration. that is automatically will be converted
    //to a class
    this.Age = age;

    let counter=() => {
        this.Age++; // `this` refers to the Person object
       

    };
    counter();
    console.log(this.Age);
}

const person = new Person(18); // This will log the increasing age every second

console.log(person);

const person2 = new Person(24); 

//additional info of class and method :method are function related to class or perticular object

// class Person2{
//     Age;
//     constructor(age)
//     {
//         this.Age=age;
//     }
//     counter(){
//         this.Age++;
//     }

//     logger()
//     {
//         this.counter();
//         console.log(this.Age);
//     }
// }

// let p=new Person2(34);
// p.logger();
