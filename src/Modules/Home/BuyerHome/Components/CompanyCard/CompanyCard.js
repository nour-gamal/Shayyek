import React from "react";
import { baseUrl } from "../../../../../Services";
import ReactStars from "react-rating-stars-component";
import "./CompanyCard.css";
function CompanyCard({ companyData }) {
	return (
		<div className="companyCard">
			<img
				src={baseUrl + companyData.image}
				alt="companyImage"
				className="companyImage"
			/>
			<ReactStars
				count={5}
				value={companyData.rate}
				size={24}
				activeColor="#ffd700"
				edit={false}
			/>
			<div className="my-1">{companyData.name}</div>
			<div className="f-12 my-1">{companyData.typeName}</div>
			<div className="f-12 my-1">{companyData.GovernorateName}</div>
		</div>
	);
}

export default CompanyCard;
