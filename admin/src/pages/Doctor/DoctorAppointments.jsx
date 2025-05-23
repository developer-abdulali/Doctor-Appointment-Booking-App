import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";

const DoctorDashboard = () => {
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
      <p className="mb-3 text-xl font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm overflow-y-scroll">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Age
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Doctor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fees
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments?.reverse()?.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50 ">
                <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <img
                      src={item?.userData?.image}
                      alt="patient img"
                      className="w-8 rounded-full"
                    />
                    <p>{item?.userData?.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {calculateAge(item?.userData?.dob)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {slotDateFormat(item?.slotDate)} | {item?.slotTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <img
                      src={item?.docData?.image}
                      alt="doctor img"
                      className="w-8 rounded-full bg-gray-200"
                    />
                    <p>{item?.docData?.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">${item?.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item?.payment ? item?.paymentMethod : "Not Paid"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item?.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">
                      Cancelled
                    </p>
                  ) : item?.isCompleted ? (
                    <p className="text-green-500 text-xs font-medium">
                      Completed
                    </p>
                  ) : (
                    <div className="flex items-center gap-1">
                      <img
                        onClick={() => handleCancelAppointment(item?._id)}
                        src={assets.cancel_icon}
                        alt="cancel_icon"
                        className="w-6 cursor-pointer"
                      />
                      <img
                        onClick={() => handleCompleteAppointment(item?._id)}
                        src={assets.tick_icon}
                        alt="tick_icon"
                        className="w-6 cursor-pointer"
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DoctorDashboard;
