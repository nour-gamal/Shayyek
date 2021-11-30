import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../../../Redux/Authorization";
import { loginApi, IsUserAdmin } from "../../network";
import { Link, Redirect } from "react-router-dom";
import "./LoginByMobile.css";
function LoginByMobile({ setSigninByEmail }) {
  const dispatch = useDispatch();
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const { deviceToken } = useSelector((state) => state.authorization);
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [verrifayState, setVerrifayState] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [adminState, setAdminState] = useState(true);
  const [wrongPassState, setWrongPassState] = useState(false);
  const [wrongEmailState, setWrongEmailState] = useState(false);

  const resendData = (e) => {
    e.preventDefault();
    setAlert(false);
    setVerrifayState(false);
  };
  const sendData = (e) => {
    e.preventDefault();
    if (!mobileNumber || !password) {
      setAlert(true);
    } else {
      setAlert(false);
      const body = {
        mobile: mobileNumber,
        password: password,
        fireBaseToken: deviceToken.deviceToken,
      };
      loginApi(
        body,
        (success) => {
          if (success.success) {
            dispatch(login(success.data));
            setRedirect(true);
          } else if (!success.success && success.data.errorStatus === 2) {
            //email Not verrify
            setVerrifayState(success.message);
          } else if (!success.success && success.data.errorStatus === 3) {
            setWrongPassState(success.message);
          } else if (!success.success && success.data.errorStatus === 6) {
            setWrongEmailState(success.message);
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
  const isUserAdmin = () => {
    IsUserAdmin(
      mobileNumber,
      (success) => {
        if (!success.data) {
          setAdminState(success.data);
        }
      },
      (fail) => console.log(fail),
      false
    );
  };
  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <div className="LoginByMobile ppl ppr">
      {/* <Navbar navState={"light"} /> */}
      <Container fluid>
        {/* <AuthHeader title={currentLocal.login.signin} login="login" /> */}
        <form
          onSubmit={verrifayState ? resendData : sendData}
          className="LoginForm"
        >
          <div className="form">
            <div className="w-50">
              <p className="errorMsg">
                {alert && !mobileNumber && (
                  <>* {currentLocal.login.mobileNumberIsRequired}</>
                )}
                {wrongEmailState && wrongEmailState}
                {verrifayState && verrifayState}
              </p>
              <input
                className={
                  (alert && !mobileNumber) || verrifayState||wrongEmailState
                    ? "error input-field form-control my-1"
                    : "input-field form-control my-1"
                }
                placeholder={currentLocal.login.mobileNumber}
                type="number"
                id="mobileNumber"
                value={mobileNumber}
                onChange={handleChange}
                onBlur={isUserAdmin}
              />
            </div>
            <div className="w-50">
              <p className="errorMsg">
                {alert && !password && (
                  <>* {currentLocal.login.passwordIsRequired}</>
                )}
                {wrongPassState && wrongPassState}
              </p>
              <input
                className={
                  (alert && !password) || wrongPassState
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
                {!adminState ||
                  (!verrifayState && currentLocal.login.forgetPassword)}
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
              {verrifayState
                ? currentLocal.login.verifyYourMailNow
                : currentLocal.login.signin}{" "}
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
