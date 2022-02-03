import React from "react";
import BooksForYou from "./BooksForYou";
import { useAuth } from "./context/AuthContext";

const Authenticated = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <nav>
        {user.email ? user.email : "Guest"}
        <button onClick={logout}>Log out</button>
      </nav>
      <BooksForYou />
    </div>
  );
};

export default Authenticated;
