import  { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";


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
          <Suspense fallback={<div>Loading...</div>}>
           
            <LogIn />
          </Suspense>
        }
      />
      <Route
        path="/"
        element={
            <PrivateRoute>
          <Suspense fallback={<div>Loading...</div>}>
              <Home />
          </Suspense>
            </PrivateRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            
            <Signup />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
