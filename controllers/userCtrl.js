import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";

//! @desc Register a new user
//! @route POST /api/v1/users/register
//! acces public
export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw new Error("User Already Exists");
  }

  const newUser = new User({
    username,
    email,
    password,
  });

  // hash pw
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);

  await newUser.save();

  res.status(201).json({
    status: "success",
    message: "User Register Successfullt",
    _id: newUser?._id,
    username: newUser?.username,
    email: newUser?.email,
    role: newUser?.role,
  });
});

//! login
//! @route POST /api/v1/users/login
//! access public

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User doesnt exist , Please Register");
  }

  const isMatched = await bcrypt.compare(password, user?.password);
  if (!isMatched) {
    throw new Error("Invalid login credentials");
  }

  user.lastLogin = new Date();

  await user.save();

  res.json({
    status: "success",
    email: user?.email,
    username: user?.username,
    _id: user?._id,
    role: user?.role,
    token: generateToken(user),
    isVerified: user?.isVerified,
    profilePicture: user?.profilePicture,
  });
});

//@desc Upload profile picture
//@route PUT /api/v1/users/upload-profile-image
//@access Private
export const uploadProfilePicture = asyncHandler(async (req, res) => {
  const userFound = await User.findById(req?.userAuth?._id);

  if (!userFound) {
    throw new Error("User not found");
  }

  const user = await User.findByIdAndUpdate(
    req?.userAuth?._id,
    {
      $set: { profilePicture: req?.file?.path },
    },
    {
      new: true,
    }
  );
  res.json({
    status: "success",
    message: "User profile image updated successfully",
    user,
  });
});

//!@desc Upload cover picture
//!@route PUT /api/v1/users/upload-cover-image
//!@access Private

export const uploadCoverImage = asyncHandler(async (req, res) => {
  const userFound = await User.findById(req?.userAuth?._id);
  if (!userFound) {
    throw new Error("User not found");
  }

  const user = await User.findByIdAndUpdate(
    req?.userAuth?._id,
    {
      $set: { coverImage: req?.file?.path },
    },
    {
      new: true,
    }
  );

  //send the response
  res.json({
    status: "success",
    message: " Cover image updated successfully",
    user,
  });
});

//? @desc Get Private picture
//? @route PUT /api/v1/users/profile
//? @access Private

export const getPrivateProfile = asyncHandler(async (req, res) => {
  //get user id
  const id = req.userAuth._id;
  const user = await User.findById(id).populate({
    path: "content",
    model: "Content",
  }).select("-password")

  res.json({
    status: "success",
    message: "Profile fetched Successfully",
    user,
  });
});
