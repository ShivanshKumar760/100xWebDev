import express from "express";
import {fileURLToPath} from "url";
import { dirname } from "path";
import { create } from "domain";
const app=express();
const __filename=fileURLToPath(import.meta.url);
const __dirname=dirname(__filename);

let userData=[
    {id:1,userName:"Shivansh",userAge:19},
    {id:2,userName:"Alex",userAge:19},
    {id:3,userName:"Aaryansh",userAge:19},
    {id:4,userName:"Rishi",userAge:19},
    {id:5,userName:"Mahima",userAge:19},
    {id:6,userName:"Chitra",userAge:19},
    {id:7,userName:"Upasana",userAge:19}
];
app.use(express.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.status(200).send("<h1>Welcome to the page</h1>");
});

app.get("/createUser",(req,res)=>{
    res.status(200).sendFile("./public/index.html",{root:__dirname});
});

app.get("/getUser",(req,res)=>{
    let {query:{sort}}=req;
    if(sort==="asc")
    {
        userData=userData.sort((a,b)=>{
            if(a.userName>b.userName)
            {
                return 1;
            }
            if (a.userName < b.userName) 
            {
                return -1;
            } 
            return 0;
        });
    }
    else if(sort==="dsc")
    {
        userData=userData.sort((a,b)=>{
            if(a.userName>b.userName)
            {
                return -1
            }
            if(a.userName<b.userName)
            {
                return 1;
            }
            return 0;
        });
    }
    else{
        userData=userData;
    }

    res.status(200).json(userData);
});


app.get("/user/get",(req,res)=>{
    let {query:{id}}=req;
    console.log(req.query);
    id=parseInt(id);
    let getRecord;
    for(let index=0;index<userData.length;index++)
    {
        if(id===userData[index].id)
        {
            getRecord=userData[index];
            break;
        }

    }
    if(getRecord)
    {
        res.json(getRecord);
    }
    else{
        res.status(401).send("Invalid id");
    }
});

app.get("/:user_name",(req,res)=>{

    let {user_name}=req.params;
    let getRecord;
    for(let index=0;index<userData.length;index++)
    {
        if(user_name===userData[index].userName)
        {
            getRecord=userData[index];
            break;
        }
    }
    if(getRecord)
    {
        res.json(getRecord);
    }
    else{
        res.status(401).send("Invalid id");
    }
});

app.post("/queryCreate",(req,res)=>{
    let {query:{uid,firstName,age}}=req;
    uid=parseInt(uid);
    let msg;
    let flag=true;
    for(let i=0;i<userData.length;i++)
    {
        if(uid!==userData[i].id)
        {
            flag=true;
            msg="Created";
        }
        else{
            flag=false;
            msg="Invalid same id";
            break;
        }
    }

    let createUser_object={id:uid,userName:firstName,userAge:age};
    if(flag)
    {
        userData.push(createUser_object);
        console.log(userData);
        res.status(200).send(msg);
    }
    else{
        console.log(userData);
        res.status(401).send(msg);
    }
   
    
});


app.post("/createUser",(req,res)=>{
    let {id,userName,userAge}=req.body;
    id=parseInt(id);
    let msg;
    let flag=true;
    for(let index=0;index<userData.length;index++)
    {
        if(id===userData[index].id)
        {
            msg="Repeated id";
            flag=false;
            break;
        }
        else{
            msg="created";
            flag=true;
        }
    }
    const newRecord={id:id,userName:userName,userAge:userAge};
    if(flag)
    {
        userData.push(newRecord);
        console.log(userData);
        res.status(200).send(msg);
    }
    else{
        console.log(userData);
        res.status(401).send(msg);
    }
   
});


app.listen(3000,()=>{
    console.log("Server is running");
})
