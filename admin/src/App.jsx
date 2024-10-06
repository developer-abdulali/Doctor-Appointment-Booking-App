import { useContext, useState } from "react";
import Login from "./pages/Login/Login";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { setAToken, aToken } = useContext(AdminContext);
  const { setDToken, dToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    if (aToken) {
      setAToken("");
      localStorage.removeItem("aToken");
    }
    if (dToken) {
      setDToken("");
      localStorage.removeItem("dToken");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return aToken || dToken ? (
    <div className="bg-[#F8F9FD] overflow-hidden">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="sm:flex">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          toggleSidebar={toggleSidebar}
          handleLogout={handleLogout}
        />
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
