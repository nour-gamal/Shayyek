import React from "react";
import { useSelector } from "react-redux";
import { Modal } from "antd";
function ChooseCompaniesToRateModal({ isModalVisible, onCancel }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);

	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-lg ChooseCompaniesToRateModal"
		>
			<div className="d-flex flex-column justify-content-between">
				<div className="d-flex flex-1 flex-column">
					<div className="d-flex justify-content-between">
						<div className="orderNumber">
							{currentLocal.profilePage.orderNumber}:
						</div>
						<div>{currentLocal.profilePage.orderDate}:</div>
					</div>
					<h6>{currentLocal.profilePage.companiesInOrder}</h6>
				</div>
				<button>{currentLocal.profilePage.rateCompany}</button>
			</div>
		</Modal>
	);
}

export default ChooseCompaniesToRateModal;
