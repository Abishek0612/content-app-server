import asyncHandler from 'express-async-handler';
import Comment from "../model/commentModel.js";
import Content from "../model/contentModel.js";

//! @desc Create a Comment
//! @route POST /api/v1/comments/:contentId
//! @access Private

export const createComment = asyncHandler(async (req, res) => {
  const { message, author } = req.body;

  const contentId = req.params.contentId;

  const comment = await Comment.create({
    message,
    author: req.userAuth._id,
    contentId,
  });
  //?Associate comment to a content
  await Content.findByIdAndUpdate(
    contentId,
    {
      $push: { comments: comment._id },
    },
    {
      new: true,
    }
  );
  console.log('Content ID:', contentId);
console.log('Comment ID:', comment._id);


  res.json({
    status: "success",
    message: "Comment created successfully",
    comment,
  });
});
