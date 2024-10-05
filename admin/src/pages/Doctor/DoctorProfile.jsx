import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  // const navigate = useNavigate();
  const {
    dToken,
    slotDateFormat,
    setProfileData,
    backendURL,
    profileData,
    getDoctorProfile,
  } = useContext(DoctorContext);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (dToken) {
      getDoctorProfile();
    }
  }, [dToken]);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const { data } = await axios.post(
        backendURL + "/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getDoctorProfile();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    profileData && (
      <section>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              src={profileData?.image}
              alt="doctor img"
              className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
            />
          </div>

          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            {/* doctor info: name, degree, experience */}
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {profileData?.name}
            </p>

            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {profileData?.degree} - {profileData?.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {profileData?.experience}
              </button>
            </div>

            {/* doctor about */}
            <div>
              <p className="flex items-center gap-1 text-sm font-semibold text-neutral-800 mt-3">
                About:
              </p>
              <p className="text-sm text-gray-600 mt-1 max-w-[700px]">
                {profileData?.about}
              </p>
            </div>

            <p className="text-gray-600 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-800">
                $
                {isEdit ? (
                  <input
                    type="Number"
                    value={profileData?.fees}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                  />
                ) : (
                  profileData?.fees
                )}
              </span>
            </p>

            <div className="flex gap-2 py-2">
              <p>Address:</p>
              <p className="text-sm">
                {isEdit ? (
                  <input
                    type="text"
                    value={profileData.address.line1}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                  />
                ) : (
                  profileData?.address?.line1
                )}
                <br />
                {isEdit ? (
                  <input
                    type="text"
                    value={profileData.address.line2}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                  />
                ) : (
                  profileData?.address?.line2
                )}
              </p>
            </div>

            <div className="flex gap-1 pt-2">
              <input
                type="checkbox"
                name=""
                id=""
                checked={profileData?.available}
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
              />
              <label htmlFor="">Available</label>
            </div>

            {isEdit ? (
              <button
                onClick={updateProfile}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </section>
    )
  );
};
export default DoctorProfile;
