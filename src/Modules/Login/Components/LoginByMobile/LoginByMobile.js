import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../../../Redux/Authorization";
import { Link, Redirect } from "react-router-dom";
import "./LoginByMobile.css";
function LoginByMobile({ setSigninByEmail }) {
  const dispatch = useDispatch();
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const { authorization } = useSelector((state) => state.authorization);
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [verrifayState, setVerrifayState] = useState(false);
  const [redirect, setRedirect] = useState(false);
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
      login(
        body,
        (success) => {
          if (success.success) {
            dispatch(login(success.data));
            setRedirect(true);
          } else if (!success.success && success.data.errorStatus === 1) {
            //email Not verrify
            console.log("hi");
            setVerrifayState(success.message);
          }
        },
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
  if (redirect) {
    return <Redirect to="/" />;
  }
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
                {verrifayState && verrifayState}
              </p>
              <input
                className={
                  (alert && !mobileNumber) || verrifayState
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
