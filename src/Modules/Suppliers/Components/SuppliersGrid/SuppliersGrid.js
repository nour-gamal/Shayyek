import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import "./SuppliersGrid.css";
function CompaniesGrid() {
	const [overlay, setOverlay] = useState({
		no: 0,
		state: false,
	});
	const Suppliers = [
		{
			img: "https://via.placeholder.com/300",
			rate: 4,
			name: "Company Name",
			type: "Company Type",
			address: "Company Address",
		},
		{
			img: "https://via.placeholder.com/300",
			rate: 2,
			name: "Company Name",
			type: "Company Type",
			address: "Company Address",
		},
		{
			img: "https://via.placeholder.com/300",
			rate: 4,
			name: "Company Name",
			type: "Company Type",
			address: "Company Address",
		},
		{
			img: "https://via.placeholder.com/300",
			rate: 5,
			name: "Company Name",
			type: "Company Type",
			address: "Company Address",
		},
		{
			img: "https://via.placeholder.com/300",
			rate: 3,
			name: "Company Name",
			type: "Company Type",
			address: "Company Address",
		},
	];

	return (
		<section className="suppliersGrid">
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
								<img
									src={supplier.img}
									alt="supplier"
									className="supplierImg"
								/>
								<div
									className={
										overlay.state && overlay.no === i
											? "overlay"
											: "fadeOutOverlay"
									}
								>
									<ReactStars
										edit={false}
										count={5}
										value={supplier.rate}
										size={24}
										activeColor="#ffd700"
									/>
									<div className="name f-21">{supplier.name}</div>
									<div className="f-17">{supplier.type}</div>
									<div className="f-17">{supplier.address}</div>
								</div>
							</Col>
						);
					})}
				</Row>
			</Container>
		</section>
	);
}

export default CompaniesGrid;
