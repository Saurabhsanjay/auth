import { ReactNode, useState, useEffect } from "react";
import useUserData from "../hooks/useUserData";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
// import { toast } from "react-toastify";


interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const [isAuthResolved, setIsAuthResolved] = useState(false);
  const user = useUserData();

  useEffect(() => {
  
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log(user);
      setIsAuthResolved(true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!isAuthResolved) {
 
    return <div>Loading...</div>;
  }

  if (!user) {
    // toast.error("Please login first")
    console.log("auth please");
    return (
      <>
        <Navigate to="/login" />
      </>
    );
  }

  return children;
};

export default PrivateRoute;
