import { Router } from "express";
import {body,query,validationResult,matchedData,checkSchema} from "express-validator";
import { 
    user_nameSchema,sort_Schema,createUser_Schema,update_Schema,delete_Schema ,patch_Schema
} from "../utils/validationSchema.js";
import { userDB } from "../database/userDB.js";

const userRouter=Router();

userRouter.get("/user",(req,res)=>{
    res.status(200).send(userDB)
});
userRouter.get("/user/byOrder",checkSchema(sort_Schema),(req,res)=>{
    const validated_result=validationResult(req);
    if(!validated_result.isEmpty())
    {
        return res.status(400).send({error:validated_result.array()[0].msg});
    }
    let data=matchedData(req);
    if(data.sort==="asc")
    {
        userDB.sort((a,b)=>{
            if(a.name>b.name)
            {
                return 1;
            }
            else if(a.name<b.name){
            return -1;
            }
            else{return 0;}
        })
    }
    else if(data.sort==="dsc")
    {
        userDB.sort((a,b)=>{
            if(a.name>b.name)
            {
                return -1;
            }
            else if(a.name<b.name){
            return 1;
            }

            else{return 0;}
        })
    }
    res.status(200).json(userDB);
    
});
userRouter.get("/user/get/name/:user_name",checkSchema(user_nameSchema),(req,res)=>{
    const validated_result=validationResult(req);
    if(!validated_result.isEmpty())
    {
        return res.status(400).send({error:validated_result.array()[0].msg});
    }
    let data=matchedData(req);
    let getRecord;
    for(let i=0;i<userDB.length;i++)
    {
        console.log(userDB[i]);
        if(data.user_name===userDB[i].name)
        {
            console.log(userDB[i]);
            getRecord=userDB[i];//that particular object
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
userRouter.post("/user/create",checkSchema(createUser_Schema),(req,res)=>{
    const validated_result=validationResult(req);
    if(!validated_result.isEmpty())
    {
        return res.status(400).send({error:validated_result.array()[0].msg});
    }
    let data=matchedData(req);
    const {name,age}=data;
    const newId=userDB[userDB.length-1].id+1;
    const newUser={id:newId,name:name,age:age};
    userDB.push(newUser);
    res.status(200).send("User Created");
});

userRouter.put("/user/update/:id",checkSchema(update_Schema),(req,res)=>{
    const validated_result=validationResult(req);
    if(!validated_result.isEmpty())
    {
        return res.status(400).send({error:validated_result.array()[0].msg});
    }
    let data=matchedData(req);//id as object value
    let parsedID=parseInt(data.id);
    const {body}=req;
    let fetchIndex;
    for(let i=0;i<userDB.length;i++)
    {
        if(parsedID===userDB[i].id)
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
        return res.status(401).send("User not Found");
    }
    userDB[fetchIndex]={id:parsedID,...body};
    res.status(201).send("User Updated");
    
});

userRouter.patch("/user/patch/:id",checkSchema(patch_Schema),(req,res)=>{
    const validated_result=validationResult(req);
    if(!validated_result.isEmpty())
    {
        return res.status(400).send({error:validated_result.array()[0].msg});
    }
    let data=matchedData(req);//id as object key value
    let parsedID=parseInt(data.id);
    const {body}=req;
    let fetchIndex;
    for(let i=0;i<userDB.length;i++)
    {
        if(parsedID===userDB[i].id)
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
        return res.status(401).send("User not Found");
    }
    userDB[fetchIndex]={...userDB[fetchIndex],...body};
    res.status(201).send("User Attribute Patched");
    
});

userRouter.delete("/user/delete/:id",checkSchema(delete_Schema),(req,res)=>{
    const validated_result=validationResult(req);
    if(!validated_result.isEmpty())
    {
        return res.status(400).send({error:validated_result.array()[0].msg});
    }
    let data=matchedData(req);//id as object key value
    let parsedID=parseInt(data.id);
    const {body}=req;
    let fetchIndex;
    for(let i=0;i<userDB.length;i++)
    {
        if(parsedID===userDB[i].id)
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
        return res.status(401).send("User not Found");
    }
    userDB.splice(fetchIndex,1);
    res.status(201).send("User Deleted");
});


export default userRouter;