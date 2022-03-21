/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React, { useState, useEffect } from "react";
import * as colors from "../styles/colors";
export const ProgressBar = ({ data, addPageReaded, updatePage }) => {
  const [page, setPage] = useState("");
  const [input, setInput] = useState("");
  console.log(data, "progress bar");
  const onChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    setPage(data?.readingPage);
  }, []);

  useEffect(() => {
    addPageReaded(data.id, data.readingPage);
  }, [page]);
  const progress = ((page / data.data.volumeInfo.pageCount) * 100).toFixed(2);

  return (
    <div css={{ marginTop: "12px" }}>
      <p css={{ marginBottom: "5px" }}>reading progress:</p>
      <input
        type='text'
        placeholder='enter page number'
        value={input}
        onChange={onChange}
      />
      <button
        onClick={() => {
          setPage(input);
          updatePage(input);
        }}>
        set page
      </button>
      <div
        css={{
          marginTop: "5px",
          height: "20px",
          width: "300px",
          backgroundColor: "#f4f4f4",
          borderRadius: "5px",
          position: "relative",
        }}>
        <div
          css={{
            width: `${progress > 100 ? "100" : progress}%`,
            height: "100%",
            backgroundColor: "orange",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            borderRadius: "5px",
            transition: "1s ease 0.3s",
          }}></div>
      </div>
      {page > data.data.volumeInfo.pageCount ? (
        <div>book finished, good job!</div>
      ) : (
        <div>
          Page Numbers : {page} / {data.data.volumeInfo.pageCount}
        </div>
      )}
    </div>
  );
};
