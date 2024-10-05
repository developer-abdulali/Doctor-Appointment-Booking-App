import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { DoctorContext } from "../../context/DoctorContext";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div className="min-h-screen bg-white border-r">
      {/* Show admin routes if aToken is available */}
      {aToken ? (
        <ul className="mt-5 text-[#515151]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            <img src={assets.home_icon} alt="home icon" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            <img src={assets.appointment_icon} alt="appointment_icon" />
            <p>Appointments</p>
          </NavLink>
          <NavLink
            to="/add-doctor"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            <img src={assets.add_icon} alt="add_icon" />
            <p>Add Doctor</p>
          </NavLink>
          <NavLink
            to="doctor-list"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            <img src={assets.people_icon} alt="people_icon" />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      ) : dToken ? (
        // Show doctor routes if dToken is available and no admin is logged in
        <ul className="mt-5 text-[#515151]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            <img src={assets.home_icon} alt="home icon" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            to="/doctor-appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            <img src={assets.appointment_icon} alt="appointment_icon" />
            <p>Appointments</p>
          </NavLink>
          <NavLink
            to="doctor-profile"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            <img src={assets.people_icon} alt="people_icon" />
            <p>Profile</p>
          </NavLink>
        </ul>
      ) : null}
    </div>
  );
};

export default Sidebar;
