import express from "express";
import {fileURLToPath} from "url";
import { dirname } from "path";
const app=express();

let userData=[];
const __filePath=fileURLToPath(import.meta.url);
const __dirname=dirname(__filePath);
function pushData(req,res,next)
{
    if(Object.keys(req.body).length!==0)
    {
        userData.push(req.body);
    }
    
    next();
}

app.use(express.urlencoded({extended:true}));

app.post("/submit",pushData,(req,res)=>{
    console.log(req.body);
    console.log(userData);
    userData.push(req.body);
    console.log(userData);
    res.status(200).send("Data Posted");
})

app.put("/update/:id",(req,res)=>{
    const uid=req.params.id;
    console.log(uid);
    // const fetchUser=userData[uid-1];
    // console.log(fetchUser);
    const user = userData.find((user) => user.userID == uid);
    console.log(user);
    //new request from api tool
    const newName=req.body.userName;
    const newAge=req.body.userAge;
    if(user)
    {
        user.userAge=newAge;
        user.userName=newName;
        console.log(userData);
        res.sendStatus(200);
    }
    else{
        res.send("id not matched");
    }

})

app.get("/user",(req,res)=>{

    res.json(userData);
})


app.listen(3000,()=>{
    console.log("Working");
})

