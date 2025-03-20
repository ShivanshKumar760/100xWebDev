import express from "express"
import cors from "cors"
const app=express();
const port=3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

const inMem=[];

app.get("/events",(req,res)=>{
    res.send(inMem);
});

app.post("/create-event",(req,res)=>{
    const id=inMem.length;
    const currentTimeStamp=new Date().getTime();
    const date=new Date().getDate();
    const {title,description}=req.body;
    const newEvent={title,description,id,date,currentTimeStamp};
    inMem.push(newEvent);
    res.json({msg:"Event created successfully"});
});


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});