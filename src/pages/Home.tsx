import React, { useEffect, useState } from "react";
import useUserData from "../hooks/useUserData";
import styles from "../styles/Home.module.css";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home: React.FC = () => {
      const navigate = useNavigate();
  const user = useUserData();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // Function to reset the inactivity timer
    const resetInactivityTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleLogout, 60000);
      setTimer(60);
    };

    // Add event listener to reset the inactivity timer on user activity
    document.addEventListener("mousemove", resetInactivityTimer);
    document.addEventListener("keydown", resetInactivityTimer);

    // Initial timer start
    resetInactivityTimer();
    const intervalId = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => {
      // Clean up event listeners and timers when component unmounts
      document.removeEventListener("mousemove", resetInactivityTimer);
      document.removeEventListener("keydown", resetInactivityTimer);
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);


    const handleLogout = async () => {
      try {
        
        await signOut(auth);
        navigate("/login");
        toast.success("Logged out successfully!");
      } catch (error) {
       
        console.log(error);
        toast.error("Error while logging out.");
      }
    };

  const handleSignOutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    handleLogout();
  };

  return (
    <section className={styles.profileContainer}>
      {user ? (
        <div>
          <h1 className={styles.profileHeader}>
            Welcome, {user.displayName || user.email}
          </h1>
          {user.photoURL && (
            <img
              className={styles.profileImage}
              src={user.photoURL}
              alt="Profile"
            />
          )}
          <p className={styles.profileInfo}>Email: {user.email}</p>
          <p className={styles.profileInfo}>UID: {user.uid}</p>

          <button onClick={handleSignOutClick}>Logout</button>
          <p>Logging out in {timer} seconds...</p>
          {isLogoutModalOpen && (
            <div className={styles.logoutModal}>
              <p>
                Are you sure you want to log out? Logging out in {timer}{" "}
                seconds...
              </p>
              <button onClick={handleCancelLogout}>Cancel</button>
              <button onClick={handleConfirmLogout}>Logout</button>
            </div>
          )}
        </div>
      ) : (
        <p className={styles.profileInfo}>
          Please log in first
        </p>
      )}
    </section>
  );
};

export default Home;
