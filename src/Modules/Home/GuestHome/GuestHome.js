import React from "react";
import GetInTouch from "./Components/GetInTouch/GetInTouch";
import UserType from "./Components/UserType/UserType";
import ValueProposition from "./Components/ValueProposition/ValueProposition";
function GuestHome() {
  return (
    <div>
      <UserType />
      <ValueProposition />
      <GetInTouch />
    </div>
  );
}

export default GuestHome;
