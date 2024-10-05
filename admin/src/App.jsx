// import { useContext } from "react";
// import Login from "./pages/Login/Login";
// import { AdminContext } from "./context/AdminContext";
// import Navbar from "./components/Navbar/Navbar";
// import Sidebar from "./components/Sidebar/Sidebar";
// import { Route, Routes } from "react-router-dom";
// import Dashboard from "./pages/Admin/Dashboard";
// import AllAppointments from "./pages/Admin/AllAppointments";
// import AddDoctor from "./pages/Admin/AddDoctor";
// import DoctorsList from "./pages/Admin/DoctorsList";
// import { DoctorContext } from "./context/DoctorContext";
// import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
// import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
// import DoctorProfile from "./pages/Doctor/DoctorProfile";

// const App = () => {
//   const { aToken } = useContext(AdminContext);
//   const { dToken } = useContext(DoctorContext);

//   return aToken || dToken ? (
//     <div className="bg-[#F8F9FD]">
//       <Navbar />
//       <div className="flex items-start">
//         <Sidebar />
//         <Routes>
//           {/* admin routes */}
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/all-appointments" element={<AllAppointments />} />
//           <Route path="/add-doctor" element={<AddDoctor />} />
//           <Route path="doctor-list" element={<DoctorsList />} />
//           <Route path="*" element={<h1>404 Not Found</h1>} />

//           {/* doctor routes */}
//           <Route path="/" element={<DoctorDashboard />} />
//           <Route path="doctor-appointments" element={<DoctorAppointments />} />
//           <Route path="doctor-profile" element={<DoctorProfile />} />
//         </Routes>
//       </div>
//     </div>
//   ) : (
//     <>
//       <Login />
//     </>
//   );
// };
// export default App;

import { useContext } from "react";
import Login from "./pages/Login/Login";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return aToken || dToken ? (
    <div className="bg-[#F8F9FD]">
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* admin routes */}
          {aToken && (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/all-appointments" element={<AllAppointments />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/doctor-list" element={<DoctorsList />} />
            </>
          )}

          {/* doctor routes */}
          {dToken && (
            <>
              <Route path="/" element={<DoctorDashboard />} />
              <Route
                path="/doctor-appointments"
                element={<DoctorAppointments />}
              />
              <Route path="/doctor-profile" element={<DoctorProfile />} />
            </>
          )}

          {/* 404 route */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
    </>
  );
};

export default App;
