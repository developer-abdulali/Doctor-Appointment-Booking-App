import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    getDoctorDashboardData,
    dashboardData,
    calculateAge,
    slotDateFormat,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getDoctorDashboardData();
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
    <section className="w-full p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
        <div
          onClick={() => navigate("/doctor-list")}
          className="flex items-center gap-2 bg-white p-4 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all w-full"
        >
          <img src={assets.earning_icon} alt="doctor_icon" className="w-14" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData?.earnings}
            </p>
            <p className="text-gray-400">Earnings</p>
          </div>
        </div>

        <div
          onClick={() => navigate("/all-appointments")}
          className="flex items-center gap-2 bg-white p-4 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all w-full"
        >
          <img
            src={assets.appointments_icon}
            alt="appointments_icon"
            className="w-14"
          />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData?.appointments}
            </p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all w-full">
          <img
            src={assets.patients_icon}
            alt="patients_icon"
            className="w-14"
          />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData?.patients}
            </p>
            <p className="text-gray-400">Patients</p>
          </div>
        </div>
      </div>

      <p className="mb-3 text-xl font-semibold">All Appointments</p>
      <div className="bg-white border rounded shadow-sm overflow-x-auto">
        {/* Table header */}
        <table className="min-w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6 text-left">Patient</th>
              <th className="py-3 px-6 text-left">Age</th>
              <th className="py-3 px-6 text-left">Date & Time</th>
              <th className="py-3 px-6 text-left">Doctor</th>
              <th className="py-3 px-6 text-left">Fees</th>
              <th className="py-3 px-6 text-left">Payment</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Show message if no appointments */}
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-5 text-gray-500">
                  No appointments
                </td>
              </tr>
            ) : (
              appointments.reverse().map((item, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="py-3 px-6 hidden sm:table-cell">{i + 1}</td>
                  <td className="py-3 px-6">
                    <div className="flex items-center gap-2">
                      <img
                        src={item?.userData?.image}
                        alt="patient img"
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{item?.userData?.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 hidden sm:table-cell">
                    {calculateAge(item?.userData?.dob)}
                  </td>
                  <td className="py-3 px-6">
                    {slotDateFormat(item?.slotDate)} | {item?.slotTime}
                  </td>
                  <td className="py-3 px-6">
                    <div className="flex items-center gap-2">
                      <img
                        src={item?.docData?.image}
                        alt="doctor img"
                        className="w-8 h-8 rounded-full bg-gray-200"
                      />
                      <span>{item?.docData?.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6">${item?.amount}</td>
                  <td className="py-3 px-6">
                    {item?.payment ? item?.paymentMethod : "Not Paid"}
                  </td>
                  <td className="py-3 px-6">
                    {item?.cancelled ? (
                      <span className="text-red-500 text-xs font-medium">
                        Cancelled
                      </span>
                    ) : item?.isCompleted ? (
                      <span className="text-green-500 text-xs font-medium">
                        Completed
                      </span>
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
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DoctorAppointments;
