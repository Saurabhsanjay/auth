import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineGoogle,
} from "react-icons/ai";
import styles from "../../styles/User.module.css";
import { LoginState } from "../../types/user";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginState>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { email, password } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCreds = await signInWithEmailAndPassword(auth, email, password);

      const user = userCreds.user;
      console.log(user);
      toast.success("Logged In successfully!");
      navigate("/news");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (
        errorCode === "auth/user-not-found" ||
        errorCode === "auth/wrong-password"
      ) {
        toast.error(
          "Email or password is wrong. Please create an account first."
        );
      } else {
        toast.error("Error while logging In.");
      }
      console.log(error, errorCode, errorMessage);
    }
  };

  const togglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Signed in with Google
  const handleGoogleSignIn = async () => {
    try {
      const userCreds = await signInWithPopup(auth, provider);
      const user = userCreds.user;
      console.log(user);
      navigate("/news");
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
          <h1 className={styles.loginHeading}>Login</h1>
          <form className={styles.loginForm} onSubmit={onSubmit}>
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
                  onClick={togglePassword}
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
              LogIn
            </button>
            <div className={styles.orContainer}>
              <div className={styles.line} />
              <p className={styles.orText}>or</p>
              <div className={styles.line} />
            </div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className={styles.googleButton}
            >
              <AiOutlineGoogle size={20} />
              Sign In with Google
            </button>
          </form>

          <p className={styles.loginLink}>
            Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
