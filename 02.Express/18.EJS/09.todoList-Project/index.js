import express from "express";
import {fileURLToPath} from "url";
import { dirname } from "path";
import path from "path";
import bodyParser from "body-parser";
const app=express();
const port=3000;
const __filename=fileURLToPath(import.meta.url);
const __dirname=dirname(__filename);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const todos=[];
let todosID=0;
app.get("/",(req,res)=>{
    res.status(200).render("index",{todos:todos});
});
app.post("/post",(req,res)=>{
    const {body}=req;
    todosID=todosID+1;
    body.id=todosID;
    todos.push(body);
    console.log(todos);
    // res.status(201).render("index",{todos:todos});
    res.redirect("/");
});
app.post("/patchTodo",(req,res)=>{
    res.status(200).render("patch");
});
app.patch("/patch/:id",(req,res)=>{
    const{body,params:{id}}=req;
    console.log(body);
    const parsedID=parseInt(id);
    let fetchIndex;
    for(let i=0;i<todos.length;i++)
    {
        if(parsedID===todos[i].id)
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
        res.status(400).send("Invalid Todo id");
        //just in case below code does not get executed 
        //give a return statment;
        return ;

    }
    console.log(todos[fetchIndex]);
    todos[fetchIndex]={...todos[fetchIndex],...body};
    console.log(todos[fetchIndex]);
    res.status(201).send("Update attribute");
});

app.delete("/delete/:id",(req,res)=>{
    const {params:{id}}=req;
    console.log(id);
    const parsedID=parseInt(id);
    console.log(parsedID);
    let fetchIndex;
    for(let i=0;i<todos.length;i++)
    {
        if(parsedID===todos[i].id)
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
        res.status(400).send("Invalid todo id");
        //just in case below code does not get executed 
        //give a return statment;
        return ;

    }
    todos.splice(fetchIndex,1);//Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
    console.log(todos);
    // @param start — The zero-based location in the array from which to start removing elements.
    
    // @param deleteCoun
    res.status(204).send("deleted");
});
app.listen(port,()=>{
    console.log("Server is running");
});