import express from "express";
import {fileURLToPath} from "url";
import { dirname } from "path";
const app=express();
const port=3000;
const __filename=fileURLToPath(import.meta.url);
const __dirname=dirname(__filename);
let users=[
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

app.get("/patchUser",(req,res)=>{
    res.status(200).sendFile("./public/patch.html",{root:__dirname});
});
app.get("/patchReq.js",(req,res)=>{
    res.status(200).sendFile("./public/patchReq.js",{root:__dirname});
});
app.get("/users/get",(req,res)=>{
    res.status(200).json(users);
});

app.get("/users/get_byOrder",(req,res)=>{
    const{query:{sort}}=req;
    if(sort==="asc")
    {
        users.sort((a,b)=>{
            if(a.userName>b.userName)
            {
                return 1
            }
            else if(a.userName<b.userName)
            {
                return -1
            }
            else{
                return 0;
            }
        });
    }
    else if(sort==="dsc")
    {
        users.sort((a,b)=>{
            if(a.userName>b.userName)
            {
                return -1
            }
            else if(a.userName<b.userName)
            {
                return 1
            }
            else{
                return 0;
            }
        });
    }
    res.status(200).json(users);
});


app.get("/:user_name",(req,res)=>{
    const{params:{user_name}}=req;
    let getRecord;
    for(let i=0;i<users.length;i++)
    {
        console.log(users[i]);
        if(user_name===users[i].userName)
        {
            console.log(users[i]);
            getRecord=users[i];//that particular object
            break;
        }
    }
    if(getRecord)
    {
        res.status(200).json(getRecord);
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
        users.push(createUser_object);
        console.log(userData);
        res.status(200).send(msg);
    }
    else{
        console.log(userData);
        res.status(401).send(msg);
    }
   
    
});

app.post("/createUser",(req,res)=>{
    const{body:{name,age}}=req;
    let newID=users.length+1;
    const newRecord={id:newID,userName:name,userAge:age};
    users.push(newRecord);
    res.status(201).send("User Created");
});

app.put("/update/:id",(req,res)=>{
    console.log(req.body);
    console.log(req.params);
    const {body,params:{id}}=req;
    const parsedID=parseInt(id);
    let fetchIndex;
        //check if the enter param is a id or a string
    if(isNaN(parsedID))
    {
        res.status(400).send("Id is not number");
        //just in case below code does not get executed 
        //give a return statment;
        return ;
    }
    for(let i=0;i<users.length;i++)
    {
        if(parsedID===users[i].id)
        {
            fetchIndex=i;
            break;
        }
        else{
            fetchIndex=-1
        }
    }
    if(fetchIndex===-1)
    {
        res.status(400).send("Invalid User id");
        //just in case below code does not get executed 
        //give a return statment;
        return ;

    }
    else{
        let newRecord={id:parsedID,...body};
        users[fetchIndex]=newRecord;
        res.status(201).send("User Updated");
    }
});


//patch method:

app.patch("/patch/user/:id",(req,res)=>{
    const{body,params:{id}}=req;
    console.log(body)
    const parsedID=parseInt(id);
    let fetchIndex;
    for(let i=0;i<users.length;i++)
    {
        if(parsedID===users[i].id)
        {
            fetchIndex=i;
            break;
        }
        else{
            fetchIndex=-1
        }
    }
    if(fetchIndex===-1)
    {
        res.status(400).send("Invalid User id");
        //just in case below code does not get executed 
        //give a return statment;
        return ;

    }
    users[fetchIndex]={...users[fetchIndex],...body};
    res.status(201).send("Update attribute")
});

app.listen(port,()=>{console.log("Server is running")});