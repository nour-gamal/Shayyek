import React from "react";
import "./ValueProposition.css";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
function ValueProposition() {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const cards = [
    {
      id: "1",
      img: "hello",
      title: currentLocal.home.transparency,
      content: currentLocal.home.contentOfTransparency,
    },
    {
      id: "2",
      img: "hello",
      title: currentLocal.home.accountability,
      content: currentLocal.home.contentOfAcountability,
    },
    {
      id: "3",
      img: "hello",
      title: currentLocal.home.optimizedProcess,
      content: currentLocal.home.contentOfoptimizedProcess,
    },
  ];
  return (
    <div className="valueProposition">
      <Container>
        <h1 className="f-27">{currentLocal.home.valueProposition}</h1>
        <Row>
          {cards.map((card) => {
            console.log(card);
            return (
              <Col md={4} xs={12} key={card.id}>
                <div className="cardContainer">
                  <h2 className="f-21 text-white text-bold">{card.title}</h2>
                  <p className="f-12 text-white">{card.content}</p>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default ValueProposition;
