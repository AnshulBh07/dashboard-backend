import mongoose from "mongoose";
import Reaction from "./reactions";
import Comment from "./comments";
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  post_id: {
    type: String,
    required: true,
    unique: true,
  },
  username: { type: String, required: true },
  post_content: { type: String },
  media_type: { type: String },
  media: { type: String },
  timestamp: { type: Date },
  likes: { type: Number, required: true },
  comments: [Comment.schema],
  reactions: Reaction.schema,
  link_click: { type: Number, required: true },
  views: { type: Number, required: true },
  shares: { type: Number, required: true },
});

const Post = mongoose.model("Posts", PostSchema);

export default Post;
