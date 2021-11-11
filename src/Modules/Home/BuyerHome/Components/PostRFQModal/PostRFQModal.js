import React, { useState, useEffect } from "react";
import { Modal, Checkbox } from "antd";
import SelectSearch from "react-select-search";
import { useSelector } from "react-redux";
import Fuse from "fuse.js";
import { getCCEmails, getShayeekEmails } from "../../../network";
import PlusCircle from "../../../../../Resources/Assets/plusCircle.svg";
import WhiteCross from "../../../../../Resources/Assets/whiteCross.svg";
import "./PostRFQModal.css";

function PostRFQModal({ isModalVisible, onCancel, modalType }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { authorization } = useSelector((state) => state.authorization);
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	const [selectedOptions, updateSelectedOptions] = useState([]);
	const [publishToRelevent, updatePublishToRelevant] = useState(false);
	const [revealPrice, updateRevealPrice] = useState(false);
	const [options, updateOptions] = useState([]);

	const [ccCollugues, updateCcCollugues] = useState([]);
	console.log(ccCollugues);
	useEffect(() => {
		if (modalType === "post") {
			getShayeekEmails(
				(success) => {
					console.log(success);
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
					console.log(options);
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
		let optionSelected = selectedOptions;

		filteredOptions = options.filter((option) => option.value !== optionId);

		updateOptions(filteredOptions);

		optionSelected.push(selectedOption);
		updateSelectedOptions(optionSelected);
	}
	function onRemoveSelected(e) {
		let optionSelected = selectedOptions;
		let filteredOptions = options;

		let removedOption = optionSelected.filter(
			(option) => option.value === e.target.id
		);
		optionSelected = optionSelected.filter(
			(option) => option.value !== e.target.id
		);

		filteredOptions.push(removedOption[0]);
		updateOptions(filteredOptions);

		updateSelectedOptions(optionSelected);
	}
	function handleSubmit() {
		if (modalType === "post") {
		} else {
			updateCcCollugues(selectedOptions);
			updateSelectedOptions([]);
			onCancel();
		}
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
						<span className="cursorPointer">
							<img src={PlusCircle} alt="PlusCircle" className="mx-2" />
							<label className="primary-color ">
								{currentLocal.buyerHome.addNewEmail}
							</label>
						</span>
					</div>

					<div className="capsulesContainer my-4 ">
						{selectedOptions.map((selectedOption, selectedIndex) => (
							<span className="orangeCapsule m-2 f-14" key={selectedIndex}>
								<span className="mx-2">{selectedOption.name}</span>
								<img
									id={selectedOption.value}
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
		</Modal>
	);
}

export default PostRFQModal;
