import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { addDoc, collection } from "@firebase/firestore";

const Book = (book) => {
  const [data, setData] = useState("");
  const { bookId } = useParams();
  const { user } = useAuth();
  const bookCollectionRef = collection(db, "bookList");

  const addBook = async () => {
    await addDoc(bookCollectionRef, {
      bookId: bookId,
      ownerId: user.uid,
      author: data?.volumeInfo?.authors,
      title: data?.volumeInfo?.title,
      desc: data?.volumeInfo?.description,
      img: data?.volumeInfo?.imageLinks?.thumbnail,
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
      console.log(responseData, "response");
      console.log(data, "data");
    };
    getData();
  }, []);

  //getting description with html tags so i added regex

  return (
    <div>
      <img src={data?.volumeInfo?.imageLinks?.thumbnail} alt='' />
      <h1>{data?.volumeInfo?.title}</h1>
      <p>{data?.volumeInfo?.description.replace(/(<([^>]+)>)/gi, "")}</p>
      {/* <button
        onClick={() => {
          console.log(user.uid, "<-uid", "bookId ->", bookId);
        }}> */}
      <button onClick={addBook}>add to fav</button>
    </div>
  );
};

export default Book;
