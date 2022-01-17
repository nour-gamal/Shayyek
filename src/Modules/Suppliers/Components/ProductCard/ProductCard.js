import { useState } from "react";
import { baseUrl } from "../../../../Services";
import ProductModal from "../ProductModal/ProductModal";
import "./ProductCard.css";
function ProductCard({ product }) {
	const [isModalVisible, updateModalVisible] = useState(false);
	return (
		<div
			className="productCard my-2"
			onClick={() => {
				updateModalVisible(true);
			}}
		>
			<img
				src={baseUrl + product.image}
				alt="productImage"
				className="productImage"
			/>
			<div className="f-17 productName fw-600 my-2">{product.name}</div>
			<div className="storeInfo">
				<img
					src={baseUrl + product.companyLogo}
					alt="storeName"
					className=" mx-2 rounded-circle"
				/>
				<div className="f-14">{product.companyName}</div>
			</div>
			<ProductModal
				product={product}
				isModalVisible={isModalVisible}
				onCancel={() => {
					updateModalVisible(false);
				}}
			/>
		</div>
	);
}

export default ProductCard;
