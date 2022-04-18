import { useState } from "react";
import { Input, Modal } from "antd";
import { useSelector } from "react-redux";
import "./AddPackage.css";

function AddPackage({ isModalVisible, onCancel, getPackageName }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [packageName, updatePackageName] = useState("");
	const [isMobile, updateIsMobile] = useState(false);
	const mq = window.matchMedia("(min-width: 768px)");

	window.addEventListener("resize", () => {
		updateIsMobile(!mq.matches);
	});

	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-sm addPackageModal pt-4"
		>
			<div className="f-14  my-4">{currentLocal.buyerHome.addPackageName}</div>
			<div className="text-center">
				<Input
					type="text"
					className="packageNameField my-4"
					value={packageName}
					onChange={(e) => {
						updatePackageName(e.target.value);
					}}
					placeholder={currentLocal.buyerHome.typePackageName}
				/>
			</div>

			<div className="d-flex button-container justify-content-center mt-4">
				<button
					className={
						isMobile ? "button-secondary mx-1" : "button-secondary flat mx-1"
					}
					onClick={() => {
						onCancel();
					}}
				>
					{currentLocal.buyerHome.cancel}
				</button>
				<button
					className={
						isMobile ? "button-primary mx-1" : "button-primary flat mx-1"
					}
					onClick={() => {
						getPackageName(packageName);
						onCancel();
					}}
				>
					{currentLocal.buyerHome.submit}
				</button>
			</div>
		</Modal>
	);
}

export default AddPackage;
