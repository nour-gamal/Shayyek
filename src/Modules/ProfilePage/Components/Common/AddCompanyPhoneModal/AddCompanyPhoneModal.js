import React from "react";
import { Modal } from "antd";
import "./AddCompanyPhoneModal.css";
function AddCompanyPhoneModal({ isModalVisible, onCancel }) {
	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-sm addCompanyPhoneModal"
		>
			AddCompanyPhoneModal
		</Modal>
	);
}

export default AddCompanyPhoneModal;
