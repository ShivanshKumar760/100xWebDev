function fetchUserName(callbackFunction) {
    setTimeout(() => {
        console.log("Fetched user name");
        callbackFunction("Alice");
    }, 1000);
}

function fetchUserAge(name, callbackFu) {
    setTimeout(() => {
        console.log(`Fetched age for ${name}`);
        callbackFunction(30);
    }, 1000);
}

// Callback Hell
fetchUserName
(   //will pass this as the fuction to fetch user
    function(name) 
    {
        //then this inner block of  function will get called from setTimeout 
        fetchUserAge
        (name, //name as p1 
        function(age)//function() as p2
        {
            console.log(`User: ${name}, Age: ${age}`);
        }
        );
});
