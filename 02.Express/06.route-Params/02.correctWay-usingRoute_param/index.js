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
];
    
app.get("/:user_name",(req,res)=>{
    let len=userData.length;
    let getRecord;
    for(let i=0;i<len;i++)
    {   
        if(req.params.user_name===userData[i].userName)
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
