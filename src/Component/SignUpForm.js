import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from "reactstrap";
import axios from "axios";
import "react-toastify/dist/ReactToastify.min.css";
import { toast } from "react-toastify";

toast.configure();
const SignUpForm = ({ toggle }) => {
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [email, setEmail] = useState("");
  const [delay, setDelay] = useState(null);
  const [usernameValid, setUsernameValid] = useState(true);
  const [loggedIn, setLoggedIn] = useState("");
  const handleUsernameInput = e => {
    clearTimeout(delay);
    const newUsername = e.target.value;
    setUsername(newUsername);

    const newDelay = setTimeout(() => {
      checkUsername(newUsername);
    }, 500);

    setDelay(newDelay);
  };

  const handlePasswordInput = e => {
    setPassword(e.target.value);
    console.log(password);
  };

  const handleConfirmpasswordInput = e => {
    setConfirmpassword(e.target.value);
    console.log(confirmpassword);
  };

  const handleEmailInput = e => {
    setEmail(e.target.value);
    console.log(email);
  };

  const checkUsername = newUsername => {
    // this should only trigger after you stop typing for 500ms
    console.log("Making API call to check username!");
    axios
      .get(
        `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
      )
      .then(response => {
        console.log(response.data);
        if (response.data.valid) {
          setUsernameValid(true);
        } else {
          setUsernameValid(false);
        }
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!username) return;
    if (password.length <= 8) return;
    if (confirmpassword !== password) return;
    if (email.length <= 0) return;
    console.log(username);
    console.log(password);
    console.log(confirmpassword);
    console.log(email);
    axios({
      method: "POST",
      url: "https://insta.nextacademy.com/api/v1/users/",
      data: {
        username: username,
        email: email,
        password: password
      }
    })
      .then(response => {
        console.log(response);
        console.log(response.data.auth_token);
        localStorage.setItem("jwt",response.data.auth_token)
        setLoggedIn(true) 
        toast.success("Your account was sucessfully made!", {});
        toggle();
      })
      .catch(error => {
        console.error(error.response); // so that we know what went wrong if the request failed
        toast.error(
          "Something went wrong while creating your account, please try again",
          {}
        );
      });
  };
  const getFormFeedback = () => {
    if (confirmpassword !== password) {
      return (
        <FormFeedback invalid>
          Please ensure your passwords are the same
        </FormFeedback>
      );
    }
  };

  const getInputFeedback = () => {
    if (confirmpassword !== password) {
      return { invalid: true };
    } else {
      return { valid: true };
    }
  };

  const getFormFeedback1 = () => {
    if (password.length <= 8) {
      return (
        <FormFeedback invalid>
          Please ensure that you have eight characters or more
        </FormFeedback>
      );
    }
  };

  const getInputFeedback2 = () => {
    if (confirmpassword !== password) {
      return { invalid: true };
    } else {
      return { valid: true };
    }
  };
  return (
    <>
      <h4>Not a member? Sign up and join the Nextagram community today!</h4>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="username"
            name="username"
            id="username"
            placeholder="Input your username here"
            onChange={e => handleUsernameInput(e)}
            value={username}
            {...(usernameValid ? { valid: true } : { invalid: true })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            value={password}
            placeholder="Input your password here"
            onChange={handlePasswordInput}
            {...getInputFeedback2()}
            {...getInputFeedback()}
          />
          {getFormFeedback1()}
          {getFormFeedback()}
        </FormGroup>
        <FormGroup>
          <Label for="confirmpassword">Password Confirmation</Label>
          <Input
            type="password"
            name="confirmpassword"
            id="confirmpassword"
            value={confirmpassword}
            placeholder="Please input your password here again"
            onChange={handleConfirmpasswordInput}
            {...getInputFeedback()}
          />
          {getFormFeedback()}
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="text"
            name="email"
            id="email"
            placeholder="Input your email here"
            value={email}
            onChange={handleEmailInput}
          />
        </FormGroup>
        <Button type="submit" value="submit">
          Sign up
        </Button>
      </Form>
    </>
  );
};

export default SignUpForm;
