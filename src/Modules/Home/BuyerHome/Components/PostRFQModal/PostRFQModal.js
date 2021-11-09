import React from "react";
import { Modal } from "antd";
import "./PostRFQModal.css";

function PostRFQModal({ isModalVisible, onCancel }) {
	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-lg"
		>
			<label>Invited by email</label>
		</Modal>
	);
}

export default PostRFQModal;
