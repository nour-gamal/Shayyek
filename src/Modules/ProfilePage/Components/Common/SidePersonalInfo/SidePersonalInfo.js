import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProfileDetailsModal from "../ProfileDetailsModal/ProfileDetailsModal";
import moreDots from "../../../../../Resources/Assets/more-dots.svg";
import "./SidePersonalInfo.css";
function SidePersonalInfo() {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { authorization } = useSelector((state) => state.authorization);
	const [isModalVisible, updateModalStatus] = useState(false);
	return (
		<div className="sidePersonalInfo">
			<div className="title d-flex align-items-center p-2 justify-content-between">
				<div className="d-flex align-items-center">
					<img
						src={
							authorization.image
								? authorization.image
								: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
						}
						alt="profile"
						className="mx-1 profileImg"
					/>
					<div className="mx-1">{currentLocal.profilePage.profileInfo}</div>
				</div>
				<img
					src={moreDots}
					alt="moreDots"
					className="cursorPointer"
					onClick={() => {
						updateModalStatus(true);
					}}
				/>
			</div>
			<ul className="list-unstyled">
				<li>
					<label>{currentLocal.profilePage.name}</label>
					<div>Egypt,Giza</div>
				</li>
				<li>
					<label>{currentLocal.profilePage.type}</label>
				</li>
				<li>
					<label>{currentLocal.profilePage.workField}</label>
					<div>0123456789</div>
				</li>
				<li>
					<label>{currentLocal.profilePage.phoneNumber}</label>
					<div>0123456789</div>
				</li>
				<li>
					<label>{currentLocal.profilePage.email}</label>
					<div>Enmsjj@kddj.com</div>
				</li>
			</ul>
			<ProfileDetailsModal
				isModalVisible={isModalVisible}
				onCancel={() => {
					updateModalStatus(false);
				}}
				userType={currentLocal.registration.buyer}
			/>
		</div>
	);
}

export default SidePersonalInfo;
