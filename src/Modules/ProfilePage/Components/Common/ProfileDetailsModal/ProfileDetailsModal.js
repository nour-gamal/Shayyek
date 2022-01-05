import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import { Modal, Col, Row, Checkbox } from "antd";
import plusCircle from "../../../../../Resources/Assets/plusCircle.svg";
import {
	getBuyerProfile,
	postImage,
	editProfile,
	getCategoriesWithSelected,
} from "../../../network";
import { baseUrl } from "../../../../../Services";
import TreeContainer from "../../../../../Modules/Registration/Components/TreeContainer/TreeContainer";
import paperClip from "../../../../../Resources/Assets/paperClip.svg";
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";
import AddCompanyPhoneModal from "../AddCompanyPhoneModal/AddCompanyPhoneModal";
import "./ProfileDetailsModal.css";
function ProfileDetailsModal({ isModalVisible, onCancel, userType }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	const { authorization } = useSelector((state) => state.authorization);
	const [treeOptions, updateTreeOptions] = useState([]);
	const [profileData, updateProfileData] = useState(null);
	const [isChangePassModalVisible, toggleChangePassModal] = useState(false);
	const [companyPhoneModalVisible, toggleCompanyPhoneModal] = useState(false);
	const [companyEmail, updateCompanyEmail] = useState("");
	const [companyWebsite, updateCompanyWebsite] = useState("");
	const [whatsAppState, toggleWhatsAppState] = useState(false);
	const [phonesArr, updatePhonesArr] = useState([]);
	const [paperClipState, togglePaperClip] = useState({
		type: "profileImage",
		state: false,
	});
	const [profileImgLink, updateProfileImgLink] = useState(null);
	const [companyImgLink, updateCompanyImgLink] = useState(null);
	const [categoriesRequest, setcategoriesRequests] = useState([]);
	const [newPassword, updateNewPassword] = useState(null);
	const [alert, setAlert] = useState(false);

	useEffect(() => {
		getCategoriesWithSelected(
			currentLanguageId,
			(success) => {
				var data = [];

				success.data.forEach((mainCategory, i) => {
					data.push({
						value: mainCategory.mainCategory.id,
						label: mainCategory.mainCategory.name,
						children: [],
						disabled: true,
					});

					mainCategory.categories.forEach((subCategories, j) => {
						data[i].children.push({
							value: subCategories.category.id,
							label: subCategories.category.name,
							levelOne: mainCategory.mainCategory.id,
							levelTwo: subCategories.category.id,
							levelThree: subCategories.subCategories,
							children: [],
							disabled: false,
							isDefaultValue: subCategories.category.isDefaultValue,
						});

						subCategories.subCategories !== null &&
							subCategories.subCategories.forEach((subSubCategories) => {
								data[i].children[j].children.push({
									value: subSubCategories.id,
									label: subSubCategories.name,
									levelOne: mainCategory.mainCategory.id,
									levelTwo: subCategories.category.id,
									levelThree: subSubCategories.id,
									isDefaultValue: subSubCategories.isDefaultValue,
									disabled: false,
								});
							});
					});
				});

				updateTreeOptions(data);
			},
			(fail) => {
				console.log(fail);
			}
		);
	}, [currentLanguageId]);

	useEffect(() => {
		getBuyerProfile(
			currentLanguageId,
			(success) => {
				console.log(success.data);
				updateProfileData(success.data);
				updateCompanyEmail(success.data.company.email);
				updateCompanyWebsite(success.data.company.website);
				updateProfileImgLink(success.data.profileImage);
				//toggleWhatsAppState(success.data);
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
		categoriesRequest.forEach((mainCategory, mainCategoryIndex) => {
			let subResult = mainCategory.Categories.reduce(function(r, a) {
				r[a.CategoryId] = r[a.CategoryId] || [];
				r[a.CategoryId].push(a);
				return r;
			}, {});
			let newSubCatList = [];
			Object.keys(subResult).forEach((subCategory, subCategoryIndex) => {
				newSubCatList.push({
					CategoryId: subCategory,
					SubCategoryIds: [],
					checked: true,
				});
				subResult[subCategory].forEach((subSub) => {
					subSub.SubCategoryIds.forEach((subSubId) => {
						newSubCatList[subCategoryIndex].SubCategoryIds.push(subSubId);
					});
				});
			});
			categoriesRequest[mainCategoryIndex].Categories = newSubCatList;
			delete categoriesRequest[mainCategoryIndex].result;
		});

		setcategoriesRequests(categoriesRequest);
	};

	const handleSubmitEdit = () => {
		let data = {
			isWhatsAppNumber: whatsAppState,
			profileImgPath: profileImgLink,
			companyImgPath: companyImgLink,
			companyPhones: phonesArr,
			companyMail: companyEmail,
			companyWebsite,
			categoriesRequest:
				categoriesRequest.length === 0 ? null : categoriesRequest,
			newPassword,
		};
		editProfile(
			data,
			(success) => {
				console.log(success);
			},
			(fail) => {
				console.log(fail);
			}
		);
	};

	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-lg profileDetailsModal"
		>
			<div>
				{alert && (
					<Alert variant={"danger"} className="text-center">
						{currentLocal.registration.uploadValidImage}
					</Alert>
				)}

				{profileData && (
					<Row>
						<Col
							xs={24}
							md={12}
							className={
								currentLanguageId === "274c0b77-90cf-4ee3-976e-01e409413057"
									? "pr-5"
									: "pl-5"
							}
						>
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
								className={"inputField"}
							/>
							<div className="labelContainer d-flex justify-content-between align-items-end">
								<div>
									<label>{currentLocal.profilePage.mobileNumber}</label>
									<div>{authorization.mobile}</div>
								</div>
								<div>
									<Checkbox
										checked={whatsAppState}
										onChange={(e) => {
											toggleWhatsAppState(e.target.checked);
										}}
									>
										{currentLocal.registration.whatsAppNumber}
									</Checkbox>
								</div>
							</div>
							<div className="labelContainer">
								<label>{currentLocal.profilePage.email}</label>
								<div>{authorization.email}</div>
							</div>
							<div className="labelContainer w-80">
								<div className="d-flex justify-content-between">
									<label>{currentLocal.registration.password}</label>
									<div
										className="f-12 fw-600 cursorPointer"
										onClick={() => {
											toggleChangePassModal(true);
										}}
									>
										{currentLocal.profilePage.change}
									</div>
								</div>
								<div>**********</div>
							</div>
							<div className="labelContainer d-flex w-80 justify-content-between">
								<div>
									<label>{currentLocal.registration.companyPhoneNumber}</label>
									<div>
										{/* <div>{profileData.company.phone}</div> */}
										{phonesArr.map((phone, index) => (
											<div key={index}>{phone}</div>
										))}
									</div>
								</div>
								<div>
									<img
										src={plusCircle}
										alt="plusCircle"
										className="cursorPointer"
										onClick={() => {
											toggleCompanyPhoneModal(true);
										}}
									/>
								</div>
							</div>
							<div className="labelContainer">
								<label className="d-block">
									{currentLocal.registration.commercialRegister}
								</label>
								<img
									src={baseUrl + profileData.company.commercialRecord}
									alt="commercialRegister"
									className="commercialRegister"
								/>
							</div>
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
											className="profileCompImage companyBorder"
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
							<div className="labelContainer">
								<label>{currentLocal.registration.governorate}</label>
								<div>{profileData.company.governorateName}</div>
							</div>
							<div className="labelContainer">
								<label>{currentLocal.registration.address}</label>
								<div>{profileData.company.address}</div>
							</div>
							<div className="labelContainer">
								<label>{currentLocal.registration.role}</label>
								<div>{currentLocal.registration.admin}</div>
							</div>
							<div className="labelContainer">
								<label>{currentLocal.profilePage.companyEmail}</label>
								<input
									type="text"
									value={companyEmail}
									className={"input-field d-block"}
									onChange={(e) => {
										updateCompanyEmail(e.target.value);
									}}
								/>
							</div>
							<div className="labelContainer">
								<label>{currentLocal.profilePage.companyLegalStructure}</label>
								<div>{profileData.company.typeName}</div>
							</div>
							<div className="labelContainer">
								<label>{currentLocal.profilePage.companyWebsite}</label>
								<input
									type="text"
									value={companyWebsite}
									className={"input-field d-block"}
									onChange={(e) => {
										updateCompanyWebsite(e.target.value);
									}}
								/>
							</div>
						</Col>
					</Row>
				)}
			</div>
			<div className="justify-content-center d-flex">
				<button className="button-secondary mx-1" onClick={onCancel}>
					{currentLocal.profilePage.discardChanges}
				</button>
				<button className="button-primary mx-1" onClick={handleSubmitEdit}>
					{currentLocal.profilePage.save}
				</button>
			</div>
			{isChangePassModalVisible && (
				<ChangePasswordModal
					isModalVisible={isChangePassModalVisible}
					onCancel={() => {
						toggleChangePassModal(false);
					}}
					getNewPassword={(newPassword) => {
						updateNewPassword(newPassword);
					}}
				/>
			)}
			<AddCompanyPhoneModal
				isModalVisible={companyPhoneModalVisible}
				appendNewPhone={(newPhone) => {
					updatePhonesArr([...phonesArr, newPhone]);
				}}
				onCancel={() => {
					toggleCompanyPhoneModal(false);
					getBuyerProfile(
						currentLanguageId,
						(success) => {
							updateProfileData(success.data);
							updateCompanyEmail(success.data.company.companyWebsite);
						},
						(fail) => {
							console.log(fail);
						}
					);
				}}
			/>
		</Modal>
	);
}

export default ProfileDetailsModal;
