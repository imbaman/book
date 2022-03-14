/** @jsx jsx */
import { jsx, keyframes, css } from "@emotion/react";
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
  backgroundColor: `${colors.white}`,
  boxShadow: "0px 10px 50px hsla(0, 0%, 0%, 0.33)",
  padding: "1rem",
  [small]: {
    width: "100%",
    margin: "10vh 0",
  },
});

const ButtonSmall = styled.button({
  border: `2px solid ${colors.earth}`,
  backgroundColor: "white",
  ":hover": {
    border: `2px solid ${colors.blue}`,
    // boxShadow: "0 4px 8px rgba(0,30,84,0.12)",
    // transform: "translateY(-2px)",
  },
});

const btnS = css({
  padding: "0",
  color: "red",
});
const Button = styled.button(
  {
    // fontSize: "20px",
    // fontWeight: "200",
    // letterSpacing: "1px",
    fontWeight: "bold",
    fontSize: "1em",
    color: "#fff",
    margin: "0.25em 0.25em 0.25em 0",
    padding: "13px 50px 13px",
    border: `2px solid ${colors.earth}`,

    borderRadius: "3px",
    cursor: "pointer",
    textTransform: "uppercase",
    transition: "all .4s ease",
    backgroundColor: `${colors.earth}`,
    "& .orange": {
      color: "red",
      padding: "50px",
    },
    ":hover": {
      backgroundColor: colors.blue,
      color: "#fff",
      border: `2px solid ${colors.blue}`,
      boxShadow: "0 4px 8px rgba(0,30,84,0.12)",
      // transform: "translateY(-2px)",
    },
  },
  (props) => ({
    backgroundColor: props.color,
    padding: props.padding,
    border: props.border,
  })
);

const Input = styled.input({
  borderRadius: "4px",
  border: "2px solid #e4e4e4",
  background: "#fff",
  padding: "8px 12px",
});

export { btnS, ButtonSmall, Button, Input, CustomDialog, Spinner, BookListUl };
