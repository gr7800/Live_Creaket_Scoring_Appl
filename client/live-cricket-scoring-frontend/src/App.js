import logo from "./logo.svg";
import "./App.css";
import MainRoutes from "./AllRoutes/MainRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./component/Navbar";

function App() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="mt-[55px]">
        <MainRoutes />
        <ToastContainer position="bottom-left" />
      </div>
    </div>
  );
}

export default App;
