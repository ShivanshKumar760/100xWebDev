import express from "express";
import { Router } from "express";
import { getAllTasks,createTask,getPerticularTask,patchTask,deleteTask} from "../controller/tasks.controller.js";
const taskRouter=Router();

taskRouter.route("/api/v1/tasks").get(getAllTasks).post(createTask);
taskRouter.route("/api/v1/tasks/:id").get(getPerticularTask).patch(patchTask).delete(deleteTask);

export default taskRouter;