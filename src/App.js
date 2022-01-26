/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useState } from "react";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

function App() {
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
        <div>
          <button onClick={() => setShowDialog("login")}>Log in</button>
          <button onClick={() => setShowDialog("register")}>Sign up</button>
        </div>

        <Dialog
          onDismiss={() => setShowDialog("false")}
          isOpen={showDialog === "login"}
          aria-label='Login form'
          style={{ boxShadow: "0px 10px 50px hsla(0, 0%, 0%, 0.33)" }}>
          <p>login</p>
          <button onClick={() => setShowDialog("none")}>1</button>
          <button onClick={() => setShowDialog("none")}>2</button>
        </Dialog>
        <Dialog
          onDismiss={() => setShowDialog("false")}
          isOpen={showDialog === "register"}
          aria-label='Register form'
          style={{ boxShadow: "0px 10px 50px hsla(0, 0%, 0%, 0.33)" }}>
          <p>register</p>
          <button onClick={() => setShowDialog("none")}>1</button>
          <button onClick={() => setShowDialog("none")}>2</button>
        </Dialog>
      </div>
    </div>
  );
}

export default App;
