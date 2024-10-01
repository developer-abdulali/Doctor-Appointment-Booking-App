import { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, aToken, backendURL } = useContext(AdminContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendURL + "/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
        }
      }
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            required
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
          />
        </div>
        <button className="bg-primary w-full py-2 rounded-md text-base text-white">
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              onClick={() => setState("Doctor")}
              className="cursor-pointer text-primary underline"
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
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
