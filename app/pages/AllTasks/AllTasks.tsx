import React from "react";
import TaskSubHeader from "./components/TaskSubHeader/TaskSubHeader";
import TaskHeader from "./components/TaskHeader/TaskHeader";
import TaskList from "./components/TaskList/TaskList";

const AllTasks = () => {
  return (
    <div className="bg-slate-50 w-full p-4 md:p-6 lg:p-10">
      <TaskHeader />
      <TaskSubHeader />
      <TaskList />
    </div>
  );
};

export default AllTasks;
