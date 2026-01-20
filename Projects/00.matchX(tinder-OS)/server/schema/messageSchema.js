import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
        timestamp: {
          type: Date,
          default: Date.now,  // Sets the default value to the current time
        },
        from_userId: {
          type: String,
          required: true,  // This field is required
        },
        to_userId: {
          type: String,
          required: true,  // This field is required
        },
        message: {
          type: String,
          required: true,  // This field is required
        }
});

export default messageSchema;
