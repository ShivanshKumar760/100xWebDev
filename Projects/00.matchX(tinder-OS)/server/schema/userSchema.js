import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
  user_id: { type: String, required: true },
  hashed_password: { type: String, default: null },
  first_name: { type: String},
  last_name: { type: String},
  dob_day: { type: Number},
  dob_month: { type: Number},
  dob_year: { type: Number},
  show_gender: { type: Boolean, default: true },
  gender_identity: { type: String },
  gender_interest: { type: String },
  email: { type: String, required: true, unique: true },
  url: { type: String},
  about: { type: String},
  matches: [
    {
      user_id: { type: String}
    }
  ] // Inline match schema
});

export default userSchema;
