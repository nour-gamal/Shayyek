import React from "react";
import { useSelector } from "react-redux";
import "./RFQInvitation.css";
function RFQInvitation({ revealPrices }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	return (
		<div className="d-flex justify-content-between">
			<ul className="list-unstyled">
				<li>{currentLocal.supplierHome.noOfQuotations} </li>
				<li>5</li>
				<li>{currentLocal.supplierHome.deadline}</li>
				<li>22/1/1995</li>
			</ul>
			{revealPrices && (
				<div className="d-flex priceBox">
					<div className="mt-2 mx-2">
						<div className="redball"></div>
						<div className="greenball"></div>
					</div>

					<div>
						<label>{currentLocal.supplierHome.maxPrice}</label>
						<label>{currentLocal.supplierHome.minPrice}</label>
					</div>
				</div>
			)}
		</div>
	);
}

export default RFQInvitation;
