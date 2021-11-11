import React, { useState, useEffect } from "react";
import { Table } from "antd";
import importIcon from "../../../../../Resources/Assets/import.svg";
import addIcon from "../../../../../Resources/Assets/addIcon.svg";
import { useSelector } from "react-redux";
import PostRFQModal from "../PostRFQModal/PostRFQModal";
import datePickerSuffix from "../../../../../Resources/Assets/datePickerSuffix.svg";
import { ExcelRenderer } from "react-excel-renderer";
import { Alert } from "react-bootstrap";
import { Select, Checkbox, DatePicker, Radio } from "antd";
import { getCategories, getDeliverdOptions } from "../../../network";
import "./CreateRFQ.css";

function CreateRFQ() {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	const [categoriesOption, setCategoriesOption] = useState([]);
	const [dataSource, updateDataSource] = useState([]);
	const [allCategoryName, setAllCategoryName] = useState(null);
	const [deliveredTo, updateDeliveredTo] = useState("");
	const [alert, setAlert] = useState(false);
	const [selectedRow, updateSelectedRow] = useState(null);
	const [address, updateAddress] = useState("");
	const [recievingOffersDate, setOffersDate] = useState(null);
	const [deliveryDate, setDeliveryDate] = useState(null);
	const [loading, setLoading] = useState(false);
	const [newItemAdded, updateItemAdded] = useState(false);
	const [isModalVisible, toggleModal] = useState(false);
	const [modalType, updateModalType] = useState("post");
	useEffect(() => {
		getDeliverdOptions(
			currentLanguageId,
			(success) => {},
			(fail) => {}
		);
	});

	var index = {
		item: null,
		notes: null,
		description: null,
		quantity: null,
		unit: null,
		categories: null,
	};

	const { Option } = Select;

	const options = [
		{
			label: currentLocal.buyerHome.companyWarehouse,
			value: "companyWarehouse",
		},
		{ label: currentLocal.buyerHome.projectLocation, value: "projectLocation" },
	];

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
	function handleDeliveredTo(e) {
		updateDeliveredTo(e.target.value);
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
		updateItemAdded(true);
		setTimeout(() => {
			updateItemAdded(false);
		}, 3000);
	};

	function disabledOffersDate(current) {
		return current && current.valueOf() < Date.now();
	}
	function disabledDeliveryDate(current) {
		return (
			current && current.valueOf() < new Date(recievingOffersDate).valueOf()
		);
	}
	function handleConfirm() {
		if (
			address.length === 0 ||
			recievingOffersDate === null ||
			deliveryDate === null
		) {
			setAlert(true);
		} else {
			toggleModal(true);
		}
	}
	function openCCModal() {
		updateModalType("cc");
		toggleModal(true);
	}

	const fileHandler = (event) => {
		let fileObj = event.target.files[0];
		setLoading(true);
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
					if (resp.rows[0].length - 1 === itemIndex) {
						setLoading(false);
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
			render: (item, record) => {
				return (
					<textarea
						type="text"
						onChange={(e) => {
							let data = [...dataSource];
							data[selectedRow].item = e.target.value;
							updateDataSource(data);
						}}
						className="form-control"
						value={item}
					/>
				);
			},
		},
		{
			title: currentLocal.buyerHome.description,
			dataIndex: "description",
			key: "description",
			render: (description, record) => {
				return (
					<textarea
						type="text"
						onChange={(e) => {
							let data = [...dataSource];
							data[selectedRow].description = e.target.value;
							updateDataSource(data);
						}}
						className="form-control"
						value={description}
					/>
				);
			},
		},
		{
			title: currentLocal.buyerHome.unit,
			dataIndex: "unit",
			key: "unit",
			render: (unit, record) => {
				return (
					<textarea
						type="text"
						onChange={(e) => {
							let data = [...dataSource];
							data[selectedRow].unit = e.target.value;
							updateDataSource(data);
						}}
						className="form-control"
						value={unit}
					/>
				);
			},
		},
		{
			title: currentLocal.buyerHome.quantity,
			dataIndex: "quantity",
			key: "quantity",
			render: (quantity, record) => {
				return (
					<textarea
						type="text"
						onChange={(e) => {
							let data = [...dataSource];
							data[selectedRow].quantity = e.target.value;
							updateDataSource(data);
						}}
						className="form-control"
						value={quantity}
					/>
				);
			},
		},
		{
			title: currentLocal.buyerHome.preferredBrands,
			dataIndex: "preferredBrands",
			key: "preferredBrands",
			render: (preferredBrands, record) => {
				return (
					<textarea
						type="text"
						onChange={(e) => {
							let data = [...dataSource];
							data[selectedRow].preferredBrands = e.target.value;
							updateDataSource(data);
						}}
						className="form-control"
						value={preferredBrands}
					/>
				);
			},
		},
		{
			title: currentLocal.buyerHome.categories,
			dataIndex: "categories",
			key: "categories",
			render: (categoryId, record, rowIndex) => {
				return (
					<Select
						style={{ width: "100%" }}
						placeholder={
							allCategoryName
								? allCategoryName
								: currentLocal.buyerHome.selectCategory
						}
						onChange={(optionId, x) => {
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
					/>
				);
			},
		},
		{
			title: currentLocal.buyerHome.notes,
			dataIndex: "notes",
			key: "notes",
			render: (notes, record) => {
				return (
					<textarea
						type="text"
						onChange={(e) => {
							let data = [...dataSource];
							data[selectedRow].notes = e.target.value;
							updateDataSource(data);
						}}
						className="form-control"
						value={notes}
					/>
				);
			},
		},
	];
	console.log(deliveredTo);
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

						<label htmlFor="actual-btn" className="primary-color">
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
						<label className="primary-color">
							{currentLocal.buyerHome.addNewItem}
						</label>
					</div>
				</div>

				<div>
					<div className="mb-2">
						<label className="mx-2 primary-color">
							{currentLocal.buyerHome.category}
						</label>
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
						<label className="mx-2 primary-color">
							{currentLocal.buyerHome.installAll}
						</label>
						<Checkbox onChange={handleInstallAll} />
					</div>
				</div>
			</div>
			{newItemAdded && (
				<Alert className="text-center">
					{currentLocal.buyerHome.newItemAdded}
				</Alert>
			)}
			<Table
				indentSize={300}
				columns={columns}
				dataSource={dataSource}
				loading={loading}
				className="my-4"
				onRow={(record, rowIndex) => {
					return {
						onClick: (event) => {
							updateSelectedRow(rowIndex);
						},
					};
				}}
				scroll={{ x: true }}
			/>
			<div className="container">
				<div className="row">
					<div className="col-md-8 col-12">
						<div>
							<label className="mx-2 my-3 primary-color">
								{currentLocal.buyerHome.deliveredTo}
							</label>
							<Radio.Group
								options={options}
								onChange={handleDeliveredTo}
								defaultValue={"companyWarehouse"}
								className={"secondary-color"}
							/>
						</div>
						<div className="d-flex align-items-center">
							<label className="mx-2 my-3 primary-color">
								{currentLocal.buyerHome.address}
							</label>
							<input
								type="text"
								className={
									alert && address.length === 0
										? "form-control addressBar  alertSign"
										: "form-control addressBar border"
								}
								onChange={(e) => {
									updateAddress(e.target.value);
								}}
								value={address}
							/>
						</div>
						<div className="my-3 cursorPointer" onClick={openCCModal}>
							<img src={addIcon} alt="addIcon" className="mx-3" />
							<label>{currentLocal.buyerHome.ccCollugues}</label>
						</div>
					</div>
					<div className="col-md-4 col-12 ">
						<div className="my-3 datePickerContainer">
							<label className="primary-color">
								{currentLocal.buyerHome.deadlineRecievingOffers}
							</label>
							<DatePicker
								suffixIcon={<img src={datePickerSuffix} alt="suffixIcon" />}
								onChange={(date, dateString) => {
									setOffersDate(dateString);
								}}
								disabledDate={disabledOffersDate}
								placeholder={currentLocal.buyerHome.selectDate}
								className={
									alert && recievingOffersDate === null
										? "alertSign "
										: "datePicker"
								}
								allowClear={false}
							/>
						</div>
						<div className="my-3 datePickerContainer">
							<label className=" primary-color">
								{currentLocal.buyerHome.deliveryDate}
							</label>
							<DatePicker
								suffixIcon={<img src={datePickerSuffix} alt="suffixIcon" />}
								onChange={(date, dateString) => setDeliveryDate(dateString)}
								disabledDate={disabledDeliveryDate}
								placeholder={currentLocal.buyerHome.selectDate}
								disabled={recievingOffersDate ? false : true}
								className={
									alert && deliveryDate === null ? "alertSign" : "datePicker"
								}
								allowClear={false}
							/>
						</div>
					</div>
					<button className="button-primary native" onClick={handleConfirm}>
						{currentLocal.buyerHome.confirm}
					</button>
					<PostRFQModal
						isModalVisible={isModalVisible}
						onCancel={() => toggleModal(!isModalVisible)}
						modalType={modalType}
					/>
				</div>
			</div>
		</div>
	);
}

export default CreateRFQ;
