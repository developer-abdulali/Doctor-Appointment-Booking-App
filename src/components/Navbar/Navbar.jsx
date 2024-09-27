const Navbar = () => {
  return (
    <div className="bg-slate-800 text-white sticky top-0">
      <div className="px-2 md:px-0 mycontainer flex items-center justify-between py-5 h-14 z-50">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-500"> &lt;</span>
          Pass<span className="text-green-500">OP/&gt;</span>
        </div>

        {/* <ul>
          <li className="flex gap-4">
            <a href="/" className="hover:font-bold">
              Home
            </a>
            <a href="/" className="hover:font-bold">
              About
            </a>
            <a href="/" className="hover:font-bold">
              Contact
            </a>
          </li>
        </ul> */}

        <button
          onClick={() =>
            window.open("https://github.com/developer-abdulali", "_blank")
          }
          className="text-white bg-green-700 my-5 mx-2 rounded-full flex items-center justify-between ring-1 ring-white"
        >
          <img
            src="/icons/github.svg"
            alt="Github logo"
            className="invert w-10 p-1"
          />
          <span className="font-semibold px-2">Github</span>
        </button>
      </div>
    </div>
  );
};
export default Navbar;
