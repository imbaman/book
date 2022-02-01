/** @jsx jsx */
import { jsx } from "@emotion/react";

import { useState } from "react";
import "@reach/dialog/styles.css";
import { Button, Input, CustomDialog, Spinner } from "./components/lib";
import { useAuth } from "./context/AuthContext";
import { auth } from "./firebase";

function LoginForm({ buttonText, onSubmit }) {
  const { signup } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = e.target.elements;

    signup(auth, email.value, password.value);
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        css={{
          // display: "flex",
          // flexDirection: "column",
          // alignItems: "stretch",
          "> div": { margin: "10px auto", maxWidth: "350px", width: "100%" },
        }}>
        <div css={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor='email'>Email</label>
          <Input id='email' />
        </div>
        <div css={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor='password'>Password</label>
          <Input id='password' type='password' />
        </div>
        <div>
          <Button type='submit'>{buttonText}</Button>
          <Spinner />
        </div>
      </form>
    </div>
  );
}

function Unauthenticated({ login, register }) {
  const [showDialog, setShowDialog] = useState("none");

  //   function login(formData) {
  //     console.log("login", formData);
  //   }
  function register(formData) {
    console.log("register", formData);
  }
  return (
    <div
      css={{
        backgroundImage: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
        height: "100vh",
      }}>
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
        }}>
        <h1>Logo</h1>
        <div css={{ display: "flex" }}>
          <Button onClick={() => setShowDialog("login")}>Log In</Button>
          <Button color='white' onClick={() => setShowDialog("register")}>
            Sign up
          </Button>
        </div>

        <CustomDialog
          onDismiss={() => setShowDialog("false")}
          isOpen={showDialog === "login"}
          aria-label='Login form'>
          <p>login</p>
          <LoginForm buttonText={"login"} onSubmit={login} />
        </CustomDialog>
        <CustomDialog
          onDismiss={() => setShowDialog("false")}
          isOpen={showDialog === "register"}
          aria-label='Register form'>
          <p>register</p>
          <LoginForm buttonText={"register"} onSubmit={register} />
        </CustomDialog>
      </div>
    </div>
  );
}

export default Unauthenticated;
