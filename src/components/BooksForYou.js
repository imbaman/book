/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import { useState, useEffect } from "react";
import { Input, Spinner, BookListUl } from "./lib";
import { FaSearch } from "react-icons/fa";
import BookCard from "./BookCard";

const BooksForYou = () => {
  const [query, setQuery] = useState("");
  const [queried, setQueried] = useState(false);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("iddle");
  const [index, setIndex] = useState(20);

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  useEffect(() => {
    if (!queried) {
      return;
    }
    setStatus("loading");
    const getData = async () => {
      const data = await fetch(
        `https://books.googleapis.com/books/v1/volumes?q=${query}&langRestrict=en&filter=paid-ebooks&orderBy=relevance&printType=BOOKS&key=${process.env.REACT_APP_API_KEY}`
      );
      const responseData = await data.json();
      setData(responseData.items);
      setStatus("success");
      console.log(responseData, "response");
      console.log(data, "data");
    };
    getData();
  }, [query, queried]);

  // fetch dummy data
  useEffect(() => {
    const getData = async () => {
      const data = await fetch(
        `https://books.googleapis.com/books/v1/volumes?q=cat&langRestrict=en&filter=paid-ebooks&orderBy=relevance&printType=BOOKS&key=${process.env.REACT_APP_API_KEY}`
      );
      const responseData = await data.json();
      setData(responseData.items);
      setStatus("success");
      setQuery("cat");
    };
    getData();
  }, []);

  const loadMore = async () => {
    const data = await fetch(
      `https://books.googleapis.com/books/v1/volumes?q=${query}&langRestrict=en&filter=paid-ebooks&orderBy=relevance&maxResults=${index}&printType=BOOKS&key=${process.env.REACT_APP_API_KEY}`
    );
    const responseData = await data.json();
    setData(responseData?.items);

    setIndex((i) => i + 10);
  };

  function handleSearchSubmit(e) {
    e.preventDefault();
    setQuery(e.target.elements.search.value);
    setQueried(true);
  }

  return (
    <>
      <div
        css={{
          maxWidth: 800,
          margin: "auto",
          width: "90%",
        }}>
        <form onSubmit={handleSearchSubmit}>
          <Input
            placeholder='looking for some books?'
            id='search'
            css={{ width: "70%", marginBottom: "1em" }}
            type='text'
          />
          <label htmlFor='search'>
            <button
              type='submit'
              css={{
                border: "0",
                position: "relative",
                marginLeft: "-35px",
                background: "transparent",
                cursor: "pointer",
              }}>
              <FaSearch aria-label='search' />
            </button>
          </label>
        </form>
        <>
          <BookListUl>
            {isSuccess ? (
              data?.map((item) => (
                <li key={item.id}>
                  <BookCard item={item} />
                </li>
              ))
            ) : (
              <Spinner
                size={20}
                css={{
                  padding: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "20vh",
                }}
              />
            )}
          </BookListUl>
          {index === 50 ? (
            <div>no more items, try search again</div>
          ) : (
            <button onClick={loadMore}>Load more</button>
          )}
        </>
      </div>
    </>
  );
};

export default BooksForYou;
