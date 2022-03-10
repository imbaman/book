/** @jsx jsx */
import { jsx, css } from "@emotion/react";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "@firebase/firestore";
import { Button, Spinner } from "./lib";
import * as colors from "./../styles/colors";
const Book = () => {
  const [data, setData] = useState("");
  const { bookId } = useParams();
  const { user } = useAuth();

  const bookCollectionRef = collection(db, "bookList");
  const [book, setBook] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [button, setButton] = useState("add to fav");
  const [status, setStatus] = useState("");
  const isLoading = status === "loading";
  const isSuccess = status === "success";

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
    try {
      setStatus("loading");
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
      setStatus("success");
      setButton("added");
    } catch (err) {
      console.log(err);
    }
  };
  const handleRemove = async (id) => {
    const userDoc = doc(db, "bookList", id);
    await deleteDoc(userDoc);
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
    pageCount,
    categories,
    publishedDate,
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
          padding: "16px",
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
              <Button padding={5} onClick={addBook} color={isSuccess && "red"}>
                {!isLoading && button}
                {isLoading && <Spinner />}
              </Button>
            ) : (
              ""
              // <Button
              //   padding={5}
              //   onClick={() => {
              //     console.log(book);
              //     handleRemove(book[0].id);
              //   }}>
              //   Already in fav
              // </Button>
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
        <p css={{ marginBottom: "0px" }}>
          <span css={{ fontSize: "30px", fontWeight: "bold" }}>
            {averageRating}
          </span>{" "}
          rating{" "}
        </p>
        <p>{ratingsCount} rating count</p>
        <p css={{ maxWidth: "80%" }}>
          {showMore ? descShort : `${descShort?.substring(0, 250)}...`}
          <button
            css={{
              textDecoration: "underline",
              border: "none",
              fontWeight: "bold",
            }}
            onClick={() => {
              setShowMore(!showMore);
            }}>
            {showMore ? "show less" : "show more"}
          </button>
        </p>
        <p>
          {pageCount} pages / published date {publishedDate}
        </p>
        <ul css={{ padding: "0" }}>
          {categories?.map((i) => (
            <span
              css={{
                position: "relative",
                marginRight: "10px",
                display: "inline-block",
                "::before": {
                  content: `''`,
                  position: "absolute",
                  bottom: "-2px",
                  left: "0",
                  width: "100%",
                  height: "3px",
                  borderRadius: "2px",
                  background: "linear-gradient(to right, #fdc830, #f37335)",
                  left: "0",
                },
              }}>
              {i}
            </span>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Book;
