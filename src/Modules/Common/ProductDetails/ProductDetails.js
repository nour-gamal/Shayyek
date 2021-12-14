import React, { useState } from "react";
import { Row, Col } from "antd";
import { baseUrl } from "../../../Services";
import { Modal } from "antd";
import positive from "../../../Resources/Assets/postive.svg";
import negative from "../../../Resources/Assets/negative.svg";
import { useSelector } from "react-redux";
import "./ProductDetails.css";
function ProductDetails({ isModalVisible, onCancel, product, parent }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [quantityCount, updateQuantityCount] = useState(0);
	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-lg productDetails"
		>
			<Row>
				<Col xs={24} sm={6}>
					<img
						src={baseUrl + product.image}
						alt="productImg"
						className="productImg"
					/>
				</Col>
				<Col xs={6} sm={18}>
					<div>
						<div className="productName my-2">{product.name}</div>
						<div className="d-flex justify-content-between">
							<div className="d-flex align-items-center my-2">
								{product.companyLogo ? (
									<img
										src={baseUrl + product.companyLogo}
										alt="companyLogo"
										className="companyLogo"
									/>
								) : (
									<img
										src={"https://place-hold.it/300x300"}
										alt="companyLogo"
										className="companyLogo"
									/>
								)}
								<div className="mx-2">{product.companyName}</div>
							</div>
							<div className="d-flex align-items-center">
								<div className="priceLabel mx-2">
									{currentLocal.supplierHome.price}:
								</div>
								<div className="price">{product.price} LE</div>
							</div>
						</div>
						<div className="specs my-2">{product.specs}</div>
						<div className="my-2">
							<label>
								{parent === "supplierHome"
									? currentLocal.supplierHome.sizes
									: currentLocal.supplierHome.chooseSize}
							</label>
							<div className="capsulesContainer">
								{product.sizes.map((size, index) => (
									<div className="capsules" key={index}>
										{size.name}
									</div>
								))}
							</div>
						</div>
						<div className="my-2">
							<label>
								{parent === "supplierHome"
									? currentLocal.supplierHome.models
									: currentLocal.supplierHome.chooseModel}
							</label>
							<div className="capsulesContainer">
								{product.models.map((model, index) => (
									<div className="capsules" key={index}>
										{model.name}
									</div>
								))}
							</div>
						</div>

						<label>{currentLocal.supplierHome.quantity}</label>
						<div className="d-flex px-2 justify-content-between inputField avQty align-items-center">
							<div className="d-flex align-items-center">
								{parent !== "supplierHome" && (
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
								)}
								<div className="quantityCount mx-2">{quantityCount}</div>
								{parent !== "supplierHome" && (
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
								)}
							</div>
						</div>
					</div>
					<button className="button-primary">
						{parent === "supplierHome"
							? currentLocal.supplierHome.edit
							: currentLocal.supplierHome.addToCart}
					</button>
				</Col>
			</Row>
		</Modal>
	);
}

export default ProductDetails;
