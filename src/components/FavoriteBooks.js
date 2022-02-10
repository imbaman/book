import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { BookListUl } from "./lib";
const FavoriteBooks = (filtered) => {
  const dataCollectionRef = collection(db, "bookList");
  const [data, setData] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(dataCollectionRef);
      let books = [];
      data.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
      });
      let filtered = books.filter((i) => i.ownerId === user.uid);
      setData(filtered);
      console.log(filtered);
    };
    getData();
  }, []);

  // const filterData = (data, user) => {
  //   let filtered = data?.filter((i) => {
  //     return i.ownerId === user.uid;
  //   });
  // };
  // filterData();
  // console.log(filtered);
  console.log(user.uid, data);

  return (
    <div>
      {/* <p>fav books</p>
      <p>im from firebase {data[0]?.author}</p> */}
      {data.map((data) => (
        <BookListUl>
          <img src={data.img} alt='' />
          <li>{data.author}</li>
          <li>{data.title}</li>
          <li>{data?.desc?.replace(/(<([^>]+)>)/gi, "")}</li>
        </BookListUl>
      ))}
    </div>
  );
};

export default FavoriteBooks;
