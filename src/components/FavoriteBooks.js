/** @jsx jsx */
import { jsx } from "@emotion/react";

import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { BookListUl, CustomDialog } from "./lib";
import { FaStar } from "react-icons/fa";
const FavoriteBooks = (filtered) => {
  const dataCollectionRef = collection(db, "bookList");
  const [data, setData] = useState([]);
  const { user } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const [value, setValue] = useState("");

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
  //
  //
  const handleRemove = async (id) => {
    const userDoc = doc(db, "bookList", id);
    await deleteDoc(userDoc);
    const newList = data.filter((i) => i.id !== id);
    setData(newList);
  };

  const updateScore = async (id, rating) => {
    const userDoc = doc(db, "bookList", id);
    const newFields = { rating: rating + 1 };
    await updateDoc(userDoc, newFields);
  };

  const addNotes = async (id, notes) => {
    const userDoc = doc(db, "bookList", id);
    const newFields = { notes: value };
    await updateDoc(userDoc, newFields);
  };
  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // const handleNoteChange = (e) => {
  //   setValue(e.target.value);
  //   addNotes(data.id, data.notes);
  // };

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
            <li key={data.title}>
              <img src={data.img} alt='' />
              <p>{data.author}</p>
              <p>SCORE {data.rating}</p>
              <button
                onClick={() => {
                  setShowDialog("true");
                }}>
                rate this
              </button>
              <button
                onClick={() => {
                  updateScore(data.id, data.rating);
                }}>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </button>

              <textarea
                css={{
                  border: "1px solid #f1f1f4",
                  minHeight: 300,
                  padding: "8px 12px",
                }}
                type='text'
                defaultValue={data?.notes}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                onBlur={() => {
                  addNotes(data.id, data.notes);
                }}
              />

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
      {/* <CustomDialog
        updateScore={updateScore}
        data={data}
        isOpen={showDialog}
        onDismiss={() => setShowDialog(false)}>
        rate this book
        <button
          onClick={() => {
            updateScore(data.id, data.rating);
          }}>
          one star
        </button>
        <button>two star</button>
        <button>three star</button>
      </CustomDialog> */}
    </div>
  );
};

export default FavoriteBooks;
