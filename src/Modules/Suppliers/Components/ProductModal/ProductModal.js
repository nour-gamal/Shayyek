import React from "react";
import { Modal, Row, Col } from "antd";
import { baseUrl } from "../../../../Services";
import { useSelector } from "react-redux";
import "./ProductModal.css";
function ProductModal({ isModalVisible, onCancel, product }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);

	console.log(product);
	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-lg productModal"
		>
			<Row className="height-100">
				<Col md={8}>
					<img
						src={baseUrl + product.image}
						alt="productImage"
						className="productImage"
					/>
				</Col>
				<Col md={16} className="d-flex justify-content-between flex-column">
					<div>test</div>
					<div>
						<button className="button-primary">
							{currentLocal.supplierHome.addToCart}
						</button>
					</div>
				</Col>
			</Row>
		</Modal>
	);
}

export default ProductModal;
