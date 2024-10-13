import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [userData, setUserData] = useState(false);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const currencySymbol = `$`;
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const getDoctorData = async () => {
    try {
      const { data } = await axios.get(backendURL + "/doctor/doctor-list");
      // console.log(data);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendURL + "/user/get-profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(data);
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message || "Failed to load user profile");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message || "Error fetching user profile");
    }
  };

  // const getUserProfileData = async () => {
  //   try {
  //     const { data } = await axios.get(backendURL + "/user/get-profile", {
  //       headers: { token },
  //     });
  //     console.log(data);
  //     if (data.success) {
  //       setUserData(data.user);
  //     } else {
  //       toast.error(error.message);
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //     toast.error(error.message);
  //   }
  // };

  const value = {
    doctors,
    currencySymbol,
    token,
    setToken,
    backendURL,
    userData,
    setUserData,
    getDoctorData,
    getUserProfileData,
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  useEffect(() => {
    if (token) {
      getUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvider;
