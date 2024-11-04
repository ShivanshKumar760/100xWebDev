import express from "express";
import { query,body,validationResult,matchedData } from "express-validator";

const app = express();
const userDB=[
    {id:1,userName:"Shivansh",userAge:19},
    {id:2,userName:"Alex",userAge:20}
];
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.status(200).json(userDB);
});

app.post("/submit",(req,res)=>{
    const {body}=req;//basically i will extract out the body object from request body
    //assign it a id :
    const newUser_id=userDB[userDB.length-1].id+1;
    console.log(body);
    const newRecord={id:newUser_id,...body};
    userDB.push(newRecord)
    res.status(201).send("User created");
});

app.get("/get/user",(req,res)=>{
    const {query:{name}}=req;
    let fetchIndex;
    for(let i=0;i<userDB.length;i++)
    {
        if(name===userDB[i].userName)
        {
            fetchIndex=i;
            break;
        }
        else{
            fetchIndex=-1;
        }
    }
    if(fetchIndex===-1)
    {
        return res.status(404).send("User Not Found check name");
    }
    res.status(200).json(userDB[fetchIndex]);
});

app.listen(3000,()=>{
    console.log("Server is running");
});