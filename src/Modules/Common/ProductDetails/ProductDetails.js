import React, { useState } from "react";
import { Row, Col } from "antd";
import { baseUrl } from "../../../Services";
import { Modal } from "antd";
import defaultCompImg from "../../../Resources/Assets/defaultCompImg.png";
import positive from "../../../Resources/Assets/postive.svg";
import negative from "../../../Resources/Assets/negative.svg";
import { useSelector } from "react-redux";
import "./ProductDetails.css";
function ProductDetails({
	isModalVisible,
	onCancel,
	product,
	parent,
	toggleProductModal,
}) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [quantityCount, updateQuantityCount] = useState(0);

	const handleEdit = () => {
		onCancel();
		toggleProductModal();
	};
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
				<Col
					xs={24}
					sm={18}
					className="d-flex justify-content-between flex-column"
				>
					<div>
						<div className="productName my-2">{product.name}</div>
						<div className="d-flex justify-content-between companyInfoContainer">
							<div className="d-flex align-items-center my-2">
								<div>
									<img
										src={
											product.companyLogo
												? baseUrl + product.companyLogo
												: defaultCompImg
										}
										alt="companyLogo"
										className="companyLogo"
									/>
								</div>
								<div className="mx-2 companyName">{product.companyName}</div>
							</div>
							<div className="d-flex align-items-center">
								<label>{currentLocal.supplierHome.price}:</label>
								<div className="price mx-2">{product.price} LE</div>
							</div>
						</div>
						<div className="specs my-2">{product.specs}</div>
						{product.sizes.length > 0 && (
							<div className="my-3">
								<label>
									{parent === "supplierHome"
										? currentLocal.supplierHome.sizes
										: currentLocal.supplierHome.chooseSize}
								</label>
								<div className="capsulesContainer">
									{product.sizes.map((size, index) => (
										<div className="capsules f-12" key={index}>
											{size.name}
										</div>
									))}
								</div>
							</div>
						)}
						{product.models.length > 0 && (
							<div className="my-3">
								<label>
									{parent === "supplierHome"
										? currentLocal.supplierHome.models
										: currentLocal.supplierHome.chooseModel}
								</label>
								<div className="capsulesContainer">
									{product.models.map((model, index) => (
										<div className="capsules f-12" key={index}>
											{model.name}
										</div>
									))}
								</div>
							</div>
						)}
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
								<div
									className={
										parent === "supplierHome" ? "mx-2" : "quantityCount mx-2"
									}
								>
									{quantityCount}
								</div>
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
					<div className="button-container">
						<button className="button-primary" onClick={handleEdit}>
							{parent === "supplierHome"
								? currentLocal.supplierHome.edit
								: currentLocal.supplierHome.addToCart}
						</button>
					</div>
				</Col>
			</Row>
		</Modal>
	);
}

export default ProductDetails;
