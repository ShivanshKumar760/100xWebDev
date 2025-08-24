import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'must provide name'],
      trim: true,
      maxlength: [40, 'name can not be more than 20 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  })

const taskCollection=mongoose.model("Tasks",TaskSchema);
export default taskCollection;