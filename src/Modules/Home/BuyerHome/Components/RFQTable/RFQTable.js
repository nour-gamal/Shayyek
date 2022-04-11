import React, { useState, useEffect } from "react";
import { Table } from "antd";
import importIcon from "../../../../../Resources/Assets/import.svg";
import addIcon from "../../../../../Resources/Assets/addIcon.svg";
import Garbage from "../../../../../Resources/Assets/garbage.svg";
import { useSelector } from "react-redux";
import PostRFQModal from "../PostRFQModal/PostRFQModal";
import datePickerSuffix from "../../../../../Resources/Assets/datePickerSuffix.svg";
import { ExcelRenderer } from "react-excel-renderer";
import { Alert } from "react-bootstrap";
import moment from "moment";
import { Select, Checkbox, DatePicker, Radio } from "antd";
import { getCategories, getDeliverdOptions } from "../../../network";
import DeleteModal from "../DeleteModal/DeleteModal";
import documents from "../../../../../Resources/Assets/paperClip.svg";
import "./RFQTable.css";
import { GetImagePath } from "../../../../ProfilePage/network";
import { baseUrl } from "../../../../../Services";

function CreateRFQ(props) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	const [categoriesOption, setCategoriesOption] = useState([]);
	const [dataSource, updateDataSource] = useState([]);
	const [allCategoryName, setAllCategoryName] = useState(null);
	const [deliveredTo, updateDeliveredTo] = useState(
		"a9c83c89-4aeb-46b8-b245-a144276d927f"
	);
	const [alert, setAlert] = useState(false);
	const [selectedRow, updateSelectedRow] = useState(null);
	const [address, updateAddress] = useState("");
	const [recievingOffersDate, setOffersDate] = useState(null);
	const [deliveryDate, setDeliveryDate] = useState(null);
	const [loading, setLoading] = useState(false);
	const [newItemAdded, updateItemAdded] = useState(false);
	const [isModalVisible, toggleModal] = useState(false);
	const [notContainCategory, updateNotContainCategory] = useState(false);
	const [installAll, updateInstallAll] = useState(false);
	const [deliveredToOptions, updateDeliveryOptions] = useState([]);
	const [modalType, updateModalType] = useState("post");
	// eslint-disable-next-line
	const [ccList, updateCCList] = useState([]);
	// eslint-disable-next-line
	const [invitedEmails, updateInvitedEmails] = useState([]);
	// eslint-disable-next-line
	const [projectName, updateProjectName] = useState("");
	// eslint-disable-next-line
	const [revealPrice, updateRevealPrice] = useState(false);
	// eslint-disable-next-line
	const [publishToRelevant, updatePublishToRelevant] = useState(false);
	const [hoveredRow, updateHoveredRow] = useState(null);
	const [isDeleteRowModal, updateDeleteRowModal] = useState(false);
	const [deletedIndex, updateDeletedIndex] = useState(null);
	const [deletedRowsList, updateDeleteRowsList] = useState([]);
	const [indexState, updateIndexState] = useState(false);
	useEffect(() => {
		let options = [];
		getDeliverdOptions(
			currentLanguageId,
			(success) => {
				success.data.forEach((data) => {
					options.push({
						label: data.name,
						value: data.id,
					});
				});
				updateDeliveryOptions(options);
			},
			(fail) => {
				console.log(fail);
			}
		);
	}, [currentLanguageId]);

	var index = {
		item: null,
		notes: null,
		description: null,
		quantity: null,
		unit: null,
		categoryId: null,
	};

	const { Option } = Select;

	const onDeleteRow = () => {
		let tableData = dataSource;

		if (tableData[deletedIndex].rfqDetailId) {
			updateDeleteRowsList([
				...deletedRowsList,
				tableData[deletedIndex].rfqDetailId,
			]);
		}
		tableData.splice(deletedIndex, 1);

		updateDataSource(tableData);
		updateDeleteRowModal(false);
		updateIndexState(true);
	};

	function handleCategoriesChange(optionId, rowIndex) {
		let data = [...dataSource];
		data[rowIndex].categoryId = optionId;
		updateDataSource(data);
	}

	function changeCategoryForAll(optionId, optionName) {
		let data = [...dataSource];
		data.forEach((row) => {
			row.categoryId = optionId;
		});

		updateDataSource(data);
		setAllCategoryName(optionName);
	}

	function handleIncludeInstallation(e, rowIndex) {
		let data = [...dataSource];
		if (installAll && !e.target.checked) {
			updateInstallAll(false);
		}

		data[rowIndex].includeInstallation = e.target.checked;
		updateDataSource(data);
	}
	function handleInstallAll(e) {
		updateInstallAll(!installAll);

		let data = [...dataSource];
		data.forEach((row, rowIndex) => {
			data[rowIndex].includeInstallation = e.target.checked;
			updateDataSource(data);
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
				item: null,
				notes: "",
				description: "",
				quantity: 1,
				unit: "",
				preferredBrands: "",
				includeInstallation: false,
				actionStatus: 1,
				itemDocuments: "",
			},
		]);
		updateIndexState(true);
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
		updateModalType("post");

		const hasNoCat = dataSource.every((data) => {
			return data.categoryId === undefined;
		});
		if (hasNoCat) {
			updateNotContainCategory(true);
		} else {
			updateNotContainCategory(false);
		}
		if (
			address.length === 0 ||
			recievingOffersDate === null ||
			deliveryDate === null ||
			hasNoCat
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
						// case "item":
						// case "Item No.":
						// case "code":
						// case "code No.":
						// case "section":
						// case "section No.":
						// case "رقم":
						// case "الرقم":
						// case "البند":
						// case "بند":
						// case "رقم البند": {
						// 	index.item = itemIndex;
						// 	break;
						// }
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
											quantity:
												typeof name[index.quantity] === "string" ||
												name[index.quantity] === undefined
													? 1
													: name[index.quantity],
											includeInstallation: false,
											preferredBrands: null,
											itemDocuments: "",
										},
									]);
								}
							});
						}
					});
				});
				updateIndexState(true);
			}
		});
	};

	useEffect(() => {
		let data = [];
		for (let index = 0; index <= 4; index++) {
			data.push({
				key: index,
				item: "",
				notes: "",
				description: "",
				quantity: 1,
				unit: "",
				preferredBrands: "",
				includeInstallation: false,
				itemDocuments: "",
			});
		}
		updateIndexState(true);
		updateDataSource(data);

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

	useEffect(() => {
		if (indexState) {
			updateIndexState(false);
			let tableData = dataSource;
			tableData.forEach((data, dataIndex) => {
				data.item = dataIndex;
			});
			updateDataSource(tableData);
		}
	}, [indexState, dataSource]);

	const handleUploadItemDoc = (e) => {
		const documentfile = e.target.files[0];
		let file = new FormData();
		file.append("image", documentfile);
		GetImagePath(
			file,
			(success) => {
				let tableData = [...dataSource];
				tableData[hoveredRow].itemDocuments = success.data;
				updateDataSource(tableData);
			},
			(fail) => {
				console.log(fail);
			}
		);
	};

	const columns = [
		{
			title: currentLocal.buyerHome.item,
			dataIndex: "item",
			key: "item",
			render: (item, record, index) => {
				return (
					<div className="d-flex">
						<img
							src={Garbage}
							alt="Garbage"
							className={
								index === hoveredRow
									? "cursorPointer showshowGarbage"
									: "cursorPointer hideGarbage"
							}
							onClick={() => {
								updateDeleteRowModal(true);
								updateDeletedIndex(index);
							}}
						/>
						{/* <textarea
							type="text"
							onChange={(e) => {
								let data = [...dataSource];
								data[selectedRow].item = e.target.value;
								updateDataSource(data);
							}}
							className="form-control"
							value={item}
							disabled={
								id !== "new" && record.actionStatus !== 1 ? true : false
							}
						/> */}
						<div>{item}</div>
					</div>
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
					<input
						type="number"
						alt="quantity"
						onChange={(e) => {
							let data = [...dataSource];
							data[selectedRow].quantity = e.target.value;
							updateDataSource(data);
						}}
						className={"form-control"}
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
			dataIndex: "categoryId",
			key: "categoryId",
			render: (categoryId, record, rowIndex) => {
				return (
					<Select
						style={{ width: "100%" }}
						defaultValue={categoryId}
						placeholder={
							allCategoryName
								? allCategoryName
								: currentLocal.buyerHome.selectCategory
						}
						onChange={(optionId, x) => {
							handleCategoriesChange(optionId, rowIndex);
						}}
						className="selectCategory"
					>
						{categoriesOption.map((category, key) => {
							return (
								<Option value={category.id} key={key}>
									{category.name}
								</Option>
							);
						})}
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
			title: currentLocal.buyerHome.itemDocuments,
			dataIndex: "itemDocuments",
			key: "itemDocuments",
			render: (itemDocuments, item) => {
				return (
					<div>
						{itemDocuments.length ? (
							<a href={baseUrl + itemDocuments}>
								{itemDocuments.split(" ")[1]}
							</a>
						) : (
							<div>
								<input
									type={"file"}
									className="d-none"
									id="itemDocument"
									onChange={(e) => {
										handleUploadItemDoc(e);
									}}
								/>
								<label className="d-flex cursorPointer" htmlFor="itemDocument">
									<div className="mx-2">{currentLocal.buyerHome.addFile}</div>
									<img src={documents} alt="documents" />
								</label>
							</div>
						)}
					</div>
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

	return (
		<div className="ppl ppr my-4 RFQTable">
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
						<img src={addIcon} alt="addIcon" className="mx-3" />
						<label className="primary-color">
							{currentLocal.buyerHome.addNewPackage}
						</label>
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
							placeholder={currentLocal.buyerHome.selectCategory}
							onChange={(optionId, record) => {
								changeCategoryForAll(optionId, record.children);
							}}
							className={notContainCategory ? "alertSign" : ""}
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
						<Checkbox onChange={handleInstallAll} checked={installAll} />
					</div>
				</div>
			</div>
			{newItemAdded && (
				<Alert className="text-center">
					{currentLocal.buyerHome.newItemAdded}
				</Alert>
			)}
			<Table
				key={dataSource}
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
						onMouseEnter: (event) => {
							updateHoveredRow(rowIndex);
						},
						onMouseLeave: (event) => {
							updateHoveredRow(null);
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
								options={deliveredToOptions}
								onChange={handleDeliveredTo}
								value={deliveredTo}
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
						<div className="my-3 cursorPointer">
							<img
								src={addIcon}
								alt="addIcon"
								className="mx-3"
								onClick={openCCModal}
							/>
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
								value={recievingOffersDate && moment(recievingOffersDate)}
								defaultPickerValue={
									recievingOffersDate && moment(recievingOffersDate)
								}
							/>
						</div>
						<div className="my-3 datePickerContainer">
							<label className=" primary-color">
								{currentLocal.buyerHome.deliveryDate}
							</label>
							{moment(deliveryDate) && (
								<DatePicker
									suffixIcon={<img src={datePickerSuffix} alt="suffixIcon" />}
									onChange={(date, dateString) => setDeliveryDate(dateString)}
									disabledDate={disabledDeliveryDate}
									placeholder={currentLocal.buyerHome.selectDate}
									className={
										alert && deliveryDate === null ? "alertSign" : "datePicker"
									}
									allowClear={false}
									value={deliveryDate && moment(deliveryDate)}
									defaultPickerValue={deliveryDate && moment(deliveryDate)}
								/>
							)}
						</div>
					</div>
					<button className="button-primary native" onClick={handleConfirm}>
						{currentLocal.buyerHome.confirm}
					</button>
					<PostRFQModal
						isModalVisible={isModalVisible}
						onCancel={() => toggleModal(!isModalVisible)}
						modalType={modalType}
						deadlineDate={recievingOffersDate}
						deliveryDate={deliveryDate}
						deliveredTo={deliveredTo}
						rfqDetails={dataSource}
						address={address}
						ccColluguesProp={ccList}
						invitedEmailsProp={invitedEmails}
						projectNameProp={projectName}
						revealPriceProp={revealPrice}
						publishToReleventProp={publishToRelevant}
						deletedRowsList={deletedRowsList}
					/>
					{isDeleteRowModal && (
						<DeleteModal
							isModalVisible={isDeleteRowModal}
							onCancel={() => {
								updateDeleteRowModal(false);
							}}
							onDeleteRow={onDeleteRow}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default CreateRFQ;
