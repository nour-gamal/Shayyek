import React, { useState } from "react";
import { Modal } from "antd";
import SelectSearch from "react-select-search";
import { useSelector } from "react-redux";
import Fuse from "fuse.js";
import PlusCircle from "../../../../../Resources/Assets/plusCircle.svg";
import WhiteCross from "../../../../../Resources/Assets/whiteCross.svg";
import "./PostRFQModal.css";

function PostRFQModal({ isModalVisible, onCancel }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [selectedOptions, updateSelectedOptions] = useState([]);
	const [options, updateOptions] = useState([
		{ name: "Swedish", value: "sv" },
		{ name: "English", value: "en" },
		{ name: "French", value: "fr" },
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

	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-lg postRFQModal"
		>
			<div className="d-flex align-items-center">
				<label>{currentLocal.buyerHome.invitedByEmail}</label>
				<SelectSearch
					options={options}
					onChange={(optionId, selectedOption) => {
						let filteredOptions = options;
						let optionSelected = selectedOptions;

						filteredOptions = options.filter(
							(option) => option.value !== optionId
						);

						updateOptions(filteredOptions);

						optionSelected.push(selectedOption);
						updateSelectedOptions(optionSelected);
					}}
					filterOptions={fuzzySearch}
					closeOnSelect={true}
					autoComplete={true}
					name="language"
					search={true}
					placeholder={currentLocal.buyerHome.selectSupplierEmail}
				/>
				<img src={PlusCircle} alt="PlusCircle" className="mx-2" />
				<label>{currentLocal.buyerHome.addNewEmail}</label>
			</div>

			<div className="capsulesContainer my-4 ">
				{selectedOptions.map((selectedOption) => (
					<span className="orangeCapsule">
						<span className="mx-2">{selectedOption.name}</span>
						<img src={WhiteCross} alt="WhiteCross" />
					</span>
				))}
			</div>
		</Modal>
	);
}

export default PostRFQModal;
