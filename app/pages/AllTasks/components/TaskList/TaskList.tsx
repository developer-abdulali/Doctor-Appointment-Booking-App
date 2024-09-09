import React from "react";
import ListIcon from "@mui/icons-material/List";
import CachedIcon from "@mui/icons-material/Cached";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const TaskList = () => {
  return (
    <div className="flex flex-col gap-4 ">
      <Tabs />
      <div className="flex flex-col gap-2">
        <SingleTask />
        <SingleTask />
      </div>
    </div>
  );
};

function Tabs() {
  return (
    <div className="flex items-center gap-4 sm:gap-6 ml-0 sm:ml-3 mt-4 sm:mt-8 mb-5">
      <div className="flex items-center gap-3 text-orange-400 font-semibold">
        <span className="text-sm sm:text-base">On Going Tasks</span>
        <span className="hidden sm:block bg-orange-600 text-white px-2 rounded-md">
          7
        </span>
      </div>
      <div className="flex items-center gap-3 text-slate-400 font-semibold">
        <span className="text-sm sm:text-base">Completed Tasks</span>
        <span className="hidden sm:block bg-slate-200 text-white px-2 rounded-md">
          7
        </span>
      </div>
    </div>
  );
}

function SingleTask() {
  return (
    <div className="w-full mb-4">
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          {/* Checkbox and Task Info */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <input
              type="checkbox"
              className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500 cursor-pointer"
            />
            <div className="bg-orange-100 rounded-lg p-3 flex items-center justify-center">
              <ListIcon className="text-orange-600 text-2xl" />
            </div>
            <div className="flex flex-col flex-grow">
              <span className="font-bold text-lg text-slate-800 hover:text-orange-600 cursor-pointer transition-colors duration-200">
                Create the UI Design for the task
              </span>
              <span className="text-slate-500 text-sm">Project</span>
            </div>
          </div>

          {/* Task Details */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
              <CachedIcon className="text-blue-500 text-xl" />
              <span className="text-blue-700 text-sm font-medium">
                In Progress
              </span>
            </div>

            <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
              <CircleIcon className="text-green-500 text-sm" />
              <span className="text-green-700 text-sm font-medium">
                Low Priority
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button className="rounded-full p-2 flex items-center justify-center cursor-pointer bg-orange-100 hover:bg-orange-200 transition-all duration-200">
                <EditOutlinedIcon className="text-orange-600" />
              </button>
              <button className="rounded-full p-2 flex items-center justify-center cursor-pointer bg-red-100 hover:bg-red-200 transition-all duration-200">
                <DeleteOutlinedIcon className="text-red-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TaskList;
