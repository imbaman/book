/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import BooksForYou from "./BooksForYou";
import Unauthenticated from "./Unauthenticated";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();
  console.log(user);
  return user ? <BooksForYou /> : <Unauthenticated />;
}

export default App;
