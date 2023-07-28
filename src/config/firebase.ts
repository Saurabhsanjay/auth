
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBarqxHZJGF2_5-Nz41UU3gxHK9kvBa_kM",
  authDomain: "auth-1e414.firebaseapp.com",
  projectId: "auth-1e414",
  storageBucket: "auth-1e414.appspot.com",
  messagingSenderId: "1058037825924",
  appId: "1:1058037825924:web:b909f4db6192c863b89dd1",
  measurementId: "G-T20ZKF48E7"
};

 
// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const provider=new GoogleAuthProvider();

