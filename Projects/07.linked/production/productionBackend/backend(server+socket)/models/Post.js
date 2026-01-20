import mongoose from "mongoose";
import PostSchema from "../schemas/postsSchema.js";

const Post=mongoose.model("Posts",PostSchema);

export default Post;