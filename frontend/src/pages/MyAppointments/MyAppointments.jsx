// import { useContext, useEffect, useState } from "react";
// import { AppContext } from "../../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import PaymentModal from "../../components/PaymentModal/PaymentModal";

// const MyAppointments = () => {
//   const { backendURL, token, getDoctorData } = useContext(AppContext);
//   const [appointments, setAppointments] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

//   const months = [
//     "",
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];

//   const slotDateFormat = (slotDate) => {
//     const dateArray = slotDate.split("_");
//     return (
//       dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
//     );
//   };

//   const getUserAppointments = async () => {
//     try {
//       const { data } = await axios.get(backendURL + "/user/appointments", {
//         headers: { token },
//       });

//       console.log(data.appointments);
//       if (data.success) {
//         setAppointments(data.appointments.reverse());
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to get user appointments");
//     }
//   };

//   const cancelBookedAppointment = async (appointmentId) => {
//     try {
//       const { data } = await axios.post(
//         backendURL + "/user/cancel-appointment",
//         { appointmentId },
//         {
//           headers: { token },
//         }
//       );
//       if (data.success) {
//         toast.success(data.message);
//         getUserAppointments();
//         getDoctorData();
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to cancel the appointment");
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       getUserAppointments();
//     }
//   }, [token]);

//   const openPaymentModal = (appointmentId) => {
//     setSelectedAppointmentId(appointmentId);
//     setIsModalOpen(true);
//   };

//   const handlePaymentSuccess = (paymentMethod) => {
//     toast.success(`Payment via ${paymentMethod} successful!`);
//     // Here you can also add additional logic to handle the payment, like updating the appointment status
//   };

//   return (
//     <section>
//       <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
//         My appointments
//       </p>

//       {appointments.length > 0 ? (
//         <div>
//           {appointments.map((item, i) => {
//             const address = JSON.parse(item?.docData?.address || "{}");

//             return (
//               <div
//                 key={i}
//                 className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
//               >
//                 <div>
//                   <img
//                     src={item?.docData?.image}
//                     alt="img"
//                     className="w-32 bg-indigo-50"
//                   />
//                 </div>
//                 <div className="flex-1 text-sm text-zinc-600">
//                   <p className="text-neutral-800 font-semibold">
//                     {item?.docData?.name}
//                   </p>
//                   <p>{item?.docData?.speciality}</p>
//                   <p className="text-zinc-700 font-medium mt-1">Address:</p>
//                   <p className="text-xs">{address?.line1}</p>
//                   <p className="text-xs">{address?.line2}</p>
//                   <p className="text-xs mt-1">
//                     <span className="text-sm text-neutral-700 font-medium">
//                       Date & Time:{" "}
//                     </span>
//                     {slotDateFormat(item?.slotDate)} | {item?.slotTime}
//                   </p>
//                 </div>
//                 <div className="flex flex-col gap-2 justify-end">
//                   <button
//                     onClick={() => openPaymentModal(item?._id)}
//                     className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
//                   >
//                     Pay Online
//                   </button>
//                   {!item?.cancelled && (
//                     <button
//                       onClick={() => cancelBookedAppointment(item?._id)}
//                       className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
//                     >
//                       Cancel appointment
//                     </button>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <p className="text-center mt-6 text-zinc-500">No appointment booked</p>
//       )}

//       {/* Payment Modal */}
//       <PaymentModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onPaymentSuccess={handlePaymentSuccess}
//         selectedAppointmentId={selectedAppointmentId} // Pass the selectedAppointmentId as a prop
//       />
//     </section>
//   );
// };

// export default MyAppointments;

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import PaymentModal from "../../components/PaymentModal/PaymentModal";

const MyAppointments = () => {
  const { backendURL, token, getDoctorData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendURL + "/user/appointments", {
        headers: { token },
      });

      console.log(data.appointments);
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to get user appointments");
    }
  };

  const cancelBookedAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendURL + "/user/cancel-appointment",
        { appointmentId },
        {
          headers: { token },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorData();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to cancel the appointment");
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  const openPaymentModal = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setIsModalOpen(true);
  };

  const handlePaymentSuccess = (paymentMethod) => {
    toast.success(`Payment via ${paymentMethod} successful!`);
    getUserAppointments(); // Refresh the appointments list
  };

  return (
    <section>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My appointments
      </p>

      {appointments.length > 0 ? (
        <div>
          {appointments.map((item, i) => {
            const address = JSON.parse(item?.docData?.address || "{}");

            return (
              <div
                key={i}
                className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
              >
                <div>
                  <img
                    src={item?.docData?.image}
                    alt="img"
                    className="w-32 bg-indigo-50"
                  />
                </div>
                <div className="flex-1 text-sm text-zinc-600">
                  <p className="text-neutral-800 font-semibold">
                    {item?.docData?.name}
                  </p>
                  <p>{item?.docData?.speciality}</p>
                  <p className="text-zinc-700 font-medium mt-1">Address:</p>
                  <p className="text-xs">{address?.line1}</p>
                  <p className="text-xs">{address?.line2}</p>
                  <p className="text-xs mt-1">
                    <span className="text-sm text-neutral-700 font-medium">
                      Date & Time:{" "}
                    </span>
                    {slotDateFormat(item?.slotDate)} | {item?.slotTime}
                  </p>
                </div>
                <div className="flex flex-col gap-2 justify-end">
                  {item.paymentMethod === "Cash" ? (
                    <p className="text-sm text-yellow-600 text-center sm:min-w-48 py-2 border rounded">
                      Will pay in cash
                    </p>
                  ) : item.payment ? (
                    <p className="text-sm text-green-600 text-center sm:min-w-48 py-2 border rounded">
                      Paid via {item.paymentMethod}
                    </p>
                  ) : (
                    <button
                      onClick={() => openPaymentModal(item?._id)}
                      className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                    >
                      Pay Online
                    </button>
                  )}
                  {!item?.cancelled && (
                    <button
                      onClick={() => cancelBookedAppointment(item?._id)}
                      className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      Cancel appointment
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center mt-6 text-zinc-500">No appointment booked</p>
      )}

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
        selectedAppointmentId={selectedAppointmentId} // Pass the selectedAppointmentId as a prop
      />
    </section>
  );
};

export default MyAppointments;
