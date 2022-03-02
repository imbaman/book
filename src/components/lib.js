/** @jsx jsx */
import { jsx, keyframes } from "@emotion/react";
import * as colors from "../styles/colors";
import styled from "@emotion/styled";
import Dialog from "@reach/dialog";
import { ImSpinner9 } from "react-icons/im";
//media queries
const small = "@media (max-width:991px)";

const BookListUl = styled.ul({
  listStyle: "none",
  padding: "0",
  display: "grid",
  gridTemplateRows: "repeat(auto-fill, minmax(100px, 1fr))",
  gridGap: "1em",
});

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});
const Spinner = styled(ImSpinner9)({
  animation: `${spin} 0.5s linear infinite`,
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
    fontWeight: "700",
    color: "#b2b3cd",
    margin: "0.25em 0.25em 0.25em 0",
    padding: "13px 50px 13px",
    border: `2px solid ${colors.earth}`,
    borderRadius: "3px",
    cursor: "pointer",
    textTransform: "uppercase",
    transition: "background .4s ease",
    backgroundColor: "rgba(0, 0, 0, 0)",

    ":hover": {
      backgroundColor: colors.earth,
      color: "#fff",
      border: `2px solid ${colors.earth}`,
      boxShadow: "0 4px 8px rgba(0,30,84,0.12)",
      // transform: "translateY(-2px)",
    },
  },
  (props) => ({ backgroundColor: props.color })
);

const Input = styled.input({
  borderRadius: "1px",
  border: "1px solid #f4f4f4",
  background: colors.earth,
  padding: "8px 12px",
});

export { Button, Input, CustomDialog, Spinner, BookListUl };
