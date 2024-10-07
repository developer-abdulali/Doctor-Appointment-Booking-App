import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const [appointments, setAppointments] = useState([]);
  const [dashboardData, setDashboardData] = useState(false);
  const [profileData, setProfileData] = useState(false);

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(backendURL + "/doctor/appointments", {
        headers: { dToken },
      });

      if (data.success) {
        setAppointments(data?.appointments);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const completeAppointment = async (appointmentId, callback) => {
    try {
      const { data } = await axios.post(
        backendURL + "/doctor/complete-appointment",
        { appointmentId },
        {
          headers: { dToken },
        }
      );

      if (data.success) {
        toast.success(data?.message);
        callback();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const cancelAppointment = async (appointmentId, callback) => {
    try {
      const { data } = await axios.post(
        backendURL + "/doctor/cancel-appointment",
        { appointmentId },
        {
          headers: { dToken },
        }
      );

      if (data.success) {
        toast.success(data?.message);
        callback();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const getDoctorDashboardData = async () => {
    try {
      const { data } = await axios.get(backendURL + "/doctor/dashboard", {
        headers: { dToken },
      });

      if (data.success) {
        setDashboardData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDoctorProfile = async () => {
    try {
      const { data } = await axios.get(backendURL + "/doctor/profile", {
        headers: { dToken },
      });

      if (data.success) {
        setProfileData(data?.doctorData);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const value = {
    dToken,
    setDToken,
    backendURL,
    appointments,
    setAppointments,
    getAppointments,
    calculateAge,
    slotDateFormat,
    completeAppointment,
    cancelAppointment,
    getDoctorDashboardData,
    dashboardData,
    getDoctorProfile,
    setProfileData,
    profileData,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
