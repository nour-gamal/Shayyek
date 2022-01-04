import React from "react";
import { Modal } from "antd";
import "./ChangePasswordModal.css";
function ChangePasswordModal({ isModalVisible, onCancel }) {
	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-sm changePasswordModal"
		>
			ChangePasswordModal
		</Modal>
	);
}

export default ChangePasswordModal;
