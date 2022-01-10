import { useEffect, useState } from "react";
import { Modal, Table, Select } from "antd";
import { useSelector } from "react-redux";
import { GetBuyerRFQ, getCategories } from "../../../../Home/network";
import "./SingleRFQModal.css";

function SingleRFQModal({
	isModalVisible,
	onCancel,
	rfqId,
	parent,
	companyName,
}) {
	const { Option } = Select;
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	const [rfqDetails, updateRFQDetails] = useState([]);
	const [categoriesOption, setCategoriesOption] = useState([]);
	const [buyerName, updateBuyerName] = useState("");
	const [companyAddress, updateAddress] = useState("");
	const [deliveryDate, updateDeliveryDate] = useState("");
	useEffect(() => {
		GetBuyerRFQ(
			rfqId,
			(success) => {
				updateRFQDetails(success.data.rfqDetails);
				updateAddress(success.data.address);
				updateDeliveryDate(success.data.deliveryDate);
				updateBuyerName(success.data.buyerName);
			},
			(fail) => {
				console.log(fail);
			}
		);
	}, [rfqId, parent]);
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

	let columns = [
		{
			title: currentLocal.buyerHome.item,
			dataIndex: "item",
			key: "item",
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
			dataIndex: "categoryId",
			key: "categoryId",
			render: (categoryId, record, rowIndex) => {
				return (
					<Select
						style={{ width: "100%" }}
						defaultValue={categoryId}
						className="selectCategory"
						disabled={true}
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
		},
		{
			title: currentLocal.buyerHome.notes,
			dataIndex: "notes",
			key: "notes",
		},
	];
	if (parent === "supplierHome") {
		columns = columns.filter(
			(column) =>
				column.dataIndex !== "unit" &&
				column.dataIndex !== "categoryId" &&
				column.dataIndex !== "includeInstallation"
		);
		columns = [
			...columns,
			{
				title: currentLocal.supplierHome.unitPrice,
				dataIndex: "unitPrice",
				key: "unitPrice",
			},
			{
				title: currentLocal.supplierHome.totalPrice,
				dataIndex: "totalPrice",
				key: "totalPrice",
			},
			{
				title: currentLocal.supplierHome.deliveryDate,
				dataIndex: "deliveryDate",
				key: "deliveryDate",
			},
			{
				title: "",
				dataIndex: "percentage",
				key: "percentage",
			},
		];
	}
	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-lg"
		>
			<div className="d-flex singleRFQModal">
				<div>
					<div className="d-flex justify-content-between f-14 primary-color">
						<div>
							<div className="my-2">
								{parent === "buyerProfile" || parent === "supplierHome"
									? currentLocal.profilePage.buyerName
									: currentLocal.profilePage.supplierContractorName}
								:{" "}
								{parent === "buyerProfile"
									? buyerName
									: rfqDetails.supplierContractorName}
							</div>

							{parent === "supplierHome" ? (
								<div className="my-2">
									{currentLocal.supplierHome.paymentTerms} {" : "}
								</div>
							) : (
								<div className="my-2">
									{currentLocal.profilePage.companyName} {" : "} {companyName}
								</div>
							)}
						</div>
						<div>
							<div className="my-2">
								{currentLocal.profilePage.deliveryDate} {": "}
								{deliveryDate}
							</div>
							<div className="my-2">
								{currentLocal.profilePage.deliveryAddress} {": "}{" "}
								{companyAddress}
							</div>
						</div>
					</div>
					<Table
						key={rfqDetails}
						indentSize={300}
						columns={columns}
						dataSource={rfqDetails}
						className="my-4"
						scroll={{ x: true }}
						pagination={{
							total: rfqDetails.length,
							pageSize: 5,
							hideOnSinglePage: true,
						}}
					/>
				</div>
				<div>
					{parent === "supplierHome" && (
						<div className="btn-container mt-2 d-flex">
							<button className="button-secondary mx-1">
								{currentLocal.supplierHome.saveAsDraft}
							</button>
							<button className="button-primary mx-1">
								{currentLocal.supplierHome.submit}
							</button>
						</div>
					)}
				</div>
			</div>
		</Modal>
	);
}

export default SingleRFQModal;
