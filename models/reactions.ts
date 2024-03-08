import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ReactionSchema = new Schema({
  like: { type: Number },
  love: { type: Number },
  haha: { type: Number },
  sad: { type: Number },
  angry: { type: Number },
});

const Reaction = mongoose.model("Reaction", ReactionSchema);

export default Reaction;
