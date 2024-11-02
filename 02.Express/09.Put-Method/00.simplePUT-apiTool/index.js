import express from "express";
const app=express();
const port=3000;
const userDB=[];
app.use(express.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.send("This is home page ,Welcome to home page");
});

app.post("/postUser",(req,res)=>{
    // const {body:{name,age}}=req;
    const {body}=req;
    const id=userDB.length+1;
    const newUser={id:id,...body};
    userDB.push(newUser);
    res.status(201).send("User created");
});

app.get("/getUser",(req,res)=>{
    res.status(200).json(userDB);
});


//put method

app.put("/update/:id",(req,res)=>{
    const {body,params:{id}}=req;
    let parsedID=parseInt(id);
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
        res.status(404).send("Invalid user id");
    }
    else{
        userDB[returnedIndex]={id:parsedID,...body};
        res.status(200).send("Updated");
    }


});


app.listen(port,()=>{
    console.log("Server Running");
});
