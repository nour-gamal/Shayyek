import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import { Checkbox } from "antd";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import "./Filter.css";
function Filter() {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [allProducts, toggleAllProducts] = useState(false);
	const [inStock, toggleInStock] = useState(false);
	const [count, updateCount] = useState(0);
	const checkAllProducts = () => {
		toggleInStock(false);
		toggleAllProducts(!allProducts);
	};

	const checkInStock = () => {
		toggleAllProducts(false);
		toggleInStock(!inStock);
	};

	return (
		<aside className="suppliersFilter">
			<h5 className="title f-17">
				{currentLocal.suppliers.suppliersFilter.filter}
			</h5>

			<Accordion defaultActiveKey="0">
				<Accordion.Item eventKey="0">
					<Accordion.Header>Category</Accordion.Header>
					<Accordion.Body>
						<ul className="list-unstyled">
							<li>option 1</li>
							<li>option 2</li>
							<li>option 3</li>
							<li>option 4</li>
							<li>option 5</li>
						</ul>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
			<div className="my-2">
				<h5 className="f-14">Products</h5>
				<div className="my-2">
					<Checkbox onChange={checkAllProducts} checked={allProducts}>
						All
					</Checkbox>
				</div>
				<div className="my-2">
					<Checkbox onChange={checkInStock} checked={inStock}>
						In Stock
					</Checkbox>
				</div>
			</div>
			<div className="my-2">
				<h5 className="f-14">Rate</h5>

				<ReactStars
					count={5}
					value={count}
					size={24}
					activeColor="#ffd700"
					onChange={(count) => {
						updateCount(count);
					}}
					classNames={
						currentLocal.language === "English" ? "ltrStars" : "rtlStars"
					}
				/>
			</div>
		</aside>
	);
}

export default Filter;
