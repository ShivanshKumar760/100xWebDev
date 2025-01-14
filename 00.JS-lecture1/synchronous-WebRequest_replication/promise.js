function myAsync()
{




    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("Hello World");
        },3000);
    
    })
};


async function startMyAsync()
{
    const result=await myAsync();
    console.log(result);
}

startMyAsync();

console.log("Heyy");