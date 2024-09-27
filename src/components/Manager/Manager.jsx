import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

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
    setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]),
      setForm({ site: "", username: "", password: "" }),
      toast.success("Passwords saved successfully")
    );
    console.log([...passwordArray, form]);
  };

  const deletePassword = (id) => {
    // let c = window.confirm("Are you sure you want to delete this password?");
    // if (c) {
    const updatedPasswordArray = passwordArray.filter((p) => p.id !== id);
    setPasswordArray(updatedPasswordArray);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));
    toast.success("Password deleted successfully");
    // }
  };

  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find((i) => i.id === id);
    if (passwordToEdit) {
      setForm({
        site: passwordToEdit.site,
        username: passwordToEdit.username,
        password: passwordToEdit.password,
      });
      // Optionally, remove the item from the array to avoid duplicates.
      setPasswordArray(passwordArray.filter((p) => p.id !== id));
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast.success("Copied to clipboard!");
    navigator.clipboard.writeText(text);
  };
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="p-2 md:pt-10 md:mycontainer">
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

          <div className="flex flex-col md:flex-row gap-8">
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
                className="z-0 rounded-full border border-green-500 w-full p-4 py-1"
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
          {/* save password button */}
          <button
            onClick={savePassword}
            className="container mx-auto flex items-center gap-2
           justify-center rounded-full bg-green-400 hover:bg-green-300 px-5 py-2 w-fit border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
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
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td className="py-2 text-center border border-white">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            onClick={() => {
                              copyText(item.site);
                            }}
                            className="lordiconcopy size-7 cursor-pointer"
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              style={{
                                width: "25px",
                                height: "25",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 text-center border border-white">
                        <div className="flex items-center justify-center">
                          <span> {item.username}</span>
                          <div
                            onClick={() => {
                              copyText(item.username);
                            }}
                            className="lordiconcopy size-7 cursor-pointer"
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              style={{
                                width: "25px",
                                height: "25",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 text-center border border-white">
                        <div className="flex items-center justify-center">
                          <span> {item.password}</span>
                          <div
                            onClick={() => {
                              copyText(item.password);
                            }}
                            className="lordiconcopy size-7 cursor-pointer"
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              style={{
                                width: "25px",
                                height: "25",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      {/* edit and delete actions */}
                      <td className="py-2 text-center border border-white">
                        <span
                          onClick={() => {
                            editPassword(item.id);
                          }}
                          className="cursor-pointer mx-1"
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/ylvuooxd.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                          className="cursor-pointer mx-1"
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
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
