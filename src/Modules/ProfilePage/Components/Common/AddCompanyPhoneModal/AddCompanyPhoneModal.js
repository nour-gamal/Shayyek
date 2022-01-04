import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import CloseIcon from "../../../../../Resources/Assets/closeIcon.svg";
import "./AddCompanyPhoneModal.css";

function AddCompanyPhoneModal({ isModalVisible, onCancel }) {
	const [newPhone, setNewPhone] = useState("");
	const [newPhoneError, setNewPhoneError] = useState(false);
	const { currentLocal } = useSelector((state) => state.currentLocal);
	function addPhone() {
		if (newPhone) {
		} else {
			setNewPhoneError(true);
		}
	}
	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-sm addPhoneModal"
		>
			<img
				onClick={() => onCancel()}
				src={CloseIcon}
				className="closeModalIcon cursorPointer"
				alt="close-modal"
			/>
			<h3 className="f-16 primary-color">
				{currentLocal.profilePage.changePhoneNumber}
			</h3>

			<input
				type="text"
				className={`form-control ${
					newPhoneError && !newPhone ? "alertSign" : ""
				}`}
				value={newPhone}
				placeholder={currentLocal.profilePage.addPhoneNumber}
				onChange={(e) => setNewPhone(e.target.value)}
			/>
			<small className={newPhoneError && !newPhone ? "text-red" : "d-none"}>
				{currentLocal.registration.pleaseFillmobileNumber}
			</small>
			<div className="text-center button-container">
				<button className="button-primary" onClick={addPhone}>
					{currentLocal.profilePage.add}
				</button>
			</div>
		</Modal>
	);
}

export default AddCompanyPhoneModal;
