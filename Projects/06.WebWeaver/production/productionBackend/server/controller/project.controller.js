import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import projectModel from "../models/projectModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


const createProjectController=async (req,res)=>{
    const { userId, title } = req.body;
    let user = await userModel.findOne({ _id: userId });
    if (user) {
      let newProject=new projectModel({ title: title,createdBy: userId}); 
      let project = await projectModel.create(newProject);
      return res.json({ success: true, message: "Project created successfully", projectId: project._id });
    }

    else {
        return res.json({ success: false, message: "User not found!" });
    }
};


const getProjectsController=async (req,res)=>{
    const { userId } = req.body;
    const user = await userModel.findOne({ _id: userId });
    if (user) {
      const projects = await projectModel.find({ createdBy: userId });
      return res.json({ success: true, message: "Projects fetched successfully", projects: projects });
    }
    else {
      return res.json({ success: false, message: "User not found!" });
    }
};


const deleteProjectController=async (req,res)=>{
    const {userId, progId} = req.body;
    const user = await userModel.findOne({ _id: userId });
    if (user) {
        const project = await projectModel.findOneAndDelete({ _id: progId });
        return res.json({ success: true, message: "Project deleted successfully" });
    }
    else {
        return res.json({ success: false, message: "User not found!" });
    }

};

const getSingleProjectController=async (req,res)=>{
    const {userId,projId} = req.body;
    const user = await userModel.findOne({ _id: userId });
    if (user) {
        const project = await projectModel.findOne({ _id: projId });
        return res.json({ success: true, message: "Project fetched successfully", project: project });
    }
    else{
        return res.json({ success: false, message: "User not found!" });
    }
};


const updateProjectController=async (req,res)=>{
    let { userId, htmlCode, cssCode, jsCode, projId } = req.body;
    let user = await userModel.findOne({ _id: userId });
  
    if (user) 
    {
        let project = await projectModel.findOneAndUpdate(
        { _id: projId },
        { htmlCode: htmlCode, cssCode: cssCode, jsCode: jsCode },
        { new: true } // This option returns the updated document
      );
  
        if (project) 
        {
            return res.json({ success: true, message: "Project updated successfully" });
        } 
        else {return res.json({ success: false, message: "Project not found!" });}
    } 
    else {
      return res.json({ success: false, message: "User not found!" });
    }
};

export {createProjectController,getProjectsController,deleteProjectController,getSingleProjectController,updateProjectController};