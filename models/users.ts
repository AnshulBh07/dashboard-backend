import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String },
    username: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: Date },
    gender: { type: String },
    profile_pic: { type: String },
    cover_pic: { type: String },
    bio: { type: String },
    location: { type: String },
    education: { type: String },
    work_exp: { type: String },
    relationship_status: { type: String },
    interests: { type: [String] },
    hobbies: { type: [String] },
    friend_list: [{ type: Schema.Types.ObjectId, ref: "User" }], // Array of references to UserSchema
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
