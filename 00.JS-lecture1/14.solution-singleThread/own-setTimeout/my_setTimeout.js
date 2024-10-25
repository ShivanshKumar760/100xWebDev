function mySetTimeout(callback, delay) {
    const start = Date.now(); // Get the current time

    // Create a recursive function to check the elapsed time
    function checkTime() {
        const currentTime = Date.now(); // Get the current time
        if (currentTime - start >= delay) {
            callback(); //and as we can see setTimeout has already inside its function defination has 
            //define callback(); so when ever we try to pass a function as call back we only have to pass
            //it's name if it is named function without () and if anonymous function pass it without ()

            //casue setTimeout will automatically attach it .
            
            // Execute the callback if the delay has passed
        } else {
            // Use setImmediate to continue checking without blocking the event loop
            setImmediate(checkTime); //a asynchronous function which will call checkTime again and again and it's set 
            //to be excuted immediate after the complete execution of code in our call-stack
        }
    }

    checkTime(); // Start the checking process
}

// Example usage
console.log("Start");
mySetTimeout(() => {
    console.log("Executed after 2 seconds!");
}, 3000);
console.log("End");
console.log(Date.now());
