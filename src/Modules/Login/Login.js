import React from "react";
import Navbar from "../Common/Navbar/Navbar";
import Footer from "../Common/Footer/Footer"
import LoginForm from "./Components/LoginForm/LoginForm";
import { useSelector } from "react-redux";
import AuthHeader from "../Common/AuthHeader/AuthHeader";
function Login() {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  return (
    <section>
      <Navbar navState={"light"} />
      <AuthHeader title={currentLocal.login.signin}/>
      <LoginForm />
      <Footer />
    </section>
  );
}

export default Login;
