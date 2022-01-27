/** @jsx jsx */
import { jsx } from "@emotion/react";

import styled from "@emotion/styled";

const Button = styled.button(
  {
    // fontSize: "20px",
    // fontWeight: "200",
    // letterSpacing: "1px",
    padding: "13px 50px 13px",
    border: "1px solid black",
    cursor: "pointer",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  (props) => ({ backgroundColor: props.color })
);

export { Button };
