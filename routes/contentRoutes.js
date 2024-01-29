import express from "express";
import {
  createContent,
  deleteContent,
  getContents,
  getPublicContent,
  getSingleContent,
  updateContent,
} from "../controllers/contentCtrl.js";
import isLoggin from "../middlewares/isLoggin.js";
import multer from "multer";
import storage from "../utils/fileUpload.js";

const contentRouter = express.Router();

//!file upload middleware
const upload = multer({ storage });

//! Content create
contentRouter.post(
  "/create-content",
  isLoggin,
  upload.single("file"),
  createContent
);

//? get public content (only 4 content)
contentRouter.get("/public", getPublicContent);

//* get All content
contentRouter.get("/all-content", isLoggin, getContents);

// delete  content
contentRouter.delete("/:id", isLoggin, deleteContent);

//! Update  content
contentRouter.put("/:id", isLoggin, upload.single("file"), updateContent);


//? get single Content
contentRouter.get('/:id', getSingleContent)


export default contentRouter;
