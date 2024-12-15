import taskCollection from "../models/task_schema.js";
import asyncWrapper from "../middleware/async.js";
import { createCustomError } from "../error/errorClasss.js";
const getAllTasks=asyncWrapper(async (req,res)=>{

        const taskCollection_array=await taskCollection.find();
        res.status(200).json({tasks:taskCollection_array});
    // res.json({msg:"Welcome the get route controller"});
});

const createTask=asyncWrapper(async (req,res)=>{
    const {body}=req;
    console.log(body);
    const newTask=new taskCollection(body);

    const createdTask=await taskCollection.create(newTask);
    console.log(createdTask);
    res.status(201).json({tasks:createdTask});
  
});

const getPerticularTask=asyncWrapper(async(req,res,next)=>{
    const {params:{_id}}=req;
    console.log(req.params);
    
    const fetchedTask=await taskCollection.findById(_id);
    if(!fetchedTask)
    {
        return next(createCustomError("No task found with that _id",404));
        // return res.status(401).json({msg:"No task found with that _id"});
    }
    console.log(fetchedTask);
    res.status(200).json({task:fetchedTask});

});

const patchTask=asyncWrapper(async (req,res)=>{
    const{_id:taskID}=req.params;
    console.log(taskID);

    const patchTask=await taskCollection.findByIdAndUpdate(taskID,{$set:req.body},{new:true});
    if (!patchTask) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
    console.log(patchTask);
    res.status(200).json({ task:patchTask });


    // res.json({msg:"This is the patch controller to fix specific task"});
});

const deleteTask=asyncWrapper(async (req,res)=>{
    const { _id: taskID } = req.params
    console.log(taskID);

    const deletedTask = await taskCollection.findByIdAndDelete(taskID);
    if (!deleteTask) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
    console.log(deletedTask)
    res.status(200).json({ task:deletedTask })
 
    

});
export {getAllTasks,createTask,getPerticularTask,patchTask,deleteTask};