import React from "react";
import { Modal } from "antd";
import "./ProductDetails.css";
function ProductDetails({ isModalVisible, onCancel }) {
	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-lg productDetails"
		>
			test
		</Modal>
	);
}

export default ProductDetails;
