import React from "react";
import "./CompanyCard.css";
function CompanyCard() {
	return (
		<div className="companyCard">
			<img
				src={
					"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
				}
				alt="companyProfile"
				className="rounded-circle"
			/>
			<ul className="list-unstyled f-17">
				<li>Company Name : Hazem Hassan</li>
				<li>Address : Egypt , Giza , Elwahat Desert Road</li>
				<li>Phone Number : 0123456789</li>
				<li>Government : Giza</li>
				<li>
					Commercial record :
					<img
						src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
						alt="CommercialRecord"
					/>
				</li>
			</ul>
		</div>
	);
}

export default CompanyCard;
