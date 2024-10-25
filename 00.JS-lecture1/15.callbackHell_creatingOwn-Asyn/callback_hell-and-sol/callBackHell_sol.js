function fetchUserName() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Fetched user name");
            resolve("Alice");
        }, 1000);
    });
}

function fetchUserAge(name) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Fetched age for ${name}`);
            resolve(30);
        }, 1000);
    });
}

// Using Promises
fetchUserName()
    .then((name) => fetchUserAge(name))//when the fetch user name promise is resolved call fetchUserAge(name:retured or resolved from promise 1)
    .then((age) => {
        console.log(`User: Alice, Age: ${age}`);//once the fetchUserAger is resolved then the value retured after resolved attach a cb to it 
    })
    .catch((error) => {
        console.error('Error:', error);
    });
