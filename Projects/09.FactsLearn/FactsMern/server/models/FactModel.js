import mongoose from "mongoose";
import FactCollectionSchema from "../schema/FactCollectionSchema.js";

const Facts=mongoose.model("Facts",FactCollectionSchema);

export default Facts;