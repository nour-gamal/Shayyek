import React from "react";
import { baseUrl } from "../../../../../Services";
import { Menu, Dropdown, Tooltip } from "antd";
import { useSelector } from "react-redux";
import moreDots from "../../../../../Resources/Assets/more-dots.svg";
import eye from "../../../../../Resources/Assets/eye.svg";
import edit from "../../../../../Resources/Assets/edit.svg";
import garbage from "../../../../../Resources/Assets/garbage.svg";
import "./ProductsCard.css";
function ProductsCard({ product }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);

	const menu = (
		<Menu>
			<Menu.Item
				key="0"
				onClick={() => {
					alert("prod");
				}}
			>
				<img src={eye} alt="eye" className="my-2" />
				{currentLocal.supplierHome.productDetails}
			</Menu.Item>
			<Menu.Item key="1">
				<img src={edit} alt="edit" className="my-2" />
				{currentLocal.supplierHome.edit}
			</Menu.Item>
			<Menu.Item key="2">
				<img src={garbage} alt="garbage" className="my-2" />
				{currentLocal.supplierHome.delete}
			</Menu.Item>
		</Menu>
	);
	return (
		<div className="ProductCard">
			<img
				src={baseUrl + product.image}
				alt="productImg"
				className="productImg"
			/>
			<div className="details d-flex justify-content-between">
				<Tooltip title={product.name} key="leftButton">
					<div className="productName">{product.name}</div>
				</Tooltip>
				<Dropdown overlay={menu} trigger={["click"]}>
					<img src={moreDots} alt="moreDots" className="cursorPointer" />
				</Dropdown>
			</div>
		</div>
	);
}

export default ProductsCard;
