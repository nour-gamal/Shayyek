import React from "react";
import Navbar from "../Common/Navbar/Navbar";
import Footer from "../Common/Footer/Footer"
import { useSelector } from "react-redux";
import AuthHeader from "../Common/AuthHeader/AuthHeader";
import LoginByEmail from "./Components/LoginByEmail/LoginByEmail";
function Login() {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  return (
    <section className="login">
      <Navbar navState={"light"} />
      <AuthHeader title={currentLocal.login.signin}/>
      <LoginByEmail />
      <Footer />
    </section>
  );
}

export default Login;
