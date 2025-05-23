import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { aToken, doctors, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <section className="m-5 max-h-[90vh] overflow-y-scroll mb-20 md:mb-5">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.map((doctor, i) => (
          <div
            key={i}
            className="border border-indigo-200 sm:max-w-56 rounded-xl overflow-hidden cursor-pointer group"
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className="bg-indigo-50 group-hover:bg-primary transition-all duration-500"
            />
            <div className="p-4">
              <p className="text-neutral-800 text-lg font-medium">
                {doctor.name}
              </p>
              <p className="text-zinc-600 text-sm">{doctor.speciality}</p>
              <div className="mt-1 flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  checked={doctor.available}
                  onChange={() => changeAvailability(doctor._id)}
                />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default DoctorsList;
