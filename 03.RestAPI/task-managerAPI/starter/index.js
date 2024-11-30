import express from "express";
import taskRouter from "./routes/task_route.js";
const app=express();
const port=3000;


// app.get("/",async (req, res) => {
//     const tasks = await Task.find({})
//     res.status(200).json({ tasks })
// });

app.use("/",taskRouter);

app.listen(port,()=>{
    console.log("Server is running!");
})