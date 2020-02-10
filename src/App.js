import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingIndicator from "./Component/LoadingScreen";
import Homepage from "./Component/Homepage";
import UserImages from "./Component/UserImages";
import { Route, Link } from "react-router-dom";
import NavBar from "./Component/Navbar";
import AboutPage from "./Component/AboutPage";
import UserProfile from "./Component/UserProfile";
import { ToastContainer } from "react-toastify";
import ProfilePage from "./Component/ProfilePage";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("jwt") !== null
  );

  useEffect(() => {
    axios
      .get("https://insta.nextacademy.com/api/v1/users")
      .then(result => {
        // If successful, we do stuffs with 'result'
        setUsers(result.data);
        setIsLoading(false);
      })
      .catch(error => {
        // If unsuccessful, we notify users what went wrong
        console.log("ERROR: ", error);
      });
  }, []);
  if (isLoading) {
    return (
      <div>
        <LoadingIndicator />
      </div>
    );
  } else {
    return (
      <>
        <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <ToastContainer />
        <Route exact path="/">
          {/* exact specifies path at exactly "/" forward sign */}
          <Homepage users={users} />;
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/user/:userId/:username/">
          <UserProfile />
        </Route>
        <Route path="/ProfilePage">
          <ProfilePage />
        </Route>
        {/* :id to determine which user profile is being viewed */}
      </>
    );
  }
}

export default App;
