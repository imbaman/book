/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const LinkCustom = styled(Link)({
  ":hover": { textDecoration: "underline" },
  ":focus": { color: "inherit" },
});

const Nav = () => {
  return (
    <nav css={{ position: "sticky", top: "5em" }}>
      <ul
        css={{
          fontSize: "1rem",
          fontWeight: "200",
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
