import Content from "../model/contentModel.js";
import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";

//! Create Content
//! @route POST /api/v1/content/create-content
//! access private

export const createContent = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    contentType,
    difficultyLevel,
    targetAudience,
    status,
    tags,
  } = req.body;
  const newContent = new Content({
    title,
    description,
    contentType,
    difficultyLevel,
    status,
    targetAudience,
    tags,
    author: req.userAuth._id,
    image: req?.file?.path,
  });
  

  //check if content exists
  // const contentFound = await Content.findOne({ title });
  // if (contentFound) {
  //   throw new Error("Content already exists");
  // }

  const savedContent = await newContent.save();

  await User.findByIdAndUpdate(
    req?.userAuth?._id,
    {
      $push: { content: savedContent._id },
    },
    {
      new: true,
    }
  );

  console.log("Request body:", req.body);
console.log("Content Type:", req.body.contentType);
console.log("Status:", req.body.status);

  // response
  res.json({
    status: "success",
    message: "Content created successfully",
    content: savedContent,
  });
});

//* get only 4 Content
//* @route POST /api/v1/content/public
//*  access Public

export const getPublicContent = asyncHandler(async (req, res) => {
  const content = await Content.find({}).sort({ createdAt: -1 }).limit(4);
  res.status(201).json({
    status: "success",
    message: "Content successfully fetched",
    content,
  });
});

//? Get Content
//? @route Get /api/v1/content/all-content
//? access private

export const getContents = asyncHandler(async (req, res) => {
  const searchTerm = req.query.searchTerm;

  let query = {};

  if (searchTerm) {
    query.title = { $regex: searchTerm, $options: "i" };
  }

  // console.log("Search Term:", searchTerm);
  // console.log("Query Object:", query);

  const content = await Content.find(query).sort({ createdAt: -1 });

  res.status(201).json({
    status: "success",
    message: "Content successfully fetched",
    content,
  });
});

//@desc Get single CONTENT
//@route GET/api/v1/content/:id
//@access Public

export const getSingleContent = asyncHandler(async (req, res) => {
  const singleContent = await Content.findById(req.params.id)
    .populate({
      path: "author",
      select: "username",
    })
    .populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "author",
        select: "username",
      },
    });

  res.status(201).json({
    status: "success",
    message: "Single Content successfully fetched",
    singleContent,
  });
});

//@desc Delete  CONTENT
//@route DELETE/api/v1/content/:id
//@access Private

export const deleteContent = asyncHandler(async (req, res) => {
  const contentFound = await Content.findById(req.params.id);
  const isAuthor =
    req.userAuth?._id?.toString() === contentFound?.author?._id?.toString();
  //   console.log(isAuthor);

  if (!isAuthor) {
    throw new Error("Action denied, you are not the creator of this content");
  }

  await Content.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "success",
    message: "Content deleted successfully",
  });
});

//!@desc Update  CONTENT
//! @route PUT/api/v1/content/:id
//! @access Private

export const updateContent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contentFound = await Content.findById(id);

  if (!contentFound) {
    throw new Error("Content not found");
  }

  const {
    title,
    description,
    contentType,
    difficultyLevel,
    targetAudience,
    tags,
  } = req.body;

  const content = await Content.findByIdAndUpdate(
    id,
    {
      image: req?.file?.path ? req?.file?.path : contentFound?.image,
      title: title ? title : contentFound?.title,
      description: description ? description : contentFound?.description,
      contentType: contentType ? contentType : contentFound?.contentType,
      difficultyLevel: difficultyLevel
        ? difficultyLevel
        : contentFound?.difficultyLevel,
      targetAudience: targetAudience
        ? targetAudience
        : contentFound?.targetAudience,
      tags: tags ? tags : contentFound?.tags,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(201).json({
    status: "success",
    message: "Content successfully updated",
    content,
  });
});



