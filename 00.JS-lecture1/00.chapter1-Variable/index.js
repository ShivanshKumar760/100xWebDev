/*
variable are a storage containers that allow us to store value like name,age,marks,rollNumber etc
and this in javascript can be done using three ways :
*/

//to declare variable we have 3 keywords :
//let ,var and const

let firstName="Shivansh";
const lastName="Kumar";
var age=20;
alert("My name is "+firstName+" "+lastName+" my age is :"+age);

//Now we have understood how we can use these 3 keywords 
//but what are the difference b/w them like what is the diffrence between let and var 

/*
let is the most acurate way to declare a variable 
as let declares a block scope variable 

and var is a old way to declare a variable and 
kind of deprecated way also as its function
scope that is if a variable is declared in function1
using var than that variable is limited to that function

But any variable declared outside of a function let's say in 
a block not bounded by function it will be treated as global
variable which can be used in any function

a block is some bunch of code packed in {}

but the same thing is not true for let declared variable
a let declared variable is blocked scope so no matter if it 
is in a function or just a simple block it will be treated as 
local variable for that block but any variable outside of that
block is global */

// let firstName_2="Mike";
// {//block1
//     let lastName_2="Hanigan";//this is a local variable for this block 1 since it is decclared using let 
//     //and cause of that this lastName variable cant be used outside this block 1 as let declares block scope variable 
// }

// function sayHello()
// {
//     return "Hello"+" "+firstName_2;
// }

// console.log(sayHello());

// function sayBye()
// {
//     return "Bye "+lastName_2;

// }
// console.log(sayBye());



//lets use var to see it 's effect 

let firstName_2="Sherlock";
{//block1
    var lastName_2="Holmes";//this is a global variable for this block 1 and every other block or function
    // since it is decclared using var 
    //and cause of that this lastName variable can be used outside this block 1 as var declares function scope variable
    //and not block  scope variable
    
    let address="21 baker street";
    //this is a local variable for this block 1 since it is decclared using let 
    //and cause of that this lastName variable cant be used outside this block 1 as let declares block scope variable 
}

function sayHello()
{
    return "Hello"+" "+firstName_2;
}

console.log(sayHello());

function sayBye()
{
    var sherlockAge = 20;//since this is a variable declared inside function using var this becomes a local scope variable 
    //as var is a function scope variable declarator
    return "Bye "+lastName_2;

}
console.log(sayBye());
// console.log(sherlockAge); gives error as sherlockAge is not defined outside function block


//const is for declaring constant variable which are basically immutable that is there value cant change once declared:

const dr_name="watson";
dr_name="Professor Jame Moriority";//TypeError: Assignment to constant variable
console.log(dr_name);