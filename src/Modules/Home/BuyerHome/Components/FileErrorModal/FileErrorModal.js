import React from "react";
import { Modal } from "antd";
import "./FileErrorModal.css";
function FileErrorModal({ isModalVisible, onCancel }) {
	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-sm fileErrorModal"
		>
			fileErrorModal
		</Modal>
	);
}

export default FileErrorModal;
