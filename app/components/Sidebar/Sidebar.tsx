"use client";
import React, { useState } from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex items-center justify-between md:hidden p-4 bg-white border-b">
        <Logo />
        <MenuIcon
          onClick={toggleSidebar}
          className="text-orange-600 cursor-pointer"
          style={{ fontSize: "25px" }}
        />
      </div>

      <aside
        className={`fixed md:static top-0 left-0 h-screen bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-[70px] md:h-screen`}
      >
        <div className="flex flex-col items-center justify-between h-full p-4 border-r md:border-r-0 md:p-2">
          <div className="flex justify-between items-center w-full md:hidden">
            <Logo />
            <CloseIcon
              onClick={toggleSidebar}
              className="text-orange-600 cursor-pointer"
              style={{ fontSize: "25px" }}
            />
          </div>
          <Menu />
          <Profile />
        </div>
      </aside>
    </>
  );
}

// Profile image
function Profile() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-9 h-9 md:w-9 md:h-9 bg-orange-600 rounded-md"></div>
      <div>
        <p className="text-sm font-semibold">John</p>
        <p className="text-sm font-normal text-slate-400">john@gmail.com</p>
      </div>
    </div>
  );
}

// Menu
function Menu() {
  return (
    <div className="flex flex-col gap-4 md:gap-4 md:flex-col md:items-center">
      <div className="flex items-center gap-2 md:hidden">
        <BorderAllIcon
          className="text-orange-600 cursor-pointer"
          style={{ fontSize: "25px" }}
        />
        <span>All Projects</span>
      </div>
      <div className="flex items-center gap-2 md:hidden">
        <SplitscreenIcon
          className="text-slate-300 cursor-pointer"
          style={{ fontSize: "23px" }}
        />
        <span>All Tasks</span>
      </div>
      <div className="flex items-center gap-2 md:hidden">
        <LogoutIcon
          className="text-slate-300 cursor-pointer"
          style={{ fontSize: "23px" }}
        />
        <span>Logout</span>
      </div>

      {/* menu for desktop */}
      <div className="hidden md:flex flex-col items-center gap-4">
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
