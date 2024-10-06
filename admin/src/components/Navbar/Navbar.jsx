import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { DoctorContext } from "../../context/DoctorContext";
import { HiMenuAlt3, HiX } from "react-icons/hi"; // Import menu and close icons

const Navbar = ({ toggleSidebar }) => {
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

  return (
    <nav className="sticky top-0 flex items-center justify-between px-4 lg:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <img
          src={assets.admin_logo}
          alt="logo"
          className="w-32 sm:w-36 md:w-40 cursor-pointer"
        />
        <span className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? "Admin" : "Doctor"}
        </span>
      </div>

      {/* Menu icon for small screens */}
      <div className="lg:hidden flex items-center">
        {/* <div className="md:hidden flex items-center"> */}
        <HiMenuAlt3
          className="w-8 h-8 cursor-pointer text-primary"
          onClick={toggleSidebar}
        />
      </div>

      {/* Logout button for larger screens */}
      <div className="hidden lg:flex md:items-center">
        {/* <div className="hidden md:flex md:items-center"> */}
        <button
          onClick={handleLogout}
          className="bg-primary text-white text-sm px-8 py-2 rounded-full transition-all hover:duration-500 hover:bg-primary/90"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
