import express from "express";
import {Router} from "express";
import { getUserDetailController, loginController, signUpController } from "../controller/user.controller.js";



/* GET home page. */

const router=Router();


router.post("/signup",signUpController);
router.post("/login",loginController);
router.post("/getUserDetails",getUserDetailController);


export default router;
