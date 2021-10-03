import React from "react";
import "./BuyerPortfolio.css";
function BuyerPortfolio() {
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
					src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
					alt="profile"
					className="rounded-circle"
				/>
				<h6 className="title f-17 fw-600 mx-2">Previous work</h6>
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
