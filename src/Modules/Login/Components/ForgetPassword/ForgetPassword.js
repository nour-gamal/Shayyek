import React, { useState } from "react";
import { useSelector } from "react-redux";
import { forgetPasswordApi } from "../../network";
// import { loginApi } from "../../network";
import { Link } from "react-router-dom";
import Navbar from "../../../Common/Navbar/Navbar";
import AuthHeader from "../../../Common/AuthHeader/AuthHeader";
import "./ForgetPassword.css";
import Footer from "../../../Common/Footer/Footer";
import { Modal } from "antd";
import smallsend from "../../../../Resources/Assets/smallSend.svg";
import closIcon from "../../../../Resources/Assets/closeIcon.svg";
function ForgetPassword() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [alert, setAlert] = useState(false);

  const showModal = () => {
    if (email) {
      setIsModalVisible(true);
      setAlert(false);
    } else {
      setAlert(true);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const { currentLocal } = useSelector((state) => state.currentLocal);
  // const { authorization } = useSelector((state) => state.authorization);
  const [email, setEmail] = useState("");
  const sendData = (e) => {
    e.preventDefault();
    const body = {
      mobile: email,
    };
    forgetPasswordApi(
      body,
      (success) => console.log(success),
      (fail) => console.log(fail),
      false
    );
  };
  const handleChange = (e) => {
    const id = e.target.id;
    switch (id) {
      case "email": {
        setEmail(e.target.value);
        setAlert(false);
        break;
      }
      default:
        break;
    }
  };
  const emailState = email.substring(0, email.lastIndexOf("@"));
  const emailStateLetter = emailState.slice(0, 2);
  const domain = email.substring(email.lastIndexOf("@") + 1);

  return (
    <section className="ForgetPassword">
      <Navbar navState={"light"} />
      <AuthHeader
        title={currentLocal.login.forgetPasswordTitle}
        login="login"
      />
      <form onSubmit={sendData} className="LoginForm">
        <div className="form">
          <div className="w-50">
            <div className="errorMsg">
              {alert && !email && (
                <div className="f-12">
                  *{currentLocal.login.emailIsRequired}
                </div>
              )}
            </div>
            <input
              className={
                alert
                  ? "error input-field form-control my-3"
                  : "input-field form-control my-3"
              }
              placeholder={currentLocal.login.email}
              type="email"
              id="email"
              value={email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="button">
          <button type="submit" className="button-primary" onClick={showModal}>
            {currentLocal.login.send}
          </button>
        </div>
        <div className="checkAccount">
          <span> {currentLocal.login.RememberYourPassword}</span>
          <span className="mx-2">
            {" "}
            <Link to="/loginByEmail"> {currentLocal.login.signin} </Link>
          </span>
        </div>
      </form>
      <Footer />
      <Modal
        visible={isModalVisible}
        //   onOk={handleOk} onCancel={handleCancel}
      >
        <div className="modalBody text-center">
          <img
            src={closIcon}
            alt="closIcon"
            className="closIcon"
            onClick={handleCancel}
          />
          <img src={smallsend} alt="send" className="msgImg" />
          <p className="f-17 mobileNumber pb-3">
            Verification Link Sent Successfully
            <br />
            To {emailStateLetter}*****@{domain}
          </p>
          <p className="checkMobile f-14 pb-3">
            Check Your Mail to Reset Your Password
          </p>

          <div className="button">
            <button onClick={handleOk} className="button-primary">
              Ok
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}

export default ForgetPassword;
