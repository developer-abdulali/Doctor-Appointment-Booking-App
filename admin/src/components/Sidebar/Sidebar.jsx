import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { DoctorContext } from "../../context/DoctorContext";
import { HiX } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";

const Sidebar = ({ isSidebarOpen, toggleSidebar, handleLogout }) => {
  const navigate = useNavigate();
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 py-3 px-6 text-sm font-semibold transition-colors duration-300 ${
      isActive
        ? "bg-[#F2F3FF] border-r-4 border-primary"
        : "text-gray-600 hover:bg-gray-100 hover:text-primary"
    }`;

  const handleNavLinkClick = (to) => {
    navigate(to);
    toggleSidebar();
  };

  return (
    <div>
      {/* Sidebar for larger screens */}
      <div className="hidden lg:flex min-h-screen w-[15rem] bg-white border-r">
        {/* Admin or Doctor menu options */}
        {aToken ? (
          <ul className="mt-5 text-[#515151] w-full">
            <NavLink to="/" className={navLinkClasses}>
              <img src={assets.home_icon} alt="home icon" className="w-5" />
              <p>Dashboard</p>
            </NavLink>

            <NavLink
              to="/all-appointments"
              className={navLinkClasses}
              onClick={() => handleNavLinkClick("/all-appointments")}
            >
              <img src={assets.appointment_icon} alt="appointment_icon" />
              <p>Appointments</p>
            </NavLink>
            <NavLink
              to="/add-doctor"
              className={navLinkClasses}
              onClick={() => handleNavLinkClick("/add-doctor")}
            >
              <img src={assets.add_icon} alt="add_icon" />
              <p>Add Doctor</p>
            </NavLink>
            <NavLink
              to="/doctor-list"
              className={navLinkClasses}
              onClick={() => handleNavLinkClick("/doctor-list")}
            >
              <img src={assets.people_icon} alt="people icon" />
              <p>Doctors</p>
            </NavLink>
          </ul>
        ) : dToken ? (
          <ul className="mt-5 text-[#515151] w-full">
            <NavLink
              to="/"
              className={navLinkClasses}
              onClick={() => handleNavLinkClick("/")}
            >
              <img src={assets.home_icon} alt="home icon" className="w-5" />
              <p>Dashboard</p>
            </NavLink>
            <NavLink
              to="/doctor-appointments"
              className={navLinkClasses}
              onClick={() => handleNavLinkClick("/doctor-appointments")}
            >
              <img
                src={assets.appointment_icon}
                alt="appointment icon"
                className="w-5"
              />
              <p>Appointments</p>
            </NavLink>
            <NavLink
              to="/doctor-profile"
              className={navLinkClasses}
              onClick={() => handleNavLinkClick("/doctor-profile")}
            >
              <img src={assets.people_icon} alt="people icon" className="w-5" />
              <p>Profile</p>
            </NavLink>
          </ul>
        ) : null}
      </div>

      {/* Overlay for smaller screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sliding Sidebar for smaller screens */}
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r shadow-lg transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden z-50 w-64`}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-bold">Menu</h2>
          <HiX
            className="w-8 h-8 cursor-pointer text-primary"
            onClick={toggleSidebar}
          />
        </div>
        <ul className="mt-5 text-[#515151]">
          {aToken ? (
            <>
              <NavLink
                to="/"
                className={navLinkClasses}
                onClick={() => handleNavLinkClick("/")}
              >
                <img src={assets.home_icon} alt="home icon" className="w-5" />
                <p>Dashboard</p>
              </NavLink>
              <NavLink
                to="/all-appointments"
                className={navLinkClasses}
                onClick={() => handleNavLinkClick("/all-appointments")}
              >
                <img
                  src={assets.appointment_icon}
                  alt="appointment icon"
                  className="w-5"
                />
                <p>Appointments</p>
              </NavLink>
              <NavLink
                to="/add-doctor"
                className={navLinkClasses}
                onClick={() => handleNavLinkClick("/add-doctor")}
              >
                <img src={assets.add_icon} alt="add icon" className="w-5" />
                <p>Add Doctor</p>
              </NavLink>
              <NavLink
                to="/doctor-list"
                className={navLinkClasses}
                onClick={() => handleNavLinkClick("/doctor-list")}
              >
                <img
                  src={assets.people_icon}
                  alt="people icon"
                  className="w-5"
                />
                <p>Doctors</p>
              </NavLink>
              {/* logout btn */}
              <button
                className="flex items-center gap-3 py-3 px-5 text-sm font-semibold transition-colors duration-300"
                onClick={handleLogout}
              >
                <IoLogOutOutline size={25} />
                <p className="">Logout</p>
              </button>
            </>
          ) : dToken ? (
            <>
              <NavLink
                to="/"
                className={navLinkClasses}
                onClick={() => handleNavLinkClick("/")}
              >
                <img src={assets.home_icon} alt="home icon" className="w-5" />
                <p>Dashboard</p>
              </NavLink>
              <NavLink
                to="/doctor-appointments"
                className={navLinkClasses}
                onClick={() => handleNavLinkClick("/doctor-appointments")}
              >
                <img
                  src={assets.appointment_icon}
                  alt="appointment icon"
                  className="w-5"
                />
                <p>Appointments</p>
              </NavLink>
              <NavLink
                to="/doctor-profile"
                className={navLinkClasses}
                onClick={() => handleNavLinkClick("/doctor-profile")}
              >
                <img
                  src={assets.people_icon}
                  alt="people icon"
                  className="w-5"
                />
                <p>Profile</p>
              </NavLink>
              {/* logout btn */}
              <button
                className="flex items-center gap-3 py-3 px-5 text-sm font-semibold transition-colors duration-300"
                onClick={handleLogout}
              >
                <IoLogOutOutline size={25} />
                <p className="">Logout</p>
              </button>
            </>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
