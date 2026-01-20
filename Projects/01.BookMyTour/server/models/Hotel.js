import mongoose from "mongoose";
import hotelSchema from "../schema/hotelSchema.js";
const Hotel=mongoose.model("Hotels", hotelSchema);

export default Hotel;