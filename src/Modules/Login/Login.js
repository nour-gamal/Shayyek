import { Footer } from "antd/lib/layout/layout";
import React from "react";
import { Navbar } from "react-bootstrap";
import LoginForm from "./Components/LoginForm/LoginForm";

function Login() {
  return (
    <div>
      <Navbar navState={"light"} />
      <LoginForm />
      <Footer />
    </div>
  );
}

export default Login;
