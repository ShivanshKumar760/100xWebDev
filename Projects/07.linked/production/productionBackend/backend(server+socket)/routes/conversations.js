import { Router } from "express";
import Conversation from "../models/Conversation.js";
import { newConvoPostController ,getConvoForUserController,getUserChatWithOtherUser_Controller} from "../controllers/convo.controller.js";


const router=Router();
//new conv

router.post("/", newConvoPostController);

//get conv of a user

router.get("/:userId",getConvoForUserController );

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", getUserChatWithOtherUser_Controller);


export default router