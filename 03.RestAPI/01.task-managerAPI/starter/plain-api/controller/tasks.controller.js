import taskCollection from "../models/task_schema.js";
const getAllTasks=async (req,res)=>{
    try{
        const taskCollection_array=await taskCollection.find();
        res.status(200).json({tasks:taskCollection_array});
    }catch(error)
    {
        console.log(error);
        res.status(500).json({msg:"Sorry could not fetch all the tasks!"});
    }
    // res.json({msg:"Welcome the get route controller"});
};

const createTask=async (req,res)=>{
    const {body}=req;
    console.log(body);
    const newTask=new taskCollection(body);
    try{
        const createdTask=await taskCollection.create(newTask);
        console.log(createdTask);
        res.status(201).json({tasks:createdTask});
    }catch(error)
    {
        console.log(error);
        res.status(500).json({msg:"Sorry could not create the task!"});
    }
};

const getPerticularTask=async(req,res)=>{
    const {params:{_id}}=req;
    console.log(req.params);
    try{
        const fetchedTask=await taskCollection.findById(_id);
        if(!fetchedTask)
        {
            return res.status(401).json({msg:"No task found with that _id"});
        }
        console.log(fetchedTask);
        res.status(200).json({task:fetchedTask});
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({msg:"Sorry could not fetch  the given _id task!"});
    }
};

const patchTask=async (req,res)=>{
    const{_id:taskID}=req.params;
    console.log(taskID);
    try{
        const patchTask=await taskCollection.findByIdAndUpdate(taskID,{$set:req.body},{new:true});
        console.log(patchTask);
        res.status(200).json({ task:patchTask });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({msg:"Sorry could not patch  the given _id task!"});
    }
    // res.json({msg:"This is the patch controller to fix specific task"});

};

const deleteTask=async (req,res)=>{
    const { _id: taskID } = req.params
    console.log(taskID);
    try{
        const deletedTask = await taskCollection.findByIdAndDelete(taskID);
        console.log(deletedTask)
        res.status(200).json({ task:deletedTask })
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({msg:"Sorry could not delete  the given _id task!"});
    }
    

};
export {getAllTasks,createTask,getPerticularTask,patchTask,deleteTask};