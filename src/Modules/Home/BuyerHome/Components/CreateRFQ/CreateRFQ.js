import React, { useState, useEffect } from "react";
import { Table } from "antd";
import importIcon from "../../../../../Resources/Assets/import.svg";
import addIcon from "../../../../../Resources/Assets/addIcon.svg";
import { useSelector } from "react-redux";
import { ExcelRenderer } from "react-excel-renderer";
import { Select, Checkbox } from "antd";
import { getCategories } from "../../../Network";
import "./CreateRFQ.css";

function CreateRFQ() {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	const [categoriesOption, setCategoriesOption] = useState([]);
	const [dataSource, updateDataSource] = useState([]);
	const [allCategoryName, setAllCategoryName] = useState(null);
	var index = {
		item: null,
		notes: null,
		description: null,
		quantity: null,
		unit: null,
		categories: null,
	};

	const { Option } = Select;

	function handleCategoriesChange(optionId, rowIndex) {
		let data = [...dataSource];
		data[rowIndex].categories = optionId;
		updateDataSource(data);
	}

	function changeCategoryForAll(optionId, optionName) {
		let data = [...dataSource];
		data.forEach((row) => {
			row.categories = optionId;
		});

		updateDataSource(data);
		setAllCategoryName(optionName);
	}

	function handleIncludeInstallation(e, rowIndex) {
		let data = [...dataSource];
		data[rowIndex].includeInstallation = e.target.checked;
		updateDataSource(data);
	}
	function handleInstallAll(e) {
		let data = [...dataSource];
		data.forEach((row, rowIndex) => {
			handleIncludeInstallation(e, rowIndex);
		});
		updateDataSource(data);
	}
	const addNewItem = () => {
		const key = Math.ceil(Math.random() * 999999999);

		updateDataSource([
			...dataSource,
			{
				key,
				item: "",
				notes: "",
				description: "",
				quantity: "",
				unit: "",
			},
		]);
	};

	const fileHandler = (event) => {
		let fileObj = event.target.files[0];

		//just pass the fileObj as parameter
		ExcelRenderer(fileObj, (err, resp) => {
			if (err) {
				console.log(err);
			} else {
				//Loop to indicate the index of each row
				resp.rows[0].forEach((item, itemIndex) => {
					switch (item.toLowerCase().trim()) {
						case "item":
						case "Item No.":
						case "code":
						case "code No.":
						case "section":
						case "section No.":
						case "رقم":
						case "الرقم":
						case "البند":
						case "بند":
						case "رقم البند": {
							index.item = itemIndex;
							break;
						}
						case "description":
						case "specifications":
						case "specs":
						case "specs.":
						case "وصف الاعمال":
						case "المواصفة":
						case "الوصف":
						case "وصف الأعمال":
						case "المواصفه":
						case "الأعمال":
						case "الاعمال": {
							index.description = itemIndex;
							break;
						}
						case "unit":
						case "الوحده":
						case "الوحد": {
							index.unit = itemIndex;
							break;
						}
						case "qty":
						case "quantity":
						case "qty.":
						case "العدد":
						case "الكمية": {
							index.quantity = itemIndex;
							break;
						}

						case "notes":
						case "الملاحظات":
						case "ملاحظات": {
							index.notes = itemIndex;
							break;
						}
						default: {
							break;
						}
					}
				});

				resp.rows[0].forEach((item) => {
					columns.forEach((col) => {
						if (item.toLowerCase() === col.dataIndex) {
							resp.rows.forEach((name, rowIndex) => {
								if (rowIndex !== 0) {
									updateDataSource((oldDataSource) => [
										...oldDataSource,
										{
											key: Math.ceil(Math.random() * 111111111),
											item: name[index.item],
											notes: name[index.notes],
											description: name[index.description],
											unit: name[index.unit],
											quantity: name[index.quantity],
										},
									]);
								}
							});
						}
					});
				});
			}
		});
	};

	useEffect(() => {
		getCategories(
			currentLanguageId,
			(success) => {
				setCategoriesOption(success.data);
			},
			(fail) => {
				console.log(fail);
			}
		);
	}, [currentLanguageId]);
	const columns = [
		{
			title: currentLocal.buyerHome.item,
			dataIndex: "item",
			key: "item",
			onCell: (record, rowIndex) => {
				return {
					onClick: (event) => {
						console.log(rowIndex);
					},
				};
			},
		},
		{
			title: currentLocal.buyerHome.description,
			dataIndex: "description",
			key: "description",
		},
		{
			title: currentLocal.buyerHome.unit,
			dataIndex: "unit",
			key: "unit",
		},
		{
			title: currentLocal.buyerHome.quantity,
			dataIndex: "quantity",
			key: "quantity",
		},
		{
			title: currentLocal.buyerHome.preferredBrands,
			dataIndex: "preferredBrands",
			key: "preferredBrands",
		},
		{
			title: currentLocal.buyerHome.categories,
			dataIndex: "categories",
			key: "categories",
			render: (categoryId, record, rowIndex) => {
				return (
					<Select
						value={allCategoryName}
						defaultValue={currentLocal.buyerHome.selectCategory}
						style={{ width: "100%" }}
						onChange={(optionId) => {
							handleCategoriesChange(optionId, rowIndex);
						}}
					>
						{categoriesOption.map((category, key) => (
							<Option value={category.id} key={key}>
								{category.name}
							</Option>
						))}
					</Select>
				);
			},
		},
		{
			title: currentLocal.buyerHome.includeInstallation,
			dataIndex: "includeInstallation",
			key: "includeInstallation",
			render: (includeInstallation, record, rowIndex) => {
				return (
					<Checkbox
						onChange={(checkVal) => {
							handleIncludeInstallation(checkVal, rowIndex);
						}}
						checked={includeInstallation}
					/>
				);
			},
		},
		{
			title: currentLocal.buyerHome.notes,
			dataIndex: "notes",
			key: "notes",
		},
	];

	return (
		<div className="ppl ppr f-14 my-4 createRFQ">
			<div className="actionsContainer">
				<div>
					<div className="mb-3">
						<input
							type="file"
							id="actual-btn"
							onChange={fileHandler}
							className="d-none"
						/>

						<label htmlFor="actual-btn">
							<img src={importIcon} alt="importIcon" className="mx-3" />
						</label>
						<label>{currentLocal.buyerHome.importExcelFile}</label>
					</div>
					<div className="mb-3">
						<img
							src={addIcon}
							alt="addIcon"
							className="mx-3"
							onClick={addNewItem}
						/>
						<label>{currentLocal.buyerHome.addNewItem}</label>
					</div>
				</div>
				{/* <div className="mb-3">
					<img src={addIcon} alt="addIcon" className="mx-3" />
					<label>{currentLocal.buyerHome.ccCollugues}</label>
				</div> */}
				<div className="mb-2">
					<Select
						defaultValue={currentLocal.buyerHome.selectCategory}
						onChange={(optionId, record) => {
							changeCategoryForAll(optionId, record.children);
						}}
					>
						{categoriesOption.map((category, key) => {
							return (
								<Option value={category.id} key={key}>
									{category.name}
								</Option>
							);
						})}
					</Select>
				</div>
				<div>
					includeInstallation
					<Checkbox onChange={handleInstallAll} />
				</div>
			</div>
			<Table
				columns={columns}
				dataSource={dataSource}
				// loading={true}
				className="my-4"
				scroll={{ x: true }}
			/>
		</div>
	);
}

export default CreateRFQ;
