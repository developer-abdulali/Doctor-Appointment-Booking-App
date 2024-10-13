import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

// regiter the user
export const regiterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation
    // if (!name || !email || !password) {
    //   return res.json({ success: false, message: "Please fill all fields" });
    // }

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
    return res.json({
      success: true,
      message: "User registered successfully",
      token,
    });
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
    return res.json({
      success: true,
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// get user profile
export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req;

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

// export const getUserProfile = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     const user = await userModel.findById(userId).select("-password");
//     if (!user) {
//       return res.json({ success: false, message: "User not found" });
//     }
//     res.json({ success: true, user });
//   } catch (error) {
//     console.log(error);
//     return res.json({ success: false, message: error.message });
//   }
// };

// update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { userId, email, name, phone, address, gender, dob } = req.body;
    const imageFile = req.file; // Single image upload, as you are using `upload.single`

    // Check if any data is provided, i.e., at least one field to update
    if (
      !name &&
      !phone &&
      !email &&
      !gender &&
      !dob &&
      !imageFile &&
      !address
    ) {
      return res.json({
        success: false,
        message: "Please provide at least one field to update.",
      });
    }

    // Object to hold fields to update
    const updateFields = {};

    // Add fields to update only if they are provided
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (phone) updateFields.phone = phone;
    if (address) updateFields.address = JSON.parse(address);
    if (dob) updateFields.dob = dob;
    if (gender) updateFields.gender = gender;

    // Update user with provided fields first
    await userModel.findByIdAndUpdate(userId, updateFields);

    // Handle image upload if a file is provided
    if (imageFile) {
      // Upload image to Cloudinary
      const imgUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imgUrl = imgUpload.secure_url;

      // Update user's image field with the new image URL
      await userModel.findByIdAndUpdate(userId, { image: imgUrl });
    }

    res.json({ success: true, message: "User profile updated successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// book the appointment
export const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");

    // check if doctor is available
    if (!docData.available) {
      return res.json({
        success: false,
        message: "Doctor is not available at this time",
      });
    }

    let slots_booked = docData.slots_booked;

    // checking for slots availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({
          success: false,
          message: "Slot not available",
        });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    // Fetch user data
    const userData = await userModel.findById(userId).select("-password");

    // Check if userData is found
    if (!userData) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    // Save the new appointment
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // update doctor slots_booked field
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment booked successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// Get all booked appointments
export const getAllBookedAppointments = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    const appointments = await appointmentModel.find({ userId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// export const getAllBookedAppointments = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     console.log(userId);
//     const appointments = await appointmentModel.find({ userId });

//     res.json({ success: true, appointments });
//   } catch (error) {
//     console.log(error);
//     return res.json({ success: false, message: error.message });
//   }
// };

// cancel the booked appointment
export const cancelBookedAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    //verify appointment user
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized access" });
    }

    // remove appointment from database
    await appointmentModel.findByIdAndDelete(appointmentId, {
      cancelled: true,
    });

    // releasing doctor slot
    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (time) => time !== slotTime
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export const makePayment = async (req, res) => {
  try {
    const { appointmentId, paymentMethod } = req.body;
    const paymentProof = req.file ? req.file.path : null;

    // Find the appointment by ID
    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // Check if the appointment is already paid
    if (appointment.payment) {
      return res.json({ success: false, message: "Appointment already paid" });
    }

    // Update the appointment with payment details
    appointment.paymentMethod = paymentMethod;
    appointment.paymentProof = paymentProof;
    appointment.payment = true;
    await appointment.save();

    res.json({ success: true, message: "Payment successful" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
