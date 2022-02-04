/** @jsx jsx */
import { jsx } from "@emotion/react";
import Unauthenticated from "./Unauthenticated";
import AppProviders from "./context/AppProviders";
import { useAuth } from "./context/AuthContext";
import Authenticated from "./Authenticated";
import { BrowserRouter } from "react-router-dom";
function App() {
  const { user } = useAuth();
  // console.log(user?.uid);
  return user ? <Authenticated /> : <Unauthenticated />;
}

export default App;
