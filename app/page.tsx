import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import AllProjects from "./pages/AllProjects/AllProjects";
import AllTasks from "./pages/AllTasks/AllTasks";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <Sidebar />
      <AllProjects />
      {/* <AllTasks /> */}
    </div>
  );
};

export default Home;
