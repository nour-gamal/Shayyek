import React from "react";
import Navbar from "../Common/Navbar/Navbar";
import Footer from "../Common/Footer/Footer";
import PersonalInfo from "./Components/Personalnfo/Personalnfo";
import BuyerPortfolio from "./Components/BuyerPortfolio/BuyerPortfolio";
import { Col, Container, Row } from "react-bootstrap";
function ProfilePage() {
	return (
		<section>
			<Navbar />
			<Container fluid>
				<Row>
					<Col>
						<PersonalInfo />
					</Col>
					<Col xs={2} className="pr-0">
						<BuyerPortfolio />
					</Col>
				</Row>
			</Container>
			<Footer />
		</section>
	);
}

export default ProfilePage;
