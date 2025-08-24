import Post from "../models/Post.js";
import User from "../models/User.js";
//create a new post
const createPostController=async (req,res)=>{
    const newPost = new Post(req.body);
    try {
        const savedPost=await Post.create(newPost);
        res.status(200).json(savedPost);
    } catch (error) {
        console.log(error);
        console.log("Oops error occured while creating new post!");
        return res.status(500).json(error);
    }
};

//update entire post
const updatePostController=async (req,res)=>{
    const {id}=req.params;//posts id
    console.log("Post id from which request is comming:",id);
    try {
        const foundPost=await Post.findById(id);
        if (foundPost.userId === req.body.userId) 
        {
            await foundPost.updateOne({ $set: req.body });
            res.status(200).json("the post has been updated");
        }
        else{
           res.status(403).json("you can update only your post");
        }
    } catch (error) {
        console.log(error);
        console.log("Oops error occured while updating entire post");
       return  res.status(500).json(error);
    }
};

//delete post
const deletePostController=async (req,res)=>{
    const {id}=req.params;//posts id
    console.log("Post id from which request is comming:",id);
    try {
        const deletingPost=await Post.findById(id);
        if(req.body.userId===deletingPost.userId)
        {
            await deletingPost.deleteOne();
            res.status(200).json("the post has been deleted");
        }
        else{
            res.status(403).json("you can delete only your post");
        }
    } catch (error) {
        console.log(error);
        console.log("Oops error occured while deleting a post");
        return res.status(500).json(err);
    }
};


//this below route is for liking and disliking other people post
const patchPostController_Like_dislike=async (req,res)=>{//here we will fetch post of our friends
    const {id}=req.params;//post id
    console.log("Post id from which request is comming:",id);
    try {
        const post=await Post.findById(id);//this returns the all post of a user we click 
        //in a array suppose user is "Mike"

        if (!post.likes.includes(req.body.userId))//suppose current user who is visiting
        //mike profile is "Jeff" it will check if jeff is already present in the like list 
        //if not it will add 
        {
            await post.updateOne({ $push: { likes: req.body.userId } });
           res.status(200).json("The post has been liked");
        }
        else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
           res.status(200).json("The post has been disliked");
        }
        

    } catch (error) {
        console.log(error);
        console.log("Oops error occured while updating likes/dislike of post");
        return res.status(500).json(error);
    }
};


//get a post

const getPostController=async (req,res)=>{//gee a single post
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
      } catch (err) {
        console.log(err);
        console.log("Oops error occured while while geeting post")
        return res.status(500).json(err);
      }
};


//get all time line controller

const getTimeLineController=async (req,res)=>{
    console.log("Current user id is :",req.params.userId);
    try {
        const currentUser = await User.findById(req.params.userId);//we will fetch our detail
        const userPosts = await Post.find({ userId: currentUser._id });//our posts
        const friendPosts = await Promise.all(//we will fetch our frends post
          currentUser.followings.map((friendId) => {
            return Post.find({ userId: friendId });
          })
        );
        res.status(200).json(userPosts.concat(...friendPosts))//and concat our friend post with us
      } catch (err) {
        console.log(err);
        console.log("Oops error occured while while geeting timeline")
        res.status(500).json(err);
      }
};


export {
    createPostController,updatePostController,
    deletePostController,patchPostController_Like_dislike,
    getPostController,getTimeLineController
};