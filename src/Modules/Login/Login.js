import React from "react";
import Navbar from "../Common/Navbar/Navbar";
import Footer from "../Common/Footer/Footer"
import LoginForm from "./Components/LoginForm/LoginForm";

function Login() {
  return (
    <section>
      <Navbar navState={"light"} />
      <h3 className="mt-5 mb-4">Sign In </h3>
      <LoginForm />
      <Footer />
    </section>
  );
}

export default Login;
