/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import * as colors from "./styles/colors";
const LinkCustom = styled(Link)({
  ":hover": { color: `${colors.earth}` },
  ":focus": { color: `${colors.earth}` },
});

const Nav = () => {
  return (
    <nav css={{ position: "sticky", top: "5em" }}>
      <ul
        css={{
          fontSize: "1rem",
          fontWeight: "500",
          textTransform: "uppercase",
        }}>
        <li>
          <LinkCustom to='/'>My library</LinkCustom>
        </li>
        <li>
          <LinkCustom to='fav'>Favorite books</LinkCustom>
        </li>
        <li>
          <LinkCustom to='booksearch'>Books for you</LinkCustom>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
