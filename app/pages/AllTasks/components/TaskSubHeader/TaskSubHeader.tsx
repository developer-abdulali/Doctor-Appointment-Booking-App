import React from "react";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SortIcon from "@mui/icons-material/Sort";

function TaskSubHeader() {
  return (
    <div className="mt-8 sm:mt-16 mb-8 bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-4">
        <MyProjectText />
        <SortByButton />
      </div>
    </div>
  );
}

function MyProjectText() {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 flex items-center justify-center bg-orange-100 rounded-full">
        <SplitscreenIcon className="text-orange-600 text-2xl" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-slate-800">All Projects</h2>
          <span className="bg-slate-700 text-white text-xs font-semibold px-2 py-1 rounded-full">
            6
          </span>
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <KeyboardArrowDownIcon />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-full max-w-[200px] h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="w-1/5 h-full bg-orange-600 rounded-full"></div>
          </div>
          <p className="text-sm text-slate-500 whitespace-nowrap">
            20% Completed
          </p>
        </div>
      </div>
    </div>
  );
}

function SortByButton() {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-slate-500 font-medium">Sort By</span>
      <div className="relative">
        <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-full transition-colors">
          <SortIcon className="text-slate-500" />
          <span>Recent Tasks</span>
          <KeyboardArrowDownIcon className="text-slate-500" />
        </button>
      </div>
    </div>
  );
}

export default TaskSubHeader;
