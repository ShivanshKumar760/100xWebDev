// Generator Functions
// Generator functions allow you to define an iterative algorithm by using the function* syntax and yield keyword.

function* numberGenerator() {
    yield 1;//yeild points to next() chain that go into numberGenrator() function and find the next yeilding value
    yield 2;
    yield 3;
}

const gen = numberGenerator();
console.log(gen.next().value); // Output: 1
console.log(gen.next().value); // Output: 2
console.log(gen.next().value); // Output: 3