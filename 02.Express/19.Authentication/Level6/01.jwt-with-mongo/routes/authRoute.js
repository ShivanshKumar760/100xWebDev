import express from "express";
import { Router } from "express";
import { signup_get,signup_post,login_get,login_post,logout_get } from "../controllers/auth.controller.js";

const router=Router();
// console.log(router);
router.route("/signup").get(signup_get).post(signup_post);


router.route("/login").get(login_get).post(login_post);

router.get("/logout",logout_get);

export default router;