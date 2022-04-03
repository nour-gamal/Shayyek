import React, { useEffect, useState } from "react";
import AuthHeader from "../../../Common/AuthHeader/AuthHeader";
import { useSelector } from "react-redux";
//import DropdownTreeSelect from "react-dropdown-tree-select";
import { Col, Radio, Row, Checkbox, Menu, Dropdown } from "antd";
import {
	CompanyList,
	CompanyHasAdmin,
	countryList,
	governmentList,
	getWork,
	getRole,
	getCompanyType,
	getAccountType,
	register,
	addRegisterImage,
	getVolumeOfBusiness,
} from "../../Network";

import disableArrow from "../../../../Resources/Assets/disableArrow.svg";
import Arrow from "../../../../Resources/Assets/dropdown arrow icn.svg";
import foucesArrow from "../../../../Resources/Assets/blue dropdown arrow.svg";
import uploadImg from "../../../../Resources/Assets/Attach icn.svg";
import disapleUploadImg from "../../../../Resources/Assets/disapleUploadImg.svg";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import TreeContainer from "../TreeContainer/TreeContainer";
import { authorType } from "../../../../helpers/authType";
import moment from "moment";
import "react-dropdown-tree-select/dist/styles.css";
import "./RegistrationForm.css";

function RegistrationForm() {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	const { deviceToken } = useSelector((state) => state.authorization);
	const [buyer, setBuyer] = useState(currentLocal.registration.userType);
	const [individual, setIndividual] = useState("");
	const [firstName, setFirstName] = useState("");
	const [focusIcon, setFocusIcon] = useState(false);
	const [lastName, setLastName] = useState("");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [mobileNumber, setMobileNumber] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [admin, setAdmin] = useState(false);
	const [checkedWhatsApp, toggleCheckedWhatsApp] = useState(false);
	const [companyTypes, setCompanyTypes] = useState([]);
	const [companyTypeId, setCompanyTypeId] = useState(null);
	const [companyTypeName, setCompanyTypeName] = useState(null);
	const [companyPhoneNumber, setCompanyPhoneNumber] = useState("");
	const [companiesName, setCompaniesName] = useState([]);
	const [companyMail, setCompanyMail] = useState("");
	const [checked, toggleChecked] = useState("");
	const [confirmationState, setConfirmationState] = useState("");
	const [companyWebsite, setcompanyWebsite] = useState("");
	const [companyId, setCompanyId] = useState(null);
	const [governmentId, setGovernmentId] = useState(null);
	const [companyName, setCompanyName] = useState(null);
	const [governmentsName, setGovernmentsName] = useState([]);
	const [countriesName, setCountriesName] = useState([]);
	const [governmentName, setGovernmentName] = useState("");
	const [countryName, setCountryName] = useState("");
	const [roleList, setRoleList] = useState([]);
	const [roleName, setRoleName] = useState("");
	const [accountList, setAccountList] = useState([[]]);
	const [accountId, setAccountId] = useState("");
	const [roleId, setRoleId] = useState("4940d4e9-8bfd-467d-a9d9-20f719cdff93");
	const [userTypeId, setUserTypeId] = useState("");
	const [alert, setAlert] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const [logoName, setlogoName] = useState("");
	const [fileName, setFileName] = useState("");
	const [treeOptions, updateTreeOptions] = useState([]);
	const [foucesItem, setFoucesItem] = useState("");
	const [mobileState, setMobileState] = useState("");
	const [categoriesRequests, setcategoriesRequests] = useState(null);
	const [emailState, setEmailState] = useState("");
	const [comRecPath, updateComRecPath] = useState(null);
	const [compLogoPath, updateCompLogoPath] = useState(null);
	const [companyLogoErr, updateCompanyLogoErr] = useState(false);
	const [userTypeName, updateUserTypeName] = useState(null);
	const [yearsList, updateYearsList] = useState([]);
	const [yearOfStartingOperation, updateYearOfStartingOperation] = useState(
		null
	);
	const [volumeOfBusinessList, updateVolumeOfBusinessList] = useState([]);
	const [volumeOfBusiness, updateVolumeOfBusiness] = useState(null);
	const showState = true;
	const uploadCompanyLogo = "";
	const commercialRecord = "";

	useEffect(() => {
		const userTypeNameVar = authorType(individual, userTypeId, roleId);
		updateUserTypeName(userTypeNameVar);
	}, [individual, userTypeId, roleId]);
	const onSelectUserType = (val) => {
		setTimeout(() => {
			setBuyer(val);
		}, 100);
	};
	const onVolumeOfBusinessChange = (e) => {
		updateVolumeOfBusiness(e.target.value);
	};

	const toggleValue = (val) => {
		// setToggleAccountType(val);
	};

	const sendDataToParent = (val) => {
		setUserTypeId(val);
		setIndividual("");
		if (val === "2a9e1d5f-722e-404e-8041-a6a665149e03") {
			setAccountId("d23f2c1e-1ed3-4066-96d6-66a970e39a7f");
			setIndividual("d23f2c1e-1ed3-4066-96d6-66a970e39a7f");
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

	useEffect(() => {
		if (localStorage.getItem("redirectToRegistration")) {
			setBuyer(localStorage.getItem("redirectToRegistration"));
		}
		CompanyList(
			currentLanguageId,
			(success) => {
				setCompaniesName(success.data);
			},
			(fail) => {},
			false
		);

		countryList(
			currentLanguageId,
			(success) => {
				setCountriesName(success.data);
			},
			(fail) => {},
			false
		);
		getRole(
			currentLanguageId,
			(success) => {
				setRoleList(success.data);
			},
			(fail) => {},
			false
		);
		getAccountType(
			currentLanguageId,
			(success) => {
				setAccountList(success.data);
			},
			(fail) => {},
			false
		);

		getCompanyType(
			currentLanguageId,
			(success) => {
				setCompanyTypes(success.data);
			},
			(fail) => {}
		);
		getVolumeOfBusiness(
			currentLanguageId,
			(success) => {
				updateVolumeOfBusinessList(success.data);
			},
			(fail) => {
				console.log(fail);
			}
		);
		generateYears();
		getWork(
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
						});

						subCategories.subCategories !== null &&
							subCategories.subCategories.forEach((subSubCategories) => {
								data[i].children[j].children.push({
									value: subSubCategories.id,
									label: subSubCategories.name,
									levelOne: mainCategory.mainCategory.id,
									levelTwo: subCategories.category.id,
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

	//dropdown of company
	const menu = (
		<Menu>
			{companiesName.map((company, companyIndex) => {
				return (
					<Menu.Item
						key={companyIndex}
						onClick={(e) => {
							setCompanyId(company.id);
							setCompanyName(company.name);
							setTimeout(() => {
								CompanyHasAdmin(
									company.id,
									(success) => {
										//setAdmin(success.data);
										setAdmin(true);
									},
									(fail) => {},
									false
								);
							}, 2000);
						}}
					>
						{company.name}
					</Menu.Item>
				);
			})}
		</Menu>
	);
	//dropdown of country
	const countryMenu = (
		<Menu>
			{countriesName.map((country, countryIndex) => {
				return (
					<Menu.Item
						key={countryIndex}
						onClick={(e) => {
							setCountryName(country.name);
							//   setCountryAlert(false);
							//call api to know if company has admin or not (admin>res.data)
							governmentList(
								currentLanguageId,
								country.id,
								(success) => {
									setGovernmentsName(success.data);
								},
								(fail) => {},
								false
							);
						}}
					>
						{country.name}
					</Menu.Item>
				);
			})}
		</Menu>
	);

	const generateYears = () => {
		let years = [];
		for (let year = 1900; year <= moment().format("YYYY"); year++) {
			years.push(year.toString());
		}
		updateYearsList(years);
	};

	//dropdown forYears
	const yearsMenu = (
		<Menu>
			{yearsList.map((year) => {
				return (
					<Menu.Item
						key={year}
						onClick={() => {
							updateYearOfStartingOperation(year);
						}}
					>
						{year}
					</Menu.Item>
				);
			})}
		</Menu>
	);

	//dropdown of government
	const governmentMenu = (
		<Menu>
			{governmentsName.map((government, governmentIndex) => {
				return (
					<Menu.Item
						key={governmentIndex}
						onClick={(e) => {
							setGovernmentId(government.id);
							setGovernmentName(government.name); //call api to know if company has admin or not (admin>res.data)
						}}
					>
						{government.name}
					</Menu.Item>
				);
			})}
		</Menu>
	);
	//dropdown of role
	const roleMenu = (
		<Menu>
			{roleList.map((role, roleIndex) => {
				return (
					<Menu.Item
						key={roleIndex}
						onClick={(e) => {
							setRoleName(role.name);
							setRoleId(role.id);
							if (role.name === "Employee") {
								setAdmin(true);
							}
						}}
					>
						{role.name}
					</Menu.Item>
				);
			})}
		</Menu>
	);
	//dropdown CompanyType
	const companyTypeMenu = (
		<Menu>
			{companyTypes.map((companyType, companyIndex) => {
				return (
					<Menu.Item
						key={companyIndex}
						onClick={(e) => {
							setCompanyTypeName(companyType.name);
							setCompanyTypeId(companyType.id);
						}}
					>
						{companyType.name}
					</Menu.Item>
				);
			})}
		</Menu>
	);

	const submitRegister = () => {
		let data = {
			FirstName: firstName,
			LastName: lastName,
			MailUser: email,
			Password: password,
			MobileUser: mobileNumber,
			IsWhatsAppNumber: checkedWhatsApp,
			FirebaseToken: deviceToken.deviceToken,
			MailCompany: companyMail,
			CompanyPhones: [companyPhoneNumber],
			Website: companyWebsite,
			Address: address,
			CompanyHasData:
				accountId === "436b77d6-bc46-4527-bc72-ec7fc595e16d" ? false : !admin,
			CompanyTypeId: companyTypeId,
			AccountTypeId: accountId
				? accountId
				: "d23f2c1e-1ed3-4066-96d6-66a970e39a7f",
			UserTypeId: userTypeId,
			// roleId === "274c0b77-90cf-4ee3-976e-01e409413057"
			CompanyName: companyName,
			CompanyId: companyId,
			RoleId: roleId,
			GovernmentId: governmentId,
			CategoriesRequest: categoriesRequests,
			Logo: compLogoPath,
			commercialRecord: comRecPath,
			yearOfStartingOperation: yearOfStartingOperation,
			volumeOfWork: volumeOfBusiness,
		};
		register(
			data,
			(success) => {
				if (success.success === true) {
					setRedirect(true);
				} else if (!success.success && success.data.errorStatus === 2) {
					//Mobile usedBefore
					setMobileState(success.message);
				} else if (!success.success && success.data.errorStatus === 1) {
					//Mobile usedBefore
					setEmailState(success.message);
				}
			},
			(fail) => console.log(fail)
		);
	};

	const handleAddCompanyLogo = (e) => {
		if (e.target.files[0].type.includes("image")) {
			setlogoName(e.target.files[0].name);
			updateCompanyLogoErr(false);
			const companyLogoData = new FormData();
			companyLogoData.append("image", e.target.files[0]);
			companyLogoData.append("status", 1);
			addRegisterImage(
				companyLogoData,
				(success) => {
					updateCompLogoPath(success.data);
				},
				(fail) => {
					console.log(fail);
				}
			);
		} else {
			updateCompanyLogoErr(true);
		}
	};
	const handleUploadCommercialRecord = (e) => {
		setFileName(e.target.files[0].name);

		const commercialRecordData = new FormData();
		commercialRecordData.append("image", e.target.files[0]);
		commercialRecordData.append("status", 2);
		addRegisterImage(
			commercialRecordData,
			(success) => {
				updateComRecPath(success.data);
			},
			(fail) => {
				console.log(fail);
			}
		);
	};
	const sendData = (e) => {
		e.preventDefault();
		if (userTypeName === "buyer_company_admin") {
			if (
				!firstName ||
				!lastName ||
				!mobileNumber ||
				!email ||
				!password ||
				!confirmPassword ||
				!companyName ||
				!checked ||
				!volumeOfBusiness
			) {
				setAlert(true);
			} else {
				setAlert(false);
				submitRegister();
			}
		} else if (userTypeName === "buyer_company_employee") {
			if (
				!firstName ||
				!lastName ||
				!mobileNumber ||
				!email ||
				!password ||
				!confirmPassword ||
				!companyName ||
				!checked ||
				!fileName ||
				!companyPhoneNumber ||
				!companyTypeId ||
				!roleName ||
				!categoriesRequests
			) {
				setAlert(true);
			} else {
				setAlert(false);
				submitRegister();
			}
		} else if (userTypeName === "buyer_individual") {
			if (
				!firstName ||
				!lastName ||
				!mobileNumber ||
				!email ||
				!password ||
				!confirmPassword ||
				!checked ||
				!volumeOfBusiness
			) {
				setAlert(true);
			} else {
				setAlert(false);
				submitRegister();
			}
		} else if (userTypeName === "contractor_company_admin") {
			if (
				!firstName ||
				!lastName ||
				!mobileNumber ||
				!email ||
				!password ||
				!confirmPassword ||
				!companyName ||
				!checked ||
				!yearOfStartingOperation
			) {
				setAlert(true);
			} else {
				setAlert(false);
				submitRegister();
			}
		} else if (userTypeName === "contractor_company_employee") {
			if (
				!firstName ||
				!lastName ||
				!mobileNumber ||
				!email ||
				!password ||
				!confirmPassword ||
				!companyName ||
				!companyPhoneNumber ||
				!companyTypeId ||
				!roleName ||
				!fileName ||
				!countryName ||
				!governmentName ||
				!address ||
				!checked ||
				!categoriesRequests
				// !work
			) {
				setAlert(true);
			} else {
				setAlert(false);
				submitRegister();
			}
		} else if (userTypeName === "contractor_individual") {
			if (
				!firstName ||
				!lastName ||
				!mobileNumber ||
				!email ||
				!password ||
				!confirmPassword ||
				!address ||
				!countryName ||
				!governmentName ||
				!checked ||
				!yearOfStartingOperation
			) {
				setAlert(true);
			} else {
				setAlert(false);
				submitRegister();
			}
		} else if (userTypeName === "supplier_company_admin") {
			if (
				!firstName ||
				!lastName ||
				!mobileNumber ||
				!companyName ||
				!email ||
				!password ||
				!confirmPassword ||
				!address ||
				!countryName ||
				!governmentName ||
				!checked ||
				!yearOfStartingOperation
			) {
				setAlert(true);
			} else {
				setAlert(false);
				submitRegister();
			}
		} else if (userTypeName === "supplier_company_employee") {
			if (
				!firstName ||
				!lastName ||
				!companyName ||
				!roleName ||
				!mobileNumber ||
				!email ||
				!password ||
				!confirmPassword ||
				!companyTypeId ||
				!companyPhoneNumber ||
				!countryName ||
				!governmentName ||
				!address ||
				!fileName ||
				!checked ||
				!categoriesRequests
			) {
				setAlert(true);
			} else {
				setAlert(false);
				submitRegister();
			}
		}
	};
	if (redirect) {
		return <Redirect to="/verifyByEmail" />;
	}
	return (
		<div className="RegistrationForm ppl ppr">
			<AuthHeader
				title={currentLocal.registration.createAnAccount}
				showState={showState}
				onSelectUserType={onSelectUserType}
				sendDataToParent={sendDataToParent}
				toggleValue={toggleValue}
				alert={alert}
				fistName={firstName}
				lastName={lastName}
				parent={"register"}
			/>
			<Row>
				<Col
					xs={24}
					className={buyer === currentLocal.registration.Supplier && "d-none"}
				>
					<Radio.Group>
						{accountList.map((account, accoundIndex) => {
							return (
								<Radio
									key={accoundIndex}
									className={
										buyer === currentLocal.registration.userType &&
										"disableRadio"
									}
									onChange={(e) => {
										setAccountId(account.id);
										setIndividual(e.target.value);
										if (companyName) {
											setCompanyName("");
											setAdmin("");
										}
									}}
									disabled={buyer === currentLocal.registration.userType}
									value={account.id}
								>
									{account.name}
								</Radio>
							);
						})}
					</Radio.Group>
				</Col>
			</Row>
			<form onSubmit={sendData}>
				<Row>
					<Col md={12} xs={24}>
						<p className="alertMsg">
							{alert && !firstName && (
								<>{currentLocal.registration.pleaseFillFirstName}</>
							)}
						</p>
						<input
							id="firstName"
							value={firstName}
							type="text"
							className={
								!individual && buyer !== currentLocal.registration.Supplier
									? "disableInput input-field"
									: "input-field"
							}
							placeholder={currentLocal.registration.firstName}
							disabled={
								!individual && buyer !== currentLocal.registration.Supplier
							}
							onChange={(e) => {
								setFirstName(e.target.value);
							}}
						/>
					</Col>
					<Col md={12} xs={24}>
						<p className="alertMsg">
							{alert && !lastName && (
								<>{currentLocal.registration.pleaseFillLastName}</>
							)}
						</p>
						<input
							type="text"
							className={
								!individual && buyer !== currentLocal.registration.Supplier
									? "disableInput input-field"
									: "input-field"
							}
							placeholder={currentLocal.registration.lastName}
							id="lastName"
							value={lastName}
							disabled={
								!individual && buyer !== currentLocal.registration.Supplier
							}
							onChange={(e) => {
								setLastName(e.target.value);
							}}
						/>
					</Col>
					{userTypeName && !userTypeName.includes("individual") && (
						<>
							<Col md={12} xs={24}>
								<p className="alertMsg">
									{alert && !roleName && (
										<>{currentLocal.registration.pleaseChooseYourRole}</>
									)}
								</p>
								<Dropdown
									overlay={roleMenu}
									trigger={["click"]}
									className={
										!individual && buyer !== currentLocal.registration.Supplier
											? "disableInput input-dropdown"
											: "input-dropdown"
									}
									disabled={
										!individual && buyer !== currentLocal.registration.Supplier
									}
									onClick={(e) => {
										setFoucesItem(e.target.id);
										setFocusIcon(true);
									}}
									onBlur={() => setFocusIcon(false)}
								>
									<a
										href="/"
										className="ant-dropdown-link"
										onClick={(e) => e.preventDefault()}
										id="role"
									>
										{roleName ? roleName : currentLocal.registration.role}
										{!individual &&
										buyer !== currentLocal.registration.Supplier ? (
											<img src={disableArrow} alt="disableArrow" />
										) : (
											<img
												src={
													focusIcon && foucesItem === "role"
														? foucesArrow
														: Arrow
												}
												alt="Arrow"
											/>
										)}
									</a>
								</Dropdown>
							</Col>
						</>
					)}
					{userTypeName && !userTypeName.includes("individual") && (
						<Col md={12} xs={24} className="companyName">
							<p className="alertMsg">
								{alert && !companyName && (
									<>{currentLocal.registration.pleaseChooseCompanyName}</>
								)}
							</p>
							{userTypeName && userTypeName.includes("employee") ? (
								<Dropdown
									overlay={menu}
									trigger={["click"]}
									className={
										!individual && buyer !== currentLocal.registration.Supplier
											? "disableInput input-field"
											: "input-field"
									}
									disabled={
										!individual && buyer !== currentLocal.registration.Supplier
									}
									onClick={(e) => {
										setFoucesItem(e.target.id);
										setFocusIcon(true);
									}}
									onBlur={() => setFocusIcon(false)}
								>
									<a
										href="/"
										id="companyName"
										className="ant-dropdown-link"
										onClick={(e) => e.preventDefault()}
									>
										{companyName
											? companyName
											: currentLocal.registration.companyName}
										{!individual &&
										buyer !== currentLocal.registration.Supplier ? (
											<img src={disableArrow} alt="disableArrow" />
										) : (
											<img
												src={
													focusIcon && foucesItem === "companyName"
														? foucesArrow
														: Arrow
												}
												alt="Arrow"
											/>
										)}
									</a>
								</Dropdown>
							) : (
								<input
									type="text"
									value={companyName}
									onChange={(e) => {
										setCompanyName(e.target.value);
									}}
									className="input-field"
									placeholder={currentLocal.registration.companyName}
								/>
							)}
						</Col>
					)}
					{(userTypeName &&
						userTypeName.includes("individual") &&
						userTypeName.includes("contractor")) ||
						(userTypeName &&
							!userTypeName.includes("individual") &&
							!userTypeName.includes("admin") && (
								<Col md={12} xs={24} className="work">
									<p className="alertMsg">
										{alert && categoriesRequests === null && (
											<>{currentLocal.registration.PleaseChooseWork}</>
										)}
									</p>
									<TreeContainer
										data={treeOptions}
										onChange={onTreeChange}
										className={
											!individual &&
											buyer !== currentLocal.registration.Supplier
												? "bootstrap-demo disableInput input-dropdown"
												: "bootstrap-demo input-dropdown disabled"
										}
										disabled={
											!individual &&
											buyer !== currentLocal.registration.Supplier
										}
									/>

									{!individual &&
									buyer !== currentLocal.registration.Supplier ? (
										<img
											src={disableArrow}
											alt="disableArrow"
											className={
												currentLanguageId ===
												"46f4621f-9f96-46c7-a2d4-94b4c3393914"
													? "rightIcon "
													: "dropDownicon"
											}
										/>
									) : (
										<img
											src={focusIcon ? foucesArrow : Arrow}
											alt="Arrow"
											className={
												currentLanguageId ===
												"46f4621f-9f96-46c7-a2d4-94b4c3393914"
													? "rightIcon "
													: "dropDownicon"
											}
										/>
									)}
								</Col>
							))}
					<Col md={12} xs={24}>
						<p className="alertMsg">
							{alert && !mobileNumber && (
								<>{currentLocal.registration.pleaseFillmobileNumber}</>
							)}
							{mobileState && mobileState}
						</p>
						<input
							className={
								!individual && buyer !== currentLocal.registration.Supplier
									? "disableInput input-field mb-2"
									: "input-field mb-3"
							}
							placeholder={currentLocal.registration.mobileNumber}
							type="number"
							id="mobileNumber"
							value={mobileNumber}
							disabled={
								!individual && buyer !== currentLocal.registration.Supplier
							}
							onChange={(e) => {
								setMobileNumber(e.target.value);
								setMobileState("");
							}}
						/>
						<Checkbox
							id="whatsNumber"
							disabled={
								!individual && buyer !== currentLocal.registration.Supplier
							}
							className={
								checkedWhatsApp ? "disableFiled check-field" : "check-field"
							}
							onChange={(e) => {
								toggleCheckedWhatsApp(e.target.checked);
							}}
						>
							{currentLocal.registration.whatsAppNumber}
						</Checkbox>
					</Col>
					<Col md={12} xs={24}>
						<p className="alertMsg">
							{alert && !email && (
								<>{currentLocal.registration.pleaseFillEmail}</>
							)}
							{emailState && emailState}
						</p>
						<input
							type="email"
							className={
								!individual && buyer !== currentLocal.registration.Supplier
									? "disableInput input-field"
									: "input-field"
							}
							placeholder={currentLocal.registration.email}
							disabled={
								!individual && buyer !== currentLocal.registration.Supplier
							}
							id="email"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
								setEmailState("");
							}}
						/>
					</Col>
					<Col md={12} xs={24}>
						<p className="alertMsg">
							{alert && !password && (
								<>{currentLocal.registration.pleaseFillPassword}</>
							)}
						</p>
						<input
							className={
								!individual && buyer !== currentLocal.registration.Supplier
									? "disableInput input-field"
									: "input-field"
							}
							placeholder={currentLocal.registration.password}
							disabled={
								!individual && buyer !== currentLocal.registration.Supplier
							}
							type="password"
							id="password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</Col>
					<Col md={12} xs={24}>
						<p className="alertMsg">
							{alert && !confirmPassword && (
								<>{currentLocal.registration.pleaseFillConfirmPassword}</>
							)}
							{confirmationState && <> * password confirmation doesn't match</>}
						</p>

						<input
							onBlur={() => {
								password !== confirmPassword
									? setConfirmationState(true)
									: setConfirmationState(false);
							}}
							type="password"
							className={
								!individual && buyer !== currentLocal.registration.Supplier
									? "disableInput input-field"
									: "input-field"
							}
							placeholder={currentLocal.registration.confirmPassword}
							disabled={
								!individual && buyer !== currentLocal.registration.Supplier
							}
							id="confirmPassword"
							value={confirmPassword}
							onChange={(e) => {
								setConfirmPassword(e.target.value);
							}}
						/>
					</Col>
					{individual !== "436b77d6-bc46-4527-bc72-ec7fc595e16d" && !admin && (
						<>
							<Col md={12} xs={24} className="companyType">
								<p className="alertMsg">
									{alert && !companyTypeName && (
										<>{currentLocal.registration.pleaseChooseCompanyType}</>
									)}
								</p>
								<Dropdown
									overlay={companyTypeMenu}
									trigger={["click"]}
									className={
										!individual && buyer !== currentLocal.registration.Supplier
											? "disableInput input-field"
											: "input-field"
									}
									disabled={
										!individual && buyer !== currentLocal.registration.Supplier
									}
									onClick={(e) => {
										setFoucesItem(e.target.id);
										setFocusIcon(true);
									}}
									onBlur={() => setFocusIcon(false)}
								>
									<a
										href="/"
										id="organisationLegalStructure"
										className={
											!individual &&
											buyer !== currentLocal.registration.Supplier
												? "disableInput ant-dropdown-link"
												: "ant-dropdown-link"
										}
										onClick={(e) => e.preventDefault()}
									>
										{companyTypeName
											? companyTypeName
											: currentLocal.registration.organisationLegalStructure}
										{!individual &&
										buyer !== currentLocal.registration.Supplier ? (
											<img src={disableArrow} alt="disableArrow" />
										) : (
											<img
												src={
													focusIcon &&
													foucesItem === "organisationLegalStructure"
														? foucesArrow
														: Arrow
												}
												alt="Arrow"
											/>
										)}
									</a>
								</Dropdown>
							</Col>

							<Col md={12} xs={24}>
								<p className="alertMsg">
									{alert && !companyPhoneNumber && (
										<>
											{currentLocal.registration.pleaseFillCompanyPhoneNumber}
										</>
									)}
								</p>
								<input
									disabled={
										!individual && buyer !== currentLocal.registration.Supplier
									}
									type="number"
									className={
										!individual && buyer !== currentLocal.registration.Supplier
											? "disableInput input-field"
											: "input-field"
									}
									placeholder={currentLocal.registration.companyPhoneNumber}
									id="companyPhoneNumber"
									value={companyPhoneNumber}
									onChange={(e) => {
										setCompanyPhoneNumber(e.target.value);
									}}
								/>
							</Col>

							<Col md={12} xs={24}>
								<p className="alertMsg"></p>
								<input
									disabled={
										!individual && buyer !== currentLocal.registration.Supplier
									}
									type="email"
									className={
										!individual && buyer !== currentLocal.registration.Supplier
											? "disableInput input-field"
											: "input-field"
									}
									placeholder={currentLocal.registration.companyMail}
									id="companyMail"
									value={companyMail}
									onChange={(e) => {
										setCompanyMail(e.target.value);
									}}
								/>
							</Col>
						</>
					)}
					{!(
						buyer === currentLocal.registration.Contractor ||
						buyer === currentLocal.registration.Supplier ||
						individual === "436b77d6-bc46-4527-bc72-ec7fc595e16d" ||
						admin === true
					) && (
						<Col md={12} xs={24}>
							<p className="alertMsg">
								{(alert && !companyWebsite && !individual) ||
									buyer === currentLocal.registration.buyer ||
									(buyer !== currentLocal.registration.userType && (
										<>{currentLocal.registration.pleaseFillCompanyWebsite}</>
									))}
							</p>
							<input
								disabled={
									!individual && buyer !== currentLocal.registration.Supplier
								}
								type="text"
								name="myfile"
								className={
									!individual && buyer !== currentLocal.registration.Supplier
										? "disableInput input-field"
										: "input-field"
								}
								placeholder={
									!individual || buyer === currentLocal.registration.buyer
										? currentLocal.registration.companyWebsiteOptional
										: currentLocal.registration.companyWebsite
								}
								id="companyWebsite"
								value={companyWebsite}
								onChange={(e) => {
									setcompanyWebsite(e.target.value);
								}}
							/>
						</Col>
					)}
					{!(
						individual === "436b77d6-bc46-4527-bc72-ec7fc595e16d" ||
						admin === true
					) && (
						<Col md={12} xs={24}>
							<p className="alertMsg"></p>
							{companyLogoErr && (
								<div className="text-red">
									{currentLocal.registration.uploadValidImage}
								</div>
							)}

							<div
								className={
									!individual && buyer !== currentLocal.registration.Supplier
										? "disableInput input-field d-flex justify-content-between align-items-center"
										: "input-field d-flex justify-content-between align-items-center "
								}
								onClick={() => {
									// setChangeBorder(true)
								}}
							>
								<input
									disabled={
										!individual && buyer !== currentLocal.registration.Supplier
									}
									type="file"
									id="files"
									accept="image/png, image/gif, image/jpeg"
									value={uploadCompanyLogo}
									onChange={handleAddCompanyLogo}
									style={{ display: "none" }}
								/>
								<label htmlFor="files" className="w-100">
									{!individual &&
									buyer !== currentLocal.registration.Supplier ? (
										<>
											<div className="d-flex justify-content-between ">
												<div>
													{logoName
														? logoName
														: currentLocal.registration.uploadCompanyLogo}
												</div>
												<div>
													<img src={disapleUploadImg} alt="disapleUploadImg" />
												</div>
											</div>
										</>
									) : (
										<>
											<div className="d-flex justify-content-between align-items-center">
												<div>
													{logoName
														? logoName
														: currentLocal.registration.uploadCompanyLogo}
												</div>
												<div>
													<img src={uploadImg} alt="uploadImg" />
												</div>
											</div>
										</>
									)}
								</label>
							</div>
						</Col>
					)}

					{userTypeName &&
						(!userTypeName.includes("admin") ||
							userTypeName.includes("company") ||
							(userTypeName.includes("contractor") &&
								userTypeName.includes("individual")) ||
							userTypeName.includes("supplier")) && (
							<>
								<Col md={12} xs={24} className="country">
									<p className="alertMsg">
										{alert && !countryName && (
											<>{currentLocal.registration.pleaseFillCountry}</>
										)}
									</p>
									<Dropdown
										overlay={countryMenu}
										trigger={["click"]}
										className={
											!individual &&
											buyer !== currentLocal.registration.Supplier
												? "disableInput input-field"
												: "input-field"
										}
										disabled={
											!individual &&
											buyer !== currentLocal.registration.Supplier
										}
										onClick={(e) => {
											setFoucesItem(e.target.id);
											setFocusIcon(true);
										}}
										onBlur={() => setFocusIcon(false)}
									>
										<a
											id="country"
											href="/"
											className="ant-dropdown-link"
											onClick={(e) => e.preventDefault()}
										>
											{countryName
												? countryName
												: currentLocal.registration.country}
											{!individual &&
											buyer !== currentLocal.registration.Supplier ? (
												<img src={disableArrow} alt="disableArrow" />
											) : (
												<img
													src={
														focusIcon && foucesItem === "country"
															? foucesArrow
															: Arrow
													}
													alt="Arrow"
												/>
											)}
										</a>
									</Dropdown>
								</Col>
								<Col md={12} xs={24} className="government">
									<p className="alertMsg">
										{alert && !governmentName && (
											<>{currentLocal.registration.pleaseChooseGovernorate}</>
										)}
									</p>
									<Dropdown
										overlay={governmentMenu}
										trigger={["click"]}
										className={
											!individual &&
											buyer !== currentLocal.registration.Supplier
												? "disableInput input-field"
												: "input-field"
										}
										disabled={
											!individual &&
											buyer !== currentLocal.registration.Supplier
										}
										onClick={(e) => {
											setFoucesItem(e.target.id);
											setFocusIcon(true);
										}}
										onBlur={() => setFocusIcon(false)}
									>
										<a
											id="government"
											href="/"
											className="ant-dropdown-link"
											onClick={(e) => e.preventDefault()}
										>
											{governmentName
												? governmentName
												: currentLocal.registration.governorate}
											{!individual &&
											buyer !== currentLocal.registration.Supplier ? (
												<img src={disableArrow} alt="disableArrow" />
											) : (
												// <img src={Arrow} alt="Arrow" />
												<img
													src={
														focusIcon && foucesItem === "government"
															? foucesArrow
															: Arrow
													}
													alt="Arrow"
												/>
											)}
										</a>
									</Dropdown>
								</Col>

								<Col md={12} xs={24}>
									<p className="alertMsg">
										{alert && !address && (
											<>{currentLocal.registration.pleaseFillAddress}</>
										)}
									</p>{" "}
									<input
										disabled={
											!individual &&
											buyer !== currentLocal.registration.Supplier
										}
										type="text"
										className={
											!individual &&
											buyer !== currentLocal.registration.Supplier
												? "disableInput input-field"
												: "input-field"
										}
										placeholder={currentLocal.registration.address}
										id="address"
										value={address}
										onChange={(e) => {
											setAddress(e.target.value);
										}}
									/>
								</Col>
							</>
						)}
					{userTypeName &&
						(userTypeName.includes("supplier") ||
							userTypeName.includes("contractor")) &&
						!userTypeName.includes("employee") && (
							<Col md={12} xs={24} className="YearsMenu">
								<p className="alertMsg">
									{alert && !yearOfStartingOperation && (
										<>
											{
												currentLocal.registration
													.pleaseChooseYearofStartingOperation
											}
										</>
									)}
								</p>
								<Dropdown
									overlay={yearsMenu}
									trigger={["click"]}
									className={
										userTypeName ? "disableInput input-field" : "input-field"
									}
									disabled={
										!individual && buyer !== currentLocal.registration.Supplier
									}
								>
									<div>
										{yearOfStartingOperation
											? yearOfStartingOperation
											: currentLocal.registration.yearOfStartingOperation}
									</div>
								</Dropdown>
							</Col>
						)}
					{/* Volume of business */}
					{userTypeName &&
						userTypeName.includes("buyer") &&
						!userTypeName.includes("employee") && (
							<Col md={12} xs={24}>
								<div
									className={
										userTypeName
											? "disableInput input-field volumeOfBusiness mt-4"
											: "input-field volumeOfBusiness mt-4"
									}
								>
									{alert && !volumeOfBusiness && (
										<p className="alertMsg">
											{currentLocal.registration.pleaseChooseVolumeOfBusiness}
										</p>
									)}
									<div className="f-16">
										{currentLocal.registration.volumeOfBusiness}
									</div>
									<Radio.Group
										onChange={onVolumeOfBusinessChange}
										value={volumeOfBusiness}
										className="volumeOfBusinessRadio f-14 d-flex justify-content-between"
										disabled={
											!individual &&
											buyer !== currentLocal.registration.Supplier
										}
									>
										{volumeOfBusinessList.map((choice) => {
											return <Radio value={choice.id}>{choice.name}</Radio>;
										})}
									</Radio.Group>
								</div>
							</Col>
						)}
					{admin === false && (
						<Col md={12} xs={24}>
							<p className="alertMsg">
								{alert &&
									!fileName &&
									individual !== "436b77d6-bc46-4527-bc72-ec7fc595e16d" && (
										<>
											{currentLocal.registration.pleaseUploadCommercialRegister}
										</>
									)}
							</p>
							<div
								className={
									!individual && buyer !== currentLocal.registration.Supplier
										? "disableInput input-field d-flex justify-content-between align-items-center"
										: "input-field d-flex justify-content-between align-items-center"
								}
							>
								<input
									disabled={
										!individual && buyer !== currentLocal.registration.Supplier
									}
									type="file"
									id="file"
									value={commercialRecord}
									onChange={handleUploadCommercialRecord}
									style={{ display: "none" }}
								/>
								<label htmlFor="file" className="w-100">
									{buyer !== currentLocal.registration.Supplier &&
									individual === "436b77d6-bc46-4527-bc72-ec7fc595e16d" ? (
										<>
											<div className="d-flex justify-content-between ">
												<div>
													{fileName
														? fileName
														: currentLocal.registration
																.commercialRecordOptional}
												</div>
												<div>
													<img src={disapleUploadImg} alt="disapleUploadImg" />
												</div>
											</div>
										</>
									) : (
										<>
											<div className="d-flex justify-content-between align-items-center">
												<div>
													{fileName
														? fileName
														: currentLocal.registration.commercialRegister}
												</div>
												<div>
													<img src={uploadImg} alt="uploadImg" />{" "}
												</div>
											</div>
										</>
									)}
								</label>
							</div>
						</Col>
					)}
					<Col md={12} xs={24} className={alert && !checked && "requird"}>
						<p className="alertMsg"></p>
						<Checkbox
							disabled={
								!individual && buyer !== currentLocal.registration.Supplier
							}
							className={
								!individual && buyer !== currentLocal.registration.Supplier
									? "disableFiled check-field"
									: "check-field"
							}
							id="acceptTerms"
							onChange={(e) => {
								toggleChecked(e.target.checked);
								// setAcceptTerms(e.target.value);
							}}
						>
							{currentLocal.registration.acceptTermsOfServiceAndPrivacyPolicy}
						</Checkbox>
					</Col>
					<div className="button my-3">
						<div>
							<button
								disabled={
									!individual && buyer !== currentLocal.registration.Supplier
								}
								type="submit"
								className={
									!individual && buyer !== currentLocal.registration.Supplier
										? "disable button-primary"
										: "button-primary"
								}
							>
								{currentLocal.registration.register}
							</button>
						</div>
						<div
							className={
								!individual && buyer !== currentLocal.registration.Supplier
									? "disableCheck checkSignIn"
									: "checkSignIn"
							}
						>
							{currentLocal.registration.alreadyHaveAnAccount}
							<Link
								to="/loginByEmail"
								disabled={
									!individual && buyer !== currentLocal.registration.Supplier
								}
							>
								{" "}
								{currentLocal.registration.signIn}
							</Link>
						</div>
					</div>
				</Row>
			</form>
		</div>
	);
}

export default RegistrationForm;
