import React from "react";
import GetInTouch from "./Components/GetInTouch/GetInTouch";
import LandingPage from "./Components/LandingPage/LandingPage";
import UserType from "./Components/UserType/UserType";
import ValueProposition from "./Components/ValueProposition/ValueProposition";
function GuestHome() {
  return (
    <div>
      <LandingPage />
      <UserType />
      <ValueProposition />
      <GetInTouch />
    </div>
  );
}

export default GuestHome;
