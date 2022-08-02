import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { Checkbox, Tree } from "antd";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import filterIcon from "../../../../Resources/Assets/filterIcon.svg";
import {
	getCategories,
	getGovernmentList,
	countryList,
	GetCompaniesWithFilters,
} from "../../Network";
import "./Filter.css";
function Filter({ getFilteredCompany }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	const [allProducts, toggleAllProducts] = useState(false);
	const [inStock, toggleInStock] = useState(false);
	const [count, updateCount] = useState(0);
	const [selectedCategories, updateSelectedCategories] = useState(null);
	const [treeData, updateTreeData] = useState([]);
	const [governmentList, setGovernmentList] = useState([]);
	const [government, setGovernment] = useState(null);
	const [productAvailability, updateProductAvailability] = useState(null);
	const [isRequestFilter, updateRequestFilter] = useState(false);
	var treeIcon = document.querySelectorAll(".anticon");

	if (treeIcon.length > 0) {
		if (currentLocal.language === "English") {
			treeIcon.forEach((icon) => {
				icon.classList.remove("arabicIcon");
			});
		} else {
			treeIcon.forEach((icon) => {
				icon.classList.add("arabicIcon");
			});
		}
	}

	useEffect(() => {
		countryList(
			currentLanguageId,
			(success) => {
				success.data.forEach((country) => {
					if (country.name.toLowerCase() === "egypt") {
						getGovernmentList(
							currentLanguageId,
							country.id,
							(success) => {
								let govList = [];
								success.data.forEach((gov) => {
									govList.push({ label: gov.name, value: gov.id });
								});
								setGovernmentList(govList);
							},
							(fail) => {
								console.log(fail);
							},
							false
						);
					}
				});
			},
			(fail) => {
				console.log(fail);
			},
			false
		);
	}, [currentLanguageId]);

	useEffect(() => {
		getCategories(
			currentLanguageId,
			(success) => {
				let treeData = [];
				success.data.forEach((category, categoryIndex) => {
					treeData.push({
						title: category.mainCategory.name,
						key: category.mainCategory.id,
						type: "category",
						children: [],
						disabled: true,
					});

					category.categories.forEach((subCategory, subCategoryIndex) => {
						treeData[categoryIndex].children = [
							...treeData[categoryIndex].children,
							{
								title: subCategory.category.name,
								key: subCategory.category.id,
								type: "subCategory",
								parentId: treeData[categoryIndex].key,
								children: [],
							},
						];

						subCategory.subCategories.forEach((subSubCategory) => {
							treeData[categoryIndex].children[subCategoryIndex].children = [
								...treeData[categoryIndex].children[subCategoryIndex].children,
								{
									title: subSubCategory.name,
									key: subSubCategory.id,
									grandParentId: treeData[categoryIndex].key,
									parentId:
										treeData[categoryIndex].children[subCategoryIndex].key,
									type: "subSubcategory",
								},
							];
						});
					});
				});
				updateTreeData(treeData);
			},
			(fail) => {
				console.log(fail);
			}
		);
	}, [currentLanguageId, governmentList]);

	const checkAllProducts = () => {
		toggleInStock(false);
		toggleAllProducts(!allProducts);
	};

	const checkInStock = () => {
		toggleAllProducts(false);
		toggleInStock(!inStock);
	};

	const onGovSelect = (checkedValues) => {
		setGovernment(checkedValues);
		updateRequestFilter(true);
	};
	const onSelect = (selectedKeys, info) => {
		console.log("selected", selectedKeys, info);
	};

	const onCheck = (checkedKeys, info) => {
		let selected = [];

		info.checkedNodes.forEach((checked) => {
			if (checked.parentId && checked.grandParentId) {
				selected.push({
					mainCategoryId: checked.grandParentId,
					categoryId: checked.parentId,
					subCategoryId: checked.key,
				});
			} else if (checked.parentId) {
				selected.push({
					mainCategoryId: checked.parentId,
					categoryId: checked.key,
				});
			} else {
				selected.push({
					mainCategoryId: checked.key,
				});
			}
		});

		updateSelectedCategories(selected);
		updateRequestFilter(true);
	};

	useEffect(() => {
		if (isRequestFilter) {
			let data = {
				languageId: currentLanguageId,
				categories: selectedCategories,
				governmentIds: government,
				stockStatus: productAvailability,
				rateAvg: count,
			};
			GetCompaniesWithFilters(
				data,
				(success) => {
					getFilteredCompany(success.data);
				},
				(fail) => { }
			);
		}
		// eslint-disable-next-line
	}, [currentLanguageId, isRequestFilter, count, productAvailability, selectedCategories]);

	return (
		<aside className="suppliersFilter">
			<h5 className="title f-17 paddingSection">
				<img src={filterIcon} alt="filterIcon" className="mx-1" />
				{currentLocal.suppliers.suppliersFilter.filter}
			</h5>

			<Accordion>
				<Accordion.Item eventKey="0">
					<Accordion.Header>
						{currentLocal.suppliers.suppliersFilter.category}
					</Accordion.Header>
					<Accordion.Body>
						<Tree
							checkable
							defaultExpandedKeys={["0-0-0"]}
							onSelect={onSelect}
							onCheck={onCheck}
							treeData={treeData}
						/>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
			<Accordion>
				<Accordion.Item eventKey="0">
					<Accordion.Header>
						{currentLocal.suppliers.suppliersFilter.location}
					</Accordion.Header>
					<Accordion.Body>
						<Checkbox.Group options={governmentList} onChange={onGovSelect} />
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
			<div className="my-2 paddingSection">
				<h5 className="f-14">
					{currentLocal.suppliers.suppliersFilter.products}
				</h5>
				<div className="my-2">
					<Checkbox
						onChange={() => {
							checkAllProducts();
							updateProductAvailability(1);
							updateRequestFilter(true);
						}}
						checked={allProducts}
					>
						{currentLocal.suppliers.suppliersFilter.all}
					</Checkbox>
				</div>
				<div className="my-2">
					<Checkbox
						onChange={() => {
							checkInStock();
							updateProductAvailability(2);
							updateRequestFilter(true);
						}}
						checked={inStock}
					>
						{currentLocal.suppliers.suppliersFilter.inStock}
					</Checkbox>
				</div>
			</div>
			<div className="my-2 paddingSection">
				<h5 className="f-14">{currentLocal.suppliers.suppliersFilter.rate}</h5>

				<ReactStars
					classNames={
						currentLocal.language === "English" ? "ltrStars" : "ltrStars"
					}
					count={5}
					value={count}
					size={24}
					activeColor="#ffd700"
					onChange={(count) => {
						updateCount(count);
						updateRequestFilter(true);
					}}
				/>
			</div>
		</aside>
	);
}

export default Filter;
