// import { User } from "../modals/userModal.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// const { sign } = jwt;

// // register the user
// export const register = async (res, req) => {
//   try {
//     const { fullname, email, phoneNumber, password, role } = req.body;

//     // validate the user inputs
//     if (!fullname || !email || !phoneNumber || !password) {
//       return res
//         .status(400)
//         .json({ success: false, message: "All fields are required" });
//     }
//     // check if the email already exists
//     const user = await User.findOne({ email });
//     if (user) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Email already exists" });
//     }

//     // hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // create a new user
//     await User.create({
//       fullname,
//       email,
//       phoneNumber,
//       password: hashedPassword,
//       role,
//     });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(400)
//       .json({ success: false, message: "Error creating user" });
//   }
// };

// // login the user
// export const login = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;

//     // validate the user inputs
//     if (!email || !role || !password) {
//       return res
//         .status(400)
//         .json({ success: false, message: "All fields are required" });
//     }

//     // check if the email exists
//     let user = await User.findOne({ email });
//     if (!user) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Incorrect email or password" });
//     }

//     // comparing the password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Incorrect email or password" });
//     }

//     // check role is correct
//     if (role !== user.role) {
//       return res
//         .status(403)
//         .json({ success: false, message: "You don't have the required role" });
//     }

//     const tokenData = { userId: user._id };

//     // generate token
//     const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
//       expiresIn: "1d",
//     });

//     user = {
//       _id: user.id,
//       fullname: user.fullname,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       role: user.role,
//       profile: user.profile,
//     };

//     // Send the token in a cookie and return user data
//     return res
//       .status(200)
//       .cookie("token", token, {
//         maxAge: 1 * 24 * 60 * 60 * 1000,
//         httpOnly: true,
//         sameSite: "strict",
//       })
//       .json({ success: true, user });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Error logging in the user" });
//   }
// };

// // login the user
// export const logout = async (req, res) => {
//   try {
//     return res.status(200).cookie("token", "", { maxAge: 0 }).json({
//       success: true,
//       message: "User logged out successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Error logging out the user" });
//   }
// };

// // update the profile
// export const updateProfile = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, bio, skills } = req.body;
//     const file = req.file;

//     // validate the user inputs
//     if (!fullname || !email || !phoneNumber || !password || !bio || !skills) {
//       return res
//         .status(400)
//         .json({ success: false, message: "All fields are required" });
//     }

//     // cloudinary setup here...

//     let skillsArray = skills.split(",");
//     const userId = req.id;
//     let user = await User.findById(userId);

//     // check existing user
//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     //update the user
//     (user.fullname = fullname),
//       (user.email = email),
//       (user.phoneNumber = phoneNumber),
//       (user.bio = bio),
//       (user.skills = skillsArray);

//     // resume will be here...

//     await user.save();

//     user = {
//       _id: user.id,
//       fullname: user.fullname,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       role: user.role,
//       profile: user.profile,
//     };

//     return res
//       .status(200)
//       .json({ success: true, message: "Profile updated successfully", user });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Error updating the profile" });
//   }
// };

import { User } from "../modals/userModal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Default import
const { sign } = jwt; // Destructure 'sign' from the jwt object

// register the user
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    // validate the user inputs
    if (!fullname || !email || !phoneNumber || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    // check if the email already exists
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Error creating user" });
  }
};

// login the user
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // validate the user inputs
    if (!email || !role || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // check if the email exists
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });
    }

    // comparing the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });
    }

    // check role is correct
    if (role !== user.role) {
      return res
        .status(403)
        .json({ success: false, message: "You don't have the required role" });
    }

    const tokenData = { userId: user._id };

    // generate token
    const token = sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user.id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    // Send the token in a cookie and return user data
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error logging in the user" });
  }
};

// logout the user
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error logging out the user" });
  }
};

// update the profile
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    // validate the user inputs
    if (!fullname || !email || !phoneNumber || !bio || !skills) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // cloudinary setup here...

    let skillsArray = skills.split(",");
    const userId = req.id; // Ensure you use req.userId or similar to get the user id correctly
    let user = await User.findById(userId);

    // check existing user
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    //update the user
    user.fullname = fullname;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.bio = bio;
    user.skills = skillsArray;

    // resume will be here...

    await user.save();

    user = {
      _id: user.id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .json({ success: true, message: "Profile updated successfully", user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error updating the profile" });
  }
};
