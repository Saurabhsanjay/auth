
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllRoutes from "./routes/AllRoutes";

function App() {
  return (
    <div>
      <AllRoutes/>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default App;
