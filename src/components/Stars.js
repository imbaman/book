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
              updateStar(index);
            }}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(ratingValue)}>
            <FaStar size={25} />
          </button>
        );
      })}
    </div>
  );
};

export default Stars;
