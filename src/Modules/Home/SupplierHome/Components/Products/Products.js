import React, { useState } from "react";
import { useSelector } from "react-redux";
import Plus from "../../../../../Resources/Assets/plus (2).svg";
import Drafts from "../../../../../Resources/Assets/draft.svg";
import AddProductModal from "../AddProductModal/AddProductModal";
import "./Products.css";
function Products({ draftsCount }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [isModalVisible, toggleProductModal] = useState(false);
	return (
		<div
			className={
				currentLocal.language === "English" ? "products ppl" : "products ppr"
			}
		>
			<div className="header d-flex justify-content-between align-items-between my-2 headerContainer">
				<button
					className="orange_btn"
					onClick={() => {
						toggleProductModal(!isModalVisible);
					}}
				>
					<img src={Plus} alt="Plus" className="mx-1" />
					<span>{currentLocal.supplierHome.addNewProduct}</span>
				</button>

				<div className="d-flex align-items-center">
					<img src={Drafts} alt="Drafts" className="mx-2" />
					<span>{currentLocal.supplierHome.drafts}</span>
					<div className="invitations_number mx-2">{draftsCount}</div>
				</div>
			</div>
			{isModalVisible && (
				<AddProductModal
					isModalVisible={isModalVisible}
					onCancel={() => {
						toggleProductModal(!isModalVisible);
					}}
				/>
			)}
		</div>
	);
}

export default Products;
