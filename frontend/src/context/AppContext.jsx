import { createContext, useState, useEffect } from "react";
import { doctors } from "../../public/assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const currencySymbol = `$`;
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const getDoctorData = async () => {
    try {
      const { data } = await axios.get(backendURL + "/doctor/doctor-list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = { doctors, currencySymbol, token, setToken, backendURL };

  useEffect(() => {
    getDoctorData();
  }, []);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvider;
