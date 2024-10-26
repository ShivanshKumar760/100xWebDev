// some() and every()

// some() checks if at least one element passes the test.
// every() checks if all elements pass the test.

// javascript
// const numbers = [1, 2, 3, 4, 5];

// const hasEven = numbers.some(num => num % 2 === 0);
// console.log(hasEven); // true

// const allEven = numbers.every(num => num % 2 === 0);
// console.log(allEven); // false



const numbers = [1, 2, 3, 4, 5];

const hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven); // true

const allEven = numbers.every(num => num % 2 === 0);
console.log(allEven); // false
