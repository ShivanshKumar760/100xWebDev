console.log("Start:");
setTimeout(function(){
    console.log("Hey from async function");
},1000);

console.log("End:");

//arrow function

console.log("Start of arrow function being called from async function:");
setTimeout(()=>{
    console.log("This is arrow function from setTimeout");
},1000);

console.log("End of arrow function being called from async function");


