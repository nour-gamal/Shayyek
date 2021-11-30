import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Dropdown, Menu } from "antd";
import view from "../../../../../Resources/Assets/View.svg";
import { Link } from "react-router-dom";
import hoveringView from "../../../../../Resources/Assets/hoveringView.svg";
import noRFQs from "../../../../../Resources/Assets/noRFQs.svg";
import research from "../../../../../Resources/Assets/research@2x.png";
import plus from "../../../../../Resources/Assets/plus (2).svg";
import ReactTooltip from "react-tooltip";
import deletee from "../../../../../Resources/Assets/deletee.svg";
import HoveringDeletee from "../../../../../Resources/Assets/HoveringDeletee.svg";
import { baseUrl } from "../../../../../Services";
import defaultCompImg from "../../../../../Resources/Assets/defaultCompImg.png";
import ReactStars from "react-rating-stars-component";
import { BuyerRFQ, getBuyerCompany } from "../../../network";
import "./BuyerHomeComponent.css";
import { useSelector } from "react-redux";
function BuyerHomeComponent() {
	const [hoverState, setHover] = useState(false);
	const [rfqCount, setRfqCount] = useState(null);
	const [rfqDetails, setRfqDetails] = useState([]);
	const [companies, setCompanies] = useState([]);
	const [noCompany, setNoCompany] = useState(false);
	const [noRFQ, setNoRFQ] = useState(false);
	const [hoverId, setHoverId] = useState();
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	console.log(currentLanguageId);
	const [overlay, setOverlay] = useState({
		no: 0,
		state: false,
	});
	useEffect(() => {
		BuyerRFQ(
			(success) => {
				if (success.data.rfqCount === 0) {
					setNoRFQ(true);
				} else {
					setRfqCount(success.data.rfqCount);
					setRfqDetails(success.data.rfqInvitationDetails);
				}
			},
			(error) => {
				console.log(error);
			},
			true
		);
		getBuyerCompany(
			currentLanguageId,
			(success) => {
				console.log(success);
				if (success.success === true && success.data !== null) {
					setCompanies(success.data);
				} else {
					setNoCompany(true);
				}
			},
			(error) => {
				console.log(error);
			},
			true
		);
	}, [currentLanguageId]);

	const menu = (
		<Menu>
			<Menu.Item key="0" className="View">
				<img
					src={hoverState && hoverId === "1" ? hoveringView : view}
					alt="View"
				/>
				<span
					id="1"
					className="acceptOffer"
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
					onMouseMove={(e) => setHoverId(e.target.id)}
				>
					{currentLocal.buyerHome.viewProfile}
				</span>
			</Menu.Item>
			,
			<Menu.Item key="1" className="View">
				<img
					src={hoverState && hoverId === "1" ? HoveringDeletee : deletee}
					alt="View"
				/>
				<span
					id="2"
					className="acceptOffer"
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
					onMouseMove={(e) => setHoverId(e.target.id)}
				>
					{currentLocal.buyerHome.edite}
				</span>
			</Menu.Item>
			,
			<Menu.Item
				key="2"
				// className={currentLocal.language !== "English" && "delete"}
			>
				<img
					src={hoverState && hoverId === "1" ? HoveringDeletee : deletee}
					alt="RejectEmp"
				/>
				<span
					className="delete"
					id="3"
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
					onMouseMove={(e) => setHoverId(e.target.id)}
				>
					{currentLocal.buyerHome.delete}
				</span>
			</Menu.Item>
		</Menu>
	);
	return (
		<div className="homeByer">
			<div
				className={
					currentLocal.language === "العربيه"
						? "arCompanyContainer"
						: "CompanyContainer"
				}
			>
				<Container>
					<button className="btn btn mt-4 mx-4 f-14">
						<Link to="createrfq">
							{currentLocal.language === "العربيه" ? (
								<>
									{currentLocal.buyerHome.addRfq}

									<img src={plus} alt="Request_RFQ" />
								</>
							) : (
								<>
									<img src={plus} alt="Request_RFQ" />
									{currentLocal.buyerHome.addRfq}
								</>
							)}
						</Link>
					</button>

					<h3 className="f-17 mx-4  mt-5 mb-2">
						{currentLocal.buyerHome.relatedMarketPlace}
					</h3>
					<div className="company mx-3">
						<Row>
							{noCompany ? (
								<div className="noCompaniesContainer">
									<div className="image text-center">
										<img src={noRFQs} alt="noRFQs" />
									</div>
									<p className="f-17 noCompanies mt-3 text-center">
										{currentLocal.buyerHome.noCompanies}
									</p>
									<p className="f-14 toSeeCompanies  text-center">
										{currentLocal.buyerHome.toSeeCompanies}
									</p>
								</div>
							) : (
								<>
									{companies.map((company, i) => {
										console.log(company);
										return (
											<Col md="6" lg="3" xs="12" key={i} className="mb-4">
												<div
													className="companyCard"
													onMouseEnter={() => {
														setOverlay({
															no: i,
															state: true,
														});
													}}
													onMouseLeave={() => {
														setOverlay({
															no: i,
															state: false,
														});
													}}
												>
													<img
														src={
															company.image
																? baseUrl + company.image
																: defaultCompImg
														}
														alt="company"
														className="companyImg"
													/>
													<div
														className={
															overlay.state && overlay.no === i
																? "overlay"
																: "fadeOutOverlay"
														}
													>
														<div className="d-flex align-items-end justify-content-between">
															<Link to={`supplier/${company.id}`}>
																<div>
																	<ReactStars
																		edit={false}
																		count={5}
																		value={company.rate}
																		size={24}
																		activeColor="#ffd700"
																		classNames={
																			currentLocal.language === "English"
																				? "ltrStars"
																				: "rtlStars"
																		}
																	/>
																	<div className="infoContainer">
																		<div
																			className="name f-21"
																			data-tip="hello world"
																		>
																			{company.name}
																		</div>
																		{/* <p data-tip="hello world">Tooltip</p> */}
																		<ReactTooltip />
																		<div className="f-17 font-white">
																			{company.typeName}
																		</div>
																		<div className="f-17 font-white">
																			{company.address}
																		</div>
																	</div>
																</div>
															</Link>
														</div>
													</div>
												</div>
											</Col>
										);
									})}
								</>
							)}
						</Row>
					</div>
				</Container>
			</div>
			<div className="projectContainer">
				<div className="invitationsContainer">
					<div
						className={
							currentLocal.language === "العربيه"
								? "arInvitations px-3"
								: "invitations px-3"
						}
					>
						<div className="RFQinvitations">
							<img src={research} alt="research" />
							<p
								className={
									currentLocal.language === "العربيه"
										? "ml-2 f-17 arRFQ"
										: "ml-2 f-17 RFQ"
								}
							>
								{currentLocal.buyerHome.RFQs}
							</p>
						</div>
						<div className="mt-4 number">
							<p className="text-white">{rfqCount}</p>
						</div>
					</div>
					{noRFQ ? (
						<div className="noRFQContainer">
							<img src={noRFQs} alt="noRFQs" />
							<p className="f-17 noRFQ mt-3">{currentLocal.buyerHome.noRFQs}</p>
						</div>
					) : (
						<>
							{rfqDetails.map((project) => {
								console.log(project);
								return (
									<div className="projects" key={project.rfqHeaderId}>
										<h5 className="projectName f-14">
											{project.projectName}
											<Dropdown.Button
												overlay={menu}
												trigger={["click"]}
												onClick={(e) => e.preventDefault()}
											></Dropdown.Button>
										</h5>
										<div className="rfqInfo">
											<div>
												<p className="m-0 numberOfQuotations f-12">
													{currentLocal.buyerHome.NoOfQuotations}
												</p>
												<p className="m-0 noOfQuotations f-12 pb-3">
													{project.noOfQuotations}
												</p>
												<p className="m-0 deadline f-12">
													{currentLocal.buyerHome.deadline}
												</p>
												<p className="m-0 deadlineTime f-12">
													{project.deadline}
												</p>
											</div>
											<div>
												<p className="m-0 maxPrice f-12">
													{" "}
													<div
														className={
															currentLocal.language === "العربيه"
																? "d-inline-block arRedDote"
																: "d-inline-block redDote"
														}
													></div>
													{currentLocal.buyerHome.maxPrice}
												</p>
												<p className="m-0 px-3 max-price f-12 pb-3">
													{project.maxPrice}
												</p>
												<p className="m-0 minPrice f-12">
													<div
														className={
															currentLocal.language === "العربيه"
																? "d-inline-block arBlueDote"
																: "d-inline-block blueDote"
														}
													></div>
													{currentLocal.buyerHome.minPrice}{" "}
												</p>
												<p className="m-0 px-3 min-price f-12">
													{project.minPrice}
												</p>
											</div>
										</div>
									</div>
								);
							})}
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default BuyerHomeComponent;
