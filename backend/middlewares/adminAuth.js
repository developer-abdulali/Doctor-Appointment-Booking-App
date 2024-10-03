import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) {
      return res.json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      return res.json({ success: false, message: "Invalid token" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
