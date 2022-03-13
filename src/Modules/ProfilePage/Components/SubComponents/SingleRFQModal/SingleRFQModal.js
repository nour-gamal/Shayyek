import { useEffect, useState } from "react";
import { Modal, Table, Select } from "antd";
import { useSelector } from "react-redux";
import { DatePicker } from "antd";
import {
	GetBuyerRFQ,
	getCategories,
	fillRFQ,
	GetFilledRFQOfferDetails,
	BuyerAcceptRFQ,
} from "../../../../Home/network";
import { getRFQDraftedForSupplierAndContractor } from "../../../network";

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
	const [buyerName, updateBuyerName] = useState("");
	const [companyAddress, updateAddress] = useState("");
	const [deliveryDate, updateDeliveryDate] = useState("");
	// const [isSubmitClicked, updateSubmitClicked] = useState(false);
	const [companyNamee, updateCompanyNamee] = useState("");

	useEffect(() => {}, [fillRFQId]);

	useEffect(() => {
		if (parent === "supplierHome" && !fillRFQId) {
			console.log("supplierHome here");
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
		} else if (parent === "offersTable") {
			let body = {
				languageId: currentLanguageId,
				fillRFQHeaderId: fillRFQId,
			};
			GetFilledRFQOfferDetails(
				body,
				(success) => {
					updateRFQDetails(success.data.filledAndRFQDetails);
					updateAddress(success.data.deliveryAddress);
					updateDeliveryDate(success.data.deliveryDate);
					updateBuyerName(success.data.supplierContractorName);
					updateCompanyNamee(success.data.companyName);
				},
				(fail) => {
					console.log(fail);
				}
			);
		} else if (fillRFQId) {
			getRFQDraftedForSupplierAndContractor(fillRFQId, (success) => {
				if (success.success) {
					updateRFQDetails(success.data.rfqDraftedDetails);
					updateAddress(success.data.address);
					updateDeliveryDate(success.data.deliveryDate);
					updateBuyerName(success.data.buyerName);
				}
			});
		}
	}, [rfqId, parent, currentLanguageId, fillRFQId]);

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
			<div className="d-flex singleRFQModal flex-1">
				<div>
					<div className="d-flex justify-content-between f-14 primary-color actionsSection">
						<div>
							<div className="my-2">
								{parent === "buyerProfile" || parent === "supplierHome"
									? currentLocal.profilePage.buyerName
									: currentLocal.profilePage.supplierContractorName}
								:{" "}
								{parent === "supplierHome" || parent === "offersTable"
									? buyerName
									: rfqDetails.supplierContractorName}
							</div>

							{parent === "supplierHome" ? (
								<div className="my-2 d-flex">
									{currentLocal.supplierHome.paymentTerms} {" : "}
									<input
										type="text"
										className="form-control"
										onChange={(e) => {
											let rfqArr = [...rfqDetails];
											rfqArr.forEach((detail, detailIndex) => {
												rfqArr[detailIndex].paymentTerms = e.target.value;
											});
											updateRFQDetails(rfqArr);
										}}
									/>
								</div>
							) : (
								<div className="my-2">
									{currentLocal.profilePage.companyName} {" : "}
									{parent === "offersTable" ? companyNamee : companyName}
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
