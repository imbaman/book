/** @jsx jsx */
import { jsx } from "@emotion/react";

import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
const Stars = ({ updateScore, data, updateStar, index }) => {
  const [ratingValue, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    setRating(data?.rating);
  }, []);

  useEffect(() => {
    // setRating(index);
    //   updateStar(index);
    updateScore(data.id, data.rating);
    console.log(ratingValue, "rating value");
  }, [ratingValue]);

  return (
    <div css={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
      <small>rate this book :</small>
      <div>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              css={{ border: 0 }}
              type='button'
              key={index}
              className={index <= (hover || ratingValue) ? "on" : "off"}
              onClick={() => {
                setRating(index);
                updateStar(index);
              }}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(ratingValue)}>
              <FaStar size={25} />
              {/* stroke: "#ff9400", strokeWidth: "5"  */}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Stars;
