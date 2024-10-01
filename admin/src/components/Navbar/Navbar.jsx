import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

const Navbar = () => {
  const { setAToken, aToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
  };

  return (
    <nav className="flex items-center justify-between px-4 sm:px-10 py-3 border-b bg-white">
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
        className="bg-primary text-white text-sm px-10 py-2 rounded-full"
      >
        Logout
      </button>
    </nav>
  );
};
export default Navbar;
