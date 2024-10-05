import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const {
    dToken,
    slotDateFormat,
    dashboardData,
    getDoctorDashboardData,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getDoctorDashboardData();
    }
  }, [dToken]);

  return (
    dashboardData && (
      <section className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img
              src={assets.earning_icon}
              alt="earning_icon"
              className="w-14"
            />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashboardData?.earnings}
              </p>
              <p className="text-gray-400">Earnings</p>
            </div>
          </div>

          <div
            onClick={() => navigate("/doctor-appointments")}
            className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all"
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

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
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

        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-2 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="list_icon" />
            <p className="font-semibold">Latest Bookings</p>
          </div>
        </div>

        <div className="p-4 border border-t-0">
          {dashboardData?.latestAppointments?.length > 0 ? (
            dashboardData?.latestAppointments?.map((item, i) => (
              <div
                key={i}
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
              >
                <img
                  src={item?.userData?.image}
                  alt="user"
                  className="rounded-full w-10"
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item?.userData?.name}
                  </p>
                  <p className="text-gray-600">
                    {slotDateFormat(item?.slotDate)}
                  </p>
                </div>
                {item?.cancelled ? (
                  <p className="text-red-500 text-xs font-medium">Cancelled</p>
                ) : item?.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">
                    Completed
                  </p>
                ) : (
                  <div className="flex items-center gap-1">
                    <img
                      onClick={() => {
                        cancelAppointment(item?._id);
                        getAppointments();
                      }}
                      src={assets.cancel_icon}
                      alt="cancel_icon"
                      className="w-10 cursor-pointer"
                    />
                    <img
                      onClick={() => {
                        completeAppointment(item?._id);
                        getAppointments();
                      }}
                      src={assets.tick_icon}
                      alt="tick_icon"
                      className="w-10 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm text-center py-4">
              No recent bookings.
            </p>
          )}
        </div>
      </section>
    )
  );
};
export default DoctorDashboard;
