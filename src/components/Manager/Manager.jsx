// import { useRef } from "react";

// const Manager = () => {
//   const ref = useRef();

//   const showPassword = () => {
//     alert("show password");
//     if (ref.current.src.includes("icons/eye-crossed.svg")) {
//       ref.current.src = "icons/eye.svg";
//     } else {
//       ref.current.src = "icons/eye-crossed.svg";
//     }
//   };

//   return (
//     <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
//       <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>

//       <div className="mt-20 mycontainer">
//         <h1 className="text-4xl text-center font-bold text">
//           <span className="text-green-500"> &lt;</span>
//           <span>Pass</span>
//           <span className="text-green-500">OP/&gt;</span>
//         </h1>
//         <p className="text-green-900 text-lg text-center">
//           Your own Password Manager
//         </p>

//         <div className="text-black flex flex-col p-4 gap-8">
//           <input
//             type="text"
//             placeholder="Enter website URL"
//             className="rounded-full border border-green-500 w-full p-4 py-1"
//           />

//           <div className="flex gap-8">
//             <input
//               type="text"
//               name=""
//               placeholder="Enter username"
//               className="rounded-full border border-green-500 w-full p-4 py-1"
//             />
//             <div className="relative">
//               <input
//                 type="text"
//                 name=""
//                 placeholder="Enter password"
//                 className="rounded-full border border-green-500 w-full p-4 py-1"
//               />
//               <span
//                 ref={ref}
//                 onClick={showPassword}
//                 className="absolute right-[3px] top-[4px] cursor-pointer"
//               >
//                 <img
//                   src="/icons/eye.svg"
//                   alt="eye"
//                   className="p-1"
//                   width={26}
//                 />
//               </span>
//             </div>
//           </div>
//           {/* add password btn */}
//           <button
//             className="container mx-auto flex items-center gap-2
//            justify-center rounded-full bg-green-400 hover:bg-green-300 px-8 py-2 w-fit border border-green-900"
//           >
//             <lord-icon
//               src="https://cdn.lordicon.com/jgnvfzqg.json"
//               trigger="hover"
//             ></lord-icon>
//             Add Password
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Manager;

import { useEffect } from "react";
import { useState } from "react";

const Manager = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    let passwordArray;
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const savePassword = () => {
    setPasswordArray([...passwordArray, form]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    console.log([...passwordArray, form]);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="mt-20 mycontainer">
        <h1 className="text-4xl text-center font-bold text">
          <span className="text-green-500"> &lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>

        <div className="text-black flex flex-col p-4 gap-8">
          <input
            type="text"
            name="site"
            onChange={handleChange}
            value={form.site}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
          />

          <div className="flex gap-8">
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={form.username}
              placeholder="Enter username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
            />
            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                onChange={handleChange}
                value={form.password}
                placeholder="Enter password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-[3px] top-[4px] cursor-pointer"
              >
                <img
                  src={
                    isPasswordVisible
                      ? "/icons/eye-crossed.svg"
                      : "/icons/eye.svg"
                  }
                  alt="Toggle password visibility"
                  className="p-1"
                  width={26}
                />
              </span>
            </div>
          </div>
          {/* Add Password Button */}
          <button
            onClick={savePassword}
            className="container mx-auto flex items-center gap-2
           justify-center rounded-full bg-green-400 hover:bg-green-300 px-8 py-2 w-fit border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>

        {/* show saved passwords */}
        <div className="password">
          <h2 className="text-xl font-bold py-2">Your password</h2>
          {passwordArray.length === 0 ? (
            <div>No passwords to show</div>
          ) : (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td className="py-2 text-center w-32 border border-white">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                      </td>
                      <td className="py-2 text-center w-32 border border-white">
                        {item.username}
                      </td>
                      <td className="py-2 text-center w-32 border border-white">
                        {item.password}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
