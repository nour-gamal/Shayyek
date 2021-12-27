import React, { useState, useEffect } from "react";
import { Modal, Checkbox } from "antd";
import SelectSearch from "react-select-search";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import AddEmailModal from "../AddEmailModal/AddEmailModal";
import Fuse from "fuse.js";
import {
	getCCEmails,
	GetSupplierAndContractorEmails,
	postRFQ,
} from "../../../network";
import PlusCircle from "../../../../../Resources/Assets/plusCircle.svg";
import WhiteCross from "../../../../../Resources/Assets/whiteCross.svg";
import "./PostRFQModal.css";

function PostRFQModal({
	isModalVisible,
	onCancel,
	modalType,
	deliveryDate,
	deadlineDate,
	deliveredTo,
	rfqDetails,
	address,
	ccColluguesProp,
	invitedEmailsProp,
	projectNameProp,
	publishToReleventProp,
	revealPriceProp,
	id,
	deletedRowsList,
}) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { authorization } = useSelector((state) => state.authorization);
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	const [invited, updateInvited] = useState([]);
	const [publishToRelevent, updatePublishToRelevant] = useState(false);
	const [revealPrice, updateRevealPrice] = useState(false);
	const [options, updateOptions] = useState([]);
	const [alert, setAlert] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const [projectName, changeProjectName] = useState("");
	const [ccCollugues, updateCcCollugues] = useState([]);
	const [isEmailModVisible, toggleEmailModal] = useState(false);

	useEffect(() => {
		changeProjectName(projectNameProp);
		updateCcCollugues(ccColluguesProp);
		updateInvited(invitedEmailsProp);
		updatePublishToRelevant(publishToReleventProp);
		updateRevealPrice(revealPriceProp);
	}, [
		projectNameProp,
		ccColluguesProp,
		invitedEmailsProp,
		publishToReleventProp,
		revealPriceProp,
	]);
	useEffect(() => {
		if (modalType === "post") {
			GetSupplierAndContractorEmails(
				(success) => {
					let options = [];
					success.data.forEach((data, dataIndex) => {
						options.push({ name: data, value: dataIndex });
					});
					updateOptions(options);
				},
				(fail) => {
					console.log(fail);
				}
			);
		} else {
			getCCEmails(
				authorization.companyId,
				(success) => {
					let options = [];
					success.data.forEach((data, dataIndex) => {
						options.push({ name: data, value: dataIndex });
					});
					updateOptions(options);
				},
				(fail) => {
					console.log(fail);
				}
			);
		}
	}, [modalType, currentLanguageId, authorization]);

	function fuzzySearch(options) {
		const fuse = new Fuse(options, {
			keys: ["name", "groupName", "items.name"],
			threshold: 0.3,
		});

		return (value) => {
			if (!value.length) {
				return options;
			}

			return fuse.search(value);
		};
	}

	function onSelectChange(optionId, selectedOption) {
		let filteredOptions = options;

		filteredOptions = options.filter((option) => option.value !== optionId);

		updateOptions(filteredOptions);
		if (modalType === "post") {
			let invitedArr = invited;
			invitedArr.push(selectedOption);
			updateInvited(invitedArr);
		} else {
			let ccArr = ccCollugues;
			ccArr.push(selectedOption);
			updateCcCollugues(ccArr);
		}
	}
	function onRemoveSelected(e) {
		let optionsList = options;

		if (modalType === "post") {
			let invitedList = invited;

			let removedOption = invitedList.filter(
				(option) => option.name === e.target.id
			);
			if (removedOption[0].typed !== true) {
				optionsList.push(removedOption[0]);
				updateOptions(optionsList);
			}

			invitedList = invitedList.filter((option) => option.name !== e.target.id);

			updateInvited(invitedList);
		} else {
			let ccList = ccCollugues;

			let removedOption = ccList.filter(
				(option) => option.name === e.target.id
			);

			if (removedOption[0].typed !== true) {
				optionsList.push(removedOption[0]);
				updateOptions(optionsList);
			}
			ccList = ccList.filter((option) => option.name !== e.target.id);

			updateCcCollugues(ccList);
		}
	}
	function handleSubmit() {
		if (modalType === "post") {
			if (projectName.length > 0 && (publishToRelevent || invited.length > 0)) {
				const invitedEmails = [];
				const ccEmails = [];
				invited.forEach((email) => {
					invitedEmails.push(email.name);
				});
				ccCollugues.forEach((email) => {
					ccEmails.push(email.name);
				});

				let data = {
					isPublishToSuppliersNetwork: publishToRelevent,
					isRevealPricesToBidders: revealPrice,
					address: address,
					deadlineDate,
					deliveryDate,
					deliveryToId: deliveredTo,
					rfqDetails,
					invitedEmails: invitedEmails,
					cC_Colleagues: ccEmails,
					projectName,
				};
				if (id !== "new") {
					data = {
						...data,
						rfqHeaderId: id,
						isEdit: true,
						deletedRFQDetails: deletedRowsList,
					};
				}
				postRFQ(
					data,
					(success) => {
						console.log(success);
					},
					(fail) => {
						console.log(fail);
					}
				);
				setRedirect(true);
				// onCancel();
			} else {
				setAlert(true);
			}
		} else {
			onCancel();
		}
	}
	if (redirect) {
		return <Redirect to="/" />;
	}
	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-lg postRFQModal"
		>
			<div className="modal-container">
				<div>
					{alert && !publishToRelevent && invited.length === 0 && (
						<Alert variant={"danger"} className="ext-center">
							* {currentLocal.buyerHome.postRFQAlert}
						</Alert>
					)}
					{modalType === "post" && (
						<div className="my-2 d-flex projectNameContainer">
							<label className="primary-color mx-2">
								{currentLocal.buyerHome.projectName}{" "}
								{alert && projectName.length === 0 && (
									<span className="text-red">*</span>
								)}
							</label>
							<input
								type="text"
								className={
									alert && projectName.length === 0
										? "form-control alertSign"
										: "form-control"
								}
								value={projectName}
								onChange={(e) => changeProjectName(e.target.value)}
								disabled={id !== "new" ? true : false}
							/>
						</div>
					)}
					<div className="d-flex emailContainer">
						<label className="primary-color mx-2">
							{currentLocal.buyerHome.invitedByEmail}
						</label>

						<SelectSearch
							options={options}
							onChange={onSelectChange}
							filterOptions={fuzzySearch}
							closeOnSelect={true}
							name="emails"
							search={true}
							disabled={id !== "new" ? true : false}
							placeholder={currentLocal.buyerHome.selectSupplierEmail}
						/>
						<span
							className="cursorPointer"
							onClick={() => {
								if (id === "new") {
									toggleEmailModal(!isEmailModVisible);
								}
							}}
						>
							<img src={PlusCircle} alt="PlusCircle" className="mx-2" />
							<label className="primary-color cursorPointer">
								{currentLocal.buyerHome.addNewEmail}
							</label>
						</span>
					</div>

					<div className="capsulesContainer my-4 ">
						{modalType === "post"
							? invited.map((invitedOption, selectedIndex) => (
									<span className="orangeCapsule m-2 f-14" key={selectedIndex}>
										<span className="mx-2">{invitedOption.name}</span>
										<img
											id={invitedOption.name}
											src={WhiteCross}
											alt="WhiteCross"
											className="cursorPointer"
											onClick={onRemoveSelected}
										/>
									</span>
							  ))
							: ccCollugues.map((ccOptions, selectedIndex) => (
									<span className="orangeCapsule m-2 f-14" key={selectedIndex}>
										<span className="mx-2">{ccOptions.name}</span>
										<img
											id={ccOptions.name}
											src={WhiteCross}
											alt="WhiteCross"
											className="cursorPointer"
											onClick={onRemoveSelected}
										/>
									</span>
							  ))}
					</div>
				</div>
				<div className="checkbox-area">
					{modalType === "post" && (
						<div>
							<div className="d-flex my-1">
								<Checkbox
									onChange={(checkVal) => {
										updatePublishToRelevant(checkVal.target.checked);
									}}
									checked={publishToRelevent}
									disabled={id !== "new" ? true : false}
								/>
								<label className="mx-2 primary-color">
									{currentLocal.buyerHome.publishToNetwork}
								</label>
							</div>
							<div className="d-flex my-1">
								<Checkbox
									onChange={(checkVal) => {
										updateRevealPrice(checkVal.target.checked);
									}}
									checked={revealPrice}
									disabled={id !== "new" ? true : false}
								/>
								<label className="mx-2 primary-color">
									{currentLocal.buyerHome.revealPrices}
								</label>
							</div>
						</div>
					)}
					<button className="button-primary" onClick={handleSubmit}>
						{modalType === "post"
							? currentLocal.buyerHome.postRFQ
							: currentLocal.buyerHome.invite}
					</button>
				</div>
			</div>
			<AddEmailModal
				isModalVisible={isEmailModVisible}
				onCancel={() => toggleEmailModal(!isEmailModVisible)}
				getEmail={(email) => {
					if (modalType === "post") {
						let invitedOptions = invited;
						invitedOptions.push({ name: email, value: 0, typed: true });
						updateInvited(invitedOptions);
					} else {
						let ccOptions = ccCollugues;
						ccOptions.push({ name: email, value: 0, typed: true });
						updateCcCollugues(ccOptions);
					}
				}}
			/>
		</Modal>
	);
}

export default PostRFQModal;
