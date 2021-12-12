import React from "react";
import { baseUrl } from "../../../../../Services";
import { Menu, Dropdown } from "antd";
import moreDots from "../../../../../Resources/Assets/more-dots.svg";
import "./ProductsCard.css";
function ProductsCard({ product }) {
	return (
		<div className="ProductCard">
			<img
				src={baseUrl + product.image}
				alt="productImg"
				className="productImg"
			/>
			<div className="details d-flex justify-content-between">
				<div>{product.name}</div>
				<img src={moreDots} alt="moreDots" className="cursorPointer" />
			</div>
		</div>
	);
}

export default ProductsCard;
