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
			Rating Modals
		</Modal>
	);
}

export default RatingModal;
