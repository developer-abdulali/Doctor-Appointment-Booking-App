const Footer = () => {
  return (
    <div className="bg-slate-800 text-white flex flex-col items-center justify-center w-full">
      <div className="logo text-2xl font-bold text-white">
        <span className="text-green-500">&lt;</span>
        <span>Pass</span>
        <span className="text-green-500">Op/&gt;</span>
      </div>
      <div className="flex justify-center items-center">
        Created with{" "}
        <img src="/icons/heart.svg" alt="heart" className="w-5 mx-2" />
        by code with Ali
      </div>
    </div>
  );
};
export default Footer;
