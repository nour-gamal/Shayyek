import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import { ProgressBar } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
// component
import { baseUrl } from "../../../../../Services";
import { acceptOrRejectUser } from "../../../network";
import DraftIcon from "../../../../../Resources/Assets/draft.svg";
import defaultImage from "../../../../../Resources/Assets/DefaultProfileImage.png";
import { authorType } from "../../../../../helpers/authType";
import DraftsModal from "./../DraftsModal/DraftsModal";
// style
import "./Personalnfo.css";

function Personalnfo({
	parent,
	count,
	profileDetails,
	adminView,
	history,
	company,
}) {
	// console.log()
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const {
		authorization,
		authorization: { accountTypeId, userTypeId, roleId },
	} = useSelector((state) => state.authorization);
	const [isActive, setIsActive] = useState(profileDetails?.isActive);
	const [draftsModalVisible, updateDraftsModalVisible] = useState(false);
	const authorTypeName = authorType(accountTypeId, userTypeId, roleId);
	console.log("isActive", isActive);
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
							{
								// if the employee is already accepted and have an rating data
								/* {parent === "buyerAdmin" ? (
                <>
                  <div className="my-1">{authorization.email}</div>
                  <div className="my-1 mobile">{authorization.mobile}</div>
                </>
              ) : (
                <>
                  <ReactStars
                    edit={false} count={5} value={3} size={24} activeColor="#ffd700"
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
              )} */
							}
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
