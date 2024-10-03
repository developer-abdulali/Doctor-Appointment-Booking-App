import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  try {
    const { token } = req.headers;

    // Check if the token is missing
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized, Login again.",
      });
    }

    // Decode and verify the token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default userAuth;
