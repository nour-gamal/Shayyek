import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { Checkbox } from "antd";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import filterIcon from "../../../../Resources/Assets/filterIcon.svg";
import { getCategories } from "../../Network";
import "./Filter.css";
function Filter() {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	const [allProducts, toggleAllProducts] = useState(false);
	const [inStock, toggleInStock] = useState(false);
	const [count, updateCount] = useState(0);
	const [categories, updateCategories] = useState([]);
	useEffect(() => {
		getCategories(
			currentLanguageId,
			(success) => {
				updateCategories(success.data);
			},
			(fail) => {
				console.log(fail);
			}
		);
	}, [currentLanguageId]);

	const checkAllProducts = () => {
		toggleInStock(false);
		toggleAllProducts(!allProducts);
	};

	const checkInStock = () => {
		toggleAllProducts(false);
		toggleInStock(!inStock);
	};

	const categoryChecked = (levelNumber, index, state) => {
		console.log(levelNumber, index, state);
	};

	return (
		<aside className="suppliersFilter">
			<h5 className="title f-17 paddingSection">
				<img src={filterIcon} alt="filterIcon" className="mx-1" />
				{currentLocal.suppliers.suppliersFilter.filter}
			</h5>

			<Accordion defaultActiveKey="0">
				<Accordion.Item eventKey="0">
					<Accordion.Header>Category</Accordion.Header>
					<Accordion.Body>
						{categories.map((category, categoryIndex) => {
							return (
								<div className="my-2" key={categoryIndex}>
									<Checkbox
										onChange={(e) => {
											categoryChecked(0, e.target.id, e.target.checked);
										}}
										id={categoryIndex}
									>
										{category.category.name}
										{category.subCategories.map(
											(subcategory, subCategoryIndex) => {
												console.log(subcategory);
												return (
													<div key={subCategoryIndex} className="my-2">
														<Checkbox
															onChange={(e) => {
																categoryChecked(
																	1,
																	e.target.id,
																	e.target.checked
																);
															}}
															id={categoryIndex + "-" + subCategoryIndex}
														>
															{subcategory.subCategory.name}
														</Checkbox>
													</div>
												);
											}
										)}
									</Checkbox>
								</div>
							);
						})}
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
			<div className="my-2 paddingSection">
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
			<div className="my-2 paddingSection">
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
