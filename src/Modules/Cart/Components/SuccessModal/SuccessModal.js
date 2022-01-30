import { Modal } from "antd";
import { useSelector } from "react-redux";
import sent from "../../../../Resources/Assets/sent.svg";
import "./SuccessModal.css";
function SuccessModal({ isModalVisible, onCancel }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-lg successModal"
		>
			<div className="d-flex justify-content-center align-items-center">
				<img src={sent} alt="sent" className="my-4" />
				<div className="my-4">{currentLocal.suppliers.willGetInTouch}</div>
			</div>
		</Modal>
	);
}

export default SuccessModal;
