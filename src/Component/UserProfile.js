import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const { userId, username } = useParams();
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
  console.log(images);

  return (
    <>
      <h1>ABOUT PAGE</h1>
      <p>User ID: {userId}</p>
      <p>Username: {username}</p>)
      {images.map(user => {
        return <img src={user} />;
      })}
    </>
  );
};

export default UserProfile;
