import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineGoogle } from "react-icons/ai"; 
import styles from "../styles/User.module.css";
import { SignupState } from "../types/user";
import { toast } from "react-toastify";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignupState>({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { name, email, password } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Signed in
      const user = userCredential.user;
      console.log(user);
      navigate("/login");
      toast.success("Signup successfully!");
    } catch (error: any) {
      const errorCode = error.code;
       toast.error(`${error.message}`);
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Signed in with Google
  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      console.log(user);
      navigate("/login");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  return (
    <main className={styles.mainContainer}>
      <section className={styles.loginSection}>
        <div className={styles.loginContainer}>
          <h1 className={styles.loginHeading}>Signup</h1>
          <form className={styles.loginForm} onSubmit={onSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email-address">Email address</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
                placeholder="Email address"
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.passwordInputContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  className={styles.formInput}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={styles.passwordToggle}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className={styles.submitButton}>
              Sign up
            </button>
            <div className={styles.orContainer}>
              <div className={styles.line} />
              <p className={styles.orText}>or</p>
              <div className={styles.line} />
            </div>
            <button
              type="button"
              onClick={handleGoogleSignup}
              className={styles.googleButton}
            >
              <AiOutlineGoogle size={20} />
              Sign up with Google
            </button>
          </form>

          <p className={styles.loginLink}>
            Already have an account? <NavLink to="/login">Sign in</NavLink>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Signup;
