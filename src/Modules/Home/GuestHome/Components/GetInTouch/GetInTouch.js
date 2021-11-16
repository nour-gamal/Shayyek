import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Alert } from "antd";
import "./GetInTouch.css";
import { ContactUs } from "../../../network";
function GetInTouch() {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [msg, setMsg] = useState("");
  const [alert, setAlert] = useState(false);
  const [succesAlert, setSuccesAlert] = useState(false);
  const [failAlert, setFailAlert] = useState(false);
  const sendData = (e) => {
    e.preventDefault();
    if (!name || !mobile || !msg) {
      setAlert(true);
      setFailAlert(true);
      // setTimeout(() => {
      //   setFailAlert(false);
      // }, 3000);
    } else {
      setFailAlert(false);
      setSuccesAlert(true);
      setAlert(false)
      setTimeout(() => {
        setSuccesAlert(false);
      }, 5000);
      const body = {
        name: name,
        mobile:mobile,
        message:msg,
        email:email
      };
      ContactUs(
        body,
        (success) =>{
          console.log(success.data)
          if(success.data){
            setName("")
            setEmail("")
            setMobile("")
            setMsg("")
          }
        },
        (fail) => console.log(fail),
        false
      );
    }
  };

  return (
    <div className="getInTouch">
      <Container>
        <h1 className="f-27">{currentLocal.home.getInTouch}</h1>
      </Container>
      <div className="msgContainer">
        <Container>
          <div className="alert mb-5">
            {succesAlert && (
              <>
                <Alert
                  message={currentLocal.home.yourMessageSentSuccessfully}
                  type="success"
                />{" "}
              </>
            )}
            {failAlert &&(!name||!mobile||!msg)&& (
              <Alert
                message={currentLocal.home.yourMessageSentnotSuccessfully}
                type="error"
              />
            )}
          </div>
          <div className="msgData">
            <h5 className="f-17">{currentLocal.home.dropUsANoteBelow}</h5>
       
            <form onSubmit={sendData}>
              <Row>
                <Col md={4} xs={12}>
                  <p className="errorMsg">
                    {alert && !name && (
                      <>* {currentLocal.home.nameIsRequired}</>
                    )}
                  </p>
                  <input
                    className={
                      alert && !name
                        ? "error input-field form-control"
                        : "input-field form-control"
                    }
                    placeholder={currentLocal.home.name}
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Col>
                <Col md={4} xs={12}>
                  <p className="errorMsg">
                    {alert && !mobile && (
                      <>* {currentLocal.home.mobileNumberIsRequired}</>
                    )}
                  </p>
                  <input
                    className={
                      alert && !mobile
                        ? "error input-field form-control"
                        : "input-field form-control"
                    }
                    placeholder={currentLocal.home.mobile}
                    type="number"
                    id="mobile"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value);
                    }}
                  />
                </Col>
                <Col md={4} xs={12}>
                  <p className="errorMsg"></p>

                  <input
                    className="input-field form-control"
                    placeholder={currentLocal.home.email}
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <p className="errorMsg mt-3">
                  {alert && !msg && <>* {currentLocal.home.messageIsRequire}</>}
                </p>

                <textarea
                  rows="8"
                
                  cols="50"
                  className={
                    alert && !msg ? "error  form-control" : " form-control"
                  }
                  placeholder={currentLocal.home.msg}
                  type="text"
                  id="Message"
                  value={msg}
                  onChange={(e) => {
                    setMsg(e.target.value);
                  }}
                ></textarea>
              </Row>
              <div className="button">
                <button className="button-primary" type="submit">
                  {currentLocal.home.sendMessage}
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
