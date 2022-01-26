import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getCart, updateCart } from "../../Network";
import { baseUrl } from "../../../../Services";
import minusCircle from "../../../../Resources/Assets/minusCircle.png";
import plusCircle from "../../../../Resources/Assets/plusCircle.png";
import garbage from "../../../../Resources/Assets/garbage.svg";
// style
import "./CartContainer.css";

function CartContainer() {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const {
		deviceId: { deviceId },
		authorization,
	} = useSelector((state) => state.authorization);
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	const [products, updateProducts] = useState([]);
	let totalPrice = 0;
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
				(success) => {},
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
			(success) => {},
			(fail) => {
				console.log(fail);
			}
		);
		updateProducts(allProducts);
	};
	const productsCount = products.filter((product) => product.quantity !== 0)
		.length;

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
					{products.map((product, productIndex) => {
						totalPrice = totalPrice + product.quantity * product.price;
						if (product.quantity > 0) {
							return (
								<div
									className="productRow d-flex my-2 justify-content-between align-items-center"
									key={product.cartId}
								>
									<img
										src={baseUrl + product.productImage}
										alt="productImage"
										className="productImage"
									/>
									<div className="item productName">{product.productName}</div>
									<div className="item">{product.productModelName}</div>
									<div className="item">{product.productSizeName}</div>

									<div className="d-flex item">
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
							);
						} else return "";
					})}
				</div>
			</div>
			<div className="text-center">
				<button className="button-primary flat">
					{currentLocal.suppliers.checkOut}
				</button>
				<div className="fw-500 mt-2">
					{currentLocal.suppliers.checkoutFor}
					<span className="totalPrice"> {totalPrice} LE</span>
				</div>
			</div>
		</div>
	);
}

export default CartContainer;
