import React from "react";
import { Modal } from "antd";
import packageFile from "../../../../../Resources/Assets/package.svg";
import { useSelector } from "react-redux";
import "./PostRFQSuccessModal.css";

function PostRFQSuccessModal({ isModalVisible, onCancel }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);

	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-sm postRFQSuccessModal"
		>
			<img src={packageFile} alt="errorFile" />
			<div className="text-center my-4">
				<div className="my-4">{currentLocal.buyerHome.fileError}</div>
				<button
					className="button-secondary"
					onClick={() => {
						onCancel();
					}}
				>
					{currentLocal.buyerHome.cancel}
				</button>
				<button
					className="button-primary "
					onClick={() => {
						onCancel();
					}}
				>
					{currentLocal.buyerHome.addPackage}
				</button>
			</div>
		</Modal>
	);
}

export default PostRFQSuccessModal;
