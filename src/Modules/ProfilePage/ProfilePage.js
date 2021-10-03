import React from "react";
import Navbar from "../Common/Navbar/Navbar";
import Footer from "../Common/Footer/Footer";
import PersonalInfo from "./Components/Personalnfo/Personalnfo";
import BuyerPortfolio from "./Components/BuyerPortfolio/BuyerPortfolio";
import BusinessCard from "./Components/BusinessCard/BusinessCard";
import CompanyCard from "./Components/CompanyCard/CompanyCard";
import { Col, Container, Row } from "react-bootstrap";
function ProfilePage() {
	return (
		<section>
			<Navbar />
			<Container fluid>
				<Row>
					<Col xs={10}>
						<PersonalInfo />
						<Container fluid>
							<Row>
								<Col xs={6}>
									<BusinessCard />
								</Col>
								<Col xs={6}>
									<CompanyCard />
								</Col>
							</Row>
						</Container>
					</Col>
					<Col xs={2} className="px-0">
						<BuyerPortfolio />
					</Col>
				</Row>
			</Container>
			<Footer />
		</section>
	);
}

export default ProfilePage;
