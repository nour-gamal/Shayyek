import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
// import Navbar from "../../../Common/Navbar/Navbar";
// import AuthHeader from "../../../Common/AuthHeader/AuthHeader";
import { loginApi } from "../../network";
// import Footer from "../../../Common/Footer/Footer";

import { Link } from "react-router-dom";
import "./LoginByMobile.css";
function LoginByMobile({ setSigninByEmail }) {
  // const dispatch = useDispatch();

  const { currentLocal } = useSelector((state) => state.currentLocal);
  const { authorization } = useSelector((state) => state.authorization);
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  const sendData = (e) => {
    e.preventDefault();
    if (!mobileNumber || !password) {
      setAlert(true);
    } else {
      setAlert(false);
      const body = {
        mobile: mobileNumber,
        password: password,
        fireBaseToken: authorization.deviceToken,
      };
      loginApi(
        body,
        (success) => console.log(success),
        (fail) => console.log(fail),
        false
      );
    }
  };
  const handleChange = (e) => {
    const id = e.target.id;
    switch (id) {
      case "mobileNumber": {
        setMobileNumber(e.target.value);
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

  return (
    <div className="LoginByMobile ppl ppr">
      {/* <Navbar navState={"light"} /> */}
      <Container fluid>
        {/* <AuthHeader title={currentLocal.login.signin} login="login" /> */}
        <form onSubmit={sendData} className="LoginForm">
          <div className="form">
            <div className="w-50">
              <p className="errorMsg">
                {alert && !mobileNumber && (
                  <>* {currentLocal.login.mobileNumberIsRequired}</>
                )}
              </p>
              <input
                className={
                  alert && !mobileNumber
                    ? "error input-field form-control my-1"
                    : "input-field form-control my-1"
                }
                placeholder={currentLocal.login.mobileNumber}
                type="number"
                id="mobileNumber"
                value={mobileNumber}
                onChange={handleChange}
              />
            </div>
            <div className="w-50">
              <p className="errorMsg">
                {alert && !password && (
                  <>* {currentLocal.login.passwordIsRequired}</>
                )}
              </p>
              <input
                className={
                  alert && !password
                    ? "error input-field form-control "
                    : "input-field form-control"
                }
                placeholder={currentLocal.login.password}
                type="password"
                id="password"
                value={password}
                onChange={handleChange}
              />
            </div>

            <div className="forgetPassword py-2">
              <Link to="/forgetpassword" className="f-12">
                {currentLocal.login.forgetPassword}
              </Link>
            </div>
            <div
              className="loginByMobileLink"
              onClick={() => {
                setSigninByEmail("signinEmail");
              }}
            >
              {/* <Link to="/loginByEmail" className="f-12"> */}
              {currentLocal.login.signInWithMobileEmail}
              {/* </Link> */}
            </div>
          </div>
          <div className="button">
            <button type="submit" className="button-primary">
              {currentLocal.login.signin}
            </button>
          </div>
          <div className="checkAccount">
            <span> {currentLocal.login.didHaveAnAcount}</span>
            <span className="mx-2">
              {" "}
              <Link to="/registration">{currentLocal.login.registerNow}</Link>
            </span>
          </div>
        </form>
      </Container>
      {/* <Footer /> */}
    </div>
  );
}

export default LoginByMobile;
