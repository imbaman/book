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

  // console.log(user.uid, data);

  function handleRemove(id) {
    const newList = data.filter((i) => i.id !== id);
    setData(newList);
  }

  return data.length === 0 ? (
    <div
      style={{
        textAlign: "center",
        padding: "50px",
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
        // height: "20vh",
      }}>
      <p>Hey! You don't have any favorite books :/</p>
    </div>
  ) : (
    <div>
      <BookListUl>
        {data.map((data) => (
          <>
            <li key={data.id}>
              <img src={data.img} alt='' />
              <p>{data.author}</p>
              <p>{data.title}</p>
              <p>{data?.desc?.replace(/(<([^>]+)>)/gi, "")}</p>
              <button
                onClick={() => {
                  handleRemove(data.id);
                }}>
                Remove from Fav
              </button>
            </li>
          </>
        ))}
      </BookListUl>
    </div>
  );
};

export default FavoriteBooks;
