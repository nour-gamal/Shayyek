import React, { useState, useEffect } from "react";
import { Modal, Row, Col } from "antd";
import { baseUrl } from "../../../../Services";
import { useSelector, useDispatch } from "react-redux";
import positive from "../../../../Resources/Assets/postive.svg";
import negative from "../../../../Resources/Assets/negative.svg";
import { getProductDetails, addOneProductToCart } from "../../Network";
import { addToCart } from "../../../../Redux/Cart";

import "./ProductModal.css";

function ProductModal({ isModalVisible, onCancel, product }) {
	const {
		authorization: { id },
	} = useSelector((state) => state.authorization);
	const {
		deviceToken: { deviceToken },
	} = useSelector((state) => state.authorization);
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	const [productDetails, updateProductDetails] = useState(null);
	const [quantityCount, updateQuantityCount] = useState(1);
	const [selectedSize, updateSelectedSize] = useState(null);
	const [selectedModel, updateSelectedModel] = useState(null);
	const [alert, setAlert] = useState({ type: null, state: false });
	const dispatch = useDispatch();
	useEffect(() => {
		let data = {
			productId: product.id,
			languageId: currentLanguageId,
		};
		getProductDetails(
			data,
			(success) => {
				updateProductDetails(success.data);
			},
			(fail) => {
				console.log(fail);
			}
		);
	}, [currentLanguageId, product.id]);

	const addProductToCart = () => {
		let addedProduct = {
			productId: product.id,
			productSizeId: selectedSize,
			productModelId: selectedModel,
			userId: id,
			deviceId: deviceToken,
			quantity: quantityCount,
		};
		if (productDetails.sizes.length > 0 || productDetails.models.length > 0) {
			if (!selectedSize) {
				setAlert({ type: "sizes", state: true });
			}
			if (!selectedModel) {
				setAlert({ type: "models", state: true });
			}
		} else {
			addOneProductToCart(
				addedProduct,
				(success) => {
					console.log(success);
					dispatch(addToCart(addedProduct));
				},
				(fail) => {
					console.log(fail);
				}
			);
		}
	};
	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-lg productModal"
		>
			{productDetails && (
				<div style={{ minHeight: "calc(85vh - 104px)" }}>
					<Row className="height-100">
						<Col md={8}>
							<img
								src={baseUrl + productDetails.image}
								alt="productImage"
								className="productImage"
							/>
						</Col>
						<Col
							md={16}
							className="d-flex justify-content-between flex-column"
							style={{ minHeight: "calc(85vh - 104px)" }}
						>
							<div>
								<h6 className="f-18 productName">{productDetails.name}</h6>
								<div>
									<div className="d-flex justify-content-between">
										<div className="d-flex">
											<img
												src={baseUrl + productDetails.companyLogo}
												alt="supplierImg"
												className="rounded-circle companyLogo"
											/>
											<div className="mx-2">{productDetails.companyName}</div>
										</div>
										<div>
											<span className="f-14">
												{currentLocal.suppliers.price}
											</span>
											:{" "}
											<span className="f-18 price">
												{productDetails.price} LE
											</span>
										</div>
									</div>
									<div className="specs my-3">{productDetails.specs}</div>
									{productDetails.sizes.length > 0 && (
										<div>
											<div className="f-18">
												{currentLocal.supplierHome.chooseSize} :{" "}
											</div>
											<div className="capsulesContainer">
												{productDetails.sizes.map((size) => (
													<div
														className={
															selectedSize === size.id
																? "capsules selectedCapsule"
																: "capsules"
														}
														id={size.id}
														key={size.id}
														onClick={(e) => {
															updateSelectedSize(e.target.id);
														}}
													>
														{size.name}
													</div>
												))}
											</div>
											{alert.type === "sizes" && alert.state && (
												<span className="required">{}</span>
											)}
										</div>
									)}
									{productDetails.models.length > 0 && (
										<div>
											<div className="f-18">
												{alert.type === "models" && alert.state && (
													<span className="required"> *</span>
												)}{" "}
												{currentLocal.supplierHome.chooseModel} :
											</div>
											<div className="capsulesContainer">
												{productDetails.models.map((model) => (
													<div
														className={
															selectedModel === model.id
																? "capsules selectedCapsule"
																: "capsules"
														}
														key={model.id}
														id={model.id}
														onClick={(e) => {
															updateSelectedModel(e.target.id);
														}}
													>
														{model.name}
													</div>
												))}
											</div>
										</div>
									)}
									<div>
										<div className="f-18">
											{currentLocal.supplierHome.quantity} :
										</div>
										<div className="my-2">
											<img
												src={negative}
												alt="negative"
												onClick={() => {
													if (quantityCount !== 1) {
														updateQuantityCount(quantityCount - 1);
													}
												}}
												className="cursorPointer"
											/>
											<div className={"quantityCount mx-2"}>
												{quantityCount}
											</div>
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
							</div>
							<div>
								<button className="button-primary" onClick={addProductToCart}>
									{currentLocal.supplierHome.addToCart}
								</button>
							</div>
						</Col>
					</Row>
				</div>
			)}
		</Modal>
	);
}

export default ProductModal;
