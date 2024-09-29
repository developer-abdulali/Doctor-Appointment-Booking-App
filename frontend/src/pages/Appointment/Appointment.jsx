import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../../public/assets/assets";
import RelatedDoctors from "../../components/RelatedDoctors/RelatedDoctors";

const Appointment = () => {
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = () => {
    const doctor = doctors.find((doc) => doc._id === docId);
    setDoctorInfo(doctor);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]); // Clear the previous slots

    // Getting current date
    let today = new Date();
    let allTimeSlots = []; // To collect all slots before setting state

    for (let i = 0; i < 7; i++) {
      // Getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Setting end time of the date with index to 9 PM (21:00)
      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0); // End time set to 9 PM

      // Setting hours for the current day
      if (i === 0 && today.getDate() === currentDate.getDate()) {
        // If today, adjust time based on the current hour
        let currentHour = currentDate.getHours();
        let currentMinutes = currentDate.getMinutes();

        // Set the hour to 10 AM if current time is before 10 AM
        currentDate.setHours(currentHour >= 10 ? currentHour + 1 : 10);
        currentDate.setMinutes(currentMinutes > 30 ? 30 : 0);
      } else {
        // For future days, set the time to 10:00 AM
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      // Generate time slots until the end time
      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true, // Enable 12-hour format with AM/PM
        });

        // Add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        // Increment the current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      // Collect all time slots
      allTimeSlots.push(timeSlots);
    }

    // Set the state once with all the collected slots
    setDocSlots(allTimeSlots);
  };

  // const getAvailableSlots = async () => {
  //   setDocSlots([]); // Clear the previous slots

  //   // Getting current date
  //   let today = new Date();
  //   let allTimeSlots = []; // To collect all slots before setting state

  //   for (let i = 0; i < 7; i++) {
  //     // Getting date with index
  //     let currentDate = new Date(today);
  //     currentDate.setDate(today.getDate() + i);

  //     // Setting end time of the date with index to 9 PM (21:00)
  //     let endTime = new Date(today);
  //     endTime.setDate(today.getDate() + i);
  //     endTime.setHours(21, 0, 0, 0); // End time set to 9 PM

  //     // Setting hours for the current day
  //     if (i === 0 && today.getDate() === currentDate.getDate()) {
  //       // If today, adjust time based on the current hour
  //       let currentHour = currentDate.getHours();
  //       let currentMinutes = currentDate.getMinutes();

  //       // Set the hour to 10 AM if current time is before 10 AM
  //       currentDate.setHours(currentHour >= 10 ? currentHour + 1 : 10);
  //       currentDate.setMinutes(currentMinutes > 30 ? 30 : 0);
  //     } else {
  //       // For future days, set the time to 10:00 AM
  //       currentDate.setHours(10);
  //       currentDate.setMinutes(0);
  //     }

  //     // Generate time slots until the end time
  //     let timeSlots = [];
  //     while (currentDate < endTime) {
  //       let formattedTime = currentDate.toLocaleTimeString([], {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //       });

  //       // Add slot to array
  //       timeSlots.push({
  //         datetime: new Date(currentDate),
  //         time: formattedTime,
  //       });

  //       // Increment the current time by 30 minutes
  //       currentDate.setMinutes(currentDate.getMinutes() + 30);
  //     }

  //     // Collect all time slots
  //     allTimeSlots.push(timeSlots);
  //   }

  //   // Set the state once with all the collected slots
  //   setDocSlots(allTimeSlots);
  // };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docId]);

  return (
    doctorInfo && (
      <section className="">
        {/* doctor details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              src={doctorInfo.image}
              alt="doctor img"
              className="bg-primary w-full sm:max-w-72 rounded-lg"
            />
          </div>
          {/* doctor info: name, degree,experience etc */}
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {doctorInfo.name}
              <img
                src={assets.verified_icon}
                alt="verified_icon"
                className="w-5"
              />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {doctorInfo.degree} - {doctorInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {doctorInfo.experience}
              </button>
            </div>

            {/* doctor about  */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="info_icon" />
              </p>
              <p className="text-sm text-gray-500 mt-1 max-w-[700px]">
                {doctorInfo.about}
              </p>
            </div>
            <p className="text-gray-600 font-medium mt-4">
              Appointment fee:{" "}
              <span>
                {currencySymbol}
                {doctorInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* booking slots */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots</p>
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setSlotIndex(i)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === i
                      ? "bg-primary text-white"
                      : "border border-gray-200"
                  }`}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          {/* booking slot time */}
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots[slotIndex].map((item, i) => (
                <p
                  key={i}
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-primary text-white"
                      : "text-gray-400 border border-gray-300"
                  }`}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

          {/* book appointment btn */}
          <button className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6">
            Book an appointment
          </button>
        </div>

        {/* listing related doctors */}
        <RelatedDoctors docId={docId} speciality={doctorInfo.speciality} />
      </section>
    )
  );
};
export default Appointment;
