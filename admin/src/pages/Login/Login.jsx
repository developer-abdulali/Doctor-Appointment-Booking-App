import { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../../context/DoctorContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setAToken, backendURL } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendURL + "/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          toast.success("Logged in successfully!");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendURL + "/doctor/login", {
          email,
          password,
        });
        if (data?.success) {
          localStorage.setItem("dToken", data?.token);
          setDToken(data?.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen flex items-center justify-center px-4 sm:px-0"
    >
      <div className="flex flex-col gap-4 bg-white shadow-xl rounded-lg p-6 sm:p-8 max-w-sm w-full">
        <p className="text-2xl font-semibold text-center">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full">
          <label htmlFor="email" className="text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
            className="border border-zinc-300 rounded w-full p-2 mt-1"
          />
        </div>
        <div className="w-full relative">
          <label htmlFor="password" className="text-gray-700">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
            className="border border-zinc-300 rounded w-full p-2 mt-1"
          />
          <span
            className="absolute right-3 top-10 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-primary w-full py-3 rounded-md text-white font-semibold flex items-center justify-center transition-all hover:bg-primary/90"
        >
          {loading ? (
            <span className="loader border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
          ) : (
            "Login"
          )}
        </button>
        {state === "Admin" ? (
          <p className="text-sm text-gray-600 text-center">
            Doctor Login?{" "}
            <span
              onClick={() => setState("Doctor")}
              className="cursor-pointer text-primary underline"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-600 text-center">
            Admin Login?{" "}
            <span
              onClick={() => setState("Admin")}
              className="cursor-pointer text-primary underline"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
