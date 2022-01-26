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
		} else if (type === "add") {
			allProducts[productIndex].quantity++;
		}
   	updateProducts(allProducts);
	};

	return (
		<div className="cartContainer my-4">
			<div className="title f-18">
				<span>
					{products.length} {currentLocal.suppliers.items}
				</span>{" "}
				{currentLocal.suppliers.inYourCart}
			</div>
			{products.map((product, productIndex) => {
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
						<div className="item">{product.productName}</div>
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
							<img src={garbage} alt="garbage" className="cursorPointer" />
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default CartContainer;
