import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Book = () => {
  const [data, setData] = useState("");
  const { bookId } = useParams();
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
    </div>
  );
};

export default Book;
