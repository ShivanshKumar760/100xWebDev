import express, { response } from "express";
import {fileURLToPath} from "url";
import { dirname } from "path";
import path from "path";
import { get } from "https";
const app=express();
const port=3000;
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
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.status(200).sendFile("./public/home.html",{root:__dirname});
});

app.get("/createUser",(req,res)=>{
    res.status(200).sendFile("./public/post.html",{root:__dirname});
});

app.get("/updateUser",(req,res)=>{
    res.status(200).sendFile("./public/update.html",{root:__dirname});
});
app.get("/req.js",(req,res)=>{
    res.status(200).sendFile("./public/req.js",{root:__dirname});
});

app.get("/getUser",(req,res)=>{
    res.status(200).json(userData);
});


app.get("/getUser_order",(req,res)=>{
    const {query:{sort}}=req;
    if(sort==="asc")
    {
        userData=userData.sort((a,b)=>{
            if(a.userName>b.userName)
            {
                return 1
            }
            else if(a.userName<b.userName)
            {
                return -1;
            }
        });
    }
    else if(sort==="dsc")
    {
        userData=userData.sort((a,b)=>{
            if(a.userName>b.userName)
            {
                return -1
            }
            else if(a.userName<b.userName)
            {
                return 1;
            }
            return 0;
        });
    }
    res.status(200).json(userData);
});

app.get("/user/get",(req,res)=>{
    const {query:{id}}=req;
    const paresedId=parseInt(id);
    let getRecord;
    for(let i=0;i<userData.length;i++)
    {
        if(paresedId===userData[i].id)
        {
            getRecord=userData[i];
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
    const {params:{user_name}}=req;
    let getRecord;
    for(let i=0;i<userData.length;i++)
    {
        if(user_name===userData[i].userName)
        {
            getRecord=userData[i];
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
//since id should be given by server and not database
app.post("/createUser",(req,res)=>{
    const {body}=req;
    let newId=userData.length+1;
    const newRecord={id:newId,...body};
    userData.push(newRecord);
    res.status(201).send("User Created");

});

app.put("/update/:id",(req,res)=>{
    console.log(req.body);
    console.log(req.params);
    const {body,params:{id}}=req;
    console.log(body);
    console.log(id);
    let paresedId=parseInt(id);
    let returnedIndex;
    if(isNaN(paresedId))
    {
        res.status(400).send("Id is not number");
        //just in case below code does not get executed 
        //give a return statment;
        return ;
    }
    for(let i=0;i<userData.length;i++)
    {
        if(paresedId===userData[i].id)
        {
            returnedIndex=i;
            break;//when we find the index break so that else condition wont get exexute as if we dont provide 
            //break loop wont break and even after finding  the correct index loop will jump to next i 
            //and update it with else
        }
        else{
            returnedIndex=-1;
        }
    }
    if(returnedIndex===-1)
    {
        res.status(400).send("Invalid User id");
        //just in case below code does not get executed 
        //give a return statment;
        return ;

    }
    else{
        let newRecord={id:paresedId,...body};
        userData[returnedIndex]=newRecord;
        res.status(200).send("User Updated");
    }
});


app.listen(port,(req,res)=>{
    console.log("Server is running");
});