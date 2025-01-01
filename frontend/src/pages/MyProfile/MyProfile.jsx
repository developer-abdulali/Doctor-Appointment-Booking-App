import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../../public/assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

const MyProfile = () => {
  const { userData, setUserData, token, backendURL, getUserProfileData } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateUserProfileData = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("userId", userData?._id);
      formData.append("name", userData?.name || "");
      formData.append("email", userData?.email || "");
      formData.append("phone", userData?.phone || "");
      formData.append("address", JSON.stringify(userData?.address || {}));
      formData.append("dob", userData?.dob || "");
      formData.append("gender", userData?.gender || "");
      if (image) formData.append("image", image);

      const { data } = await axios.post(
        `${backendURL}/user/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await getUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("An error occurred while updating your profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    userData && (
      <section className="max-w-lg mx-auto p-4 sm:p-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center gap-4 text-sm">
          {isEdit ? (
            <label htmlFor="image" className="cursor-pointer">
              <div className="relative">
                <img
                  src={image ? URL.createObjectURL(image) : userData?.image}
                  alt="Profile"
                  className="w-36 h-36 rounded-full object-cover opacity-75"
                />
                {!image && !userData?.image && (
                  <img
                    src={assets.upload_icon}
                    alt="Upload Icon"
                    className="w-10 absolute bottom-4 right-4"
                  />
                )}
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
          ) : (
            <img
              src={userData?.image}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover"
            />
          )}

          {isEdit ? (
            <input
              type="text"
              value={userData?.name}
              placeholder="Choose name"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="bg-gray-50 text-3xl font-medium w-full p-2 mt-4 border border-gray-300 rounded"
            />
          ) : (
            <p className="font-medium text-3xl text-neutral-800 mt-4">
              {userData?.name}
            </p>
          )}
          <hr className="bg-zinc-400 h-[1px] border-none w-full mt-4" />
          <div className="w-full">
            <p className="text-neutral-500 underline mt-3">
              CONTACT INFORMATION
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 text-neutral-700">
              <div>
                <p className="font-medium">Email id:</p>
                {isEdit ? (
                  <input
                    type="email"
                    value={userData?.email}
                    placeholder="Choose email"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="bg-gray-100 w-full p-2 mt-1 border border-gray-300 rounded"
                  />
                ) : (
                  <p className="text-blue-500">{userData?.email}</p>
                )}
              </div>
              <div>
                <p className="font-medium">Phone:</p>
                {isEdit ? (
                  <input
                    type="text"
                    value={userData?.phone}
                    placeholder="Choose phone number"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="bg-gray-100 w-full p-2 mt-1 border border-gray-300 rounded"
                  />
                ) : (
                  <p className="text-blue-400">{userData?.phone}</p>
                )}
              </div>

              <div>
                <p className="font-medium">Address:</p>
                {isEdit ? (
                  <div className="flex flex-col">
                    <input
                      type="text"
                      value={userData?.address?.line1}
                      placeholder="address"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                      className="bg-gray-50 p-2 w-full sm:w-[28rem] mt-1 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      value={userData?.address?.line2}
                      placeholder="city, state or country"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))
                      }
                      className="bg-gray-50 p-2 w-full sm:w-[28rem] mt-1 border border-gray-300 rounded"
                    />
                  </div>
                ) : (
                  <p className="text-gray-500">
                    {userData?.address?.line1} <br />
                    {userData?.address?.line2}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full">
            <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 text-neutral-700">
              <div>
                <p className="font-medium">Gender</p>
                {isEdit ? (
                  <select
                    value={userData?.gender || ""}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    className="bg-gray-100 w-full p-2 mt-1 border border-gray-300 rounded"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <p className="text-gray-400">
                    {userData?.gender || "Not specified"}
                  </p>
                )}
              </div>

              <div>
                <p className="font-medium">Birthday</p>
                {isEdit ? (
                  <input
                    type="date"
                    value={userData?.dob}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, dob: e.target.value }))
                    }
                    className="bg-gray-100 w-full p-2 mt-1 border border-gray-300 rounded"
                  />
                ) : (
                  <p className="text-gray-400">{userData?.dob}</p>
                )}
              </div>
            </div>
          </div>

          {/* save information btn */}
          <div className="mt-10">
            {isEdit ? (
              <button
                onClick={updateUserProfileData}
                profile
                data
                className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <FaSpinner className="animate-spin mr-2" />{" "}
                    {/* Spinner icon */}
                    Loading...
                  </span>
                ) : (
                  "Save Information"
                )}
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300"
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

export default MyProfile;
