import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <section className="max-w-7xl mx-auto p-6">
      <p className="text-gray-700 text-xl mb-6">Browse Doctors by Speciality</p>

      <div className="flex flex-col sm:flex-row items-start gap-8">
        {/* Sidebar for Specialities */}
        <div className="flex flex-col gap-4 w-full sm:w-1/3 lg:w-1/4">
          {[
            "General physician",
            "Gynecologist",
            "Dermatologist",
            "Pediatricians",
            "Neurologist",
            "Gastroenterologist",
          ].map((specialityName) => (
            <p
              key={specialityName}
              onClick={() =>
                speciality === specialityName
                  ? navigate("/doctors")
                  : navigate(`/doctors/${specialityName}`)
              }
              className={`pl-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-blue-100 cursor-pointer transition-all duration-300 ${
                speciality === specialityName
                  ? "bg-blue-100 font-medium text-blue-600"
                  : "text-gray-700"
              }`}
            >
              {specialityName}
            </p>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterDoc?.map((doctor, i) => (
            <div
              onClick={() => navigate(`/appointment/${doctor._id}`)}
              key={i}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            >
              <img src={doctor.image} alt="item.image" className="bg-blue-50" />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="h-2 w-2 rounded-full bg-green-500"></p>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">
                  {doctor.name}
                </p>
                <p className="text-gray-600 text-sm">{doctor.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
