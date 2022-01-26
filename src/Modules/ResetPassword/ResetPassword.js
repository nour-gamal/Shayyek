import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Container } from "react-bootstrap";
// container
import Navbar from "../Common/Navbar/Navbar";
import AuthHeader from "../Common/AuthHeader/AuthHeader";
import Footer from "../Common/Footer/Footer";
import "./ResetPassword.css";
function ResetPassword() {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmationState, setConfirmationState] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const sendData = (e) => {
    e.preventDefault();
    if (!confirmPassword || !password) {
      setAlert(true);
    } else {
      setAlert(false);
      // send data to the user !!!!!
      setRedirect(true);
    }
  };

  const handleChange = (e) => {
    const id = e.target.id;
    console.log(id);
    switch (id) {
      case "confirmPassword": {
        setConfirmPassword(e.target.value);
        setAlert(false);
        break;
      }
      case "password": {
        setPassword(e.target.value);
        break;
      }
      default:
        break;
    }
  };

  if (redirect) {
    return <Redirect to="/loginByEmail" />;
  }

  return (
    <div className="ResetPassword">
      <Navbar navState={"light"} />
      <Container>
        <AuthHeader title={currentLocal.login.ResetPassword} login="login" />
        <form onSubmit={sendData} className="LoginForm">
          <div className="form">
            <div className="w-50">
              <p className="errorMsg">
                {alert && !password && (
                  <>* {currentLocal.login.passwordIsRequired}</>
                )}
              </p>
              <input
                className={
                  alert && !password
                    ? "error input-field form-control my-1"
                    : "input-field form-control my-1"
                }
                placeholder={currentLocal.login.password}
                type="password"
                id="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="w-50">
              <p className="passerrorMsg">
                {alert && !confirmPassword && (
                  <>* {currentLocal.login.passwordIsRequired}</>
                )}
                {confirmationState && (
                  <> * {currentLocal.login.passwordConfirmationDoesnotMatch}</>
                )}
              </p>
              <input
                onBlur={() => {
                  password !== confirmPassword
                    ? setConfirmationState(true)
                    : setConfirmationState(false);
                }}
                className={
                  alert && !confirmPassword
                    ? "error input-field form-control"
                    : "input-field form-control"
                }
                placeholder={currentLocal.login.confirmPassword}
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="button">
            <button type="submit" className="button-primary" onClick={sendData}>
              {currentLocal.login.save}
            </button>
          </div>
        </form>
      </Container>
      <Footer />
    </div>
  );
}

export default ResetPassword;
