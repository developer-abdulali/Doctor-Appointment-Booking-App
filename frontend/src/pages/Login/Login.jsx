import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";

const Login = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { token, setToken, backendURL } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (state === "Signup") {
        const { data } = await axios.post(backendURL + "/user/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendURL + "/user/login", {
          email,
          password,
        });
        if (data?.success) {
          localStorage.setItem("token", data?.token);
          setToken(data?.token);
          toast.success(data?.message);
        } else {
          toast.error(data?.message);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
      }}
    >
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-lg text-zinc-600 text-sm shadow-lg bg-white">
          <p className="text-2xl font-semibold">
            {state === "Signup" ? "Create Account" : "Login"}
          </p>
          <p>
            {state === "Signup" ? "Sign up" : "Log in"} to book an appointment
          </p>
          {state === "Signup" && (
            <div className="w-full">
              <p>Full Name</p>
              <input
                type="text"
                name="name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                className="border border-zinc-300 rounded w-full p-2 mt-1"
              />
            </div>
          )}
          <div className="w-full">
            <p>Email</p>
            <input
              type="email"
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="border border-zinc-300 rounded w-full p-2 mt-1"
            />
          </div>
          <div className="w-full relative">
            <p>Password</p>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="border border-zinc-300 rounded w-full p-2 mt-1"
            />
            <span
              className="absolute right-3 top-9 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button
            type="submit"
            className={`bg-primary text-white w-full py-2 rounded-md text-base flex justify-center items-center ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <FaSpinner className="animate-spin h-6" />
            ) : state === "Signup" ? (
              "Create Account"
            ) : (
              "Login"
            )}
          </button>
          {state === "Signup" ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-primary underline cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create an account{" "}
              <span
                onClick={() => setState("Signup")}
                className="text-primary underline cursor-pointer"
              >
                here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
