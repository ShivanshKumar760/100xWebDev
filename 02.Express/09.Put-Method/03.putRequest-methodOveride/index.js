import express from "express";
import {fileURLToPath} from "url";
import { dirname } from "path";
import path from "path";
//new import
import methodOverride from 'method-override';
const app=express();
const port=3000;
const userDB=[{
    id:1,
    name:"Shivansh",
    age:19
}];
const __filename=fileURLToPath(import.meta.url);
const __dirname=dirname(__filename);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.get("/",(req,res)=>{
    res.status(200).sendFile("./public/home.html",{root:__dirname});
});

app.get("/createUser",(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,"public","post.html"));
});

app.get("/updateUser",(req,res)=>{
    res.status(200).sendFile("./public/update.html",{root:__dirname});
});

app.get("/id.js",(req,res)=>{
    res.status(200).sendFile("./public/id.js",{root:__dirname})
})

app.get("/getUser",(req,res)=>{
    res.status(200).json(userDB);
});

app.post("/createUser",(req,res)=>{
    const {body:{name,age}}=req;
    let id;
    if(name!==undefined && age !==undefined)
    {
        id=userDB.length+1;
    }
    const newUser={id:id,name:name,age:age};
    userDB.push(newUser);
    res.status(201).send("User created");
});

app.put("/update/:id",(req,res)=>{
    console.log("Received ID:", req.params.id);
    console.log("Request Body:", req.body);
    const{body,params:{id}}=req;
    const parsedID=parseInt(id);
    let returnedIndex;
    for(let i=0;i<userDB.length;i++)
    {
        if(parsedID===userDB[i].id)
        {
            returnedIndex=i;
            break;
        }
        else{
            returnedIndex=-1;
        }
    }
    if(returnedIndex===-1)
    {
        res.status(401).send("Invalid ID");
    }
    else{
        userDB[returnedIndex]={id:parsedID,...body};
        res.status(200).send("Updated");
    }
});

app.listen(port,(req,res)=>{
    console.log("Server is running");
});