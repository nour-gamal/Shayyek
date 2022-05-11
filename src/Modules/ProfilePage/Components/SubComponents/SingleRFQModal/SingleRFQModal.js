import { useEffect, useState } from "react";
import { Input, Modal, Row, Col, Table, Radio } from "antd";
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
import FileErrorModal from "../../../../Home/BuyerHome/Components/FileErrorModal/FileErrorModal";
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
	const [fileErrorModalState, updateFileErrorModalState] = useState(false);
	const [paymentTerms, updatePaymentTerms] = useState("");
	const [rfqDetails, updateRFQDetails] = useState([
		{
			itemDocuments:
				"https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F_400x400.jpg",
			uploadDocuments: "",
			notes: "",
		},
	]);
	const onRadioChange = (e) => {
		setRadioValue(e.target.value);
	};
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

	function disabledOffersDate(current) {
		return current && current.valueOf() < Date.now();
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
								/>
							</div>
						</Col>
						<Col xs={24} md={8}>
							test
						</Col>
					</Row>
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
