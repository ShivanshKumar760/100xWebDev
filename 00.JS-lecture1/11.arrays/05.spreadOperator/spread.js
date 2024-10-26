/*

Copy an Array with the Spread Operator
While slice() allows us to be selective about what elements of an array to copy, among several other useful tasks, 
ES6's new spread operator allows us to easily copy all of an array's elements, in order, with a simple and highly readable syntax. 
The spread syntax simply looks like this: ...

In practice, we can use the spread operator to copy an array like so:

let thisArray = [true, true, undefined, false, null];
let thatArray = [...thisArray];
thatArray equals [true, true, undefined, false, null]. thisArray remains unchanged and thatArray contains the same elements as thisArray.*/


let thisArray = [true, true, undefined, false, null];
let thatArray = [...thisArray];
thatArray[1]=false;

console.log(thisArray);
console.log(thatArray);

//we can also use spread operator to combine array or mix b/w array

/*

Combine Arrays with the Spread Operator
Another huge advantage of the spread operator is the ability to combine arrays, or to insert all the elements of one array into another, 
at any index. With more traditional syntaxes, we can concatenate arrays, but this only allows us to combine arrays at the end of one, and at 
the start of another. Spread syntax makes the following operation extremely simple:

let thisArray = ['sage', 'rosemary', 'parsley', 'thyme'];

let thatArray = ['basil', 'cilantro', ...thisArray, 'coriander'];
thatArray would have the value ['basil', 'cilantro', 'sage', 'rosemary', 'parsley', 'thyme', 'coriander'].

Using spread syntax, we have just achieved an operation that would have been more complex and more verbose had we used traditional methods.
*/

let a1 = ['sage', 'rosemary', 'parsley', 'thyme'];

let vegies = ['basil', 'cilantro', ...a1, 'coriander'];
console.log(vegies);