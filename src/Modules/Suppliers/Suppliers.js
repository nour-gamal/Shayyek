import { useState } from "react";
import SuppliersGrid from "./Components/SuppliersGrid/SuppliersGrid";
import NavBar from "../Common/Navbar/Navbar";
import { Col, Row } from "antd";
import Filter from "./Components/Filter/Filter";
import Footer from "../Common/Footer/Footer";
function Companies() {
	const [filteredCompanies, updateFilteredCompanies] = useState(null);
	const getFilteredCompany = (companies) => {
		updateFilteredCompanies(companies);
	};

	return (
		<section>
			<NavBar />
			<Row className="d-flex flex-1">
				<Col xs={16} sm={18} lg={20}>
					<SuppliersGrid filteredCompanies={filteredCompanies} />
				</Col>
				<Col xs={8} sm={6} lg={4}>
					<Filter getFilteredCompany={getFilteredCompany} />
				</Col>
			</Row>
			<Footer />
		</section>
	);
}

export default Companies;
