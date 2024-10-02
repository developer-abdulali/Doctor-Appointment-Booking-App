import { createContext, useState } from "react";
import axios, { toFormData } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  //get alll doctors
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendURL + "/admin/all-doctors",
        {},
        { headers: { aToken } }
      );

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // change doctor availability
  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendURL + "/admin/change-availability",
        { docId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    backendURL,
    aToken,
    setAToken,
    doctors,
    getAllDoctors,
    changeAvailability,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};
export default AdminContextProvider;
