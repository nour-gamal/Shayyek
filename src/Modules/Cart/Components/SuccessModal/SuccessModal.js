import { Modal } from "antd";
import { useSelector } from "react-redux";
import sent from "../../../../Resources/Assets/sent.svg";
import "./SuccessModal.css";
function SuccessModal({ isModalVisible, onCancel }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { authorization } = useSelector((state) => state.authorization);
	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-lg successModal"
		>
			<div className="d-flex justify-content-between align-items-center width-100 flex-column">
				<div className="text-center">
					<img src={sent} alt="sent" className="my-4" />
					<div className="my-4 f-27 text-center">
						{currentLocal.suppliers.willGetInTouch}
					</div>
					<div className="info text-center">
						<div>
							{currentLocal.home.mobile}: {authorization.mobile}
						</div>
						<div>
							{currentLocal.login.email}: {authorization.email}
						</div>
					</div>
				</div>
				<button className="button-primary flat mt-4 mb-2" onClick={onCancel}>
					{currentLocal.supplierHome.ok}
				</button>
			</div>
		</Modal>
	);
}

export default SuccessModal;
