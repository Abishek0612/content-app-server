import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: {
      type: String,
      required: false,
    },
    description: String,
    contentType: { type: String, required: true },
    difficultyLevel: String,
    targetAudience: String,
    tags: [
      {
        type: String,
        required: true,
      },
    ],

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      // enum: ["pending", "approved", "published"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Content = mongoose.model("Content", contentSchema);
export default Content;
