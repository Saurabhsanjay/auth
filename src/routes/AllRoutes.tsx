import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../components/Loader";
import NewsPage from "../pages/news/NewsPage";

const LogIn = lazy(() => import("../pages/auth/Login"));
const Signup = lazy(() => import("../pages/auth/SignUp"));
const Home = lazy(() => import("../pages/Home"));
const PrivateRoute = lazy(() => import("../components/PrivateRoute"));

const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Suspense fallback={<Loader />}>
            <LogIn />
          </Suspense>
        }
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          </PrivateRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <Suspense fallback={<Loader />}>
            <Signup />
          </Suspense>
        }
      />
      <Route
        path="/news"
        element={
          <Suspense fallback={<Loader />}>
            <NewsPage />
          </Suspense>
        }
      />
      {/* <Route
        path="/news/:id"
        element={
          <Suspense fallback={<Loader />}>
            <NewsPage />
          </Suspense>
        }
      /> */}
    </Routes>
  );
};

export default AllRoutes;
