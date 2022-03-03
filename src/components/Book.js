/** @jsx jsx */
import { jsx, css } from "@emotion/react";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { addDoc, collection, getDocs } from "@firebase/firestore";
import { Button } from "./lib";
const Book = () => {
  const [data, setData] = useState("");
  const { bookId } = useParams();
  const { user } = useAuth();
  const bookCollectionRef = collection(db, "bookList");
  const [book, setBook] = useState([]);
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(bookCollectionRef);
      let books = [];
      data.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
      });
      const found = await books.filter((el) => el.ownerId === user.uid);
      setBook(found);
      // console.log(bookId);
      // console.log(found, " BOOK");
    };
    getData();
  }, [data]);

  const addBook = async () => {
    await addDoc(bookCollectionRef, {
      data,
      bookId: bookId,
      ownerId: user.uid,
      author: data?.volumeInfo?.authors,
      title: data?.volumeInfo?.title,
      desc: data?.volumeInfo?.description,
      img: data?.volumeInfo?.imageLinks?.thumbnail,
      rating: -1,
      notes: "",
      // book: data.volumeInfo,
    });
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetch(
        `https://books.googleapis.com/books/v1/volumes/${bookId}`
      );
      const responseData = await data.json();
      setData(responseData);
      // console.log(db);
      // console.log(responseData, "response");
      // console.log(data, "data");
    };
    getData();
  }, []);

  //getting description with html tags so i added regex
  console.log(book, " collection of books where ownerid=userid");
  console.log(bookId);
  console.log(user.uid);

  // book.filter(book=> book.ownerId === user.uid)
  //book.bookId === bookId

  // let test = book?.some((book) => book.bookId !== bookId);
  // console.log(test);

  let test = book.find((book) => book.bookId === bookId);

  console.log(test, "this is test");

  const {
    imageLinks,
    title,
    averageRating,
    ratingsCount,
    description,
    authors,
  } = data.volumeInfo || {};
  console.log(data);
  let descShort = description?.replace(/(<([^>]+)>)/gi, "");
  console.log(descShort);
  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
        "@media (max-width:420px)": {
          display: "flex",
          flexDirection: "column",
        },
      }}>
      <div css={{ gridColumn: "span 3" }}>
        <div
          css={{
            borderRadius: "0 6% 6% 0/4%",
            overflow: "hidden",
          }}>
          <img
            src={imageLinks?.small}
            alt=''
            css={{
              maxWidth: "100%",
              filter: "dropShadow(0 2px 8px rgba(0, 0, 0, 0.2))",
            }}
          />
          <div
            css={{
              margin: "16px auto",
              display: "flex",
              flexDirection: "column",
            }}>
            {test?.bookId !== bookId ? (
              <Button padding={5} onClick={addBook}>
                add to favorite
              </Button>
            ) : (
              <Button padding={5}>already in favorites</Button>
            )}

            <Button
              padding={5}
              onClick={() => {
                window.open(data?.saleInfo?.buyLink);
              }}>
              buy on google
            </Button>
          </div>
        </div>
      </div>
      <div css={{ gridColumn: "5/13" }}>
        <h1>{title}</h1>
        <p>{authors}</p>
        <p>{averageRating} rating </p>
        <p>{ratingsCount} rating count</p>
        <p>
          {showMore ? descShort : `${descShort?.substring(0, 250)}...`}
          <button
            onClick={() => {
              setShowMore(!showMore);
            }}>
            {showMore ? "show less" : "show more"}
          </button>
        </p>

        {/* <button
        onClick={() => {
          console.log(user.uid, "<-uid", "bookId ->", bookId);
        }}> */}
      </div>
    </div>
  );
};

export default Book;
