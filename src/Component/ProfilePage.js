import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link } from "react-router-dom";

const ProfilePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `https://insta.nextacademy.com/api/v1/images/me`,
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
    })
      .then(result => {
        console.log(result);
        setData(result.data);
      })
      .catch(error => {
        console.error(error.response);
      });
  }, []);

  return (
    <>
      {data.map((user, index) => {
        return <img key={index} src={user} />;
      })}
    </>
  );
};

export default ProfilePage;
