import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Plus from "../../../../../Resources/Assets/plus (2).svg";
import CompanyCard from "../CompanyCard/CompanyCard";
import { Row, Col } from "antd";
import { getBuyerCompany, getBuyerDrafts } from "../../../network";
import noSign from "../../../../../Resources/Assets/noRFQs.svg";
import Drafts from "../../../../../Resources/Assets/draft.svg";
import heartIcon from "../../../../../Resources/Assets/heartBlue.svg";
import { DELETERFQ } from "../../../../../Redux/RFQ";
import "./RelatedMarket.css";
function RelatedMarket() {
	const { currentLanguageId, currentLocal } = useSelector((state) => state.currentLocal);
	const [draftsCount, updateDraftsCount] = useState(0)
	const [companies, updateCompanies] = useState(null);
	const dispatch = useDispatch()
	useEffect(() => {
		getBuyerDrafts(success => {
			updateDraftsCount(success.data.length)
		}, fail => {
			console.log(fail)
		})
	}, [])
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
	}, [currentLanguageId]);


	return (
		<div className={currentLocal.language === "English" ? "ppl relatedMarket" : "ppr relatedMarket"}>
			<div className='d-flex justify-content-between headerContainer'>
				<Link to="/createrfq">
					<button className="orange_btn" onClick={() => {
						dispatch(DELETERFQ())
					}}>
						<img src={Plus} alt="Plus" className="mx-2" />
						<span>{currentLocal.buyerHome.addRfq}</span>
					</button>
				</Link>
				<div className='d-flex draftsContainer'>
					<Link to='/RFQDrafts'>
						<div
							className="mx-2 d-flex align-items-center justify-content-end cursorPointer"
						>
							<img src={Drafts} alt="Drafts" className="mx-2" />
							<span>{currentLocal.supplierHome.drafts}</span>
							<div className="invitations_number mx-2">{draftsCount}</div>
						</div>
					</Link>
					<div className="mx-4 favVendorsTitle">
						<img src={heartIcon} alt="heart icon" />
						<span>{currentLocal.profilePage.favVendors}</span>
					</div>
				</div>
			</div>
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
