import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
const Stars = ({ updateScore, data, updateStar }) => {
  const [ratingValue, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    setRating(data?.rating);
  }, []);
  return (
    <div>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type='button'
            key={index}
            className={index <= (hover || ratingValue) ? "on" : "off"}
            onClick={() => {
              setRating(index);
              updateStar(ratingValue);
              updateScore(data.id, data.rating);
            }}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(ratingValue)}>
            <FaStar />
          </button>
        );
      })}
    </div>
  );
};

export default Stars;
