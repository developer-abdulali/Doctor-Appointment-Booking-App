// import validator from "validator";
// import bcrypt from "bcrypt";
// import { v2 as cloudinary } from "cloudinary";
// import doctorModel from "../models/doctorModel.js";
// import jwt from "jsonwebtoken";

// // api for add a new doctor
// export const addDoctor = async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       password,
//       speciality,
//       degree,
//       experience,
//       about,
//       fees,
//       address,
//     } = req.body;
//     const imgfile = req.file;

//     if (
//       !imgfile ||
//       !name ||
//       !email ||
//       !password ||
//       !speciality ||
//       !degree ||
//       !experience ||
//       !about ||
//       !fees ||
//       !address
//     ) {
//       res.json({ success: false, message: "Please fill all fields" });
//     }

//     // validate the email format
//     if (!validator.isEmail(email)) {
//       return res.json({ success: false, message: "Invalid email format" });
//     }

//     // validate the password
//     if (
//       !validator.isStrongPassword(password, {
//         minLength: 8,
//         minLowercase: 1,
//         minUppercase: 1,
//         minNumbers: 1,
//         minSymbols: 1,
//       })
//     ) {
//       res.json({
//         success: false,
//         message:
//           "Password must be at least 8 characters long, contain a mix of uppercase and lowercase letters, numbers, and symbols",
//       });
//     }

//     // hashing the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // uploading the image to cloudinary
//     const imgUpload = await cloudinary.uploader.upload(imgfile.path, {
//       resource_type: "image",
//     });

//     const imgUrl = imgUpload.secure_url;

//     // create a new doctor document
//     const doctor = {
//       name,
//       email,
//       image: imgUrl,
//       password: hashedPassword,
//       speciality,
//       degree,
//       experience,
//       about,
//       fees,
//       address,
//       address: JSON.parse(address),
//       date: Date.now(),
//     };

//     const newDoctor = new doctorModel(doctor);
//     await newDoctor.save();

//     res.json({ success: true, message: "Doctor Added Successfully" });
//   } catch (error) {
//     console.log(error);
//     res.json({ message: error.message });
//   }
// };

// // api for admin login
// export const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if email or password is missing
//     if (!email || !password) {
//       return res.json({ success: false, message: "Please fill all fields" });
//     }

//     // Check if email and password match the admin credentials
//     if (
//       email === process.env.ADMIN_EMAIL &&
//       password === process.env.ADMIN_PASSWORD
//     ) {
//       const token = jwt.sign({ email }, process.env.JWT_SECRET, {
//         expiresIn: "1h",
//       });

//       return res.json({
//         success: true,
//         message: "Admin logged in successfully",
//         token,
//       });
//     } else {
//       return res.json({ success: false, message: "Invalid email or password" });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.json({ message: error.message });
//   }
// };

import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";

// api for add a new doctor
export const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imgfile = req.file;

    if (
      !imgfile ||
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: "Please fill all fields" });
    }

    // validate the email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }

    // validate the password
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

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // uploading the image to cloudinary
    const imgUpload = await cloudinary.uploader.upload(imgfile.path, {
      resource_type: "image",
    });

    const imgUrl = imgUpload.secure_url;

    // parse the address field
    let parsedAddress;
    try {
      parsedAddress = JSON.parse(address);
    } catch (error) {
      return res.json({ success: false, message: "Invalid address format" });
    }

    // create a new doctor document
    const doctor = {
      name,
      email,
      image: imgUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: parsedAddress,
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctor);
    await newDoctor.save();

    return res.json({
      success: true,
      message: "Doctor Added Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
// export const addDoctor = async (req, res) => {
//   try {
//     console.log("Request Body:", req.body);
//     console.log("Request File:", req.file);

//     const {
//       name,
//       email,
//       password,
//       speciality,
//       degree,
//       experience,
//       about,
//       fees,
//       address,
//     } = req.body;
//     const imgfile = req.file;

//     if (
//       !imgfile ||
//       !name ||
//       !email ||
//       !password ||
//       !speciality ||
//       !degree ||
//       !experience ||
//       !about ||
//       !fees ||
//       !address
//     ) {
//       return res.json({ success: false, message: "Please fill all fields" });
//     }

//     // validate the email format
//     if (!validator.isEmail(email)) {
//       return res.json({ success: false, message: "Invalid email format" });
//     }

//     // validate the password
//     if (
//       !validator.isStrongPassword(password, {
//         minLength: 8,
//         minLowercase: 1,
//         minUppercase: 1,
//         minNumbers: 1,
//         minSymbols: 1,
//       })
//     ) {
//       return res.json({
//         success: false,
//         message:
//           "Password must be at least 8 characters long, contain a mix of uppercase and lowercase letters, numbers, and symbols",
//       });
//     }

//     // hashing the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // uploading the image to cloudinary
//     const imgUpload = await cloudinary.uploader.upload(imgfile.path, {
//       resource_type: "image",
//     });

//     const imgUrl = imgUpload.secure_url;

//     // create a new doctor document
//     const doctor = {
//       name,
//       email,
//       image: imgUrl,
//       password: hashedPassword,
//       speciality,
//       degree,
//       experience,
//       about,
//       fees,
//       address: JSON.parse(address),
//       date: Date.now(),
//     };

//     const newDoctor = new doctorModel(doctor);
//     await newDoctor.save();

//     return res.json({
//       success: true,
//       message: "Doctor Added Successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.json({ success: false, message: error.message });
//   }
// };

// api for admin login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email or password is missing
    if (!email || !password) {
      return res.json({ success: false, message: "Please fill all fields" });
    }

    // Check if email and password match the admin credentials
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.json({
        success: true,
        message: "Admin logged in successfully",
        token,
      });
    } else {
      return res.json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
