class MyPromise {
    constructor(executor) {
        this.state = 'pending'; // Initial state
        this.value = undefined;  // Value when fulfilled
        this.reason = undefined; // Reason when rejected
        this.onFulfilledCallbacks = []; // Queue for success callbacks
        this.onRejectedCallbacks = [];  // Queue for error callbacks
        // The resolve function
        const resolve = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.onFulfilledCallbacks.forEach(callback => callback(this.value));}
        };
        // The reject function
        const reject = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(callback => callback(this.reason));
            }
        };

        // Execute the executor function
        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    // Method to handle fulfillment
    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            const handleFulfilled = () => {
                try {
                    const result = onFulfilled(this.value);
                    resolve(result);//why are we calling a resolve again on result

                    //well suppose if 
                    /*
                    const promise1 = new MyPromise((resolve, reject) => {
                    setTimeout(() => resolve("First promise resolved!"), 1000);
                });

            promise1
                .then((result) => {
                    console.log(result); // Output: First promise resolved!
                    return "Second promise resolved!"; // Returning a value here we are 
                    //returning a value which will be store in result:
                        [const result = onFulfilled(this.value);]//this will catch the return value:
                    
                })

                .then((result) => {console.log(result); // Output: Second promise resolved!});

                //and this second function will handle the return promise returned from the first 
                //.then()

                that 's why here:
                try {
                    const result = onFulfilled(this.value);
                    resolve(result);//we called a resolve on the return .then() function
                    //so we can chain it with other .then()
                */

                } catch (error) {
                    reject(error);
                }
            };

            const handleRejected = () => {
                try {
                    if (onRejected) {
                        const result = onRejected(this.reason);
                        resolve(result);
                    } else {
                        reject(this.reason);
                    }
                } catch (error) {
                    reject(error);
                }
            };


            if (this.state === 'fulfilled') {
                handleFulfilled();
            } else if (this.state === 'rejected') {
                console.log("Rejected");
                handleRejected();
            } else {
                this.onFulfilledCallbacks.push(handleFulfilled);
                this.onRejectedCallbacks.push("Rejected");
            }
        });
    }

    // Method to handle rejection
    catch(onRejected) {
        return this.then(null, onRejected);
    }
}


const promise1 = new MyPromise((resolve, reject) => {
    setTimeout(() => resolve("First promise resolved!"), 1000);
});

promise1
    .then((result) => {
        console.log(result); // Output: First promise resolved!
        return "Second promise resolved!"; // Returning a value
    })
    .then((result) => {
        console.log(result); // Output: Second promise resolved!
    });
console.log("hello world");
