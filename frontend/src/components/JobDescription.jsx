// import React, { useEffect, useState } from "react";
// import { Badge } from "./ui/badge";
// import { Button } from "./ui/button";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
// import { setSingleJob } from "@/redux/jobSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";

// const JobDescription = () => {
//   const { singleJob } = useSelector((store) => store.job);

//   const { user } = useSelector((store) => store.auth);
//   const isIntiallyApplied =
//     singleJob?.applications?.some(
//       (application) => application.applicant === user?._id
//     ) || false;
//   const [isApplied, setIsApplied] = useState(isIntiallyApplied);

//   const params = useParams();
//   const jobId = params.id;
//   const dispatch = useDispatch();

//   const applyJobHandler = async () => {
//     try {
//       const res = await axios.get(
//         `${APPLICATION_API_END_POINT}/apply/${jobId}`,
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         setIsApplied(true); // Update the local state
//         const updatedSingleJob = {
//           ...singleJob,
//           applications: [...singleJob.applications, { applicant: user?._id }],
//         };
//         dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     }
//   };

//   useEffect(() => {
//     const fetchSingleJob = async () => {
//       try {
//         const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
//           withCredentials: true,
//         });
//         if (res.data.success) {
//           dispatch(setSingleJob(res.data.job));
//           setIsApplied(
//             res.data.job.applications.some(
//               (application) => application.applicant === user?._id
//             )
//           ); // Ensure the state is in sync with fetched data
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchSingleJob();
//   }, [jobId, dispatch, user?._id]);

//   return (
//     <div className="max-w-7xl mx-auto my-10">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="font-bold text-xl">{singleJob?.title}</h1>
//           <div className="flex items-center gap-2 mt-4">
//             <Badge className={"text-blue-700 font-bold"} variant="ghost">
//               {singleJob?.postion} Positions
//             </Badge>
//             <Badge className={"text-[#F83002] font-bold"} variant="ghost">
//               {singleJob?.jobType}
//             </Badge>
//             <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
//               {singleJob?.salary}PKR
//             </Badge>
//           </div>
//         </div>
//         <Button
//           onClick={isApplied ? null : applyJobHandler}
//           disabled={isApplied}
//           className={`rounded-lg ${
//             isApplied
//               ? "bg-gray-600 cursor-not-allowed"
//               : "bg-[#7209b7] hover:bg-[#5f32ad]"
//           }`}
//         >
//           {isApplied ? "Already Applied" : "Apply Now"}
//         </Button>
//       </div>
//       <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
//         Job Description
//       </h1>
//       <div className="my-4">
//         <h1 className="font-bold my-1">
//           Role:{" "}
//           <span className="pl-4 font-normal text-gray-800">
//             {singleJob?.title}
//           </span>
//         </h1>
//         <h1 className="font-bold my-1">
//           Location:{" "}
//           <span className="pl-4 font-normal text-gray-800">
//             {singleJob?.location}
//           </span>
//         </h1>
//         <h1 className="font-bold my-1">
//           Description:{" "}
//           <span className="pl-4 font-normal text-gray-800">
//             {singleJob?.description}
//           </span>
//         </h1>
//         <h1 className="font-bold my-1">
//           Experience:{" "}
//           <span className="pl-4 font-normal text-gray-800">
//             {singleJob?.experience} yrs
//           </span>
//         </h1>
//         <h1 className="font-bold my-1">
//           Salary:{" "}
//           <span className="pl-4 font-normal text-gray-800">
//             {singleJob?.salary}PKR
//           </span>
//         </h1>
//         <h1 className="font-bold my-1">
//           Total Applicants:{" "}
//           <span className="pl-4 font-normal text-gray-800">
//             {singleJob?.applications?.length}
//           </span>
//         </h1>
//         <h1 className="font-bold my-1">
//           Posted Date:{" "}
//           <span className="pl-4 font-normal text-gray-800">
//             {singleJob?.createdAt.split("T")[0]}
//           </span>
//         </h1>
//       </div>
//     </div>
//   );
// };

// export default JobDescription;

import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10 p-6 lg:p-10">
      {/* Header section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-6 shadow-lg rounded-lg mb-8">
        <div className="mb-6 md:mb-0">
          <h1 className="font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
            {singleJob?.title}
          </h1>
          <div className="flex items-center gap-3 flex-wrap">
            <Badge className="bg-blue-100 text-blue-700 font-semibold py-1 px-3 rounded-lg">
              {singleJob?.postion} Positions
            </Badge>
            <Badge className="bg-red-100 text-red-600 font-semibold py-1 px-3 rounded-lg">
              {singleJob?.jobType}
            </Badge>
            <Badge className="bg-purple-100 text-purple-600 font-semibold py-1 px-3 rounded-lg">
              {singleJob?.salary} PKR
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 transform ${
            isApplied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 hover:scale-105"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Job Description */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="border-b-2 border-gray-200 pb-3 text-xl font-semibold mb-6">
          Job Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg text-gray-800">Role:</h3>
              <p className="pl-4 font-normal text-gray-700">
                {singleJob?.title}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">Location:</h3>
              <p className="pl-4 font-normal text-gray-700">
                {singleJob?.location}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">Experience:</h3>
              <p className="pl-4 font-normal text-gray-700">
                {singleJob?.experience} years
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg text-gray-800">Description:</h3>
              <p className="pl-4 font-normal text-gray-700">
                {singleJob?.description}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">
                Total Applicants:
              </h3>
              <p className="pl-4 font-normal text-gray-700">
                {singleJob?.applications?.length}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">Posted Date:</h3>
              <p className="pl-4 font-normal text-gray-700">
                {new Date(singleJob?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
