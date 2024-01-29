import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const payload = {
    user: {
      id: user.id,
    },
  };

  //! sign the token with secret key
  const token = jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: 36000,
  });

  return token;
};

export default generateToken;
