import React from "react";
import Navbar from "../Common/Navbar/Navbar";
import Footer from "../Common/Footer/Footer";
import PersonalInfo from "./Components/Personalnfo/Personalnfo";
import { Col, Container, Row } from "react-bootstrap";
function ProfilePage() {
	return (
		<section>
			<Navbar />
			<Container>
				<Row>
					<Col>
						<PersonalInfo />
					</Col>
				</Row>
			</Container>
			<Footer />
		</section>
	);
}

export default ProfilePage;
