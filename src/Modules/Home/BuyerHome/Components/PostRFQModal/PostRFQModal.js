import React, { useState } from "react";
import { Modal } from "antd";
import SelectSearch from "react-select-search";
import { useSelector } from "react-redux";
import PlusCircle from "../../../../../Resources/Assets/plusCircle.svg";
import WhiteCross from "../../../../../Resources/Assets/whiteCross.svg";
import "./PostRFQModal.css";

function PostRFQModal({ isModalVisible, onCancel }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [searchValue, updateSearchValue] = useState("");

	const options = [
		{ name: "Swedish", value: "sv" },
		{ name: "English", value: "en" },
		{ name: "French", value: "fr" },
	];

	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-lg postRFQModal text-center"
		>
			<div className="d-flex align-items-center">
				<label>{currentLocal.buyerHome.invitedByEmail}</label>
				<SelectSearch
					options={options}
					value={searchValue}
					onChange={(optionId, selectedOption) => {
						updateSearchValue(optionId);
					}}
					// filterOptions={(e) => {
					// 	console.log(e);
					// }}
					closeOnSelect={true}
					autoComplete={true}
					name="language"
					search={true}
					placeholder={currentLocal.buyerHome.selectSupplierEmail}
				/>
				<img src={PlusCircle} alt="PlusCircle" className="mx-2" />
				<label>{currentLocal.buyerHome.addNewEmail}</label>
			</div>

			<div className="capsulesContainer my-4">
				<span className="orangeCapsule">
					<span className="mx-2">hello</span>
					<img src={WhiteCross} alt="WhiteCross" />
				</span>
			</div>
		</Modal>
	);
}

export default PostRFQModal;
