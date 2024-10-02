import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { RxEyeClosed } from "react-icons/rx";
import { PiEyeBold } from "react-icons/pi";
import "react-toastify/dist/ReactToastify.css";

const AddDoctor = () => {
  const { aToken, backendURL } = useContext(AdminContext);

  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!docImg) {
        toast.error("Please select an image");
        return;
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const promise = axios.post(backendURL + "/admin/add-doctor", formData, {
        headers: { aToken },
      });

      toast.promise(promise, {
        pending: "Adding doctor...",
        success: "Doctor added successfully",
        error: "Failed to add doctor",
      });

      const { data } = await promise;

      if (data.success) {
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFees("");
        setAbout("");
        setSpeciality("General physician");
        setDegree("");
        setAddress1("");
        setAddress2("");
        setFees("");
        setDocImg(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="upload area"
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
            />
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            onChange={(e) => setDocImg(e.target.files[0])}
          />
          <p>
            Upload doctor <br />
            picture
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-1 flex-1">
              <p>Doctor name</p>
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded px-3 py-2"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <p>Doctor Email</p>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded px-3 py-2"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <p>Doctor Password</p>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border rounded px-3 py-2 w-full"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <RxEyeClosed /> : <PiEyeBold />}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <p>Experience</p>
              <select
                name=""
                id=""
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="border rounded px-3 py-2"
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Years">5 Years</option>
                <option value="6 Years">6 Years</option>
                <option value="7 Years">7 Years</option>
                <option value="8 Years">8 Years</option>
                <option value="9 Years">9 Years</option>
                <option value="10 Years">10 Years</option>
              </select>
            </div>
            <div>
              <p>Fees</p>
              <input
                type="number"
                placeholder="Fees"
                required
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                className="border rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-1 flex-1">
              <p>Speciality</p>
              <select
                name=""
                id=""
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className="border rounded px-3 py-2"
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologits">Gastroenterologits</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <p>Degree</p>
              <input
                type="text"
                placeholder="Degree"
                required
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="border rounded px-3 py-2"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <p>Address</p>
              <input
                type="text"
                placeholder="Address 1"
                required
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Address 2"
                required
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className="border rounded px-3 py-2"
              />
            </div>
          </div>
        </div>
        {/* about doctor */}
        <div>
          <p className="my-3">About Doctor</p>
          <textarea
            name=""
            id=""
            rows={5}
            placeholder="Write about the doctor"
            required
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full px-4 pt-2 border rounded"
          ></textarea>

          <button
            type="submit"
            className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
          >
            Add doctor
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
