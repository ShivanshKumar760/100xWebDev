import express, { Router } from "express";
import { getUserController,deleteUserController,
    putUserDetailController,unfollowUserController,
    followUserController,getAllFriendsController
 } from "../controllers/users.controller.js";


const router=Router();

//update user
router.put("/:id", putUserDetailController);
  
//delete user
router.delete("/:id", deleteUserController);
  
//get a user
router.get("/", getUserController);
  
  
//follow a user
  
router.put("/:id/follow", followUserController);
  
//unfollow a user
  
router.put("/:id/unfollow",unfollowUserController);

//get friends:

router.get("/friends/:userId",getAllFriendsController);

export default router;

