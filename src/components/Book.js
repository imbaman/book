import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { addDoc, collection, getDocs } from "@firebase/firestore";

const Book = () => {
  const [data, setData] = useState("");
  const { bookId } = useParams();
  const { user } = useAuth();
  const bookCollectionRef = collection(db, "bookList");
  const [book, setBook] = useState([]);

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
      bookId: bookId,
      ownerId: user.uid,
      author: data?.volumeInfo?.authors,
      title: data?.volumeInfo?.title,
      desc: data?.volumeInfo?.description,
      img: data?.volumeInfo?.imageLinks?.thumbnail,
      rating: -1,
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
  return (
    <div>
      <img src={data?.volumeInfo?.imageLinks?.thumbnail} alt='' />
      <h1>{data?.volumeInfo?.title}</h1>
      <p>{data?.volumeInfo?.description.replace(/(<([^>]+)>)/gi, "")}</p>
      {/* <button
        onClick={() => {
          console.log(user.uid, "<-uid", "bookId ->", bookId);
        }}> */}
      {test?.bookId !== bookId ? (
        <button onClick={addBook}>add to fav</button>
      ) : (
        <button>already in favorites</button>
      )}
    </div>
  );
};

export default Book;
