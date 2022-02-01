import React from "react";
import { useSelector } from "react-redux";
import "./BuyerPortfolio.css";
function BuyerPortfolio() {
	const { currentLocal } = useSelector((state) => state.currentLocal);

	const buyerInfo = [
		{
			name: "Nour",
			description: "Hello",
		},
		{
			name: "Nancy",
			description: "Good",
		},
		{
			name: "Nour",
			description: "Hello",
		},
	];
	return (
		<aside className="buyerPortfolio">
			<div className="d-flex align-items-center profileContainer">
				<img
					src=defaultImage
					alt="profile"
					className="rounded-circle"
				/>
				<h6 className="title f-17 fw-600 mx-2">
					{currentLocal.profilePage.prevWork}
				</h6>
			</div>
			<div>
				{buyerInfo.map((info) => {
					return (
						<div className="buyerInfo">
							<div>
								<div className="name f-14  fw-600">{info.name}</div>
								<div className="description f-14">{info.description}</div>
							</div>
						</div>
					);
				})}
			</div>
		</aside>
	);
}

export default BuyerPortfolio;
