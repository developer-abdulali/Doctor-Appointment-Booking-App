import jwt from "jsonwebtoken";

const doctorAuth = (req, res, next) => {
  try {
    const { dtoken } = req.headers;

    // Check if the token is missing
    if (!dtoken) {
      return res.json({
        success: false,
        message: "Not Authorized, Login again.",
      });
    }

    // Decode and verify the token
    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
    req.body.docId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default doctorAuth;
