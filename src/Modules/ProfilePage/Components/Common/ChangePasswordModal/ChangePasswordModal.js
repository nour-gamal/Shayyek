import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import { Alert } from "react-bootstrap";
import { changePassword } from "../../../network";
import CloseIcon from "../../../../../Resources/Assets/closeIcon.svg";
import "./ChangePasswordModal.css";
function ChangePasswordModal({ isModalVisible, onCancel, getNewPassword }) {
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [showAlert, setshowAlert] = useState(false);
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const updatePassword = () => {
		if (oldPassword && newPassword && confirmNewPassword) {
			let data = {
				oldPassword,
				newPassword,
			};

			changePassword(
				data,
				(success) => {
					console.log(success);
					// if (success.status) {
					// 	getNewPassword(newPassword);
					// }
				},
				(fail) => {
					console.log(fail);
				}
			);
		} else {
			setshowAlert(true);
		}
	};
	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-sm changePasswordModal"
		>
			<img
				onClick={() => onCancel()}
				src={CloseIcon}
				className="closeModalIcon cursorPointer"
				alt="close-modal"
			/>
			<h3 className="f-16 primary-color">
				{currentLocal.profilePage.changePassword}
			</h3>
			{showAlert && (
				<Alert variant={"danger"} className="text-center">
					{currentLocal.profilePage.passworRepeated}
				</Alert>
			)}
			<div>
				<input
					type="password"
					className={`form-control ${oldPassword ? "alertSign" : ""}`}
					value={oldPassword}
					placeholder={currentLocal.profilePage.oldPassword}
					onChange={(e) => setOldPassword(e.target.value)}
				/>
				<small className={`form-control ${oldPassword ? "red-text" : ""}`}>
					{}
				</small>
			</div>
			<input
				type="password"
				className={`form-control ${newPassword ? "alertSign" : ""}`}
				placeholder={currentLocal.profilePage.newPassword}
				value={newPassword}
				onChange={(e) => setNewPassword(e.target.value)}
			/>
			<input
				type="password"
				className={`form-control ${confirmNewPassword ? "alertSign" : ""}`}
				placeholder={currentLocal.registration.confirmPassword}
				value={confirmNewPassword}
				onChange={(e) => setConfirmNewPassword(e.target.value)}
			/>
			<div className="text-center button-container">
				<button className="button-primary" onClick={updatePassword}>
					{currentLocal.buyerHome.confirm}
				</button>
			</div>
		</Modal>
	);
}

export default ChangePasswordModal;
