import express from "express";
import {body,query,validationResult,matchedData,checkSchema} from "express-validator";
import { 
    user_nameSchema,sort_Schema,createUser_Schema,update_Schema,delete_Schema ,patch_Schema
} from "./utils/validationSchema.js";
import { 
    sortProduct_Schema,createProduct_Schema,updateProduct_Schema,patchProduct_Schema,deleteProduct_Schema
 } from "./utils/productSchema.js";
const app=express();
const port=3000;
const userDB=[
    {id:1,name:"Shivansh",age:18},
    {id:2,name:"Alex",age:18},
    {id:3,name:"Aaryansh",age:18},
]

const productDB=[
    {pid:1,pname:"NoteBook",qty:4},
    {pid:2,pname:"Pen",qty:10},
    {pid:3,pname:"compass",qty:1},
]
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/user",(req,res)=>{
    res.status(200).send(userDB)
});
app.get("/user/byOrder",checkSchema(sort_Schema),(req,res)=>{
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
app.get("/user/get/name/:user_name",checkSchema(user_nameSchema),(req,res)=>{
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
app.post("/user/create",checkSchema(createUser_Schema),(req,res)=>{
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

app.put("/user/update/:id",checkSchema(update_Schema),(req,res)=>{
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

app.patch("/user/patch/:id",checkSchema(patch_Schema),(req,res)=>{
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

app.delete("/user/delete/:id",checkSchema(delete_Schema),(req,res)=>{
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


app.get("/product",(req,res)=>{
    res.status(200).send(productDB)
});
app.get("/product/byOrder",checkSchema(sortProduct_Schema),(req,res)=>{
    const validated_result=validationResult(req);
    if(!validated_result.isEmpty())
    {
        return res.status(400).send({error:validated_result.array()[0].msg});
    }
    let data=matchedData(req);
    if(data.sort==="asc")
    {
        productDB.sort((a,b)=>{
            if(a.pname>b.pname)
            {
                return 1;
            }
            else if(a.pname<b.pname){
            return -1;
            }
            else{return 0;}
        })
    }
    else if(data.sort==="dsc")
    {
        productDB.sort((a,b)=>{
            if(a.pname>b.pname)
            {
                return -1;
            }
            else if(a.pname<b.pname){
            return 1;
            }

            else{return 0;}
        })
    }
    res.status(200).json(productDB);
    
})

app.post("/product/create",checkSchema(createProduct_Schema),(req,res)=>{
    const validated_result=validationResult(req);
    if(!validated_result.isEmpty())
    {
        return res.status(400).send({error:validated_result.array()[0].msg});
    }
    let data=matchedData(req);
    const {productName,qty}=data;
    const newId=productDB[productDB.length-1].pid+1;
    const newProduct={pid:newId,pname:productName,qty:qty};
    productDB.push(newProduct);
    res.status(200).send("Product Created");
});

app.put("/product/update/:pid",checkSchema(updateProduct_Schema),(req,res)=>{
    const validated_result=validationResult(req);
    if(!validated_result.isEmpty())
    {
        return res.status(400).send({error:validated_result.array()[0].msg});
    }
    let data=matchedData(req);//id as object value
    let parsedID=parseInt(data.pid);
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
        return res.status(401).send("product not Found");
    }
    productDB[fetchIndex]={pid:parsedID,...body};
    res.status(201).send("product Updated");
    
});

app.patch("/product/patch/:pid",checkSchema(patchProduct_Schema),(req,res)=>{
    const validated_result=validationResult(req);
    if(!validated_result.isEmpty())
    {
        return res.status(400).send({error:validated_result.array()[0].msg});
    }
    let data=matchedData(req);//id as object key value
    let parsedID=parseInt(data.pid);
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
    productDB[fetchIndex]={...productDB[fetchIndex],...body};
    res.status(201).send("product Attribute Patched");
    
});

app.delete("/product/delete/:pid",checkSchema(deleteProduct_Schema),(req,res)=>{
    const validated_result=validationResult(req);
    if(!validated_result.isEmpty())
    {
        return res.status(400).send({error:validated_result.array()[0].msg});
    }
    let data=matchedData(req);//id as object key value
    let parsedID=parseInt(data.pid);
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
    productDB.splice(fetchIndex,1);
    res.status(201).send("Product  Deleted");
});

app.listen(port,()=>{
    console.log("Server is running");
})