import React from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import LogoutIcon from "@mui/icons-material/Logout";

function Sidebar() {
  return (
    <div className="flex flex-row md:flex-col items-center justify-between md:w-[70px] w-full h-[60px] md:h-screen py-4 md:py-6 bg-white border-b md:border-b-0 md:border-r">
      <Logo />
      <Menu />
      <Profile />
    </div>
  );
}

// Profile image
function Profile() {
  return <div className="w-8 h-8 md:w-7 md:h-7 bg-orange-600 rounded-md"></div>;
}

// Menu
function Menu() {
  return (
    <div className="flex flex-row md:flex-col items-center gap-4 md:gap-6">
      <BorderAllIcon
        className="text-orange-600 cursor-pointer"
        style={{ fontSize: "25px" }}
      />
      <SplitscreenIcon
        className="text-slate-300 cursor-pointer"
        style={{ fontSize: "23px" }}
      />
      <LogoutIcon
        className="text-slate-300 cursor-pointer"
        style={{ fontSize: "23px" }}
      />
    </div>
  );
}

// Logo
function Logo() {
  return (
    <div className="rounded-md w-9 h-9 md:w-10 md:h-10 flex items-center justify-center">
      <TaskAltIcon className="text-orange-600 font-bold text-[36px] md:text-[41px]" />
    </div>
  );
}

export default Sidebar;
