import express from "express";
import { createComment } from "../controllers/commentCtrl.js";
import isLoggin from "../middlewares/isLoggin.js";

const commentRouter = express.Router();

//! create comment
commentRouter.post("/:contentId",isLoggin, createComment);

export default commentRouter;
