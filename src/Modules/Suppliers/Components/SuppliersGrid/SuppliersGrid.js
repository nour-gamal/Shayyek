import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SupplierCard from "../SupplierCard/SupplierCard";
import { Link } from "react-router-dom";
import "./SuppliersGrid.css";
function CompaniesGrid() {
	const [overlay, setOverlay] = useState({
		no: 0,
		state: false,
	});

	const Suppliers = [
		{
			_id: 1,
			img: "https://via.placeholder.com/300",
			rate: 4,
			name: "Company Name",
			type: "Company Type",
			address: "Company Address",
		},
		{
			_id: 2,
			img: "https://via.placeholder.com/300",
			rate: 2,
			name: "Company Name",
			type: "Company Type",
			address: "Company Address",
		},
		{
			_id: 3,
			img: "https://via.placeholder.com/300",
			rate: 4,
			name: "Company Name",
			type: "Company Type",
			address: "Company Address",
		},
		{
			_id: 4,
			img: "https://via.placeholder.com/300",
			rate: 5,
			name: "Company Name",
			type: "Company Type",
			address: "Company Address",
		},
		{
			_id: 5,
			img: "https://via.placeholder.com/300",
			rate: 3,
			name: "Company Name",
			type: "Company Type",
			address: "Company Address",
		},
	];

	return (
		<div className="suppliersGrid">
			<Container>
				<Row>
					{Suppliers.map((supplier, i) => {
						return (
							<Col
								sm={6}
								md={4}
								lg={3}
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
								<Link to={`supplier/${supplier._id}`}>
									<SupplierCard supplier={supplier} i={i} overlay={overlay} />
								</Link>
							</Col>
						);
					})}
				</Row>
			</Container>
		</div>
	);
}

export default CompaniesGrid;
