import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Plus from "../../../../../Resources/Assets/plus (2).svg";
import Drafts from "../../../../../Resources/Assets/draft.svg";
import ProductsCard from "../ProductsCard/ProductsCard";
import { getProducts } from "../../../network";
import noProducts from "../../../../../Resources/Assets/noRFQs.svg";
import { Row, Col } from "antd";
import AddProductModal from "../AddProductModal/AddProductModal";
import "./Products.css";
function Products({ draftsCount }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [products, updateProducts] = useState([]);
	const { authorization } = useSelector((state) => state.authorization);
	const [isModalVisible, toggleProductModal] = useState(false);

	useEffect(() => {
		getProducts(
			currentLocal.language === "English"
				? localStorage.getItem("englishId")
				: localStorage.getItem("arabicId"),
			authorization.companyId,
			(success) => {
				updateProducts(success.data);
			},
			(fail) => {
				console.log(fail);
			}
		);
	}, [authorization.companyId, currentLocal.language]);

	const requestAllProducts = () => {
		getProducts(
			currentLocal.language === "English"
				? localStorage.getItem("englishId")
				: localStorage.getItem("arabicId"),
			authorization.companyId,
			(success) => {
				updateProducts(success.data);
			},
			(fail) => {
				console.log(fail);
			}
		);
	};
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

			<Row>
				{products.length === 0 ? (
					<div className="noProducts text-center">
						<img src={noProducts} alt="noCompanies" />
						<div>{currentLocal.supplierHome.noProducts}</div>
						<div>{currentLocal.supplierHome.youCanAddProducts}</div>
					</div>
				) : (
					products.map((product) => {
						return (
							<Col xs={24} md={12} lg={6}>
								<ProductsCard
									product={product}
									requestAllProducts={requestAllProducts}
								/>
							</Col>
						);
					})
				)}
			</Row>

			{isModalVisible && (
				<AddProductModal
					isModalVisible={isModalVisible}
					onCancel={() => {
						toggleProductModal(!isModalVisible);
						requestAllProducts();
					}}
				/>
			)}
		</div>
	);
}

export default Products;
