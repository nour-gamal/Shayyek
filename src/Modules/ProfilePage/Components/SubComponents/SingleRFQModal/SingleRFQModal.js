import { useEffect, useState } from "react";
import {
	Input,
	Modal,
	Row,
	Col,
	Table,
	Radio,
	DatePicker,
	Menu,
	Dropdown,
	Button,
} from "antd";
import { useSelector } from "react-redux";
import closeIcon from "../../../../../Resources/Assets/closeIcon.svg";
import { fillRFQ, BuyerAcceptRFQ } from "../../../../Home/network";
import { GetImagePath } from "../../../../ProfilePage/network";
import Lottie from "react-lottie-player";
import questionImg from "../../../../../Resources/Assets/questions.json";
import download from "../../../../../Resources/Assets/direct-download.svg";
import documents from "../../../../../Resources/Assets/paperClip.svg";
import { saveAs } from "file-saver";
import { baseUrl } from "../../../../../Services";
import moment from "moment";
import FileErrorModal from "../../../../Home/BuyerHome/Components/FileErrorModal/FileErrorModal";
import pdfIcon from "../../../../../Resources/Assets/pdfs.png";
import docIcon from "../../../../../Resources/Assets/doc.svg";
import excel from "../../../../../Resources/Assets/excel.svg";
import autocad from "../../../../../Resources/Assets/autocad.svg";

