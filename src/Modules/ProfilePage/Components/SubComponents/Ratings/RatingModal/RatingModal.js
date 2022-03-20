import { Modal } from "antd";
import { useSelector } from "react-redux";
import "./RatingModal.css";
function RatingModal({ onCancel, isModalVisible }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);

	return (
		<Modal
			title="Basic Modal"
			visible={true}
			onCancel={onCancel}
			className="modal-lg ChooseCompaniesToRateModal"
		>
			<h4>{currentLocal.profile.didYouWorkWith} </h4>
		</Modal>
	);
}

export default RatingModal;
