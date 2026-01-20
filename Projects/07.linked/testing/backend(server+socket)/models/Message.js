import mongoose from "mongoose";
import messageSchema from "../schemas/messsageSchema.js";

const Message=mongoose.model("Message", messageSchema);

export default Message;