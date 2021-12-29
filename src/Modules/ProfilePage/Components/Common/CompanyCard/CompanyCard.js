import React from "react";
import { useSelector } from "react-redux";
import "./CompanyCard.css";
function CompanyCard() {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	return (
		<div className="companyCard f-12">
			<div className="d-flex align-items-center">
				<img
					src={
						"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
					}
					alt="companyProfile"
					className="rounded-circle companyImg"
				/>
				<div className="mx-2">Hazem Hassan</div>
			</div>
			<ul className="list-unstyled">
				<li>
					<label>{currentLocal.profilePage.address}</label>
					<div>Egypt,Giza</div>
				</li>
				<li>
					<label>{currentLocal.profilePage.governorate}</label>
					<div>Giza</div>
				</li>
				<li>
					<label>{currentLocal.profilePage.phoneNumber}</label>
					<div>0123456789</div>
				</li>
				<li>
					<label>{currentLocal.profilePage.email}</label>
					<div>Enmsjj@kddj.com</div>
				</li>
				<li>
					<label>{currentLocal.profilePage.organizLegalStruc}</label>
					<div>test</div>
				</li>
				<li>
					<label>{currentLocal.profilePage.companyWebsite}</label>
					<div>Egypt,Giza</div>
				</li>
				<li>
					<label>{currentLocal.profilePage.commercialRegister}</label>
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
