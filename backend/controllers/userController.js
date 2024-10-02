import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

// regiter the user
export const regiterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Please fill all fields" });
    }

    // check if password is strong
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return res.json({
        success: false,
        message:
          "Password must be at least 8 characters long, contain a mix of uppercase and lowercase letters, numbers, and symbols",
      });
    }

    // check if email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already exists" });
    }

    // validate the email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user document
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    // save the user to the database
    const user = await newUser.save();

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // return success message and token
    res.json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// login the user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.json({ success: false, message: "Please fill all fields" });
    }

    // check if email already exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doest not" });
    }

    // validate the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // return success message and token
    res.json({ success: true, message: "User logged in successfully", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// get user profile

export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
