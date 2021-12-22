import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Menu, Dropdown, message } from "antd";
import eye from "../../../Resources/Assets/eye.svg";
import edit from "../../../Resources/Assets/edit.svg";
import deletee from "../../../Resources/Assets/deletee.svg";
import { Redirect } from "react-router-dom";
import "./RFQInvitation.css";
function RFQInvitation({ revealPrices, rfqDetails, parent }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [redirectTo, updateRedirectTo] = useState(false);
	function handleMenuClick(e) {
		if (e.key === "1") {
			updateRedirectTo(true);
		}
	}

	const menu = (
		<Menu onClick={handleMenuClick}>
			<Menu.Item key="1" icon={<img src={eye} alt="eye" />}>
				{currentLocal.buyerHome.viewOffers}
			</Menu.Item>
			<Menu.Item key="2" icon={<img src={edit} alt="eye" />}>
				{currentLocal.buyerHome.edite}
			</Menu.Item>
			<Menu.Item key="3" icon={<img src={deletee} alt="eye" />}>
				{currentLocal.buyerHome.delete}
			</Menu.Item>
		</Menu>
	);
	if (redirectTo) {
		return <Redirect to="/offerstable" />;
	}
	return (
		<div className="rfqInvitation">
			<div className="projectName f-14 my-1">{rfqDetails.projectName}</div>
			{parent === "buyer" && (
				<div className="text-right my-1">
					<Dropdown.Button overlay={menu} trigger={["click"]}></Dropdown.Button>
				</div>
			)}

			<div className="d-flex justify-content-between rfqInvContainer ">
				<ul className="list-unstyled">
					<li>{currentLocal.supplierHome.noOfQuotations} </li>
					<li className="primary-color">{rfqDetails.noOfQuotations}</li>
					<li>{currentLocal.supplierHome.deadline}</li>
					<li className="primary-color">{rfqDetails.deadline}</li>
				</ul>
				{revealPrices && (
					<div className="d-flex priceBox">
						<div className="mt-2 mx-2">
							<div className="redball"></div>
							<div className="greenball"></div>
						</div>

						<div>
							<label>{currentLocal.supplierHome.maxPrice}</label>
							<div className="primary-color">EGP {rfqDetails.maxPrice}</div>
							<label>{currentLocal.supplierHome.minPrice}</label>
							<div className="primary-color">EGP {rfqDetails.minPrice}</div>
						</div>
					</div>
				)}
			</div>
			{parent === "supplier" && (
				<div className="text-center my-2">
					<button className="popup-button-primary">
						{currentLocal.supplierHome.fillSheet}
					</button>
				</div>
			)}
		</div>
	);
}

export default RFQInvitation;
