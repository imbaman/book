/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav css={{ position: "sticky", top: "5em" }}>
      <ul>
        <li>
          <Link to='/'>My library</Link>
        </li>
        <li>
          <Link to='fav'>Favorite books</Link>
        </li>
        <li>
          <Link to='booksearch'>Books for you</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
