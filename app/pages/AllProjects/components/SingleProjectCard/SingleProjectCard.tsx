import React from "react";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import CircleIcon from "@mui/icons-material/Circle";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const SingleProjectCard = () => {
  // Example tasks data
  const tasks = [
    { id: 1, title: "Create Product" },
    { id: 2, title: "Design UI" },
    { id: 3, title: "Implement Auth" },
  ];

  return (
    <div className="w-full sm:w-[45%] bg-white rounded-lg p-3 flex flex-col gap-3">
      <ProjectDetails />
      <TaskList tasks={tasks} />
      <ProgressRatio />
      <StatsFooter />
    </div>
  );
};

function ProjectDetails() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-orange-600 rounded-md flex items-center justify-center text-white">
          <SplitscreenIcon />
        </div>
        <span className="text-[15px] sm:text-[17px] font-semibold">
          E-commerece
        </span>
      </div>
      <div className="cursor-pointer text-slate-400">
        <MoreVertIcon />
      </div>
    </div>
  );
}

function TaskList({ tasks }: any) {
  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task: any) => (
        <div key={task.id} className="flex items-center gap-2">
          <CircleIcon className="text-orange-600 w-[9px] h-[9px]" />
          <span className="text-[13px] sm:text-[14px] text-slate-600">
            {task.title}
          </span>
        </div>
      ))}
    </div>
  );
}

function ProgressRatio() {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="text-[12px] w-full flex items-center gap-3">
        <div className="w-full h-[7px] rounded-xl bg-slate-100 overflow-hidden">
          <div className="w-[77%] bg-orange-600 h-full rounded-r-xl"></div>
        </div>
      </div>

      <div className="flex justify-between">
        <p className="text-[13px] text-slate-400">On Progress</p>
        <div className="flex text-[13px] gap-1">
          <p>77%</p>
        </div>
      </div>
    </div>
  );
}

function StatsFooter() {
  return (
    <div className="flex justify-between text-[14px] sm:text-[15px]">
      <span className="flex items-center gap-1">
        <CircleIcon className="text-orange-600 w-[9px] h-[9px]" />
        <span>3 Tasks</span>
      </span>
      <span className="text-slate-500">6 days ago</span>
    </div>
  );
}

export default SingleProjectCard;
