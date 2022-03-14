import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../../../Services";
import ProfileDetailsModal from "../ProfileDetailsModal/ProfileDetailsModal";
import defaultImage from "../../../../../Resources/Assets/DefaultProfileImage.png";
import { authorType } from "../../../../../helpers/authType";
import "./CompanyCard.css";
function CompanyCard({ companyDetails, sidebar, parent }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const {
		authorization,
		authorization: { accountTypeId, userTypeId, roleId },
	} = useSelector((state) => state.authorization);
	const [porfileDetailsModalVisible, setProfileDetailsModalVisible] = useState(
		false
	);
	const userTypeName = authorType(accountTypeId, userTypeId, roleId);

	return (
		<>
			{userTypeName.includes("company_admin") && companyDetails && (
				<div
					className={`companyCard ${
						userTypeName.includes("company_admin") ? "min-height-100" : ""
					} ${sidebar ? "sidebar" : ""}`}
				>
					<div className="d-flex align-items-center justify-content-between companyCard__header">
						<header className="d-flex align-items-center justify-content-start">
							<img
								src={
									authorization.companyLogo
										? baseUrl + authorization.companyLogo
										: defaultImage
								}
								alt="companyProfile"
								className="rounded-circle companyImg"
							/>
							<h6 className="companyProfile__header mx-2">
								{companyDetails.name}
							</h6>
							{parent !== "buyerSee" && (
								<button
									className="companCard__edit"
									onClick={() => setProfileDetailsModalVisible(true)}
								>
									...
								</button>
							)}
						</header>
						{parent !== "buyerSee" && (
							<Link to={`/company/${companyDetails.name}`}>
								<button className="btn companyCard__btn">
									{currentLocal.profilePage.manageyourCompany}
								</button>
							</Link>
						)}
					</div>
					<ul className="list-unstyled">
						<li className="item">
							<span className="companyCard__label">
								{currentLocal.profilePage.address}:
							</span>
							<span className="companyCard__val">{companyDetails.address}</span>
						</li>
						<li className="item">
							<span className="companyCard__label">
								{currentLocal.profilePage.governorate}:
							</span>
							<span className="companyCard__val">
								{companyDetails.governorateName}
							</span>
						</li>
						<li className="item">
							<span className="companyCard__label">
								{currentLocal.profilePage.organizLegalStruc}:
							</span>
							<span className="companyCard__val">
								{companyDetails.typeName}
							</span>
						</li>
						{parent !== "buyerSee" && (
							<div>
								<li className="item">
									<span className="companyCard__label">
										{currentLocal.profilePage.phoneNumber}:
									</span>
									<span className="companyCard__val">
										{companyDetails.phones.map((phone, index) => (
											<div key={index}>{phone}</div>
										))}
									</span>
								</li>
								<li className="item">
									<span className="companyCard__label">
										{currentLocal.profilePage.email}:
									</span>
									<span className="companyCard__val">
										{companyDetails.email}
									</span>
								</li>

								<li className="item">
									<span className="companyCard__label">
										{currentLocal.profilePage.companyWebsite}:
									</span>
									<span className="companyCard__val">
										{companyDetails.website}
									</span>
								</li>
								<li className="item">
									<span className="companyCard__label">
										{currentLocal.profilePage.commercialRecord}:
									</span>
									{companyDetails.commercialRecord && (
										<figure className="companyCard__recordFig">
											<img
												src={baseUrl + companyDetails.commercialRecord}
												alt="CommercialRecord"
											/>
										</figure>
									)}
								</li>
							</div>
						)}
					</ul>
				</div>
			)}
			{porfileDetailsModalVisible && (
				<ProfileDetailsModal
					isModalVisible={porfileDetailsModalVisible}
					onCancel={() => setProfileDetailsModalVisible(false)}
				/>
			)}
		</>
	);
}

export default CompanyCard;
