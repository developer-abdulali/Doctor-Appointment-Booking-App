// import jwt from "jsonwebtoken";

// const userAuth = (req, res, next) => {
//   try {
//     const { token } = req.headers;

//     // Check if the token is missing
//     if (!token) {
//       return res.json({
//         success: false,
//         message: "Not Authorized, Login again.",
//       });
//     }

//     // Decode and verify the token
//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//     req.body.userId = token_decode.id;
//     next();
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// export default userAuth;

import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    // Check if the Authorization header is missing
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.json({
        success: false,
        message: "Authorization header missing, login again.",
      });
    }

    // Extract the token from the Authorization header
    const token = authorization.split(" ")[1];

    // Decode and verify the token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Attach userId to req object (using req.user or req.userId)
    req.userId = token_decode.id;

    // console.log("User ID from middleware:", req.userId);

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default userAuth;
