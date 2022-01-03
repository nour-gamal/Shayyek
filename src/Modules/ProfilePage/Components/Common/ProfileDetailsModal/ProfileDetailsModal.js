import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBuyerProfile, postImage } from "../../../network";
import { baseUrl } from "../../../../../Services";
import { getWork } from "../../../../../Modules/Registration/Network";
import TreeContainer from "../../../../../Modules/Registration/Components/TreeContainer/TreeContainer";
import { Modal, Col, Row } from "antd";
import paperClip from "../../../../../Resources/Assets/paperClip.svg";
import { Alert } from "react-bootstrap";
import "./ProfileDetailsModal.css";
function ProfileDetailsModal({ isModalVisible, onCancel, userType }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	const { authorization } = useSelector((state) => state.authorization);
	const [treeOptions, updateTreeOptions] = useState([]);
	const [profileData, updateProfileData] = useState(null);
	const [paperClipState, togglePaperClip] = useState({
		type: "profileImage",
		state: false,
	});
	const [profileImgLink, updateProfileImgLink] = useState(null);
	const [companyImgLink, updateCompanyImgLink] = useState(null);
	const [alert, setAlert] = useState(false);
	useEffect(() => {
		getWork(
			currentLanguageId,
			(success) => {
				var data = [];
				success.data.forEach((category, i) => {
					data.push({
						value: category.category.id,
						label: category.category.name,
						firstchildren: category.subCategories,
						children: [],
						disabled: true,
					});
					category.subCategories.forEach((subCategories, j) => {
						data[i].children.push({
							value: subCategories.subCategory.id,
							label: subCategories.subCategory.name,
							levelOne: category.category.id,
							levelTwo: subCategories.subCategory.id,
							levelThree: subCategories.subSubCategories,
							children: [],
							disabled: false,
						});
						subCategories.subSubCategories !== null &&
							subCategories.subSubCategories.forEach((subSubCategories) => {
								data[i].children[j].children.push({
									value: subSubCategories.id,
									label: subSubCategories.name,
									levelOne: category.category.id,
									levelTwo: subCategories.subCategory.id,
									levelThree: subSubCategories.id,
									disabled: false,
								});
							});
					});
				});

				updateTreeOptions(data);
			},
			(fail) => {
				console.log(fail);
			},
			false
		);
	}, [currentLanguageId]);
	useEffect(() => {
		getBuyerProfile(
			currentLanguageId,
			(success) => {
				console.log(success.data);
				updateProfileData(success.data);
			},
			(fail) => {
				console.log(fail);
			}
		);
	}, [currentLanguageId]);

	const handleUploadFile = (e, imageType) => {
		if (e.target.files[0].type.includes("image")) {
			let image = new FormData();
			image.append("image", e.target.files[0]);
			image.append("status", imageType);
			postImage(
				image,
				(success) => {
					if (imageType === 1) {
						updateCompanyImgLink(success.data);
					} else {
						updateProfileImgLink(success.data);
					}
				},
				(fail) => {
					console.log(fail);
				}
			);
		} else {
			setAlert(true);
		}
	};

	const onTreeChange = (currentNode, selectedNodes) => {
		let categoriesRequest = [];
		let result = selectedNodes.reduce(function(r, a) {
			r[a.levelOne] = r[a.levelOne] || [];
			r[a.levelOne].push(a);
			return r;
		}, {});
		Object.keys(result).forEach((MainCategoryId) => {
			categoriesRequest.push({
				MainCategoryId,
				Categories: [],
				result: result[MainCategoryId],
			});
		});
		categoriesRequest.forEach((mainCategory, mainCategoryIndex) => {
			mainCategory.result.forEach((subCategory, subCategoryIndex) => {
				categoriesRequest[mainCategoryIndex].Categories[subCategoryIndex] = {
					CategoryId: subCategory.levelTwo,
					SubCategoryIds: [],
				};
				if (typeof subCategory.levelThree === "string") {
					categoriesRequest[mainCategoryIndex].Categories[
						subCategoryIndex
					].SubCategoryIds.push(subCategory.levelThree);
				} else {
					subCategory.levelThree &&
						subCategory.levelThree.forEach((subSubCat) => {
							categoriesRequest[mainCategoryIndex].Categories[
								subCategoryIndex
							].SubCategoryIds.push(subSubCat.id);
						});
				}
			});
		});
	};
	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-lg profileDetailsModal"
		>
			{alert && (
				<Alert variant={"danger"} className="text-center">
					{currentLocal.registration.uploadValidImage}
				</Alert>
			)}
			{profileData && (
				<Row>
					<Col xs={24} md={12}>
						<div className="d-flex align-items-center">
							<input
								type={"file"}
								className="d-none"
								id="profileImage"
								onChange={(e) => {
									handleUploadFile(e, 3);
								}}
							/>
							<label for="profileImage">
								<div className="imgContainer">
									<img
										src={
											profileImgLink
												? baseUrl + profileImgLink
												: authorization.image
												? authorization.image
												: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
										}
										alt="profileImage"
										className="profileCompImage"
										onMouseEnter={() => {
											togglePaperClip({
												type: "profileImage",
												state: true,
											});
										}}
										onMouseLeave={() => {
											togglePaperClip({
												type: "profileImage",
												state: false,
											});
										}}
									/>
									{paperClipState.state &&
										paperClipState.type === "profileImage" && (
											<img
												src={paperClip}
												alt="paperClip"
												onMouseEnter={() => {
													togglePaperClip({
														type: "profileImage",
														state: true,
													});
												}}
											/>
										)}
								</div>
							</label>
							<div className="mx-2">
								<div className="primary-color f-14 fw-600">
									{authorization.fullName}
								</div>
								<div className="userType my-1">{userType}</div>
							</div>
						</div>
						<TreeContainer
							data={treeOptions}
							onChange={onTreeChange}
							className={"input-dropdown"}
						/>
					</Col>
					<Col xs={24} md={12}>
						<div className="d-flex align-items-center">
							<input
								type={"file"}
								className="d-none"
								id="companyImage"
								onChange={(e) => {
									handleUploadFile(e, 1);
								}}
							/>
							<label for="companyImage">
								<div className="imgContainer">
									<img
										src={
											companyImgLink
												? baseUrl + companyImgLink
												: baseUrl + profileData.company.image
										}
										alt="CompanyImage"
										className="profileCompImage"
										onMouseEnter={() => {
											togglePaperClip({
												type: "companyImage",
												state: true,
											});
										}}
										onMouseLeave={() => {
											togglePaperClip({
												type: "companyImage",
												state: false,
											});
										}}
									/>{" "}
									{paperClipState.state &&
										paperClipState.type === "companyImage" && (
											<img
												src={paperClip}
												alt="paperClip"
												onMouseEnter={() => {
													togglePaperClip({
														type: "companyImage",
														state: true,
													});
												}}
											/>
										)}
								</div>
							</label>
							<div className="primary-color f-14 fw-600 mx-2">
								{profileData.company.name}
							</div>
						</div>
					</Col>
				</Row>
			)}
		</Modal>
	);
}

export default ProfileDetailsModal;
