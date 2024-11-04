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

app.post("/submit",
/*validation structure*/
body("userName")
.notEmpty()
.withMessage("user name cannot be empty")
.isLength({min:4,max:32})
.withMessage("User name must be atleat 5 character long and max 32 character long")
.isString()
.withMessage("User Name must be a string")
/*next flow of middleware that request and response handler*/
,(req,res)=>{
    const {body}=req;//basically i will extract out the body object from request body
    //assign it a id :
    // console.log(req);
    // console.log(body);//now epresss-validator middleware will add a express-validator
    //object which carries the report of validation like error which we can catch 
    //using validation result 
    const validated_result=validationResult(req);
    console.log(validated_result);
    if(!validated_result.isEmpty())/*that is if the validated_result does not contain any error*/
    {
        return res.status(400).send({error:validated_result.array()});
    }
    const newUser_id=userDB[userDB.length-1].id+1;
  
    //now we will extract the matched data from validation which is accurate using
    //matchedData function
    const dataAccurate=matchedData(req);
    // const newRecord={id:newUser_id,...body};
    const newRecord={id:newUser_id,...dataAccurate};
    userDB.push(newRecord)
    res.status(201).send("User created");
});

app.get("/get/user",
query("name").notEmpty()
.withMessage("user name cannot be empty")
.isLength({min:4,max:32})
.withMessage("User name must be atleat 5 character long and max 32 character long")
.isString()
.withMessage("User Name must be a string")

,(req,res)=>{
    // const {query:{name}}=req;
    const validated_result=validationResult(req);
    if(!validated_result.isEmpty())
    {
        return res.status(400).send({error:validated_result.array()[0].msg});
    }
    let fetchIndex;
    let dataMatched=matchedData(req);//object which will carry name 
    for(let i=0;i<userDB.length;i++)
    {
        if(dataMatched.name===userDB[i].userName)
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


