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
import Stars from "./Stars";

const FavoriteBooks = ({ ratingValue }) => {
  const dataCollectionRef = collection(db, "bookList");
  const [data, setData] = useState([]);
  const { user } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const [value, setValue] = useState("");
  const [note, showNote] = useState(false);
  const [star, setStar] = useState(data.rating);

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(dataCollectionRef);
      let books = [];
      data.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
      });
      let filtered = await books.filter((i) => i.ownerId === user.uid);
      setData(filtered);
      console.log(filtered);
    };
    getData();
  }, []);

  const handleRemove = async (id) => {
    const userDoc = doc(db, "bookList", id);
    await deleteDoc(userDoc);
    const newList = data.filter((i) => i.id !== id);
    setData(newList);
  };

  const updateScore = async (id, rating) => {
    const userDoc = doc(db, "bookList", id);
    const newFields = { rating: star === undefined ? rating : star };
    await updateDoc(userDoc, newFields);
  };

  const addNotes = async (id, notes) => {
    const userDoc = doc(db, "bookList", id);
    const newFields = { notes: value };
    await updateDoc(userDoc, newFields);
  };

  const openNote = () => {
    showNote((s) => !s);
  };

  const updateStar = (i) => {
    setStar(i);
    console.log(ratingValue, "index");
    console.log(i, "star");
  };
  console.log(star);
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
              <button
                onClick={(e) => {
                  openNote(e);
                }}>
                note
              </button>
              <Stars
                updateScore={updateScore}
                data={data}
                updateStar={updateStar}
              />
              <p>{data.title}</p>
              <p>{data?.desc?.replace(/(<([^>]+)>)/gi, "")}</p>
              <button
                onClick={() => {
                  handleRemove(data.id);
                }}>
                Remove from Fav
              </button>

              {note && (
                <>
                  <textarea
                    id={data.id}
                    css={{
                      border: "1px solid #f1f1f4",
                      minHeight: 300,
                      padding: "8px 12px",
                      width: "100%",
                    }}
                    type='text'
                    defaultValue={data?.notes}
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                  />
                  <button
                    onClick={(e) => {
                      addNotes(data.id, data.notes);
                    }}>
                    add note
                  </button>
                </>
              )}

              {/* <CustomDialog
                isOpen={showDialog}
                onDismiss={() => setShowDialog(false)}>
                <textarea
                  css={{
                    border: "1px solid #f1f1f4",
                    minHeight: 300,
                    padding: "8px 12px",
                    width: "100%",
                  }}
                  type='text'
                  defaultValue={data?.notes}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    addNotes(data.id, data.notes);
                  }}>
                  add note
                </button>
                <button
                  onClick={() => {
                    console.log(value);
                  }}>
                  test
                </button>
              </CustomDialog> */}
            </li>
          </>
        ))}
      </BookListUl>
    </div>
  );
};

export default FavoriteBooks;
