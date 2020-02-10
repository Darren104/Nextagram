import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "react-graceful-image";
const UserImages = ({ userId }) => {
  const [images, setImages] = useState([]);
  // null will say "null is not mappable"
  useEffect(() => {
    axios
      .get(`https://insta.nextacademy.com/api/v1/images?userId=${userId}`)
      .then(result => {
        console.log(result);
        setImages(result.data);
      });
  }, []);
  return (
    <div style={{ columnCount: 3, columnGap: "1em" }}>
      {images.map(image => {
        return (
          <>
            <Image
              src={image}
              style={{
                width: "100%",
                margin: "0 0 1em",
                display: "inline-block"
              }}
              s
            />
          </>
        );
      })}
    </div>
  );
};
export default UserImages;
