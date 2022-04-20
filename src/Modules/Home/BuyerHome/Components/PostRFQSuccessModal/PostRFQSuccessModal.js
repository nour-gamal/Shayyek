import React, { useState } from "react";
import { Modal } from "antd";
import packageFile from "../../../../../Resources/Assets/package.svg";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addRFQDetails } from "../../../../../Redux/RFQ";
import "./PostRFQSuccessModal.css";

function PostRFQSuccessModal({
	isModalVisible,
	onCancel,
	alreadyHasPackage,
	addNewPackage,
}) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [redirectTo, updateRedirectTo] = useState(null);
	const dispatch = useDispatch();
	const handleSubmit = () => {
		if (alreadyHasPackage) {
			onCancel();
			updateRedirectTo({
				pathname: "/createrfq",
				addAnotherPackage: true,
			});
			window.location.reload();
		} else {
			clearRFQStore();
			updateRedirectTo("/");
		}
	};
	const clearRFQStore = () => {
		dispatch(addRFQDetails({}));
	};
	if (redirectTo) return <Redirect to={redirectTo} />;
	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-sm postRFQSuccessModal"
		>
			<img src={packageFile} alt="errorFile" />
			<div className="text-center my-4">
				<div className="my-4">
					<div>{currentLocal.buyerHome.postedSuccess}</div>
					{alreadyHasPackage && (
						<div>{currentLocal.buyerHome.addAnotherPackage}</div>
					)}
				</div>

				<button
					className="button-secondary flat m-2"
					onClick={() => {
						updateRedirectTo("/");
						clearRFQStore();
						onCancel();
					}}
				>
					{currentLocal.buyerHome.cancel}
				</button>
				<button className="button-primary flat m-2" onClick={handleSubmit}>
					{alreadyHasPackage
						? currentLocal.buyerHome.addPackage
						: currentLocal.buyerHome.done}
				</button>
			</div>
		</Modal>
	);
}

export default PostRFQSuccessModal;
