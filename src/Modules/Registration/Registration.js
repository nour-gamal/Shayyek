import React from "react";
import RegistrationForm from "./Components/RegistrationForm/RegistrationForm";
import Footer from "../Common/Footer/Footer";
import Navbar from "../Common/Navbar/Navbar";

function Registration() {
  return (
    <section>
      <Navbar navState={"light"} />

      <RegistrationForm />
      <Footer />
    </section>
  );
}

export default Registration;
