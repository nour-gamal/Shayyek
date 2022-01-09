import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Tree } from "antd";
import ProfileDetailsModal from "../ProfileDetailsModal/ProfileDetailsModal";
import moreDots from "../../../../../Resources/Assets/more-dots.svg";
import "./SidePersonalInfo.css";
function SidePersonalInfo({ allData }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { authorization } = useSelector((state) => state.authorization);
	const [isModalVisible, updateModalStatus] = useState(false);
	const [workField, updateWorkField] = useState([]);
	useEffect(() => {
		var treeData = [];
		if (allData.categories) {
			allData.categories.forEach((mainCat, mainCatIndex) => {
				treeData.push({
					title: mainCat.mainCategory.name,
					key: mainCat.mainCategory.id,
					children: [],
				});
				mainCat.categories.forEach((cat, catId) => {
					treeData[mainCatIndex].children.push({
						title: cat.category.name,
						key: cat.category.id,
						children: [],
					});

					cat.subCategories.forEach((subCat) => {
						treeData[mainCatIndex].children[catId].children.push({
							title: subCat.name,
							key: subCat.id,
						});
					});
				});
			});
		}
		updateWorkField(treeData);
	}, [allData.categories]);

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
					<div>{allData.name}</div>
				</li>
				<li>
					<label>{currentLocal.profilePage.type}</label>
					<div>{allData.userTypeName}</div>
				</li>
				<li>
					<label>{currentLocal.profilePage.workField}</label>
					<div>
						<Tree checkedKeys={"checkable"} treeData={workField} />
					</div>
				</li>
				<li>
					<label>{currentLocal.profilePage.phoneNumber}</label>
					<div>{allData.mobile}</div>
				</li>
				<li>
					<label>{currentLocal.profilePage.email}</label>
					<div>{allData.email}</div>
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
