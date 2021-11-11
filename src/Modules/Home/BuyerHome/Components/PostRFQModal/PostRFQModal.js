import React, { useState } from "react";
import { Modal, Checkbox } from "antd";
import SelectSearch from "react-select-search";
import { useSelector } from "react-redux";
import Fuse from "fuse.js";
import PlusCircle from "../../../../../Resources/Assets/plusCircle.svg";
import WhiteCross from "../../../../../Resources/Assets/whiteCross.svg";
import "./PostRFQModal.css";

function PostRFQModal({ isModalVisible, onCancel }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [selectedOptions, updateSelectedOptions] = useState([]);
	const [publishToRelevent, updatePublishToRelevant] = useState(false);
	const [revealPrice, updateRevealPrice] = useState(false);
	const [options, updateOptions] = useState([
		{ name: "Swedish", value: "sv" },
		{ name: "English", value: "en" },
		{ name: "French", value: "fr2" },
		{ name: "French", value: "fr3" },
		{ name: "French", value: "f4r" },
		{ name: "French", value: "f5r" },
		{ name: "French", value: "fr6" },
		{ name: "French", value: "f2r" },
	]);

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
	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-lg postRFQModal"
		>
			<div className="modal-container">
				<div>
					<div className="d-flex ">
						<label className="primary-color">
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
					<div>
						<div className="d-flex">
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
						<div className="d-flex">
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
					<button className="button-primary">
						{currentLocal.buyerHome.postRFQ}
					</button>
				</div>
			</div>
		</Modal>
	);
}

export default PostRFQModal;
