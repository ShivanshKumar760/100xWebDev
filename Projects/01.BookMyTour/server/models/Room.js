import mongoose from "mongoose";
import roomSchema from "../schema/roomSchema.js";

const Room=mongoose.model("Rooms", roomSchema);

export default Room;