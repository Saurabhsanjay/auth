import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { User } from "../types/user";


const useUserData = (): User | null => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        
        setUser({
         
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
           photoURL: user.photoURL,
        });
        console.log("uid", user.uid);
      } else {
        
        setUser(null);
        console.log("user is logged out");
      }
    });

    return () => {
      
      unsubscribe();
    };
  }, []);

  return user;
};

export default useUserData;
