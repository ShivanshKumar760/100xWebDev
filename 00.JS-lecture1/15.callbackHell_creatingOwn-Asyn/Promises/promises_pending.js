function PromsieExecutor()
{
    let catch_Promise=new Promise(function(resolve,reject)
    {
        //if we dont pass any resolve or reject method it will give me a pending status:
        
    })
    return catch_Promise;
}

function PromsieExecutor2()
{
    let catch_Promise2=new Promise(function(resolve,reject)
    {
        //if we dont pass any resolve or reject method it will give me a pending status:
        //plus if we do pass resolve() or reject function in a callback wrapper it will still show pending status
        setTimeout(function(){resolve("hello")},3000);
        //cause once the function resolve returns me the data there should some sort of handler to catch that data 

        
    })
    return catch_Promise2;
}

let status_check=PromsieExecutor();
console.log(status_check);


let status_check2=PromsieExecutor2();
console.log(status_check2);