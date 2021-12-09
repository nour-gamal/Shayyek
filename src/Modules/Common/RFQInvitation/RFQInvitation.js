import React from "react";
import { useSelector } from "react-redux";
import "./RFQInvitation.css";
function RFQInvitation({ revealPrices, data, location }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	return (
		<div className="rfqInvitation">
			<div className="d-flex justify-content-between rfqInvContainer ">
				<ul className="list-unstyled">
					<li>{currentLocal.supplierHome.noOfQuotations} </li>
					<li className="primary-color">5</li>
					<li>{currentLocal.supplierHome.deadline}</li>
					<li className="primary-color">22/1/1995</li>
				</ul>
				{revealPrices && (
					<div className="d-flex priceBox">
						<div className="mt-2 mx-2">
							<div className="redball"></div>
							<div className="greenball"></div>
						</div>

						<div>
							<label>{currentLocal.supplierHome.maxPrice}</label>
							<div className="primary-color">EGP 30</div>
							<label>{currentLocal.supplierHome.minPrice}</label>
							<div className="primary-color">EGP 60</div>
						</div>
					</div>
				)}
			</div>
			{location === "supplier" && (
				<div className="text-center">
					<button className="button-primary">
						{currentLocal.supplierHome.fillSheet}
					</button>
				</div>
			)}
		</div>
	);
}

export default RFQInvitation;
