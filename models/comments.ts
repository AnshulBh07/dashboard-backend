import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  comment_id: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Number,
    required: true,
  },
  username: { type: String, required: true },
  comment_text: { type: String, required: true },
  timestamp: { type: Date },
  parent_comment: { type: Number },
});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
