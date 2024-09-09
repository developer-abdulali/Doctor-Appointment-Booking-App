import React from "react";
import SingleProjectCard from "../SingleProjectCard/SingleProjectCard";

const AllProjectSection = () => {
  return (
    <div className="h-auto overflow-auto flex flex-wrap gap-2 sm:gap-4 mt-6">
      <SingleProjectCard />
      <SingleProjectCard />
      <SingleProjectCard />
      <SingleProjectCard />
      <SingleProjectCard />
    </div>
  );
};

export default AllProjectSection;
