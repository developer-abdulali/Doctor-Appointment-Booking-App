import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

// add a new doctor
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
      address, // Should be an object with line1 and line2
    } = req.body;
    const imgfile = req.file;

    // Validate the email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }

    // Validate the password
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

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Uploading the image to Cloudinary
    const imgUpload = await cloudinary.uploader.upload(imgfile.path, {
      resource_type: "image",
    });

    const imgUrl = imgUpload.secure_url;

    // Parsing and validating address object
    const parsedAddress = JSON.parse(address); // Ensure address is passed as a JSON string in request
    if (!parsedAddress.line1 || !parsedAddress.line2) {
      return res.json({
        success: false,
        message: "Address fields are required",
      });
    }

    // Create a new doctor document
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
      address: parsedAddress, // Storing address as an object
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

// admin login
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

// getting all doctors
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    return res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// getting all users appointments
export const getAllAppointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    return res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// cancel the booked appointment
export const cancelBookedAppointments = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

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

// get the data for admin panel
export const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashboardData = {
      doctors: doctors.length,
      patients: users.length,
      appointments: appointments.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
