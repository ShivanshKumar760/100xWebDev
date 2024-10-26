// Async Functions
// Async functions return a promise and allow you to write asynchronous code that looks synchronous.

async function fetchData() {//async function returns promise explicitly
    return "Data fetched!";
}
//promise value can be accessed using .then ie promise.then()
fetchData().then(data => console.log(data)); // Output: Data fetched!


//but it is always suggested to use async with await

// To use async and await with your fetchData function, you need to define an async function that 
// calls fetchData and then await its result. Here's how you can do that:

async function fetchData2() {
    return "Data fetcheddd!";
}

async function main() {
    const data = await fetchData2();
    console.log(data); // Output: Data fetched!
}


main();
console.log("Done");