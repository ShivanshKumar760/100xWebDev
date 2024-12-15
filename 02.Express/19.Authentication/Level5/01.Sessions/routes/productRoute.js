import { Router } from "express";
import { productDB } from "../database/productDB.js";
import {body,query,validationResult,matchedData,checkSchema} from "express-validator";
import { 
    sortProduct_Schema,createProduct_Schema,updateProduct_Schema,patchProduct_Schema,deleteProduct_Schema
 } from "../utils/productSchema.js";
import { userDB } from "../database/userDB.js";
import { user_productDB } from "../database/user_productDB.js";
const productRouter=Router();

productRouter.get("/product",(req,res)=>{
    res.status(200).send(productDB)
});
productRouter.get("/product/my/cart",(req,res)=>{
    // const{cookies:{name}}=req;//will extract name from cookies
    const {session:{userName}}=req;
    console.log(userName);
    let flag=false;
    let msg;
    for(let i=0;i<userDB.length;i++)
    {
        if(userName===userDB[i].name)
        {
            console.log(userName);
            console.log(userDB[i].name);
            flag=true;
            break;

        }
        else{
            flag=false;
            msg="invalid user";
        }
    }
    if(flag)
    {
        for(let i=0;i<user_productDB.length;i++)
        {
            if(userName===user_productDB[i].username)
            {
                console.log(req.sessionStore.all((err,sessionData)=>
                {
                    console.log(sessionData)
                }));
                req.sessionStore.get(req.sessionID,(err,sessionData)=>{
                    if(err)
                    {
                        console.log(err);
                        throw err;
                    }
                    console.log(sessionData);
                });//async function
                console.log("Done!");
                
                return res.status(200).send(user_productDB[i].product);
                // break;
            }
        }
    }
   
    res.status(401).send(msg);
    
});
productRouter.get("/product/byOrder",checkSchema(sortProduct_Schema),(req,res)=>{
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

productRouter.post("/product/create",checkSchema(createProduct_Schema),(req,res)=>{
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

productRouter.put("/product/update/:pid",checkSchema(updateProduct_Schema),(req,res)=>{
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

productRouter.patch("/product/patch/:pid",checkSchema(patchProduct_Schema),(req,res)=>{
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

productRouter.delete("/product/delete/:pid",checkSchema(deleteProduct_Schema),(req,res)=>{
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

export default productRouter;