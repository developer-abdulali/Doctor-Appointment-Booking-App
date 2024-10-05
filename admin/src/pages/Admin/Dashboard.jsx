import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    aToken,
    dashboardData,
    getDashboardData,
    cancelAppointments,
    slotDateFormat,
  } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashboardData();
    }
  }, [aToken]);

  return (
    dashboardData && (
      <section className="m-5">
        <div className="flex flex-wrap gap-3">
          <div
            onClick={() => navigate("/doctor-list")}
            className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all"
          >
            <img src={assets.doctor_icon} alt="doctor_icon" className="w-14" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashboardData?.doctors}
              </p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>

          <div
            onClick={() => navigate("/all-appointments")}
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
                  src={item?.docData?.image}
                  alt="doctor"
                  className="rounded-full w-10"
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item?.docData?.name}
                  </p>
                  <p className="text-gray-600">
                    {slotDateFormat(item?.slotDate)}
                  </p>
                </div>
                {item?.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : item?.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">
                    Completed
                  </p>
                ) : (
                  <img
                    onClick={() => cancelAppointments(item?._id)}
                    src={assets.cancel_icon}
                    alt="cancel_icon"
                    className="w-10 cursor-pointer"
                  />
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

export default Dashboard;
