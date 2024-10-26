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
                this.onFulfilledCallbacks.forEach(callback => callback(this.value));
            }
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
                    resolve(result);
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
                handleRejected();
            } else {
                this.onFulfilledCallbacks.push(handleFulfilled);
                this.onRejectedCallbacks.push(handleRejected);
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
