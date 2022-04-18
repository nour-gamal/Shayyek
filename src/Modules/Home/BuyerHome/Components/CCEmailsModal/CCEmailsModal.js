import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import SelectSearch from "react-select-search";
import { useSelector } from "react-redux";
import AddEmailModal from "../AddEmailModal/AddEmailModal";
import Fuse from "fuse.js";
import { getCCEmailsList } from "../../../network";
//import PlusCircle from "../../../../../Resources/Assets/plusCircle.svg";
import WhiteCross from "../../../../../Resources/Assets/whiteCross.svg";
import "./CCEmailsModal.css";

function CCEmailsModal({ isModalVisible, onCancel, getCCEmails, ccEmails }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { authorization } = useSelector((state) => state.authorization);
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	const [options, updateOptions] = useState([]);
	const [ccCollugues, updateCcCollugues] = useState([]);
	const [isEmailModVisible, toggleEmailModal] = useState(false);
	useEffect(() => {
		updateCcCollugues(ccEmails);
	}, [ccEmails]);

	useEffect(() => {
		getCCEmailsList(
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
		// eslint-disable-next-line
	}, [currentLanguageId, authorization]);

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
		let ccArr = ccCollugues;
		ccArr.push(selectedOption);
		updateCcCollugues(ccArr);
	}
	function onRemoveSelected(e) {
		let optionsList = options;

		let ccList = ccCollugues;

		let removedOption = ccList.filter((option) => option.name === e.target.id);

		if (removedOption[0].typed !== true) {
			optionsList.push(removedOption[0]);
			updateOptions(optionsList);
		}
		ccList = ccList.filter((option) => option.name !== e.target.id);

		updateCcCollugues(ccList);
	}
	function handleSubmit() {
		getCCEmails(ccCollugues);
		onCancel();
	}

	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-lg ccModal"
		>
			<div>
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
					{/* <span
						className="cursorPointer"
						onClick={() => {
							toggleEmailModal(!isEmailModVisible);
						}}
					>
						<img src={PlusCircle} alt="PlusCircle" className="mx-2" />
						<label className="primary-color cursorPointer">
							{currentLocal.buyerHome.addNewEmail}
						</label>
					</span> */}
				</div>

				<div className="capsulesContainer my-4 ">
					{ccCollugues.map((ccOptions, selectedIndex) => {
						return (
							<span className="orangeCapsule m-2 f-14" key={selectedIndex}>
								<span className="mx-2">
									{ccOptions.name ? ccOptions.name : ccOptions}
								</span>
								<img
									id={ccOptions.name ? ccOptions.name : ccOptions}
									src={WhiteCross}
									alt="WhiteCross"
									className="cursorPointer"
									onClick={onRemoveSelected}
								/>
							</span>
						);
					})}
				</div>
			</div>
			<div className="checkbox-area">
				<button className="button-primary" onClick={handleSubmit}>
					{currentLocal.buyerHome.invite}
				</button>
			</div>
			<AddEmailModal
				isModalVisible={isEmailModVisible}
				onCancel={() => toggleEmailModal(!isEmailModVisible)}
				getEmail={(email) => {
					let ccOptions = ccCollugues;
					ccOptions.push({ name: email, value: 0, typed: true });
					updateCcCollugues(ccOptions);
				}}
			/>
		</Modal>
	);
}

export default CCEmailsModal;
