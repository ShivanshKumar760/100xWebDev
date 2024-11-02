import express from "express";
import {fileURLToPath} from "url";
import { dirname } from "path";
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
app.use(express.json());//will parse the the incomming json data when ever we hit a new 
//url


app.get("/",(req,res)=>{
    res.status(200).send("<h1>Welcome to Home page</h1>");
});
app.get("/createUser",(req,res)=>{
    res.sendFile("./public/index.html",{root:__dirname});
});
app.get("/getUser",(req,res)=>{
    res.json(userData);
});
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
    if(getRecord)
    {
        res.json(getRecord);
    }
    else{
        res.json({msg:"invalid"});
    }
   
});



app.post("/createUser",(req,res)=>{
    //from here onwards either we use form or we use api tool to send 
    //a data carried request to /createUser route with post method cause we are 
    //processing incomming data 
    let {id,userName,userAge}=req.body;
    console.log(`this is the request body`);
    console.log(req.body);
    console.log(id,userName,userAge)
    id=parseInt(id);
    const len=userData.length;
    let msg=""
    let flag=true;
    for(let index=0;index<len;index++)
    {
        //here we are checking also know as validation check that our id  should be
        //unique so if it's repeated we will mark flag as false
        if(id===userData[index].id){
            msg="repeated id";
            flag=false
            break;
        }
        else{
            msg="created";
            flag=true;
        }
    }
    const createUser={id:id,userName:userName,userAge:userAge};
    if(flag)
    {
        userData.push(createUser)
        res.status(200).send(msg);
    }

    else{
        res.status(404).send(msg);
    }
    
})

app.listen(3000,()=>{
    console.log("Server is running");
})
