import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const value = { backendURL, aToken, setAToken };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};
export default AdminContextProvider;
