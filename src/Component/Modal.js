import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  NavLink
} from "reactstrap";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const Login = props => {
  const { buttonLabel, className, loggedIn, setLoggedIn } = props;

  const [modal, setModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    <>
      <NavLink onClick={() => setModal(true)}>Login</NavLink>
      <Modal isOpen={modal}>
        <ModalBody>
          {isLogin ? (
            <LoginForm
              toggle={toggle}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
            />
          ) : (
            <SignUpForm toggle={toggle} />
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Want to sign up?" : "Want to log in?"}
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Login;
