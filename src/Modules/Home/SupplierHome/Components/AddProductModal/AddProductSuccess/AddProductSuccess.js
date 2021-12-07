import React from "react";
import { useSelector } from "react-redux";
import sent from "../../../../../../Resources/Assets/sent.svg";
import "./AddProductSuccess.css";
function AddProductSuccess({ onCancel }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	return (
		<div className="addProductSuccess d-flex justify-content-evenly">
			<div>
				<div className="d-flex justify-content-center">
					<img src={sent} alt="sent" />
				</div>
				<h4 className="text-center title">
					{currentLocal.supplierHome.addProductSuccess}
				</h4>
			</div>

			<div className="text-center">
				<button className="button-primary" onClick={onCancel}>
					{currentLocal.supplierHome.ok}
				</button>
			</div>
		</div>
	);
}

export default AddProductSuccess;
