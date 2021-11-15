import React, { useState, useEffect } from "react";
import { Modal, Checkbox } from "antd";
import SelectSearch from "react-select-search";
import { useSelector } from "react-redux";
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
}) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { authorization } = useSelector((state) => state.authorization);
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	const [invited, updateInvited] = useState([]);
	const [publishToRelevent, updatePublishToRelevant] = useState(false);
	const [revealPrice, updateRevealPrice] = useState(false);
	const [options, updateOptions] = useState([]);
	const [ccCollugues, updateCcCollugues] = useState([]);
	const [isEmailModVisible, toggleEmailModal] = useState(false);
	useEffect(() => {
		if (modalType === "post") {
			GetSupplierAndContractorEmails(
				(success) => {
					let options = [];
					success.data.forEach((data) => {
						options.push({ name: data.name, value: data.id });
					});
					updateOptions(options);
				},
				(fail) => {
					console.log(fail);
				}
			);
		} else {
			getCCEmails(
				currentLanguageId,
				authorization.companyId,
				(success) => {
					let options = [];
					success.data.forEach((data) => {
						options.push({ name: data.name, value: data.id });
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
				(option) => option.name !== e.target.id
			);
			if (removedOption.typed === false) {
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
			if (removedOption.typed === false) {
				optionsList.push(removedOption[0]);
				updateOptions(optionsList);
			}
			ccList = ccList.filter((option) => option.name !== e.target.id);

			updateCcCollugues(ccList);
		}
	}
	function handleSubmit() {
		if (modalType === "post") {
			const invitedEmails = [];
			const ccEmails = [];
			invited.forEach((email) => {
				invitedEmails.push(email.name);
			});
			ccCollugues.forEach((email) => {
				ccEmails.push(email.name);
			});
			const data = {
				isPublishToSuppliersNetwork: publishToRelevent,
				isRevealPricesToBidders: true,
				address: revealPrice,
				deadlineDate,
				deliveryDate,
				deliveryToId: deliveredTo,
				rfqDetails: [
					{
						itemProductName: rfqDetails.item,
						description: rfqDetails.description,
						quantity: rfqDetails.quantity,
						unit: rfqDetails.unit,
						preferredBrands: rfqDetails.preferredBrands,
						isInstallSupplierAndContructor: rfqDetails.includeInstallation,
						notes: rfqDetails.notes,
						categoryId: rfqDetails.categories,
					},
				],
				invitedEmails: invitedEmails,
				ccCollugues: ccEmails,
			};

			postRFQ(
				data,
				(success) => {
					console.log(success);
				},
				(fail) => {
					console.log(fail);
				}
			);
		}
		onCancel();
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
					{modalType === "post" && (
						<div className="my-2 d-flex projectNameContainer">
							<label className="primary-color mx-2">
								{currentLocal.buyerHome.projectName}
							</label>
							<input type="text" className="form-control" />
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
							placeholder={currentLocal.buyerHome.selectSupplierEmail}
						/>
						<span
							className="cursorPointer"
							onClick={() => {
								toggleEmailModal(!isEmailModVisible);
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
