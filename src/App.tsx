
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllRoutes from "./routes/AllRoutes";
import Navbar from "./components/Navbar";
import useUserData from "./hooks/useUserData";

function App() {
  const user=useUserData();
    const isUserAvailable = !!user;
  return (
    <div>
      {isUserAvailable && <Navbar />}
      <AllRoutes />
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default App;
