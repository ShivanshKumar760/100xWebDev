// var express = require('express');
// var router = express.Router();
import express from "express";
import {Router} from "express";
import { createProjectController, deleteProjectController, getProjectsController, getSingleProjectController, updateProjectController } from "../controller/project.controller.js";



/* GET home page. */

const router=Router();


router.post("/createProject",createProjectController);
router.post("/getProjects",getProjectsController);
router.post("/deleteProject",deleteProjectController);
router.post("/getProject",getSingleProjectController);
router.post("/updateProject",updateProjectController);


export default router;
