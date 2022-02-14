/** @jsx jsx */
import { jsx, keyframes } from "@emotion/react";
import { Link } from "react-router-dom";

const BookCard = ({ item }) => {
  // const grow = keyframes({
  //   "0%": { transform: "scale(1)" },
  //   "50%": { transform: "scale(1.03)" },
  //   "100%": { transform: "scale(1)" },
  // });

  return (
    <div>
      <Link
        to={`/book/${item.id}`}
        css={{
          display: "flex",
          // borderTop: "0.1rem solid rgba(0,0,0,0.1)",
          transition: "all .5s ease-in-out",
          backgroundColor: "white",
          padding: "10px",
          boxShadow: `
          1px 2px 2px hsl(0deg 0% 50% / 0.333),
          2px 4px 4px hsl(0deg 0% 50% / 0.333),
          3px 6px 6px hsl(0deg 0% 50% / 0.333)
        `,
          borderRadius: "8px",
          ":hover": {
            boxShadow: `
              1px 2px 2px hsl(0deg 0% 50% / 0.2),
              2px 4px 4px hsl(0deg 0% 50% / 0.2),
              4px 8px 8px hsl(0deg 0% 50% / 0.2),
              8px 16px 16px hsl(0deg 0% 50% / 0.2),
              16px 32px 32px hsl(0deg 0% 50% / 0.2)
            `,
            // animation: `${up} 2000ms infinite ease-in-out`,
            transform: "translateY(-5px)",
          },
        }}>
        <div>
          <img
            src={item.volumeInfo.imageLinks?.thumbnail}
            alt=''
            css={{ marginRight: "1rem" }}
          />
        </div>
        <div>
          <h3>{item.volumeInfo.title}</h3>
          <span>{item.volumeInfo.authors}</span>
          <p>{item?.volumeInfo?.description?.substring(0, 340)}...</p>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
