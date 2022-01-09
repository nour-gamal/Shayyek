import React from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../../../Services";
import "./CompanyCard.css";
function CompanyCard({ companyDetails }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	return (
		<div className=" f-12">
			{companyDetails && (
				<div className="companyCard">
					<div className="d-flex align-items-center">
						<img
							src={
								companyDetails.image
									? baseUrl + companyDetails.image
									: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
							}
							alt="companyProfile"
							className="rounded-circle companyImg"
						/>
						<div className="mx-2">{companyDetails.name}</div>
					</div>
					<ul className="list-unstyled">
						<li>
							<label>{currentLocal.profilePage.address}</label>
							<div>{companyDetails.address}</div>
						</li>
						<li>
							<label>{currentLocal.profilePage.governorate}</label>
							<div>{companyDetails.governorateName}</div>
						</li>
						<li>
							<label>{currentLocal.profilePage.phoneNumber}</label>
							<div>
								{companyDetails.phones.map((phone, index) => (
									<div key={index}>{phone}</div>
								))}
							</div>
						</li>
						<li>
							<label>{currentLocal.profilePage.email}</label>
							<div>{companyDetails.email}</div>
						</li>
						<li>
							<label>{currentLocal.profilePage.organizLegalStruc}</label>
							<div>{companyDetails.typeName}</div>
						</li>
						<li>
							<label>{currentLocal.profilePage.companyWebsite}</label>
							<div>{companyDetails.website}</div>
						</li>
						<li>
							<label>{currentLocal.profilePage.commercialRegister}</label>
							<img
								src={baseUrl + companyDetails.commercialRecord}
								alt="CommercialRecord"
							/>
						</li>
					</ul>
				</div>
			)}
		</div>
	);
}

export default CompanyCard;
