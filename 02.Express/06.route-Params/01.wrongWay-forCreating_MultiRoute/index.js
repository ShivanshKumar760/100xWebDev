import express from "express";
import url from "url";
const app=express();

let userData=[
    {id:1,userName:"Shivansh",userAge:19},
    {id:2,userName:"Alex",userAge:19},
    {id:3,userName:"Aaryansh",userAge:19},
    {id:4,userName:"Rishi",userAge:19},
    {id:5,userName:"Mahima",userAge:19},
    {id:6,userName:"Chitra",userAge:19},
    {id:7,userName:"Upasana",userAge:19}
    ]
    
app.get("/Shivansh",(req,res)=>{
        let len=userData.length;
        let getRecord;
        console.log(url.parse(req.url,true));

        for(let i=0;i<len;i++)
        {   
            if(req.url===("/"+userData[i].userName))
            {
                getRecord=userData[i];
                break;
            }
        }
        console.log(getRecord);
        res.json(getRecord);
});
    
    
app.get("/Alex",(req,res)=>{
        let len=userData.length;
        let getRecord;
        const parsedUrl = url.parse(req.url, true); 
        const pathname = parsedUrl.pathname; 
        const name = pathname.split('/').pop()
        for(let i=0;i<len;i++)
        {   
            if(name===userData[i].userName)
            {
                getRecord=userData[i];
                break;
            }
        }
        res.json(getRecord);
});
    
app.get("/Rishi",(req,res)=>{
    let len=userData.length;
    let getRecord;
    const parsedUrl = url.parse(req.url, true); 
    const pathname = parsedUrl.pathname; 
    const name = pathname.split('/').pop()
    for(let i=0;i<len;i++)
    {   
        if(name===userData[i].userName)
        {
            getRecord=userData[i];
            break;
        }
    }
    res.json(getRecord);
});
    
    
app.get("/Aaryansh",(req,res)=>{
    let len=userData.length;
    let getRecord;
    const parsedUrl = url.parse(req.url, true); 
    const pathname = parsedUrl.pathname; 
    const name = pathname.split('/').pop()
    for(let i=0;i<len;i++)
    {   
        if(name===userData[i].userName)
        {
            getRecord=userData[i];
            break;
        }
    }
    res.json(getRecord);
});
    
    
app.get("/Chitra",(req,res)=>{
    let len=userData.length;
    let getRecord;
    const parsedUrl = url.parse(req.url, true); 
    const pathname = parsedUrl.pathname; 
    const name = pathname.split('/').pop()
    for(let i=0;i<len;i++)
    {   
        if(name===userData[i].userName)
        {
            getRecord=userData[i];
            break;
        }
    }
    res.json(getRecord);
});
    
    
app.get("/Mahima",(req,res)=>{
    let len=userData.length;
    let getRecord;
    const parsedUrl = url.parse(req.url, true); 
    const pathname = parsedUrl.pathname; 
    const name = pathname.split('/').pop()
    for(let i=0;i<len;i++)
    {   
        if(name===userData[i].userName)
        {
            getRecord=userData[i];
            break;
        }
    }
    res.json(getRecord);
});
    
    
app.get("/Upasana",(req,res)=>{
    let len=userData.length;
    let getRecord;
    const parsedUrl = url.parse(req.url, true); 
    const pathname = parsedUrl.pathname; 
    const name = pathname.split('/').pop()
    for(let i=0;i<len;i++)
    {   
        if(name===userData[i].userName)
        {
            getRecord=userData[i];
            break;
        }
    }
    res.json(getRecord);
});

app.listen(3000,()=>{
    console.log("Server is running");
})