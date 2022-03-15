/** @jsx jsx */
import { jsx } from "@emotion/react";
import BooksForYou from "./components/BooksForYou";
import { useAuth } from "./context/AuthContext";
import { Routes, Route, Link } from "react-router-dom";
import FavoriteBooks from "./components/FavoriteBooks";
import Book from "./components/Book";
import MyLibrary from "./components/MyLibrary";
import Nav from "./Nav";
import * as colors from "./styles/colors";
import { ButtonSmall } from "./components/lib";
const Authenticated = () => {
  const { user, logout } = useAuth();

  return (
    <div
      css={{
        margin: "4em auto",
        maxWidth: "1328px",
        width: "100%",
        display: "grid",
        gridGap: "3em",
        gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
        "@media (max-width:420px)": {
          gridTemplateColumns: "1fr",
          grodTemplateRows: "auto",
          width: "100%",
          padding: "2em 1em",
        },
      }}>
      <div css={{ gridColumn: "span 2" }}>
        <div
          css={{
            borderBottom: "2px solid #f3f3f3",
            display: "flex",
            alignItems: "center",
            position: "absolute",
            right: "0",
            top: "0",
            padding: "10px",
            width: "100%",
            justifyContent: "flex-end",
          }}>
          {user.email ? user.email : "Guest"}
          <ButtonSmall css={{ marginLeft: "10px" }} onClick={logout}>
            Log out
          </ButtonSmall>
        </div>
        <Nav />
      </div>
      <main
        css={{
          marginTop: "1em",
          gridColumn: "3 / 13",
          "@media (max-width:420px)": {
            gridColumn: "1",
          },
        }}>
        <RoutesConfig />
      </main>
    </div>
  );

  function NotFound() {
    return (
      <div
        css={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <div>Sorry... nothing here.</div>
      </div>
    );
  }

  function RoutesConfig() {
    return (
      <Routes>
        {/* <Route path='/mylib' element={<MyLibrary />} /> */}
        <Route path='/fav' element={<FavoriteBooks />} />
        <Route path='book/:bookId' element={<Book />} />
        <Route path='/' element={<BooksForYou />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    );
  }
};

export default Authenticated;
