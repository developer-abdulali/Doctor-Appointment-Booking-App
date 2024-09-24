import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "You are not authenticated" });

    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded)
      return res.status(401).json({ success: false, message: "Invalid token" });

    req.id = decoded.userId;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
