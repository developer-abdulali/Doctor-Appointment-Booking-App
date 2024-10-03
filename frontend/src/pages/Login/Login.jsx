import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { token, setToken, backendURL } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === "Sigup") {
        const { data } = await axios.post(backendURL + "/user/register", {
          fullName,
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
      toast.error(data?.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form onSubmit={handleSubmit} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-lg text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Signup" ? "Create Account" : "Login"}
        </p>
        <p>{state === "Signup" ? "sign up" : "log in"} to book appointment</p>
        {state === "Signup" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              type="text"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
            className="border border-zinc-300 rounded w-full p-2 mt-1"
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-zinc-300 rounded w-full p-2 mt-1"
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          {state === "Signup" ? "Create Account" : "Login"}
        </button>
        {state === "Signup" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary underline cursor-pointer"
            >
              login here
            </span>
          </p>
        ) : (
          <p>
            Create an account{" "}
            <span
              onClick={() => setState("Signup")}
              className="text-primary underline cursor-pointer"
            >
              {" "}
              here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};
export default Login;
