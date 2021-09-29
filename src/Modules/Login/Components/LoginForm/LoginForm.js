import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./LoginForm.css";
function LoginForm() {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("")
  const sendData = () => {
    console.log("hi");
  };
  const handleChange = () => {

};
  return (
    <Container>
      <form onSubmit={sendData}>
        <input
          className="input-field"
          placeholder={currentLocal.registration.mobileNumber}
          type="number"
          id="mobileNumber"
        value={mobileNumber}

          onChange={handleChange}
        />
        <input
          className="input-field"
          placeholder={currentLocal.registration.password}
          type="password"
          id="password"
          value={password}
          onChange={handleChange}
        />
        <div className="button">
          <button
            onClick={() => {
              console.log("hi");
            }}
            type="submit"
            className="button-primary"
          >
            {currentLocal.registration.register}
          </button>
        </div>
      </form>
    </Container>
  );
}

export default LoginForm;
