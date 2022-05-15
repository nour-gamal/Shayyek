import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Menu, Dropdown } from "antd";
import eye from "../../../Resources/Assets/eye.svg";
import edit from "../../../Resources/Assets/edit.svg";
import deletee from "../../../Resources/Assets/deletee.svg";
import { Redirect } from "react-router-dom";
import { DeleteRFQ } from "../../../Modules/Home/network";
import SingleRFQModal from "../../ProfilePage/Components/SubComponents/SingleRFQModal/SingleRFQModal";
import moment from 'moment';
import "./RFQInvitation.css";
function RFQInvitation({
	revealPrices,
	rfqDetails,
	parent,
	updateRFQsList,
	recallGetRFQ,
}) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [redirectTo, updateRedirectTo] = useState(null);
	const [isRFQModalVisible, toggleRFQModal] = useState(false);
	const packages = rfqDetails.rfqPackageDetails
	console.log(rfqDetails, packages)
	function handleMenuClick(e) {
		switch (e.key) {
			case "1":
				updateRedirectTo("offers");
				break;
			case "2":
				updateRedirectTo("edit");
				break;
			case "3":
				DeleteRFQ(
					rfqDetails.rfqHeaderId,
					(success) => {
						updateRFQsList();
					},
					(fail) => {
						console.log(fail);
					}
				);
				break;
			default:
				break;
		}
	}

	const menu = (
		<Menu onClick={handleMenuClick}>
			<Menu.Item key="1" icon={<img src={eye} alt="eye" />}>
				{currentLocal.buyerHome.viewOffers}
			</Menu.Item>
			<Menu.Item key="2" icon={<img src={edit} alt="eye" />}>
				{currentLocal.buyerHome.edite}
			</Menu.Item>
			<Menu.Item key="3" icon={<img src={deletee} alt="eye" />}>
				{currentLocal.buyerHome.delete}
			</Menu.Item>
		</Menu>
	);

	if (redirectTo === "offers") {
		return <Redirect to={`/offerstable/${rfqDetails.rfqHeaderId}`} />;
	} else if (redirectTo === "edit")
		return <Redirect to={`/createrfq/${rfqDetails.rfqHeaderId}`} />;
	return (
		<div className="rfqInvitation">
			<div className="projectName f-14 my-1">{rfqDetails.projectName}</div>
			{rfqDetails.rfqPackageDetails &&
				rfqDetails.rfqPackageDetails.map((rfqPackage) => {
					return (
						<div>
							<div className="projectName f-14 my-1">
								{rfqPackage.packageName}
							</div>
						</div>
					);
				})}
			{packages.map((packageItem) => {
				return (
					<div className="package-container">
						<div className="d-flex justify-content-between flex-wrap">

							<div className="packageName f-14 fw-500">{packageItem.packageName}</div>
							{parent === "buyer" && (
								<div>
									<Dropdown.Button overlay={menu} trigger={["click"]}></Dropdown.Button>
								</div>
							)}
						</div>

						<div className="d-flex justify-content-between rfqInvContainer ">
							<ul className="list-unstyled">
								<li>{currentLocal.supplierHome.noOfQuotations} </li>
								<li className="primary-color">{packageItem.noOfQuotations}</li>
								<li>{currentLocal.supplierHome.deadline}</li>
								<li className="primary-color">{moment(packageItem.deadline).format('DD-MM-YYYY')}</li>
							</ul>
							{revealPrices && (
								<div className="d-flex priceBox">
									<div className="mt-2 mx-2">
										<div className="redball"></div>
										<div className="greenball"></div>
									</div>
									<div>
										<label>{currentLocal.supplierHome.maxPrice}</label>
										<div className="primary-color">EGP 20</div>
										<label>{currentLocal.supplierHome.minPrice}</label>
										<div className="primary-color">EGP 5000</div>
									</div>
								</div>
							)}
							{parent === "supplier" && (
								<div className="text-center my-2">
									<button
										className="popup-button-primary"
										onClick={() => {
											toggleRFQModal(true);
										}}
									>
										{currentLocal.supplierHome.fillSheet}
									</button>
								</div>
							)}
						</div>
					</div>)

			})}

			{isRFQModalVisible && (
				<SingleRFQModal
					isModalVisible={isRFQModalVisible}
					onCancel={() => {
						toggleRFQModal(false);
					}}
					rfqId={rfqDetails.rfqHeaderId}
				/>
			)}
		</div>
	);
}

export default RFQInvitation;
