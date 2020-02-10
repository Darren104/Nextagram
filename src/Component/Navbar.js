import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from "reactstrap";
import { Route, Link } from "react-router-dom";
import Login from "./Modal";

const NavBar = props => {
  const { loggedIn, setLoggedIn } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const logOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
  };

  return (
    <>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">NEXTAGRAM</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/">
                Home Page
              </NavLink>
            </NavItem>
            {loggedIn ? (
              <NavLink tag={Link} to="/ProfilePage">
                Profile
              </NavLink>
            ) : (
              ""
            )}
            <NavItem>
              <NavLink tag={Link} to="/about">
                About Page
              </NavLink>
            </NavItem>
            {!loggedIn ? (
              <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            ) : (
              <NavItem>
                <NavLink onClick={logOut}>Log Out</NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
