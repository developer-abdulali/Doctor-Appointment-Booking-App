import React from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function ProjectSubHeader() {
  return (
    <div className="mt-8 sm:mt-20 flex items-center justify-between font-bold">
      <MyProjectText />
      <SortByButton />
    </div>
  );
}

function MyProjectText() {
  return <p className="text-[22px] sm:text-[26px] font-bold">My Projects</p>;
}

function SortByButton() {
  return (
    <div className="flex text-[14px] sm:text-[15px] font-semibold gap-2 sm:gap-3">
      <span className="text-slate-300">Sort By</span>
      <div className="flex gap-1 items-center cursor-pointer">
        <span className="text-slate-800">Recent Project</span>
        <KeyboardDoubleArrowDownIcon />
      </div>
    </div>
  );
}
export default ProjectSubHeader;
