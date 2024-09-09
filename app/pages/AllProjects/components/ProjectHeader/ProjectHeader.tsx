import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

function ProjectHeader() {
  return (
    <div className="flex justify-between flex-col sm:flex-row gap-4 sm:gap-0">
      <SearchBar />
      <AddProjectButton />
    </div>
  );
}

function SearchBar() {
  return (
    <div className="flex items-center">
      <div className="border-b-2 border-orange-600 h-[39px] w-11 flex items-center justify-center">
        <SearchIcon className="text-slate-400 outline-none" />
      </div>
      <div className="border-b-2 border-slate-200">
        <input
          type="text"
          className="p-2 bg-transparent text-sm outline-none"
          placeholder="Search projects..."
        />
      </div>
    </div>
  );
}

function AddProjectButton() {
  return (
    <button className="bg-orange-600 text-white px-2 pr-3 text-sm rounded-md flex gap-1 items-center">
      <AddIcon className="w-6 h-6 mt-[2px]" />
      <span>New Project</span>
    </button>
  );
}

export default ProjectHeader;
