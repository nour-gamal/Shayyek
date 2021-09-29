import React from "react";
import RegistrationForm from "./Components/RegistrationForm/RegistrationForm";
import Footer from "../Common/Footer/Footer";
import Navbar from "../Common/Navbar/Navbar";
import { useSelector } from "react-redux";
import AuthHeader from "../Common/AuthHeader/AuthHeader";

function Registration() {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const showState = true;

  return (
    <section>
      <Navbar navState={"light"} />
      <AuthHeader
        title={currentLocal.registration.createAnAccount}
        showState={showState}
      />
      <RegistrationForm />
      <Footer />
    </section>
  );
}

export default Registration;
