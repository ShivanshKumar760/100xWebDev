function getNum(num)
{
    return new Promise((resolve,reject)=>{
        if(num===10)
        {
            setTimeout(()=>{
                resolve(false);
            },3000);
        }
        else{
            resolve(true);
        }
        
    })
}

async function logger()
{
    let num=1
    while(await getNum(num))
    {
        console.log("Count");
        num++;
    }
    console.log("hello");
}

logger();
console.log("Welcome !");