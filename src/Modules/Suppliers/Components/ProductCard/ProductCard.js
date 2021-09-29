import React from "react";
import "./ProductCard.css";
function ProductCard({ product }) {
	return (
		<div className="productCard">
			<img src={product.image} alt="productImage" className="productImage" />
			<div className="f-17 productName fw-600 my-2">{product.name}</div>
			<div className="storeInfo">
				<img
					src={product.storeImage}
					alt="storeName"
					className=" mx-2 rounded-circle"
				/>
				<div className="f-14">{product.storeName}</div>
			</div>
		</div>
	);
}

export default ProductCard;
