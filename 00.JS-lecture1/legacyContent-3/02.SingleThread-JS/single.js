let sum=0;
for(let i=0;i<=10000000000;i++)//this thread will take long time to process cause 
//of large calculation and since js is single threaded it will make the thread hung 
//on this perticular task and cause of that other code wont get execute
{
    sum=sum+i;
}
console.log("Hello")