import doctorModel from "../models/doctorModel.js";

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
