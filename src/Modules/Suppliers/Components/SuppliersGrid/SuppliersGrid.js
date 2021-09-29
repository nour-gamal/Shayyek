import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
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
