const Navbar = () => {
  return (
    <div className="bg-slate-800 text-white">
      <div className="mycontainer flex items-center justify-between py-5 h-14">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-500"> &lt;</span>
          Pass<span className="text-green-500">OP/&gt;</span>
        </div>

        <ul>
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
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
