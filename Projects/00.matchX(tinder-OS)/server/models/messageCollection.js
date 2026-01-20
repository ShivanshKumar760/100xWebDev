import mongoose from "mongoose";
import messageSchema from "../schema/messageSchema.js";
const messageCollection=mongoose.model("Messages",messageSchema);

export default messageCollection;