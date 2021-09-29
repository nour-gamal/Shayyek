import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./LoginForm.css";
function LoginForm() {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const sendData = (e) => {
    e.preventDefault();
    console.log("hi");
    setMobileNumber("");
    setPassword("");
  };
  const handleChange = (e) => {
    const id = e.target.id;
    switch (id) {
      case "mobileNumber": {
        setMobileNumber(e.target.value);
        break;
      }
      case "password": {
        setPassword(e.target.value);
        break;
      }
      default:
        break;
    }
  };

  return (
    <Container>
      <form onSubmit={sendData} className="LoginForm">
        <div className="form">
          <div className="w-50">
            <input
              className="input-field"
              placeholder={currentLocal.login.mobileNumber}
              type="number"
              id="mobileNumber"
              value={mobileNumber}
              onChange={handleChange}
            />
          </div>
          <div className="w-50">
            <input
              className="input-field"
              placeholder={currentLocal.login.password}
              type="password"
              id="password"
              value={password}
              onChange={handleChange}
            />
          </div>

          <div className="forgetPassword">
            <Link to="/forgetpassword">
              {currentLocal.login.forgetPassword}</Link>
          </div>
        </div>
        <div className="button">
          <button
            onClick={() => {
              console.log("hi");
            }}
            type="submit"
            className="button-primary"
          >
            {currentLocal.login.signin}
          </button>
        </div>
        <div className="checkAccount">
        {currentLocal.login.didHaveAnAcount} <Link to="/registration"> {currentLocal.login.registerNow}</Link>
        </div>
      </form>
    </Container>
  );
}

export default LoginForm;
