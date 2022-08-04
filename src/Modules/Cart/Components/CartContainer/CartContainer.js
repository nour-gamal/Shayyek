import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AddOrder, getCart, GetPaymentMethods, updateCart } from "../../Network";
import { baseUrl } from "../../../../Services";
import minusCircle from "../../../../Resources/Assets/minusCircle.png";
import plusCircle from "../../../../Resources/Assets/plusCircle.png";
import garbage from "../../../../Resources/Assets/garbage.svg";
import { Redirect } from "react-router-dom";
import "./CartContainer.css";
import SuccessModal from "../SuccessModal/SuccessModal";

function CartContainer() {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const {
		deviceId: { deviceId },
		authorization,
	} = useSelector((state) => state.authorization);
	const { currentLanguageId } = useSelector((state) => state.currentLocal);

	const [products, updateProducts] = useState([]);
	const [redirectTo, setRedirectTo] = useState(null);
	const [finalPrice, updateFinalPrice] = useState(0);
	const [isSuccessModalVisible, updateSuccessModalVisible] = useState(false);
	var totalPrice = 0;
	const isAuth = Object.keys(authorization).length > 0;
	useEffect(() => {
		let body = {
			languageId: currentLanguageId,
			deviceId: deviceId,
			userId: isAuth ? authorization.id : null,
		};

		getCart(
			body,
			(success) => {
				updateProducts(success.data);
			},
			(fail) => {
				console.log(fail);
			}
		);
	}, [currentLanguageId, authorization, deviceId, isAuth]);

	const changeQuantity = (type, productIndex) => {
		let allProducts = [...products];
		let selectedProduct = allProducts[productIndex];
		if (type === "remove" && selectedProduct.quantity > 1) {
			allProducts[productIndex].quantity--;
			let body = {
				cartId: selectedProduct.cartId,
				quantity: allProducts[productIndex].quantity,
				deviceId,
			};

			updateCart(
				body,
				(success) => {
					console.log(success);
				},
				(fail) => {
					console.log(fail);
				}
			);
		} else if (type === "add") {
			allProducts[productIndex].quantity++;
			let body = {
				cartId: selectedProduct.cartId,
				quantity: allProducts[productIndex].quantity,
				deviceId,
			};

			updateCart(
				body,
				(success) => { },
				(fail) => {
					console.log(fail);
				}
			);
		}
		updateProducts(allProducts);
	};
	const deleteProduct = (productIndex) => {
		let allProducts = [...products];
		allProducts[productIndex].quantity = 0;

		let body = {
			cartId: allProducts[productIndex].cartId,
			quantity: allProducts[productIndex].quantity,
			deviceId,
		};

		updateCart(
			body,
			(success) => { },
			(fail) => {
				console.log(fail);
			}
		);
		updateProducts(allProducts);
	};

	const handleAddOrder = () => {

		GetPaymentMethods({ languageId: currentLanguageId },
			(success) => {
				let body = {
					orderDetails: products,
					PaymentMethodId: success.data[0].id
				};
				AddOrder(
					body,
					(success) => {
						if (success.success) {
							updateSuccessModalVisible(true);
						}
					},
					(fail) => {
						console.log(fail);
					}
				);
			});

	};
	const handleCheckout = () => {
		updateFinalPrice(totalPrice);
		if (isAuth) {
			handleAddOrder()
		} else {
			setRedirectTo("loginByEmail");
		}
	};

	var productsCount = 0;
	if (products && products.length) {
		productsCount = products.filter((product) => product.quantity !== 0).length;
	}

	if (redirectTo)
		return (
			<Redirect
				to={{
					pathname: redirectTo,
					state: {
						isAuth: redirectTo === "checkout" ? true : false,
						totalPrice: finalPrice,
						products,
					},
				}}
			/>
		);
	return (
		<div className="cartContainer my-4 d-flex flex-1 justify-content-between flex-column">
			<div className="products-grid">
				<div className="title f-18">
					<span>
						{productsCount} {currentLocal.suppliers.items}
					</span>{" "}
					{currentLocal.suppliers.inYourCart}
				</div>
				<div className="itemsContainer">
					{products &&
						products.map((product, productIndex) => {
							totalPrice = totalPrice + product.quantity * product.price;
							if (product.quantity > 0) {
								return (
									<div className="productRow d-flex my-2" key={product.cartId}>
										<div className="d-flex justify-content-between align-items-center flex-1">
											<img
												src={baseUrl + product.productImage}
												alt="productImage"
												className="productImage"
											/>
											<div className="item productName">
												{product.productName}
											</div>
											<div className="item">{product.productModelName}</div>
											<div className="item">{product.productSizeName}</div>
										</div>
										<div className="d-flex justify-content-between align-items-center flex-1">
											<div className="d-flex item align-items-center">
												<img
													src={minusCircle}
													alt="minusCircle"
													className="cursorPointer"
													onClick={() => {
														changeQuantity("remove", productIndex);
													}}
												/>
												<div className="mx-2">
													{product.quantity} {currentLocal.suppliers.items}
												</div>
												<img
													src={plusCircle}
													alt="plusCircle"
													className="cursorPointer"
													onClick={() => {
														changeQuantity("add", productIndex);
													}}
												/>
											</div>
											<div className="item">{product.price} LE</div>
											<div className="item">
												<img
													src={garbage}
													alt="garbage"
													className="cursorPointer"
													onClick={(e) => {
														deleteProduct(productIndex);
													}}
												/>
											</div>
										</div>
									</div>
								);
							} else return "";
						})}
				</div>
			</div>
			<div className="text-center">
				<button
					className={
						totalPrice === 0
							? "button-primary flat disabledField"
							: "button-primary flat"
					}
					onClick={handleCheckout}
					disabled={totalPrice === 0}
				>
					{currentLocal.suppliers.checkOut}
				</button>
				<div className="fw-500 mt-2">
					{currentLocal.suppliers.checkoutFor}
					<span className="totalPrice"> {totalPrice} LE</span>
				</div>
			</div>
			<SuccessModal
				isModalVisible={isSuccessModalVisible}
				onCancel={() => {
					updateSuccessModalVisible(false);
					setRedirectTo("/");
				}}
			/>
		</div>
	);
}

export default CartContainer;
