import React from "react";
import Navbar from "../Common/Navbar/Navbar";
import Footer from "../Common/Footer/Footer";
import { useSelector } from "react-redux";
import PersonalInfo from "./Components/Personalnfo/Personalnfo";
import BuyerPortfolio from "./Components/BuyerPortfolio/BuyerPortfolio";
import BusinessCard from "./Components/BusinessCard/BusinessCard";
import CompanyCard from "./Components/CompanyCard/CompanyCard";
import { Col, Container, Row } from "react-bootstrap";
function ProfilePage() {
	const { currentLocal } = useSelector((state) => state.currentLocal);

	return (
		<section>
			<Navbar />
			<Container
				fluid
				className={currentLocal.language === "English" ? "ppl" : "ppr"}
			>
				<Row>
					<Col xs={8} md={10}>
						<PersonalInfo />
						<Container fluid className="my-2">
							<Row>
								<Col md={6}>
									<BusinessCard />
								</Col>
								<Col md={6}>
									<CompanyCard />
								</Col>
							</Row>
						</Container>
					</Col>
					<Col xs={4} md={2} className="px-0">
						<BuyerPortfolio />
					</Col>
				</Row>
			</Container>
			<Footer />
		</section>
	);
}

export default ProfilePage;
