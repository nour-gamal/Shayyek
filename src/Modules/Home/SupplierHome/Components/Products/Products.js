import React from "react";
import { useSelector } from "react-redux";
import Plus from "../../../../../Resources/Assets/plus (2).svg";
import "./Products";
function Products() {
	const { currentLocal } = useSelector((state) => state.currentLocal);

	return (
		<div>
			<button className="orange_btn m-2 ">
				<img src={Plus} alt="Plus" className="mx-1" />
				{currentLocal.supplierHome.addNewProduct}
			</button>
		</div>
	);
}

export default Products;
