import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.json({
        success: false,
        message: "Authorization header missing, login again.",
      });
    }

    const token = authorization.split(" ")[1];

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = token_decode.id;

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default userAuth;
