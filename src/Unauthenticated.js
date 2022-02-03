/** @jsx jsx */
import { jsx } from "@emotion/react";

import { useState, useRef } from "react";
import "@reach/dialog/styles.css";
import { Button, Input, CustomDialog, Spinner } from "./components/lib";
import { useAuth } from "./context/AuthContext";
import { auth } from "./firebase";

//  clean this up
//
//

function LoginForm({ buttonText }) {
  const { loginAsGuest, login } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
  }
  const emailRef = useRef();
  const passwordRef = useRef();
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        css={{
          "> div": { margin: "10px auto", maxWidth: "350px", width: "100%" },
        }}>
        <div css={{ display: "flex", flexDirection: "column" }}>
          <Button
            onClick={() => {
              loginAsGuest(auth);
            }}>
            Log in as a guest
          </Button>
        </div>

        <div css={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor='email'>Email</label>
          <Input id='email' ref={emailRef} placeholder='test@321.com' />
        </div>
        <div css={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor='password'>Password</label>
          <Input
            id='password'
            ref={passwordRef}
            type='password'
            placeholder='test123'
          />
        </div>
        <div>
          <Button
            onClick={() =>
              login(auth, emailRef.current.value, passwordRef.current.value)
            }>
            {buttonText}
          </Button>
          <Spinner />
        </div>
      </form>
    </div>
  );
}

function RegisterForm({ buttonText }) {
  const { signup } = useAuth();
  const passwordRef = useRef();
  const emailRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
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
          <Input id='email' ref={emailRef} placeholder='test@321.com' />
        </div>
        <div css={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor='password'>Password</label>
          <Input
            id='password'
            ref={passwordRef}
            type='password'
            placeholder='test123'
          />
        </div>
        <div>
          <Button
            type='submit'
            onClick={() => {
              signup(auth, emailRef.current.value, passwordRef.current.value);
            }}>
            {buttonText}
          </Button>
          <Spinner />
        </div>
      </form>
    </div>
  );
}

function Unauthenticated() {
  const [showDialog, setShowDialog] = useState("none");

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
          <LoginForm buttonText={"login"} showDialog={showDialog} />
        </CustomDialog>

        <CustomDialog
          onDismiss={() => setShowDialog("false")}
          isOpen={showDialog === "register"}
          aria-label='Register form'>
          <p>register</p>
          <RegisterForm buttonText={"register"} />
        </CustomDialog>
      </div>
    </div>
  );
}

export default Unauthenticated;
