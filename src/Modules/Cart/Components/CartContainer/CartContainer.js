import React from "react";
import { useSelector } from "react-redux";
import "./CartContainer.css";
function CartContainer({ products }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	return (
		<div className="cartContainer">
			<div className="title">
				<span>
					{products.length} {currentLocal.suppliers.items}
				</span>
				<span> {currentLocal.suppliers.inYourCart}</span>
			</div>
		</div>
	);
}

export default CartContainer;
