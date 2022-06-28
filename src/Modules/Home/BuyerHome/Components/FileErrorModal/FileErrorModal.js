import React from "react";
import { Modal } from "antd";
import errorFile from "../../../../../Resources/Assets/errorFile.svg";
import { useSelector } from "react-redux";
import "./FileErrorModal.css";

function FileErrorModal({ isModalVisible, onCancel }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);

	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible.state}
			onCancel={onCancel}
			className="modal-sm fileErrorModal"
		>
			<img src={errorFile} alt="errorFile" />
			<div className="text-center my-4">
				<div className="my-4">{currentLocal.buyerHome.fileError}{isModalVisible.message}</div>
				<button
					className="button-primary "
					onClick={() => {
						onCancel();
					}}
				>
					{currentLocal.buyerHome.ok}
				</button>
			</div>
		</Modal>
	);
}

export default FileErrorModal;
