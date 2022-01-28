/** @jsx jsx */
import { jsx, keyframes } from "@emotion/react";
import * as colors from "../styles/colors";
import styled from "@emotion/styled";
import Dialog from "@reach/dialog";
import { ImSpinner9 } from "react-icons/im";
//media queries
const small = "@media (max-width:991px)";

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});
const Spinner = styled(ImSpinner9)({
  animation: `${spin} 1s linear infinite`,
});

const CustomDialog = styled(Dialog)({
  boxShadow: "0px 10px 50px hsla(0, 0%, 0%, 0.33)",
  padding: "1rem",
  [small]: {
    width: "100%",
    margin: "10vh 0",
  },
});
const Button = styled.button(
  {
    // fontSize: "20px",
    // fontWeight: "200",
    // letterSpacing: "1px",
    padding: "13px 50px 13px",
    border: "1px solid black",
    cursor: "pointer",
    backgroundColor: "rgba(0, 0, 0, 0)",
    ":hover": {
      backgroundColor: colors.yellow,
    },
  },
  (props) => ({ backgroundColor: props.color })
);

const Input = styled.input({
  borderRadius: "1px",
  border: "1px solid #f4f4f4",
  background: colors.yellow,
  padding: "8px 12px",
});

export { Button, Input, CustomDialog, Spinner };
