import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import PaymentModal from "../../components/PaymentModal/PaymentModal";

const MyAppointments = () => {
  const { backendURL, token, getDoctorData, userData } = useContext(AppContext);
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
      const userId = userData._id;
      const { data } = await axios.get(
        `${backendURL}/user/appointments/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to get user appointments");
    }
  };

  const cancelBookedAppointment = async (appointmentId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );
    if (!isConfirmed) {
      return;
    }

    try {
      const userId = userData._id;

      const { data } = await axios.post(
        backendURL + "/user/cancel-appointment",
        { userId, appointmentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
    getUserAppointments();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My appointments
      </p>
      {appointments?.length > 0 ? (
        <>
          {appointments?.map((item, i) => {
            const address = item?.docData?.address;

            return (
              <div key={item?._id} className="border-b">
                <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 ">
                  <img
                    src={item?.docData?.image}
                    alt="img"
                    className="w-32 bg-indigo-50"
                  />
                  {/* doctor info */}
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
                        Date & Time: <br className="md:hidden" />
                      </span>
                      {slotDateFormat(item?.slotDate)} | {item?.slotTime}
                    </p>
                  </div>
                  {/* action buttons for large screen */}
                  <div className="hidden md:flex flex-col gap-2 mb-2">
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
                        className="text-sm text-stone-500 w-full text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300 "
                      >
                        Pay Online
                      </button>
                    )}

                    {/* Check if the appointment is completed */}
                    {item?.isCompleted ? (
                      <p className="text-sm text-green-600 text-center sm:min-w-48 py-2 border rounded">
                        Appointment completed
                      </p>
                    ) : (
                      !item?.cancelled && (
                        <button
                          onClick={() => cancelBookedAppointment(item?._id)}
                          className="text-sm text-stone-500 w-full text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                        >
                          Cancel appointment
                        </button>
                      )
                    )}
                  </div>
                </div>
                {/* action buttons for small screen */}
                <div className="md:hidden flex gap-2 mb-2">
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
                      className="text-sm text-stone-500 w-full text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300 "
                    >
                      Pay Online
                    </button>
                  )}

                  {/* Check if the appointment is completed */}
                  {item?.isCompleted ? (
                    <p className="text-sm text-green-600 text-center sm:min-w-48 py-2 border rounded">
                      Appointment completed
                    </p>
                  ) : (
                    !item?.cancelled && (
                      <button
                        onClick={() => cancelBookedAppointment(item?._id)}
                        className="text-sm text-stone-500 w-full text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                      >
                        Cancel appointment
                      </button>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <p className="text-center mt-6 text-zinc-500">No appointment booked</p>
      )}

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
        selectedAppointmentId={selectedAppointmentId}
      />
    </section>
  );
};

export default MyAppointments;
