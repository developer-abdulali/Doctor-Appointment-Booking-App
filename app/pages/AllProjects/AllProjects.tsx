import React from "react";
import ProjectHeader from "./components/ProjectHeader/ProjectHeader";
import ProjectSubHeader from "./components/ProjectSubHeader/ProjectSubHeader";
import AllProjectSection from "./components/AllProjectSection/AllProjectSection";
import StatsRightSideBar from "./components/StatsRightSideBar/StatsRightSideBar";

const AllProjects = () => {
  return (
    <div className="flex flex-col md:flex-row bg-slate-50 w-full h-full min-h-screen">
      <AllProjectsArea />
      <StatsRightSideBar />
    </div>
  );
};

function AllProjectsArea() {
  return (
    <div className="w-full md:w-[78%] p-4 md:p-10 flex flex-col gap-3">
      <ProjectHeader />
      <ProjectSubHeader />
      <AllProjectSection />
    </div>
  );
}

export default AllProjects;
