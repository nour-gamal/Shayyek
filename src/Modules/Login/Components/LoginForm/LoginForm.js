import React from "react";
import "./LoginForm.css"
function LoginForm() {
  const sendData = () => {
    console.log("hi");
  };
  return (
    <section className="LoginForm">
      <form onSubmit={sendData}>

          hi
      </form>
    </section>
  );
}

export default LoginForm;
