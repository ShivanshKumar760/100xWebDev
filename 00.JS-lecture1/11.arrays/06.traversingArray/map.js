// 4. map()
// The map() method creates a new array with the results of calling a provided function on every element in the calling array.

// javascript
// const fruits = ['apple', 'banana', 'cherry'];

// const uppercasedFruits = fruits.map(fruit => fruit.toUpperCase());
// console.log(uppercasedFruits); // ['APPLE', 'BANANA', 'CHERRY']


const fruits = ['apple', 'banana', 'cherry'];
console.log(fruits[0].toUpperCase());
const uppercasedFruits = fruits.map((fruit) => {
    return fruit.toUpperCase();
});
console.log(uppercasedFruits); // ['APPLE', 'BANANA', 'CHERRY']
