import React from "react";
import "./ValueProposition.css";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
function ValueProposition() {
  const { currentLocal } = useSelector((state) => state.currentLocal);

  return (
    <div className="valueProposition">
      <Container>
        <h1 className="f-27">{currentLocal.home.getInTouch}</h1>
      </Container>
    </div>
  );
}

export default ValueProposition;
