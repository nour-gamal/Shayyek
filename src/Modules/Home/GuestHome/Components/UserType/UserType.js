import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { GetUserTypes } from "../../../network";
import "./UserType.css";
function UserType() {
  const [userTypes, setUserTypes] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const { currentLanguageId } = useSelector((state) => state.currentLocal);
  useEffect(() => {
    GetUserTypes(
      currentLanguageId,
      (success) => {
        setUserTypes(success.data);
      },
      (fail) => {},
      false
    );
  }, [currentLanguageId]);
  const redirectToRegistration = (e) => {
    setRedirect(true)
    localStorage.removeItem("redirectToRegistration")
    localStorage.setItem("redirectToRegistration",e.target.id)
  };
  if (redirect) {
    return <Redirect to="/registration" />;
  }
  return (
    <div className="userType">
      <Container>
        <Row>
          {userTypes.map((userType) => {
            return (
              <Col md={4} xs={12} key={userType.id}>
                <div
                  className="userTypeContainer"
                  id={userType.name}
                  onClick={(e) => redirectToRegistration(e)}
                >
                  {userType.name.toUpperCase()}
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default UserType;
