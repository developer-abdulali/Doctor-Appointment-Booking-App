import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcryptjs";
import appointmentModel from "../models/appointmentModel.js";

// change doctor availability
export const changeDoctorAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });

    return res.json({ success: true, message: "Doctor availability changed" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// get all doctors
export const doctorsList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    return res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// login the doctor
export const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.json({ success: false, message: "Please fill all fields" });
    }

    // check if email already exists
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({ success: false, message: "Doctor doest not found" });
    }

    // validate the password
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    // generate token
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);

    // return success message and token
    return res.json({
      success: true,
      message: "Doctor logged in successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// doctor appointments for doctor panel
export const doctorAppointments = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });

    return res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// mark appointment completed for doctor panel
export const markAppointmentCompleted = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({
        success: true,
        message: "Appointment Completed",
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid appointment or doctor ID",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// cancel appointment for doctor panel
export const markAppointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({
        success: true,
        message: "Appointment Cancelled",
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid cancelled appointment",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// doctor  dashboard
export const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;

    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;

    appointments.map((app) => {
      if (app.isCompleted || app.payment) {
        earnings += app.amount;
      }
    });

    let patients = [];

    appointments.map((app) => {
      if (!patients.includes(app.userId)) {
        patients.push(app.userId);
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    return res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// get doctor profile for doctor panel
export const getDoctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;
    const doctorData = await doctorModel.findById(docId).select("-password");
    return res.json({ success: true, doctorData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// update doctor profile for doctor panel
export const updateDoctorProfile = async (req, res) => {
  try {
    const { docId, address, fees, available } = req.body;

    await doctorModel.findByIdAndUpdate(docId, {
      address,
      fees,
      available,
    });

    return res.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
