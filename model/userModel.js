import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
      enum: ["user", "contentCreator"],
      default: "user",
    },

    profilePicture: {
      type: String,
      default: "",
    },
    content: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Content",
      },
    ],

    coverImage: {
      type: String,
      default: "",
    },
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
