import React from "react";
import RegistrationForm from "./Components/RegistrationForm/RegistrationForm";
import Footer from "../Common/Footer/Footer";
import Navbar from "../Common/Navbar/Navbar";

function Registeration() {
  return (
    <div>
      <Navbar navState={"light"} />
      <RegistrationForm />
      <Footer />
    </div>
  );
}

export default Registeration;
