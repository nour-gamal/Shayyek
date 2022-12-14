import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Tree } from "antd";
import ProfileDetailsModal from "../ProfileDetailsModal/ProfileDetailsModal";
import moreDots from "../../../../../Resources/Assets/more-dots.svg";
import { baseUrl } from "../../../../../Services";
import defaultImage from "../../../../../Resources/Assets/DefaultProfileImage.png";
import "./SidePersonalInfo.css";
function SidePersonalInfo({ allData, parent }) {
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
			{parent !== "buyerSee" && (
				<div className="title d-flex align-items-center p-2 justify-content-between">
					<div className="d-flex align-items-center">
						<img
							src={
								authorization.profileImage
									? baseUrl + authorization.profileImage
									: defaultImage
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
			)}
			<ul className="list-unstyled">
				<li className="item">
					<h6>{currentLocal.profilePage.name}</h6>
					<p>{allData.name}</p>
				</li>
				<li className="item">
					<h6>{currentLocal.profilePage.type}</h6>
					<p>{allData.userTypeName}</p>
				</li>
				<li className="item">
					<h6>{currentLocal.profilePage.workField}</h6>
					<div>
						<Tree checkedKeys={"checkable"} treeData={workField} />
					</div>
				</li>
				{parent !== "buyerSee" && (
					<div>
						<li className="item">
							<h6>{currentLocal.profilePage.phoneNumber}</h6>
							<p>{allData.mobile}</p>
						</li>
						<li className="item">
							<h6>{currentLocal.profilePage.email}</h6>
							<p>{allData.email}</p>
						</li>
					</div>
				)}
			</ul>
			{isModalVisible && (
				<ProfileDetailsModal
					isModalVisible={isModalVisible}
					onCancel={() => {
						updateModalStatus(false);
					}}
					userType={currentLocal.registration.buyer}
				/>
			)}
		</div>
	);
}

export default SidePersonalInfo;
