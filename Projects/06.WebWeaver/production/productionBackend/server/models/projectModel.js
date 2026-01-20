import mongoose from "mongoose";
import projectSchema from "../schemas/projectSchema.js";
const projectModel=mongoose.model("Project", projectSchema);

export default projectModel;