import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import axios from "axios";
import "react-toastify/dist/ReactToastify.min.css";
import { toast } from "react-toastify";

toast.configure();

const LoginForm = ({ toggle, loggedIn, setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = e => {
    e.preventDefault();
    axios({
      method: "post",
      url: "https://insta.nextacademy.com/api/v1/login",
      data: {
        username: username,
        password: password
      }
    })
      .then(response => {
        if (response.status === 201) {
          toast.success(
            `Welcome back ${response.data.user.username}`,
            toastSettings
          );
          localStorage.setItem("jwt", response.data.auth_token);
          setLoggedIn(true);
        }
      })
      .catch(err => {
        console.log(err.response);
        // if (err.response.status === 401) {
        //   toast.error(toastSettings);
        // }
      });
  };
  const handleUsername = e => {
    const user = e.target.value;
    setUsername(user);
    console.log(username);
  };

  const handlePassword = e => {
    const user1 = e.target.value;
    setPassword(user1);
    console.log(password);
  };

  const Logout = () => {
    toast.success("Successfully logged out, come back soon 🤓", toastSettings);
    localStorage.removeItem("authToken");
  };
  return (
    <Form onSubmit={handleLogin}>
      <h1>Welcome back to Nextagram!</h1>
      <FormGroup>
        <Label for="username">Username</Label>
        <Input
          type="username"
          name="username"
          id="username"
          placeholder="Input your username here"
          onChange={handleUsername}
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Input your password here"
          onChange={handlePassword}
        />
      </FormGroup>
      <Button
        onClick={e => {
          toggle();
          handleLogin(e);
        }}
      >
        Login
      </Button>
    </Form>
  );
};

const toastSettings = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
};
export default LoginForm;
