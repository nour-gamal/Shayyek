import { useEffect, useState } from "react";
import { Modal, Table, Select } from "antd";
import { useSelector } from "react-redux";
import { DatePicker } from "antd";
import closeIcon from "../../../../../Resources/Assets/closeIcon.svg";
import {
	getCategories,
	fillRFQ,
	BuyerAcceptRFQ,
} from "../../../../Home/network";
import QAndADropdown from "../QAndADropdown/QAndADropdown";
import Lottie from "react-lottie-player";
import questionImg from "../../../../../Resources/Assets/questions.json";
import "./SingleRFQModal.css";

function SingleRFQModal({
	isModalVisible,
	onCancel,
	rfqId,
	fillRFQId,
	parent,
	companyName,
	recallGetRFQ,
}) {
	const { Option } = Select;
	const { currentLocal, currentLanguageId } = useSelector(
		(state) => state.currentLocal
	);
	const [rfqDetails, updateRFQDetails] = useState([]);
	const [categoriesOption, setCategoriesOption] = useState([]);

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

	var columns = [
		{
			title: currentLocal.buyerHome.item,
			dataIndex: parent === "offersTable" ? "itemProductName" : "item",
			key: parent === "offersTable" ? "itemProductName" : "item",
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
			dataIndex: parent === "offersTable" ? "filledNotes" : "notes",
			key: parent === "offersTable" ? "filledNotes" : "notes",
		},
	];

	function disabledOffersDate(current) {
		return current && current.valueOf() < Date.now();
	}
	if (
		(parent === "supplierHome" && rfqDetails.length > 0) ||
		(parent === "offersTable" && rfqDetails.length > 0)
	) {
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
				render: (unitPrice, record, rowIndex) => {
					if (parent === "offersTable") {
						return <div>{unitPrice}</div>;
					} else {
						return (
							<input
								type="number"
								className="form-control"
								onChange={(e) => {
									var rfqArr = [...rfqDetails];
									rfqArr[rowIndex] = {
										...rfqArr[rowIndex],
										unitPrice: parseInt(e.target.value),
									};
									updateRFQDetails(rfqArr);
								}}
							/>
						);
					}
				},
			},
			{
				title: currentLocal.supplierHome.totalPrice,
				dataIndex: "totalPrice",
				key: "totalPrice",
				render: (totalPrice, record, rowIndex) => {
					if (parent === "offersTable") {
						return <div>{totalPrice}</div>;
					} else {
						return (
							<input
								type="number"
								className="form-control"
								onChange={(e) => {
									var rfqArr = [...rfqDetails];
									rfqArr[rowIndex] = {
										...rfqArr[rowIndex],
										totalPrice: parseInt(e.target.value),
									};
									updateRFQDetails(rfqArr);
								}}
							/>
						);
					}
				},
			},
			{
				title: currentLocal.supplierHome.deliveryDate,
				dataIndex: "deliveryDate",
				key: "deliveryDate",
				render: (deliveryDate, record, rowIndex) => {
					if (parent === "offersTable") {
						return <div>{deliveryDate}</div>;
					} else {
						return (
							<DatePicker
								onChange={(date, dateString) => {
									var rfqArr = [...rfqDetails];
									rfqArr[rowIndex] = {
										...rfqArr[rowIndex],
										deliveryDate: dateString,
									};
									updateRFQDetails(rfqArr);
								}}
								className="form-control"
								disabledDate={disabledOffersDate}
							/>
						);
					}
				},
			},
			{
				title: currentLocal.supplierHome.paymentTerms,
				dataIndex: "paymentTerms",
				key: "paymentTerms",
				render: (paymentTerms, record, rowIndex) => {
					if (parent === "offersTable") {
						return <div>{paymentTerms}</div>;
					} else {
						return (
							<input
								type="text"
								className="form-control"
								value={paymentTerms}
								onChange={(e) => {
									var rfqArr = [...rfqDetails];
									rfqArr[rowIndex] = {
										...rfqArr[rowIndex],
										paymentTerms: e.target.value,
									};
									updateRFQDetails(rfqArr);
								}}
							/>
						);
					}
				},
			},
		];
	}

	const submitRFQ = (isDraft) => {
		// updateSubmitClicked(true);
		let data = {
			isDraft: isDraft,
			rfqId: rfqId,
			rfqDetailsRequests: rfqDetails,
		};
		fillRFQ(
			data,
			(success) => {
				if (success.success) {
					onCancel();
					recallGetRFQ();
				}
			},
			(fail) => {
				console.log(fail);
			}
		);
	};
	const handleAcceptOffer = () => {
		let body = {
			RFQId: rfqId,
			filledRFQId: fillRFQId,
		};
		BuyerAcceptRFQ(
			body,
			(success) => {
				if (success.success) {
					onCancel();
				}
			},
			(fail) => {
				console.log(fail);
			}
		);
	};

	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-lg singleRFQContainer"
		>
			<figure className="closeIconFigure">
				<img
					src={closeIcon}
					alt="closeIcon"
					className="cursorPointer"
					onClick={onCancel}
				/>
			</figure>
			<div className="d-flex singleRFQModal flex-1">
				<div className="d-flex">
					<div className="info d-flex align-items-center">
						<div className="mx-4">
							{currentLocal.offerTable.buyerName} : test
						</div>
						<div className="mx-4">
							{currentLocal.offerTable.projectOwner} : test
						</div>
						<div className="mx-4">
							{currentLocal.offerTable.projectContractor} : test
						</div>
						<div className="mx-4">
							{currentLocal.offerTable.projectName} : test
						</div>
						<div className="mx-4">
							{currentLocal.offerTable.projectConsultant} : test
						</div>
						<div className="mx-4">
							{currentLocal.offerTable.deliveryDate} : test
						</div>
						<div className="mx-4">
							{currentLocal.offerTable.deliveryAddress} : test
						</div>
					</div>
					<div className="qAndAWall d-flex justify-content-end">
						<figure>
							<Lottie loop animationData={questionImg} play />
						</figure>
						<div className="text">{currentLocal.offerTable.QANDAWALL}</div>
						<div className="invitations_number mx-2">2</div>
					</div>
					<QAndADropdown />
				</div>

				<div>
					<Table
						// key={rfqDetails}
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
					{parent === "supplierHome" ? (
						<div className="btn-container mt-2 d-flex">
							<button
								className="button-secondary mx-1"
								onClick={() => submitRFQ(true)}
							>
								{currentLocal.supplierHome.saveAsDraft}
							</button>
							<button
								className="button-primary mx-1"
								onClick={() => submitRFQ(false)}
							>
								{currentLocal.supplierHome.submit}
							</button>
						</div>
					) : (
						parent === "offersTable" && (
							<div className="btn-container  d-flex">
								<button
									className="button-secondary mx-1"
									onClick={() => onCancel()}
								>
									{currentLocal.offerTable.cancel}
								</button>
								<button
									className="button-primary mx-1"
									onClick={handleAcceptOffer}
								>
									{currentLocal.offerTable.acceptOffer}
								</button>
							</div>
						)
					)}
				</div>
			</div>
		</Modal>
	);
}

export default SingleRFQModal;
