import React from "react";
import { Modal } from "antd";
import { useSelector } from "react-redux";
import deleteIcon from "../../../../../Resources/Assets/delete_large.png";
import "./DeleteModal.css";
function DeleteModal({ isModalVisible, onCancel, onDeleteRow }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-sm deleteRFQRowModal text-center"
		>
			<img src={deleteIcon} alt="deleteIcon" />
			<div className="primary-color my-4">
				{currentLocal.buyerHome.confirmDeleteRow}
			</div>
			<div className="d-flex justify-content-center buttonContainer">
				<button className="button-secondary primary-color" onClick={onCancel}>
					{currentLocal.buyerHome.cancel}
				</button>
				<button className="button-primary" onClick={onDeleteRow}>
					{currentLocal.buyerHome.delete}
				</button>
			</div>
		</Modal>
	);
}

export default DeleteModal;
