
import{ useState } from "react";
import styles from "../styles/Navbar.module.css";
import useUserData from "../hooks/useUserData";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
const user=useUserData()
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navigate=useNavigate();

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

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>News Today</div>
      <div className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
        <img className={styles.profileImage} src={user?.photoURL} alt="" />
        <p>
          <span>Welcome</span> {user?.displayName}
          <button onClick={handleLogout}>Logout</button>
        </p>
      </div>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
    </nav>
  );
};

export default Navbar;
