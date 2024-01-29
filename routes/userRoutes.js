import express from "express";
import {
  getPrivateProfile,
  login,
  register,
  uploadCoverImage,
  uploadProfilePicture,
} from "../controllers/userCtrl.js";
import isLoggin from "../middlewares/isLoggin.js";
import storage from "../utils/fileUpload.js";
import multer from "multer";

const usersRouter = express.Router();

//!file upload middleware
const upload = multer({ storage });

//! Register
usersRouter.post("/register", register);
usersRouter.post("/login", login);

//! upload Profile image
usersRouter.put(
  "/upload-profile-image",
  isLoggin,
  upload.single("file"),
  uploadProfilePicture
);

//* upload Cover image
usersRouter.put(
  "/upload-cover-image",
  isLoggin,
  upload.single("file"),
  uploadCoverImage
);

//! Get Profile
usersRouter.get("/profile", isLoggin, getPrivateProfile);

export default usersRouter;
