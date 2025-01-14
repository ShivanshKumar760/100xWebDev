import bcrypt from "bcrypt";
import User from "../models/User.js";


//get user:

const getUserController=async (req,res)=>{
    // const {id}=req.params;
    const {username,userId}=req.query
    // console.log("Request user id is:",id);
    try {
        const user=userId?await User.findById(userId):await User.findOne({username:username});
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (error) {
        console.log(error);
        console.log("Oops sorry could not retrive the user data");
        return res.status(500).json(err);
    }
};

//delete user:

const deleteUserController=async (req,res)=>{
    const {id}=req.params;
    console.log("Request user id is:",id);
    if (req.body.userId === req.params.id || req.body.isAdmin) 
    {
        try 
        {
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json("Account has been deleted");
        } 
        catch (err) {
        console.log(err);
        console.log("Oops sorry could not delete the user data");   
        return res.status(500).json(err);
        }
    } 
    else {
        return res.status(403).json("You can delete only your account!");
    }
};

//update user

const putUserDetailController=async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) 
    {
        if (req.body.password) 
        {
            try 
            {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
            } 
            catch (err) 
            {
            return res.status(500).json(err);
            }
        }
        try 
        {
            const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body});
            res.status(200).json("Account has been updated");
        } 
        catch (err) 
        {
            return res.status(500).json(err);
        }
    } 
    else {
      return res.status(403).json("You can update only your account!");
    }
};


//follow a user api /updating mine ie the current user and followed user following :


const followUserController=async (req, res) => {
    if (req.body.userId !== req.params.id) //if current user is not equal to user id
    //who the current user want to follow then
    {
      try {
        const user = await User.findById(req.params.id);//fetch the user we want to follow
        const currentUser = await User.findById(req.body.userId);//fetch our data
        if (!user.followers.includes(req.body.userId)) 
        {//check if  the user  we want to
        //follow is already followed by us and if not then

            //update the user we followed by updating there follower list
          await user.updateOne({ $push: { followers: req.body.userId } });

          //and update our following list
          await currentUser.updateOne({ $push: { followings: req.params.id } });
          res.status(200).json("user has been followed");
        } 
        else 
        {
          res.status(403).json("you allready follow this user");
        }
      } 
      catch (err) 
      {
        console.log(err);
        console.log("Oops following operation failed pls try again!");
        res.status(500).json(err);
        }
    } 
    else {
      res.status(403).json("you cant follow yourself");
    }
  };

  //unfollow a user :

  const unfollowUserController=async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json("user has been unfollowed");
        } else {
          res.status(403).json("you dont follow this user");
        }
      } catch (err) {
        console.log(err);
        console.log("Oops sorry the unfollow operation failed");
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant unfollow yourself");
    }
  };


const getAllFriendsController=async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList)
  } catch (err) {
    console.log(err);
    console.log("Oops sorry finding friends operation failed");
    res.status(500).json(err);
  }
};

export  {getUserController,deleteUserController,putUserDetailController,
    followUserController,unfollowUserController,getAllFriendsController
};