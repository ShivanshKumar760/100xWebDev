import taskCollection from "../models/task_schema.js";
const getAllTasks=(req,res)=>{
    taskCollection.find().then((taskCollection_array)=>
    {
        res.json(taskCollection_array);
    })
    // res.json({msg:"Welcome the get route controller"});
};

const createTask=(req,res)=>{
    res.json({msg:"This is post controller for adding task"});
};

const getPerticularTask=(req,res)=>{
    res.json({msg:"This is the get controller to get specific task"});
};

const patchTask=(req,res)=>{
    res.json({msg:"This is the patch controller to fix specific task"});

};

const deleteTask=(req,res)=>{
    res.json({msg:"This is the delete controller to delete specific task"});

};
export {getAllTasks,createTask,getPerticularTask,patchTask,deleteTask};