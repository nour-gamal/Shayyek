import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./GetInTouch.css";
function GetInTouch() {
  const sendData = (e) => {
    e.preventDefault();
  };
  return (
    <div className="getInTouch">
      <Container>
        <h1 className="f-27"> Get in touch</h1>
      </Container>
      <div className="msgContainer">
        <Container>
            <div className="msgData">
          <h5 className="f-17">Drop us a note below</h5>
          <form onSubmit={sendData}>
            <Row>
              <Col md={4} xs={12}>
                <input className="input-field" placeholder="Name" />
              </Col>
              <Col md={4} xs={12}>
                <input className="input-field" placeholder="Mobile" />
              </Col>
              <Col md={4} xs={12}>
                <input className="input-field" placeholder="E-mail" />
              </Col>
            </Row>
            <Row>
              <textarea rows="8" cols="50" placeholder="Message"></textarea>
            </Row>
            <div className="button">
                <button className="button-primary">
                    Send Message
                </button>
            </div>
          </form>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default GetInTouch;
