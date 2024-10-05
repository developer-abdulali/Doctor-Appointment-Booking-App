import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { DoctorContext } from "../../context/DoctorContext";

const Navbar = () => {
  const { setAToken, aToken } = useContext(AdminContext);
  const { setDToken, dToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
    dToken && setDToken("");
    dToken && localStorage.removeItem("dToken");
  };

  return (
    <nav className="sticky top-0 flex items-center justify-between px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <img
          src={assets.admin_logo}
          alt="logo"
          className="w-36 sm:w-40 cursor-pointer"
        />
        <span className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? "Admin" : "Doctor"}
        </span>
      </div>
      <button
        onClick={handleLogout}
        className="bg-primary text-white text-sm px-10 py-2 rounded-full transition-all hover:duration-500 hover:bg-primary/90"
      >
        Logout
      </button>
    </nav>
  );
};
export default Navbar;
