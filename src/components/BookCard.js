/** @jsx jsx */
import { jsx } from "@emotion/react";

import React from "react";
import { Link } from "react-router-dom";
const BookCard = ({ item }) => {
  return (
    <div>
      <Link to={`book/${item.id}`}>
        <p>{item.volumeInfo.title}</p>
        <p>
          <img src={item.volumeInfo.imageLinks?.thumbnail} alt='' />
        </p>
        <p>{item.volumeInfo.authors}</p>
        <p>{item.volumeInfo.description}</p>
      </Link>
    </div>
  );
};

export default BookCard;
