import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import StarsRating from "stars-rating";
import { Dropdown, Menu } from "antd";
import view from "../../../../../Resources/Assets/View.svg";
import { Link } from "react-router-dom";
import hoveringView from "../../../../../Resources/Assets/hoveringView.svg";
import research from "../../../../../Resources/Assets/research@2x.png";
import HoveringRegectEmp from "../../../../../Resources/Assets/HoveringRegectEmp.svg";
import RejectEmp from "../../../../../Resources/Assets/RejectEmp.svg";
import {BuyerRFQ} from "../../../network"
import "./BuyerHomeComponent.css";
function BuyerHomeComponent() {
	const [hoverState, setHover] = useState(false);
	const [hoverId, setHoverId] = useState();
useEffect(() => {
	BuyerRFQ(
		(success) => {
		console.log(success);
		
		},
		(fail) => {
			console.log(fail);
		}
	);
}, [])
	const companies = [
		{
			img: "",
			companyName: "hhh",
			companyType: "tyyy",
			comanyddress: "fff",
		},
		{
			img: "",
			companyName: "hhh",
			companyType: "tyyy",
			comanyddress: "fff",
		},
		{
			img: "",
			companyName: "hhh",
			companyType: "tyyy",
			comanyddress: "fff",
		},
		{
			img: "",
			companyName: "hhh",
			companyType: "tyyy",
			comanyddress: "fff",
		},
		{
			img: "",
			companyName: "hhh",
			companyType: "tyyy",
			comanyddress: "fff",
		},
		{
			img: "",
			companyName: "hhh",
			companyType: "tyyy",
			comanyddress: "fff",
		},
		{
			img: "",
			companyName: "hhh",
			companyType: "tyyy",
			comanyddress: "fff",
		},
		{
			img: "",
			companyName: "hhh",
			companyType: "tyyy",
			comanyddress: "fff",
		},
		{
			img: "",
			companyName: "hhh",
			companyType: "tyyy",
			comanyddress: "fff",
		},
		{
			img: "",
			companyName: "hhh",
			companyType: "tyyy",
			comanyddress: "fff",
		},
		{
			img: "",
			companyName: "hhh",
			companyType: "tyyy",
			comanyddress: "fff",
		},
		{
			img: "",
			companyName: "hhh",
			companyType: "tyyy",
			comanyddress: "fff",
		},
		{
			img: "",
			companyName: "hhh",
			companyType: "tyyy",
			comanyddress: "fff",
		},
	];
	const menu = (
		<Menu>
			<Menu.Item key="0" className="View">
				<img
					src={hoverState && hoverId === "1" ? hoveringView : view}
					alt="View"
				/>
				<span
					id="1"
					className="acceptOffer"
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
					onMouseMove={(e) => setHoverId(e.target.id)}
				>
					View Offers
				</span>
			</Menu.Item>
			,
			<Menu.Item key="0" className="View">
				<img
					src={hoverState && hoverId === "1" ? HoveringRegectEmp : RejectEmp}
					alt="View"
				/>
				<span
					id="1"
					className="acceptOffer"
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
					onMouseMove={(e) => setHoverId(e.target.id)}
				>
					View Offers
				</span>
			</Menu.Item>
			,
			<Menu.Item
				key="2"
				// className={currentLocal.language !== "English" && "delete"}
			>
				<img
					src={hoverState && hoverId === "3" ? HoveringRegectEmp : RejectEmp}
					alt="RejectEmp"
				/>
				<span
					className="delete"
					id="3"
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
					onMouseMove={(e) => setHoverId(e.target.id)}
				>
					delete
				</span>
			</Menu.Item>
		</Menu>
	);
	return (
		<div className="homeByer">
			<div className="CompanyContainer">
				<Container>
					<button className="btn btn-danger mt-4 mx-4">
						<Link to="createrfq">
							{/* <img src={Request_RFQ} alt="Request_RFQ" /> */}
							Add New RFQ
						</Link>
					</button>

					<h3 className="f-17 mx-4  mt-5 mb-2">Related MarketPlace</h3>
					<div className="company mx-3">
						<Row>
							{companies.map((company, i) => {
								return (
									<Col md="3" xs="12" key={i}>
										<div className="companyCard">
											<div className="logo">
												<img src={company.img} alt="logo" />
											</div>

											<StarsRating
												count={5}
												// value={search.rate}
												size={24}
												color2={"#ffd700"}
												edit={false}
												className="stars"
											/>
											<h4>{company.companyName}</h4>
											<h5>{company.companyType}</h5>
											<h5>{company.comanyddress}</h5>
										</div>
									</Col>
								);
							})}
						</Row>
					</div>
				</Container>
			</div>
			<div className="projectContainer">
				<div className="invitations px-3">
					<div className="RFQinvitations">
						<img src={research} alt="research" />
						<p className="ml-2 f-17">RFQ Invitations</p>
					</div>
					<div className="mt-4 number">
						<p className="text-white">5</p>
					</div>
				</div>
				<div className="projects">
					<h5>
						Projects
						<Dropdown.Button
							overlay={menu}
							trigger={["click"]}
							onClick={(e) => e.preventDefault()}
						></Dropdown.Button>
					</h5>
				</div>
			</div>
		</div>
	);
}

export default BuyerHomeComponent;
