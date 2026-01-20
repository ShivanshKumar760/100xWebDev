import express from "express";
import {
     createPostController,deletePostController,
     patchPostController_Like_dislike,updatePostController ,
     getPostController,getTimeLineController,
     getUserProfileController
} from "../controllers/posts.controller.js";


const router=express.Router();
router.post("/", createPostController);
//update a post
router.put("/:id", updatePostController);

//delete a post
router.delete("/:id", deletePostController);
  
//like / dislike a post
router.put("/:id/like",patchPostController_Like_dislike);
  
//get a post
router.get("/:id",getPostController);
  
//get timeline posts
router.get("/timeline/:userId", getTimeLineController);

router.get("/profile/:username",getUserProfileController);

export default router;