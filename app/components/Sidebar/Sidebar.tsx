import React from 'react'
import TaskAltIcon from "@mui/icons-material/TaskAlt"
import BorderAllIcon from "@mui/icons-material/BorderAll"
import SplitscreenIcon from "@mui/icons-material/Splitscreen"
import LogoutIcon from "@mui/icons-material/Logout"


function Sidebar ()  {
  return (
    <div className="w-[97px] h-screen py-8 bg-white flex flex-col items-center justify-between border-r">
        <Logo />
        <Menu />
        <Profile />
    </div>
  )
}

// profile image
function Profile () {
    return(
        <div className="w-7 h-7 bg-orange-600 rounded-md"></div>
    )
}

// menu
function Menu () {
    return(
        <div className="flex flex-col items-center gap-6">
            <BorderAllIcon className="text-orange-600 cursor-pointer" style={{fontSize:"27px"}} />
            <SplitscreenIcon className="text-slate-300 cursor-pointer" style={{fontSize:"25px"}} />
            <LogoutIcon className="text-slate-300 cursor-pointer" style={{fontSize:"25px"}} />
        </div>
    )
}

// logo
function Logo(){
    return(
        <div className="rounded-md w-10 h-10 flex items-center justify-center">
             <TaskAltIcon className="text-orange-600 font-bold" style={{ fontSize: "41px" }} />
        </div>
    )
}

export default Sidebar