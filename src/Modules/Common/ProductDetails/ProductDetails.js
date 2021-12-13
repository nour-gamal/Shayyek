import React, { useState } from "react";
import { Row, Col } from "antd";
import { baseUrl } from "../../../Services";
import { Modal } from "antd";
import positive from "../../../Resources/Assets/postive.svg";
import negative from "../../../Resources/Assets/negative.svg";
import { useSelector } from "react-redux";
import "./ProductDetails.css";
function ProductDetails({ isModalVisible, onCancel, product }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [quantityCount, updateQuantityCount] = useState(0);
	console.log(product);
	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-lg productDetails"
		>
			<Row>
				<Col xs={24} md={6}>
					<img
						src={baseUrl + product.image}
						alt="productImg"
						className="productImg"
					/>
				</Col>
				<Col xs={6} md={18}>
					<div>{product.name}</div>
					<div className="d-flex">
						<img
							src={baseUrl + product.companyLogo}
							alt="companyLogo"
							className="companyLogo"
						/>
						<div>{product.storeName}</div>
						<div className="priceLabel">Price</div>
						<div>{product.price} LE</div>
					</div>
					<div className="specs">{product.specs}</div>
					<div>
						<label>{currentLocal.supplierHome.chooseSize}</label>
						<div className="capsulesContainer">
							<div className="capsules">dddd</div>
						</div>
					</div>
					<div>
						<label>{currentLocal.supplierHome.chooseModel}</label>
						<div className="capsulesContainer">
							<div className="capsules">dddd</div>
						</div>
					</div>
					<div className="d-flex px-2 justify-content-between inputField avQty align-items-center">
						<div className="label">{currentLocal.supplierHome.quantity}</div>
						<div className="d-flex align-items-center">
							<div>
								<img
									src={negative}
									alt="negative"
									onClick={() => {
										if (quantityCount !== 0) {
											updateQuantityCount(quantityCount - 1);
										}
									}}
									className="cursorPointer"
								/>
							</div>
							<div className="quantityCount mx-2">{quantityCount}</div>
							<div>
								<img
									src={positive}
									alt="positive"
									onClick={() => {
										updateQuantityCount(quantityCount + 1);
									}}
									className="cursorPointer"
								/>
							</div>
						</div>
					</div>
					<button className="button-primary">
						{currentLocal.supplierHome.addToCart}
					</button>
				</Col>
			</Row>
		</Modal>
	);
}

export default ProductDetails;
