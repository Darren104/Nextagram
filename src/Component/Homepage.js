import React from "react";
import { Card, CardTitle, CardImg, Row, Col, Container } from "reactstrap";
import UserImages from "./UserImages";
import { Route, Link } from "react-router-dom";
// import navbar from "./Navbar"

function Homepage({ users }) {
  return (
    <div>
      <h1>Home Page</h1>
      {users.map(abc => {
        const userId = abc.id;
        const username = abc.username;
        return (
          <>
            {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
            <Container>
              <Row>
                <Col
                  md={12}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: "grey",
                    border: "1px solid black"
                    //   width: "80%",
                    //   height: "100vh"
                  }}
                >
                  <Col
                    md={4}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                      // justifyContent: "center"
                    }}
                  >
                    <Link to={`/user/${userId}/${username}`}>
                      <h1>{abc.username}</h1>
                    </Link>
                    <img
                      className="rounded-circle"
                      style={{ width: "200px" }}
                      src={abc.profileImage}
                      alt="User's image"
                    />
                  </Col>
                  <Col md={8}>
                    <div className="h-100 p-3">
                      <UserImages userId={abc.id} />
                    </div>
                  </Col>
                </Col>
              </Row>
            </Container>
            {/* </div> */}
          </>
        );
      })}
    </div>
  );
}

export default Homepage;
