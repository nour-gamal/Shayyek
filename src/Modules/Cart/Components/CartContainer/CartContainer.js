import { useState } from "react";
import { useSelector } from "react-redux";
import minusCircle from "../../../../Resources/Assets/minusCircle.png";
import plusCircle from "../../../../Resources/Assets/plusCircle.png";
import "./CartContainer.css";
function CartContainer({ products }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [productsArr, updateProductsArr] = useState([...products]);
	const changeQuantity = (type, productIndex) => {
		let prod = [...productsArr];
		if (type === "minus") {
			if (prod[productIndex].quantity !== 1) {
				prod[productIndex].quantity = prod[productIndex].quantity - 1;
			}
		} else {
			prod[productIndex].quantity = prod[productIndex].quantity + 1;
		}
		updateProductsArr(prod);
	};
	return (
		<div className="cartContainer my-4">
			<div className="title f-18">
				<span>
					{productsArr.length} {currentLocal.suppliers.items}{" "}
				</span>
				{currentLocal.suppliers.inYourCart}
			</div>
			{productsArr.map((product, productIndex) => (
				<div
					className="productRow d-flex my-2 justify-content-between align-items-center"
					key={productIndex}
				>
					<img
						src={
							"https://previews.123rf.com/images/artshock/artshock1210/artshock121000046/15557821-imag-des-gouttes-d-eau-sur-la-fen%C3%AAtre-et-fond-de-ciel-bleu.jpg"
						}
						alt="productImage"
					/>
					<div>{product.productName}</div>
					<div>{product.productModelName}</div>
					<div>{product.productSizeName}</div>
					<div className="d-flex">
						<img
							src={minusCircle}
							alt="minusCircle"
							className="cursorPointer"
							onClick={() => {
								changeQuantity("minus", productIndex);
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
								changeQuantity("plus");
							}}
						/>
					</div>
				</div>
			))}
		</div>
	);
}

export default CartContainer;
