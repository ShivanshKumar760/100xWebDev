/*Ok, so we've learned how to remove elements from the beginning and end of arrays using shift() and pop(), 

but what if we want to remove an element from somewhere in the middle? Or remove more than one element at once? Well, that's where splice() comes in. 
splice() allows us to do just that: remove any number of consecutive elements from anywhere in an array.

splice() can take up to 3 parameters, but for now, we'll focus on just the first 2. The first two parameters of splice() 
are integers which represent indexes, or positions, of items in the array that splice() is being called upon. And remember, arrays are zero-indexed, 
so to indicate the first element of an array, we would use 0. splice()'s first parameter represents the index on the array from which to begin removing elements, 
while the second parameter indicates the number of elements to delete. For example:

let array = ['today', 'was', 'not', 'so', 'great'];

array.splice(2, 2);
Here we remove 2 elements, beginning with the third element (at index 2). array would have the value ['today', 'was', 'great'].

splice() not only modifies the array it's being called on, but it also returns a new array containing the value of the removed elements:

let array = ['I', 'am', 'feeling', 'really', 'happy'];

let newArray = array.splice(3, 2);
newArray has the value ['really', 'happy'].*/


let array = ['today', 'was', 'not', 'so', 'great'];
array.splice(1,3);
console.log(array);//['today','great'];



/*
Add Items Using splice()
Remember in the last challenge we mentioned that splice() can take up to three parameters? Well, you can use the third parameter, 
comprised of one or more element(s), to add to the array. This can be incredibly useful for quickly switching out an element, or a set of elements, 
for another.

const numbers = [10, 11, 12, 12, 15];
const startIndex = 3;
const amountToDelete = 1;

numbers.splice(startIndex, amountToDelete, 13, 14);
console.log(numbers);
The second occurrence of 12 is removed, and we add 13 and 14 at the same index. The numbers array would now be [ 10, 11, 12, 13, 14, 15 ].

Here, we begin with an array of numbers. Then, we pass the following to splice(): The index at which to begin deleting elements (3), 
the number of elements to be deleted (1), and the remaining arguments (13, 14) will be inserted starting at that same index. Note that there can be 
any number of elements (separated by commas) following amountToDelete, each of which gets inserted.*/


const numbers = [10, 11, 12, 12, 15];
const startIndex = 3;
const amountToDelete = 1;

numbers.splice(startIndex, amountToDelete, 13, 14);
console.log(numbers);