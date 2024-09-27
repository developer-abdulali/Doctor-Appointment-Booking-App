import Footer from "./components/Footer/Footer";
import Manager from "./components/Manager/Manager";
import Navbar from "./components/Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="min-h-[83vh]">
        <Manager />
      </div>
      <Footer />
    </>
  );
};
export default App;
