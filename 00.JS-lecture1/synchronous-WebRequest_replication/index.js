document.getElementById("btn").addEventListener("click",function(){
    function foo()
    {
        for(let i=1;i<=1000000;i++)
        {
            //will execute
            console.log("requesting://foo.com");
        }
        return {url:"//foo.coo"}
    }
    let fooCaller=foo()
    function boo()
    {
        for(let i=1;i<=1000000;i++)
        {
            //will execute
            console.log("requesting://boo.com");
        }
        return {url:"//boo.coo"}
    }
    let booCaller=boo();

    function buz()
    {
        for(let i=1;i<=1000000;i++)
        {
            //will execute
            console.log("requesting://buz.com");
        }
        return {url:"//buz.coo"}
    }

    let buzCaller=buz();
    console.log(fooCaller);
    console.log(booCaller);
    console.log(buzCaller);
})