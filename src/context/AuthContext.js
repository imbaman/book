import React, { createContext, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInAnonymously,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [error, setError] = useState("");
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const signup = async (auth, email, password) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };

  const login = async (auth, email, password) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      setError("");
      console.log(user);
    } catch (err) {
      console.log("asd", err.message);
      switch (err.message) {
        case "Firebase: Error (auth/invalid-email).":
          setError("please enter data");
          break;
        case "Firebase: Error (auth/wrong-password).":
          setError("invalid password");
          break;
        case "Firebase: Error (auth/internal-error).":
          setError("please enter password");
          break;
        case "Firebase: Error (auth/user-not-found).":
          setError("user not found");
          break;
        default:
          setError("");
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const loginAsGuest = async () => {
    try {
      await signInAnonymously(auth);
    } catch (err) {
      console.log(err);
    }
  };
  const value = {
    user,
    signup,
    logout,
    login,
    loginAsGuest,
    error,
    setError,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
