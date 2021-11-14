import React, { useState } from "react";
import { Modal } from "antd";
import closeIcon from "../../../../../Resources/Assets/closeIcon.svg";
import validator from "validator";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import "./AddEmailModal.css";
function AddEmailModal({ isModalVisible, onCancel, getEmail }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [email, setEmail] = useState("");
	const [alert, updateAlert] = useState(false);
	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-sm addEmail"
		>
			<img
				src={closeIcon}
				alt="close"
				className="close cursorPointer"
				onClick={() => {
					onCancel();
				}}
			/>

			<div className="content">
				<div>
					<h6 className="f-16 primary-color">
						{currentLocal.buyerHome.addNewEmail}
					</h6>
					{alert && (
						<Alert variant={"danger"} className="text-center">
							{currentLocal.buyerHome.addValidEmail}
						</Alert>
					)}

					<input
						type="text"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						placeholder="Type Email"
						className={alert ? "form-control alertSign" : "form-control"}
					/>
				</div>
				<button
					className="button-primary"
					onClick={() => {
						if (validator.isEmail(email)) {
							getEmail(email);
							onCancel();
							setEmail("");
							updateAlert(false);
						} else {
							updateAlert(true);
						}
					}}
				>
					{currentLocal.buyerHome.addEmail}
				</button>
			</div>
		</Modal>
	);
}

export default AddEmailModal;
