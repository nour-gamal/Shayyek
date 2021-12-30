import { Modal } from "antd";
import "./SingleRFQModal.css";
function SingleRFQModal({ isModalVisible, onCancel }) {
	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-lg"
		>
			SingleRFQModal
		</Modal>
	);
}

export default SingleRFQModal;
