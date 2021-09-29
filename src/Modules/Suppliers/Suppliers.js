import React from "react";
import SuppliersGrid from "./Components/SuppliersGrid/SuppliersGrid";
import NavBar from "../Common/Navbar/Navbar";
import { Container, Col, Row } from "react-bootstrap";
import Filter from "./Components/Filter/Filter";
import Footer from "../Common/Footer/Footer";
function Companies() {
	return (
		<section>
			<NavBar />
			<Container fluid>
				<Row>
					<Col xs={8} sm={9} lg={10}>
						<SuppliersGrid />
					</Col>
					<Col xs={4} sm={3} lg={2} className="pr-0 pl-0 ">
						<Filter />
					</Col>
				</Row>
			</Container>
			<Footer />
		</section>
	);
}

export default Companies;
