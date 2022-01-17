import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getCompanies } from "../../Network";
import SupplierCard from "../SupplierCard/SupplierCard";
import "./SuppliersGrid.css";
function CompaniesGrid({ filteredCompanies }) {
	const [overlay, setOverlay] = useState({
		no: 0,
		state: false,
	});
	const [companies, updateCompanies] = useState([]);

	const { currentLanguageId } = useSelector((state) => state.currentLocal);

	useEffect(() => {
		getCompanies(
			currentLanguageId,
			(success) => {
				updateCompanies(filteredCompanies ? filteredCompanies : success.data);
			},
			(fail) => {
				console.log(fail);
			}
		);
	}, [currentLanguageId, filteredCompanies]);

	return (
		<div className="suppliersGrid pps">
			<Container fluid>
				<Row>
					{companies.map((company, i) => {
						return (
							<Col
								sm={6}
								lg={4}
								xl={3}
								onMouseEnter={() => {
									setOverlay({
										no: i,
										state: true,
									});
								}}
								onMouseLeave={() => {
									setOverlay({
										no: i,
										state: false,
									});
								}}
								key={i}
							>
								<SupplierCard supplier={company} i={i} overlay={overlay} />
							</Col>
						);
					})}
				</Row>
			</Container>
		</div>
	);
}

export default CompaniesGrid;
