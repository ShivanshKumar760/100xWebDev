// The filter() method creates a new array with all elements that pass the test implemented by the provided function.

// javascript
// const numbers = [1, 2, 3, 4, 5];

// const evenNumbers = numbers.filter(num => num % 2 === 0);
// console.log(evenNumbers); // [2, 4]


const numbers = [1, 2, 3, 4, 5];

const evenNumbers = numbers.filter(function(num){if(num % 2 === 0){return num}} );//we  unlike map  in we are not attaching any function to
//element but checking if element of that array passes that condition if that number do pass the condition it will be added to evenNumber array
console.log(evenNumbers); // [2, 4]


// The filter() function in JavaScript is used to create a new array containing all
// the elements of the original array that pass a specified test (i.e., satisfy a condition defined by a provided function).


// Another Example: Filtering Objects
// You can also use filter() to work with arrays of 
// objects. For instance, consider the following example where we filter an array of people based on their age:

const people = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 18 },
    { name: 'Diana', age: 22 }
];

// Filter people who are 21 or older
const adults = people.filter(person => person.age >= 21);

console.log(adults); 
// Output: [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }, { name: 'Diana', age: 22 }]
