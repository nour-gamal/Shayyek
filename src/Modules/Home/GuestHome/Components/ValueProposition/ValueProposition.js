import React from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import optimization from "../../../../../Resources/Assets/optimization (2)@2x.png";
import transparency from "../../../../../Resources/Assets/transparency (1)@2x.png";
import accountability from "../../../../../Resources/Assets/accountability (2)@2x.png";
import "./ValueProposition.css";
function ValueProposition() {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const cards = [
		{
			id: "1",
			img: transparency,
			title: currentLocal.home.transparency,
			content: currentLocal.home.contentOfTransparency,
		},
		{
			id: "2",
			img: accountability,
			title: currentLocal.home.accountability,
			content: currentLocal.home.contentOfAcountability,
		},
		{
			id: "3",
			img: optimization,
			title: currentLocal.home.optimizedProcess,
			content: currentLocal.home.contentOfoptimizedProcess,
		},
	];
	return (
		<div className="valueProposition ppr ppl">
			<Container fluid>
				<h1 className="f-27">{currentLocal.home.valueProposition}</h1>
				<Row>
					{cards.map((card) => {
						return (
							<Col md={4} xs={12} key={card.id}>
								<div className="cardContainer">
									<div className="img text-center">
										<img src={card.img} alt="optimization" />
									</div>
									<h2 className="f-21 text-white text-bold text-center">
										{card.title}
									</h2>
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