import "./SingleRFQModal.css";
function SingleRFQModal({
	isModalVisible,
	onCancel,
	rfqId,
	fillRFQId,
	recallGetRFQ,
}) {
	const [loading, setLoading] = useState(false);
	const [radioValue, setRadioValue] = useState("yes");

	const { currentLocal, currentLanguageId } = useSelector(
		(state) => state.currentLocal
	);
	const [documentsList, updateDocumentsList] = useState([]);
	const [fileErrorModalState, updateFileErrorModalState] = useState(false);
	const [paymentTerms, updatePaymentTerms] = useState("");
	const [rfqDetails, updateRFQDetails] = useState([]);
	const [deliveryDate, updateDeliveryDate] = useState("");
	const [validityOfferDate, updateValidityOfferDate] = useState("");
	const onRadioChange = (e) => {
		setRadioValue(e.target.value);
	};

	const QAndAMenu = (
		<Menu>
			<Menu.Item>item 1</Menu.Item>
			<Menu.Item>item 2</Menu.Item>
			<Menu.Item>item 3</Menu.Item>
		</Menu>
	);
	var columns = [
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
			title: currentLocal.offerTable.unitPrice,
			dataIndex: "unitPrice",
			key: "unitPrice",
			render: (unitPrice, record, index) => {
				return (
					<Input
						type="number"
						onChange={(e) => {
							let rfqDetailss = [...rfqDetails];
							rfqDetails[index].unitPrice = e.target.value;
							updateRFQDetails(rfqDetailss);
						}}
					/>
				);
			},
		},
		{
			title: currentLocal.offerTable.totalPrice,
			dataIndex: "totalPrice",
			key: "totalPrice",
			render: (totalPrice, record) => {
				return <>{record.unitPrice * record.quantity}</>;
			},
		},
		{
			title: currentLocal.offerTable.itemDocuments,
			dataIndex: "itemDocuments",
			key: "itemDocuments",
			render: (itemDocuments, record) => {
				return (
					<>
						<img
							src={download}
							alt="download"
							onClick={() => {
								saveAs(itemDocuments);
							}}
						/>
					</>
				);
			},
		},
		{
			title: currentLocal.offerTable.uploadDocuments,
			dataIndex: "uploadDocuments",
			key: "uploadDocuments",
			render: (uploadDocuments, record, index) => {
				return (
					<div>
						{uploadDocuments.length ? (
							<a href={baseUrl + uploadDocuments}>
								{uploadDocuments.split(" ")[1]}
							</a>
						) : (
							<div className="text-center">
								<input
									type={"file"}
									className="d-none"
									id="itemDocument"
									onChange={(e) => {
										handleUploadItemDoc(e, index);
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
			render: (notes, record, index) => {
				return (
					<Input
						type="text"
						onChange={(e) => {
							let rfqDetailss = [...rfqDetails];
							rfqDetailss[index].notes = e.target.value;
							updateRFQDetails(rfqDetailss);
						}}
					/>
				);
			},
		},
	];

	function disabledDeliveryDateOffersDate(current) {
		return (
			current &&
			(current.valueOf() < Date.now() ||
				current.valueOf() >
					moment()
						.add(4, "days")
						.valueOf())
		);
	}
	function disabledOfferValidityDate(current) {
		return (
			current &&
			(current.valueOf() < Date.now() ||
				current.valueOf() >
					moment()
						.add(4, "days")
						.valueOf())
		);
	}
	const handleUploadItemDoc = (e, index) => {
		var isValidExtensions = /xlsx|xlsm|xlsb|xltx|xltm|xls|xlt|xls|xml|xlam|xlw|xlr|xla|dwg|DOC|PDF/.test(
			e.target.files[0].type
		);
		if (!isValidExtensions) {
			updateFileErrorModalState(true);
			return 0;
		}

		setLoading(true);
		const documentfile = e.target.files[0];
		let file = new FormData();
		file.append("image", documentfile);
		file.append("status", 4);
		GetImagePath(
			file,
			(success) => {
				setLoading(false);
				let tableData = [...rfqDetails];
				tableData[index].uploadDocuments = success.data;
				updateRFQDetails(tableData);
			},
			(fail) => {
				console.log(fail);
			}
		);
	};
	const onDeliveryDateChange = (date, dateString) => {
		updateDeliveryDate(dateString);
	};
	const onOfferValidityChange = (date, dateString) => {
		updateValidityOfferDate(dateString);
	};
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

					<Dropdown
						overlay={QAndAMenu}
						placement="bottomLeft"
						trigger={["click"]}
						popupClassName="QAndAMenu"
					>
						<div className="qAndAWall d-flex justify-content-end">
							<figure>
								<Lottie loop animationData={questionImg} play />
							</figure>
							<div className="text">{currentLocal.offerTable.QANDAWALL}</div>
							<div className="invitations_number mx-2">2</div>
						</div>
					</Dropdown>
					{/* <QAndADropdown /> */}
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
						loading={loading}
					/>
					<Row>
						<Col xs={24} md={16}>
							<div className="d-flex my-4">
								<label className="label">{currentLocal.offerTable.notes}</label>
								<div className="mx-2">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
									corporis veritatis obcaecati necessitatibus amet voluptate
									debitis, delectus eaque illum perspiciatis vel sed nam quam
									explicabo dolores ex? Dicta, dolores nam?
								</div>
							</div>
							<div className="d-flex my-4">
								<label className="label">
									{currentLocal.offerTable.priceIncludingVAT}
								</label>
								<div className="mx-2">
									<Radio.Group onChange={onRadioChange} value={radioValue}>
										<Radio value={"yes"} className="mx-2">
											{currentLocal.offerTable.yes}
										</Radio>
										<Radio value={"no"} className="mx-2">
											{currentLocal.offerTable.no}
										</Radio>
									</Radio.Group>
								</div>
							</div>
							<div className="d-flex my-4">
								<label className="label">
									{currentLocal.offerTable.paymentTerms}
								</label>
								<Input
									className="mx-2"
									type={"text"}
									onChange={(e) => {
										updatePaymentTerms(e.target.value);
									}}
									value={paymentTerms}
								/>
							</div>
						</Col>
						<Col xs={24} md={8}>
							<div className="d-flex align-items-center my-2">
								<label className="label">
									{currentLocal.offerTable.deliveryDate}
								</label>
								<div className="mx-2 flex-1">
									<DatePicker
										onChange={onDeliveryDateChange}
										className="form-control"
										disabledDate={disabledDeliveryDateOffersDate}
									/>
								</div>
							</div>
							<div className="d-flex align-items-center my-2">
								<label className="label">
									{currentLocal.offerTable.offerValidity}
								</label>
								<div className="mx-2 flex-1">
									<DatePicker
										onChange={onOfferValidityChange}
										className="form-control"
										disabledDate={disabledOfferValidityDate}
									/>
								</div>
							</div>
						</Col>
					</Row>
				</div>
				<div className="d-flex align-items-center">
					{documentsList.length > 0 && (
						<label className="label">
							{currentLocal.offerTable.projectDocuments}
						</label>
					)}
					<div className="documents-list-area d-flex px-2">
						{documentsList.map((doc, docIndex) => {
							let type = doc.type.includes("pdf")
								? pdfIcon
								: doc.type.includes("dwg")
								? autocad
								: doc.type.includes("doc")
								? docIcon
								: excel;
							return (
								<div className="d-flex m-2">
									<img src={type} alt="pdf" className="mx-2" />
									<div>
										<div className="fileName">{doc.name}</div>
										<div className="fileSizeBox d-flex align-items-center justify-content-between">
											<div>
												<span className="fileSize">
													{(doc.size / (1024 * 1024)).toFixed(3)}
												</span>
												<span>MB</span>
											</div>
											<img
												src={download}
												alt="download"
												className="cursorPointer mx-1"
												onClick={() => {
													saveAs(doc.url);
												}}
											/>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div>
					<div className="btn-container  d-flex">
						<button
							className="button-secondary mx-1"
							onClick={() => onCancel()}
						>
							{currentLocal.offerTable.saveAsDraft}
						</button>
						<button className="button-primary mx-1" onClick={handleAcceptOffer}>
							{currentLocal.offerTable.submit}
						</button>
					</div>
				</div>
			</div>
			<FileErrorModal
				isModalVisible={fileErrorModalState}
				onCancel={() => {
					updateFileErrorModalState(!fileErrorModalState);
				}}
			/>
		</Modal>
	);
}

export default SingleRFQModal;
