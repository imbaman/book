/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useParams } from "react-router";
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
import Book from "./Book";
import { Link } from "react-router-dom";
import { ProgressBar } from "./ProgressBar";
import { Button, ButtonSmall } from "./lib";

const FavoriteBooks = ({ ratingValue }) => {
  const bookId = useParams();
  const dataCollectionRef = collection(db, "bookList");
  const [data, setData] = useState([]);
  const { user } = useAuth();
  const [showDialog, setShowDialog] = useState("none");
  const [value, setValue] = useState("");
  const [star, setStar] = useState(data.rating);
  const [page, setPage] = useState();

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

  const addPageReaded = async (id, readingPage) => {
    const userDoc = doc(db, "bookList", id);
    const newFields = { readingPage: page === undefined ? readingPage : page };
    await updateDoc(userDoc, newFields);
  };

  const updatePage = (i) => {
    setPage(i);
  };

  const updateStar = (i) => {
    setStar(i);
    console.log(ratingValue, "index");
    console.log(i, "star");
  };
  console.log(star);
  console.log(page);
  return data.length === 0 ? (
    <div
      style={{
        textAlign: "center",
        padding: "50px",
      }}>
      <p>Hey! You don't have any favorite books :/</p>
    </div>
  ) : (
    <div>
      <BookListUl>
        {data.map((data) => (
          <>
            <li key={data.title}>
              <div
                css={{
                  lineHeight: "150%",
                  display: "flex",
                  borderTop: "1px solid #999999",
                  padding: "15px 0",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  alignItems: "stretch",
                }}>
                <div css={{ marginRight: "10px", padding: "12px" }}>
                  <img
                    src={data.img}
                    alt=''
                    css={{ width: "100%", marginBottom: "10px" }}
                  />
                  <Stars
                    updateScore={updateScore}
                    data={data}
                    updateStar={updateStar}
                  />
                </div>
                <div css={{ maxWidth: "350px", padding: "12px" }}>
                  <h3 css={{ fontSize: "18px" }}>{data?.title}</h3>
                  <p>{data?.author}</p>
                  <p>
                    {data?.desc?.replace(/(<([^>]+)>)/gi, "").substring(0, 250)}
                    ..
                  </p>
                </div>
                <div css={{ padding: "12px" }}>
                  {" "}
                  <ButtonSmall
                    css={{ marginBottom: "12px" }}
                    onClick={(e) => {
                      setShowDialog(data.id);
                    }}>
                    Notes
                  </ButtonSmall>
                  <br />
                  <Link to={`/book/${data.bookId}`}>
                    <ButtonSmall css={{ marginBottom: "12px" }}>
                      more info
                    </ButtonSmall>
                  </Link>
                  <br />
                  <ProgressBar
                    id={data.id}
                    data={data}
                    updatePage={updatePage}
                    addPageReaded={addPageReaded}
                  />
                  <br />
                  <ButtonSmall
                    onClick={() => {
                      handleRemove(data.id);
                    }}>
                    Remove from Fav
                  </ButtonSmall>
                  {/* <p>{data.data.volumeInfo.pageCount} pages</p> */}
                  {/* {data?.data?.volumeInfo?.industryIdentifiers[0]?.identifier} */}
                </div>
              </div>

              <CustomDialog
                id={data.id}
                isOpen={showDialog === data.id}
                onDismiss={() => setShowDialog(false)}
                defaultValue={data?.notes}>
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
                  onClick={(e) => {
                    addNotes(data.id, data.notes);
                  }}>
                  add note
                </button>
              </CustomDialog>
            </li>
          </>
        ))}
      </BookListUl>
    </div>
  );
};

export default FavoriteBooks;
