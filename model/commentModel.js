import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Content",
    },
  },
  {
    timestamps: true,
  }
);


const Comment = mongoose.model("Comment", commentSchema)

export default Comment