import  { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../components/Loader";


const LogIn = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/SignUp"));
const Home = lazy(() => import("../pages/Home"));
const PrivateRoute = lazy(() => import("../components/PrivateRoute"));

const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Suspense fallback={<Loader/>}>
           
            <LogIn />
          </Suspense>
        }
      />
      <Route
        path="/"
        element={
            <PrivateRoute>
          <Suspense fallback={<Loader/>}>
              <Home />
          </Suspense>
            </PrivateRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <Suspense fallback={<Loader/>}>
            
            <Signup />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
