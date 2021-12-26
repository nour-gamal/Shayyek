import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Plus from "../../../../../Resources/Assets/plus (2).svg";
import CompanyCard from "../CompanyCard/CompanyCard";
import { Row, Col } from "antd";
import { getBuyerCompany } from "../../../network";
import noSign from "../../../../../Resources/Assets/noRFQs.svg";
import "./RelatedMarket.css";
function RelatedMarket() {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	const [companies, updateCompanies] = useState(null);
	useEffect(() => {
		getBuyerCompany(
			currentLanguageId,
			(success) => {
				updateCompanies(success.data);
			},
			(fail) => {
				console.log(fail);
			}
		);
	});
	return (
		<div className={currentLocal.language === "English" ? "ppl" : "ppr"}>
			<Link to="/createrfq/new">
				<button className="orange_btn">
					<img src={Plus} alt="Plus" className="mx-2" />
					<span>{currentLocal.buyerHome.addRfq}</span>
				</button>
			</Link>
			<div className="relatedMarket my-2">
				<h6 className="f-16 fw-600 my-4">
					{currentLocal.buyerHome.relatedMarketPlace}
				</h6>
				<Row className={companies === null && "justify-content-center"}>
					{companies !== null || (companies && companies.length > 0) ? (
						companies.map((company, companyIndex) => (
							<Col xs={24} md={12} lg={8} className="my-2" key={companyIndex}>
								<CompanyCard companyData={company} />
							</Col>
						))
					) : (
						<div className="text-center">
							<img src={noSign} alt="noSign" />
							<div className="noRFqs">{currentLocal.buyerHome.noCompanies}</div>
						</div>
					)}
				</Row>
			</div>
		</div>
	);
}

export default RelatedMarket;
