//so this is was our single js code  ../13.Multi_vs_SingleThread/single.js

// let sum=0;
// for(let i=0;i<=10000000000;i++)//this thread will take long time to process cause 
// //of large calculation and since js is single threaded it will make the thread hung 
// //on this perticular task and cause of that other code wont get execute
// {
//     sum=sum+i;
// }
// console.log("Hello")

/* but this perticular block of code will hold the thread and if we have important work 
which needs to be executed like site rendering it wont work unitl the process is executed 
so we can wrap it around webAPI for browser and C++ api for nodes which helps us immitate 
basically multi-threading by holding the thread in a stack/array*/

console.log("Start of program");
function callback_SetTimeout()
{
    let sum=0
    for(let i=0;i<=10000000000;i++)
    {
        sum+=i;
    }
    console.log(sum);
}

setTimeout(callback_SetTimeout,3*1000);
console.log("Now the callback_SetTimeout will get executed once all the code \n"+
"below it will get executed and after 3 sec it will come out of webapi stack into cb queue");


function sumLogger(n1,n2)
{
    return n1+n2;

}
console.log(sumLogger(5,6));
console.log("Done");
console.log("Program ended-event loop will now push the function from cb queue to call stack");