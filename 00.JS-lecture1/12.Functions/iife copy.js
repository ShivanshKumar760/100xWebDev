//so we saw that we cannot invoke a anonymous function just by defining it we need to wrap it with some expression
//that is variable or another high order function like map(),filter() or reduce

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


// //so in order to use them we assign it to a variable
// if(true)
// {
//     // try{
//     //     function(name)
//     //     { console.log(name);}//here this try block will not run cause error is not returned but in order to use catch block we 
//     //     //need to throw error for it to catch
//     // }

//     try{
//         throw new Error(function(name)
//         { console.log(name);})
//     }
//     catch(error){
//         let namePrinter=function(name){console.log(name)};
//         namePrinter("alex");
//     }
// }



// You can use an immediately invoked function expression (IIFE) in JavaScript 
// to create and call an anonymous function without assigning it to a variable. Here’s how it works:

// Syntax of IIFE
// An IIFE is defined by wrapping a function in parentheses and then immediately invoking it with 
// another set of parentheses:

// javascript
// Copy code
// (function() {
//     // Your code here
//     console.log("This function runs automatically!");
// })();
// Explanation
// Function Declaration: The function is declared anonymously.
// Immediately Invoked: The () at the end immediately invokes the function.


(function(name){ console.log(name);})("alex");

console.log(
    ((elem)=>{elem=elem+2;return elem})(4)
);



(function(name) {
    console.log(`Hello, ${name}!`);
})("Alice"); // Output: Hello, Alice!



// Benefits of IIFE
// Encapsulation: IIFEs create a new scope, helping avoid polluting the global namespace.
// Immediate Execution: Useful for running initialization code without the need for a separate function call.