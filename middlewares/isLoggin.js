import Jwt from "jsonwebtoken";
import User from "../model/userModel.js";

const isLoggin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  //! verify
  Jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
    const userId = decoded?.user?.id;
    const user = await User.findById(userId).select("username email role _id");

    req.userAuth = user;

    if (err) {
      const err = new Error("Token expired/Invalid");
      next(err);
    } else {
      next();
    }
  });
};

export default isLoggin;
