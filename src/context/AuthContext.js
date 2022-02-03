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
      console.log(user);
    } catch (err) {
      console.log(err);
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
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};