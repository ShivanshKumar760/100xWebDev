import { Router } from "express";
import __dirname from "../dir.js";
const home=Router();

home.get("/",(req,res)=>{
    res.sendFile("public/index.html",{root:__dirname});
});

export default home;