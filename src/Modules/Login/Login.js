import React, { useState } from "react";
import Navbar from "../Common/Navbar/Navbar";
import Footer from "../Common/Footer/Footer";
import { useSelector } from "react-redux";
import AuthHeader from "../Common/AuthHeader/AuthHeader";
import LoginByEmail from "./Components/LoginByEmail/LoginByEmail";
import LoginByMobile from "./Components/LoginByMobile/LoginByMobile";
import RejectionState from "./Components/RejectionState/RejectionState";
function Login() {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const [loginType, setLoginType] = useState("");
  const setSigninByEmail = (value) => {
    setLoginType(value); //signinMobile
  };
  const signinByEmail = (value) => {
    setLoginType(value); //signinEmail
  };
  const rejection = (value) => {
    setLoginType(value); //rejection
  };
  console.log(loginType);

  return (
    <section className="logins">
      <Navbar navState={"light"} />
      <AuthHeader title={currentLocal.login.signin} />
      {loginType === "signinMobile" ? (
        <LoginByMobile setSigninByEmail={setSigninByEmail} />
      ): loginType==="rejection"?
      <RejectionState rejection={rejection} />
	  : (
        <LoginByEmail signinByEmail={signinByEmail} />
      )}
      <Footer />
    </section>
  );
}

export default Login;
