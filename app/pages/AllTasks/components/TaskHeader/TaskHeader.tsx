import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

function TaskHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
      <SearchBar />
      <AddProjectButton />
    </div>
  );
}

function SearchBar() {
  return (
    <div className="flex items-center w-full sm:w-auto">
      <div className="border-b-2 border-orange-600 h-[39px] w-11 flex items-center justify-center">
        <SearchIcon className="text-slate-400 outline-none" />
      </div>
      <div className="border-b-2 border-slate-200 flex-grow sm:flex-grow-0">
        <input
          type="text"
          className="p-2 bg-transparent text-sm outline-none w-full"
          placeholder="Search tasks..."
        />
      </div>
    </div>
  );
}

function AddProjectButton() {
  return (
    <button className="bg-orange-600 text-white px-2 pr-3 text-sm rounded-md flex gap-1 items-center justify-center sm:justify-start w-full sm:w-auto">
      <AddIcon className="w-6 h-6 mt-[2px]" />
      <span>New Project</span>
    </button>
  );
}

export default TaskHeader;
