// import { useContext, useEffect } from "react";
// import { DoctorContext } from "../../context/DoctorContext";
// import { assets } from "../../assets/assets";

// const DoctorAppointments = () => {
//   const {
//     dToken,
//     appointments,
//     getAppointments,
//     calculateAge,
//     slotDateFormat,
//     completeAppointment,
//     cancelAppointment,
//   } = useContext(DoctorContext);

//   useEffect(() => {
//     if (dToken) {
//       getAppointments();
//     }
//   }, [dToken]);

//   return (
//     <section className="w-full m-5">
//       <p className="mb-3 text-xl font-semibold">All Appointments</p>
//       <div className="bg-white border rounded shadow-sm text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
//         {/* Table header */}
//         <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr_1fr] py-3 px-6 border-b bg-gray-100 text-gray-700">
//           <p>#</p>
//           <p>Patient</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Doctor</p>
//           <p>Fees</p>
//           <p>Payment</p>
//           <p>Actions</p>
//         </div>

//         {/* Show message if no appointments */}
//         {appointments.length === 0 ? (
//           <div className="flex justify-center items-center h-full">
//             <p className="text-gray-500 mt-5">No appointments</p>
//           </div>
//         ) : (
//           appointments.reverse()?.map((item, i) => (
//             <div
//               key={i}
//               className="flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr_1fr] items-center text-gray-700 py-3 px-6 border-b hover:bg-gray-50"
//             >
//               <p className="hidden sm:block">{i + 1}</p>
//               <div className="flex items-center gap-2">
//                 <img
//                   src={item?.userData?.image}
//                   alt="patient img"
//                   className="w-8 h-8 rounded-full"
//                 />
//                 <p>{item?.userData?.name}</p>
//               </div>
//               <p className="hidden sm:block">
//                 {calculateAge(item?.userData?.dob)}
//               </p>
//               <p className="sm:col-span-1">
//                 {slotDateFormat(item?.slotDate)} | {item?.slotTime}
//               </p>
//               <div className="flex items-center gap-2">
//                 <img
//                   src={item?.docData?.image}
//                   alt="doctor img"
//                   className="w-8 h-8 rounded-full bg-gray-200"
//                 />
//                 <p>{item?.docData?.name}</p>
//               </div>
//               <p>${item?.amount}</p>

//               <p>{item?.payment ? item?.paymentMethod : "Not Paid"}</p>

//               {item?.cancelled ? (
//                 <p className="text-red-500 text-xs font-medium">Cancelled</p>
//               ) : item?.isCompleted ? (
//                 <p className="text-green-500 text-xs font-medium">Completed</p>
//               ) : (
//                 <div className="flex items-center gap-1">
//                   <img
//                     onClick={() => {
//                       cancelAppointment(item?._id);
//                       getAppointments();
//                     }}
//                     src={assets.cancel_icon}
//                     alt="cancel_icon"
//                     className="w-10 cursor-pointer"
//                   />
//                   <img
//                     onClick={() => {
//                       completeAppointment(item?._id);
//                       getAppointments();

//                     }}
//                     src={assets.tick_icon}
//                     alt="tick_icon"
//                     className="w-10 cursor-pointer"
//                   />
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </section>
//   );
// };

// export default DoctorAppointments;

import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    calculateAge,
    slotDateFormat,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  const handleCancelAppointment = (appointmentId) => {
    cancelAppointment(appointmentId, () => {
      getAppointments();
    });
  };

  const handleCompleteAppointment = (appointmentId) => {
    completeAppointment(appointmentId, () => {
      getAppointments();
    });
  };

  return (
    <section className="w-full m-5">
      <p className="mb-3 text-xl font-semibold">All Appointments</p>
      <div className="bg-white border rounded shadow-sm text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        {/* Table header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr_1fr] py-3 px-6 border-b bg-gray-100 text-gray-700">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Payment</p>
          <p>Actions</p>
        </div>

        {/* Show message if no appointments */}
        {appointments.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500 mt-5">No appointments</p>
          </div>
        ) : (
          appointments.reverse()?.map((item, i) => (
            <div
              key={i}
              className="flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr_1fr] items-center text-gray-700 py-3 px-6 border-b hover:bg-gray-50"
            >
              <p className="hidden sm:block">{i + 1}</p>
              <div className="flex items-center gap-2">
                <img
                  src={item?.userData?.image}
                  alt="patient img"
                  className="w-8 h-8 rounded-full"
                />
                <p>{item?.userData?.name}</p>
              </div>
              <p className="hidden sm:block">
                {calculateAge(item?.userData?.dob)}
              </p>
              <p className="sm:col-span-1">
                {slotDateFormat(item?.slotDate)} | {item?.slotTime}
              </p>
              <div className="flex items-center gap-2">
                <img
                  src={item?.docData?.image}
                  alt="doctor img"
                  className="w-8 h-8 rounded-full bg-gray-200"
                />
                <p>{item?.docData?.name}</p>
              </div>
              <p>${item?.amount}</p>

              <p>{item?.payment ? item?.paymentMethod : "Not Paid"}</p>

              {item?.cancelled ? (
                <p className="text-red-500 text-xs font-medium">Cancelled</p>
              ) : item?.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">Completed</p>
              ) : (
                <div className="flex items-center gap-1">
                  <img
                    onClick={() => handleCancelAppointment(item?._id)}
                    src={assets.cancel_icon}
                    alt="cancel_icon"
                    className="w-10 cursor-pointer"
                  />
                  <img
                    onClick={() => handleCompleteAppointment(item?._id)}
                    src={assets.tick_icon}
                    alt="tick_icon"
                    className="w-10 cursor-pointer"
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default DoctorAppointments;
