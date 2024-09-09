import React from "react";
import SingleProjectCard from "../SingleProjectCard/SingleProjectCard";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";

const StatsRightSideBar = () => {
  return (
    <div className="hidden md:flex items-center w-full md:w-[22%]">
      <div className="h-[92%] w-full md:w-[94%] bg-white rounded-l-3xl p-3 flex flex-col">
        <Header />
        <div className="flex flex-col items-center gap-11 justify-center mt-6">
          <CircularChart />
          <ProjectsCompletedLabels />
        </div>
        <ProjectsList />
      </div>
    </div>
  );
};

function Header() {
  return (
    <h2 className="text-[22px] font-bold text-center mt-7">
      Projects Completed
    </h2>
  );
}

function CircularChart() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-32 md:w-40 h-32 md:h-40 bg-slate-100 mt-5 rounded-full flex items-center justify-center">
        <div className="w-[86%] flex items-center justify-center h-[86%] bg-white rounded-full">
          <span className="text-lg md:text-xl font-semibold text-orange-600">
            90%
          </span>
        </div>
      </div>
    </div>
  );
}

function ProjectsCompletedLabels() {
  return (
    <div className="flex flex-col items-center justify-center gap-1 md:gap-2">
      <p className="font-bold text-[15px] md:text-[17px]">3 Completed</p>
      <p className="font-bold text-[15px] md:text-[17px]">20 Tasks done</p>
    </div>
  );
}

function ProjectsList() {
  return (
    <ul className="flex flex-col gap-3 mt-8 md:mt-16 mx-4 overflow-auto">
      <SingleProject />
      <SingleProject />
    </ul>
  );
}

function SingleProject() {
  return (
    <div className="p-3 flex items-center gap-2">
      <div className="w-6 md:w-8 h-6 md:h-8 bg-orange-600 rounded-md flex items-center justify-center text-white">
        <SplitscreenIcon />
      </div>

      <ul>
        <li className="text-[12px] md:text-[14px] font-semibold">Project 1</li>
        <li className="text-[10px] md:text-[12px] text-slate-600">3 tasks</li>
      </ul>
    </div>
  );
}

export default StatsRightSideBar;
