import React, { useState } from "react";
// import { Link } from "react-router-dom";
import "./VerifyByEmail.css";
import send from "../../../../Resources/Assets/sent.svg";
import smallsend from "../../../../Resources/Assets/smallSend.svg";
import closIcon from "../../../../Resources/Assets/closeIcon.svg";
import Footer from "../../../Common/Footer/Footer";
import Navbar from "../../../Common/Navbar/Navbar";
// import ReactInputVerificationCode from 'react-input-verification-code';
// import ReactCodeInput from 'react-verification-code-input';
import VerificationInput from "react-verification-input";
import { Modal } from "antd";
function VerifyByEmail() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const mobileNuumberState=localStorage.getItem( "mobileNumber" )
  const mobileNumber=mobileNuumberState.slice(8,11)
  return (
    <div className="verifyByEmail">
      <Navbar navState={"light"} />
      <div className="content">
        <div className="ContentContainer">
          <img src={send} alt="send" />
          <h3 className="f-21">Successfully Registered</h3>
          <p className="f-14">Check Your Mail to Verify Your Account</p>
          <p className="f-14">or</p>
          <div className="button">
            <button className="button-primary" onClick={showModal}>
              {" "}
              Verify your Mobile Number
            </button>
          </div>
          <Modal
            visible={isModalVisible}
            //   onOk={handleOk} onCancel={handleCancel}
          >
            <div className="modalBody text-center">
              <img src={closIcon} alt="closIcon" className="closIcon" onClick={handleCancel} />
              <img src={smallsend} alt="send" className="msgImg" />
              <p className="f-17 mobileNumber">Code Sent to *******{mobileNumber}</p>
              <p className="checkMobile f-14">Check Your Mobile to Verify Your Acount</p>
              <div className="code">
              {/* <ReactCodeInput />; */}
              <VerificationInput placeholder={""}/>
              </div>
              <div className="button">
                <button onClick={handleOk}  className="button-primary">
                  Submit
                </button>
              </div>
              <p className="f-14" style={{color:"#707070"}}>
                It may take a minute to receive your code, Haven't received it ?
               <span className="resendCodev f-14" onClick={()=>{
                   alert("hi")
               }}> Resend a new code.</span>
              </p>
            </div>
          </Modal>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VerifyByEmail;
