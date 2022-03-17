import { useState } from "react";
import { Modal } from "antd";
import "./RatingModal.css";
function RatingModal({ onCancel, isModalVisible }) {
	return (
		<Modal
			title="Basic Modal"
			visible={true}
			onCancel={onCancel}
			className="modal-lg ChooseCompaniesToRateModal"
		>
			Rating Modal
		</Modal>
	);
}

export default RatingModal;
