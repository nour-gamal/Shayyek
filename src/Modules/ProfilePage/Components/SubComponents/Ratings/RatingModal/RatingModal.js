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
			className="modal-lg ratingModal"
		>
			<h4>{currentLocal.profilePage.didYouWorkWith} {currentLocal.profilePage.rateIt}?</h4>
		</Modal>
	);
}

export default RatingModal;
