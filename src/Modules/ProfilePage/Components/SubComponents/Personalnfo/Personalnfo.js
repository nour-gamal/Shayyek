import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import { ProgressBar } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
// component
import { baseUrl } from "../../../../../Services";
import { acceptOrRejectUser, AddToMyFavVendors } from "../../../network";
import DraftIcon from "../../../../../Resources/Assets/draft.svg";
import Plus from "../../../../../Resources/Assets/add (3).svg";
import Heart from "../../../../../Resources/Assets/heart.svg";
import defaultImage from "../../../../../Resources/Assets/DefaultProfileImage.png";
import { authorType } from "../../../../../helpers/authType";
import DraftsModal from "./../DraftsModal/DraftsModal";
// style
import "./Personalnfo.css";
import { Button } from "antd";

function Personalnfo({
	parent,
	count,
	profileDetails,
	adminView,
	buyerView,
	history,
	company,
}) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const {
		authorization,
		authorization: { accountTypeId, userTypeId, roleId },
	} = useSelector((state) => state.authorization);
	const [isActive, setIsActive] = useState(profileDetails?.isActive);
	const [isAddedToVendors, updateIsAddedToVendors] = useState(
		profileDetails ? profileDetails.isFavourite : false
	);
	const [draftsModalVisible, updateDraftsModalVisible] = useState(false);
	let authorTypeName = authorType(accountTypeId, userTypeId, roleId);
	function acceptOrRejectUserAction(isActive) {
		acceptOrRejectUser(
			{ isActive, rejectedUserId: profileDetails.userId },
			(success) => {
				if (success.success) {
					setIsActive(false);
				} else {
					history.goBack();
				}
			}
		);
	}
	function openDraftPopup() {
		if (count) {
			updateDraftsModalVisible(true);
		}
	}
	const addToFavVendors = () => {
		let data = {
			vendorId: profileDetails.supplierContractorId,
			isAdded: !isAddedToVendors,
		};
		AddToMyFavVendors(
			data,
			(success) => {
				console.log(success);
			},
			(fail) => {
				console.log(fail);
			}
		);
		updateIsAddedToVendors(!isAddedToVendors);
	};
	return (
		<div className="PersonalInfo">
			{adminView ? (
				<header className="profileHeader">
					<div className="profileHeader__personal">
						<img
							className="user"
							src={
								profileDetails.image
									? baseUrl + profileDetails.image
									: defaultImage
							}
							alt="profile"
						/>
						<div className="info mx-4">
							<div className="fw-600 info__name">{profileDetails.name}</div>
							<div className="fw-600 info__companyName">
								{profileDetails.companyName}
							</div>
						</div>
					</div>
					<div className="profileHeader__info">
						{authorTypeName.includes("company_admin") &&
							adminView &&
							!isActive && (
								<div
									className={
										currentLocal.language === "English"
											? "actions left"
											: "actions right"
									}
								>
									<button
										className="popup-button-secondary mx-2"
										onClick={() => acceptOrRejectUserAction(false)}
									>
										{currentLocal.profilePage.reject}
									</button>
									<button
										className="popup-button-primary mx-2"
										onClick={() => acceptOrRejectUserAction(true)}
									>
										{currentLocal.profilePage.accept}
									</button>
								</div>
							)}
					</div>
				</header>
			) : buyerView ? (
				profileDetails && (
					<header className="profileHeader">
						<div className="profileHeader__personal">
							<img
								className="user"
								src={
									profileDetails.profileImage
										? baseUrl + profileDetails.profileImage
										: defaultImage
								}
								alt="profile"
							/>
							<div className="info mx-4">
								<div className="fw-600 f-18">{profileDetails.name}</div>
								<ReactStars
									edit={false}
									count={5}
									value={profileDetails.company.rate}
									size={24}
									activeColor="#ffd700"
									classNames={
										currentLocal.language === "English"
											? "ltrStars"
											: "rtlStars"
									}
								/>
								<div className="d-flex">
									<img src={Plus} alt="Plus" />
									<div className="mx-2 primary-color f-14 cursorPointer">
										{currentLocal.profilePage.inviteToRFQ}
									</div>
								</div>
							</div>
						</div>
						<div className="d-flex flex-column mx-2">
							{parent === "buyerSee" && (
								<Button
									className="add-vendors-Btn my-2"
									onClick={addToFavVendors}
								>
									<img src={Heart} alt="Heart" />{" "}
									{isAddedToVendors
										? currentLocal.profilePage.addedToFavVendors
										: currentLocal.profilePage.addToFavVendors}
								</Button>
							)}
							{profileDetails.company && (
								<div className="profileHeader__info f-14 secondary-color cursorPointer">
									<Link to={`supplier/${profileDetails.company.id}`}>
										{currentLocal.profilePage.see} {profileDetails.company.name}{" "}
										{currentLocal.profilePage.marketPlace}
									</Link>
								</div>
							)}
						</div>
					</header>
				)
			) : (
				<header className="profileHeader">
					<div className="profileHeader__personal">
						<img
							className="user"
							src={
								authorization.profileImage
									? baseUrl + authorization.profileImage
									: defaultImage
							}
							alt="profile"
						/>
						<div className="info mx-4">
							<div className="fw-600">{authorization.fullName}</div>
							{authorTypeName.includes("buyer") ? (
								<>
									<div className="my-1">{authorization.email}</div>
									<div className="my-1 mobile">{authorization.mobile}</div>
								</>
							) : (
								<>
									<ReactStars
										edit={false}
										count={5}
										value={3}
										size={24}
										activeColor="#ffd700"
										classNames={
											currentLocal.language === "English"
												? "ltrStars"
												: "rtlStars"
										}
									/>
									<span className="progressContainer">
										<ProgressBar now={30} />
										<span className="f-14">
											{currentLocal.profilePage.completedPercentage}
										</span>
									</span>
									<div className="f-10">
										{currentLocal.profilePage.addMoreWork}
									</div>
								</>
							)}
						</div>
					</div>
					<div className="profileHeader__info">
						{authorTypeName.includes("company_admin") &&
						!adminView &&
						company ? (
							<>
								<Link to={`/company/${company?.name}`}>
									<button className="orange_btn mx-2">
										{currentLocal.profilePage.manageCompany}
									</button>
								</Link>
							</>
						) : authorTypeName.includes("contractor") ||
						  authorTypeName.includes("supplier") ? (
							<>
								<div
									className="d-flex align-items-center cursorPointer"
									onClick={openDraftPopup}
								>
									<div className="d-flex align-items-center ">
										<img className="draftIcon" src={DraftIcon} alt="Draft" />
										<div className="draft">
											{currentLocal.profilePage.draft}
										</div>
									</div>
									<div className="num">{count}</div>
								</div>
							</>
						) : (
							parent.includes("company_admin") &&
							adminView && (
								<div
									className={
										currentLocal.language === "English"
											? "actions left"
											: "actions right"
									}
								>
									<button
										className="popup-button-secondary mx-2"
										onClick={() => acceptOrRejectUserAction(false)}
									>
										{currentLocal.profilePage.reject}
									</button>
									<button
										className="popup-button-primary mx-2"
										onClick={() => acceptOrRejectUserAction(true)}
									>
										{currentLocal.profilePage.accept}
									</button>
								</div>
							)
						)}
					</div>
				</header>
			)}
			<DraftsModal
				isVisible={draftsModalVisible}
				onCancel={() => {
					updateDraftsModalVisible(false);
				}}
			/>
		</div>
	);
}

export default withRouter(Personalnfo);
