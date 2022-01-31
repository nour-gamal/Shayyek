import React, { useState, useEffect } from "react";
import { Table, Dropdown, Menu } from "antd";
import { PDFExport } from "@progress/kendo-react-pdf";
import acceptOffer from "../../../../../Resources/Assets/acceptOffer.svg";
import deletee from "../../../../../Resources/Assets/deletee.svg";
import chat from "../../../../../Resources/Assets/chat.svg";
import star from "../../../../../Resources/Assets/star (1).svg";
import download from "../../../../../Resources/Assets/direct-download.svg";
import share from "../../../../../Resources/Assets/share (5).svg";
import ReactTooltip from "react-tooltip";
import { useSelector } from "react-redux";
import {
	GetBuyerAddedRFQOffers,
	BuyerAcceptRFQ,
	BuyerRejectOffer,
} from "../../../network";
import Navbar from "../../../../Common/Navbar/Navbar";
import Footer from "../../../../Common/Footer/Footer";
import "./OffersTable.css";

function OfferTable(props) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	const [currentPage, setCurrentPage] = useState(1);
	const [rfqDetails, updateRFQDetails] = useState([]);
	const [selectedRow, setSelectedRow] = useState(null);
	const { id } = props.match.params;
	useEffect(() => {
		GetBuyerAddedRFQOffers(
			id,
			currentLanguageId,
			(success) => {
				updateRFQDetails(success.data);
			},
			(fail) => {
				console.log(fail);
			}
		);
	}, [id, currentLanguageId]);

	const getBuyerAddedRFQs = () => {
		GetBuyerAddedRFQOffers(
			id,
			currentLanguageId,
			(success) => {
				updateRFQDetails(success.data);
			},
			(fail) => {
				console.log(fail);
			}
		);
	};
	const shareOffer = () => {
		alert("bye");
	};
	const bottom = "bottomRight";
	const menu = (
		<Menu>
			<Menu.Item key="0" onClick={(e) => {}}>
				<img src={acceptOffer} alt="acceptOffer" />
				<span className="acceptOffer">
					{currentLocal.offerTable.acceptOffer}
				</span>
			</Menu.Item>
			<Menu.Item
				key="1"
				onClick={(e) => {
					let body = {
						RFQId: selectedRow.RFQId,
						filledRFQId: selectedRow.filledRFQId,
					};
					BuyerAcceptRFQ(body, (success) => {
						console.log(success);
					});
				}}
			>
				<img src={acceptOffer} alt="acceptOffer" />
				<span className="acceptOffer">
					{currentLocal.offerTable.acceptOffer}
				</span>
			</Menu.Item>
			<Menu.Item
				key="2"
				onClick={() => {
					alert("hi 2");
				}}
			>
				<img src={chat} alt="chat" />
				<span className="chat">
					{currentLocal.offerTable.startConversation}
				</span>
			</Menu.Item>
			<Menu.Item
				key="3"
				className={currentLocal.language !== "English" && "delete"}
				onClick={() => {
					let body = {
						supplierOrContractorId: selectedRow.applicantId,
					};
					BuyerRejectOffer(body, (success) => {
						if (success.success) {
							getBuyerAddedRFQs();
						}
					});
				}}
			>
				<img src={deletee} alt="deletee" />
				<span className="delete">{currentLocal.offerTable.delete}</span>
			</Menu.Item>{" "}
		</Menu>
	);

	const columns = [
		{
			title: currentLocal.offerTable.name,
			dataIndex: "applicantName",
			key: "applicantName",
			className: "bordercol bottomBorderCol nameEmp",
		},

		{
			title: currentLocal.offerTable.company,
			dataIndex: "applicantCompany",
			key: "applicantCompany",
			className: "bordercol bottomBorderCol company",
			render: (company) => {
				return (
					<div className="shortText" data-tip={company}>
						{company}
					</div>
				);
			},
		},
		{
			title: currentLocal.offerTable.price,
			dataIndex: "totalPrice",
			key: "totalPrice",
			className: "bordercol bottomBorderCol price",
		},
		{
			title: currentLocal.offerTable.city,
			dataIndex: "applicantCity",
			key: "applicantCity",
			className: "bordercol bottomBorderCol city",
			render: (city) => {
				return (
					<div className="shortText" data-tip={city}>
						{city}
					</div>
				);
			},
		},
		{
			title: currentLocal.offerTable.paymentRequired,
			dataIndex: "appicantPaymentCondition",
			key: "appicantPaymentCondition",
			className: "bordercol bottomBorderCol PaymentConditions",
		},
		{
			title: currentLocal.offerTable.rating,
			dataIndex: "applicantRate",
			key: "applicantRate",
			className: "bordercol bottomBorderCol rating",
			render: (rate) => (
				<div className="d-flex align-items-center">
					<span>{rate}</span>
					<img src={star} alt="star" className="mx-1" />
				</div>
			),
		},
		{
			title: currentLocal.offerTable.volumeOfWorkFromShyeek,
			dataIndex: "applicantWorkVolumeOnShayyek",
			key: "applicantWorkVolumeOnShayyek",
			className: "bordercol bottomBorderCol valum",
		},
		{
			title: currentLocal.offerTable.note,
			dataIndex: "applicantNote",
			key: "applicantNote",
			className: "bordercol bottomBorderCol notes",
			render: (notes) => {
				return (
					<div className="shortText" data-tip={notes}>
						{notes}
					</div>
				);
			},
		},
		{
			title: currentLocal.offerTable.actionList,
			dataIndex: "list",
			key: "list",
			className: "bottomBorderCol",
			render: (list, _) => {
				return (
					<Dropdown.Button
						overlay={menu}
						trigger={["click"]}
						onClick={(e) => {
							e.preventDefault();
						}}
						onMouseEnter={() => {
							setSelectedRow(_);
						}}
					></Dropdown.Button>
				);
			},
		},
	];
	const pdfExportComponent = React.useRef(null);

	const exportPDFWithComponent = () => {
		if (pdfExportComponent.current) {
			pdfExportComponent.current.save();
		}
	};

	return (
		<section className="OfferTable">
			<Navbar />
			<div className="ppr ppl">
				<div className="py-4 d-flex justify-content-end mx-4">
					<img
						src={share}
						alt="share"
						className="mx-4 share"
						onClick={shareOffer}
					/>

					<img
						src={download}
						alt="download"
						onClick={exportPDFWithComponent}
						className="download"
					/>
				</div>
				<PDFExport
					ref={pdfExportComponent}
					paperSize="auto"
					margin={40}
					fileName={`RFQ ProjectName Response`}
					author="shayyek"
				>
					<Table
						className="table-striped-rows"
						dataSource={rfqDetails}
						columns={columns}
						scroll={{ x: "calc(100wh - 4em)" }}
						pagination={{
							position: [bottom],
							total: rfqDetails.length,
							current: currentPage,
							pageSize: 5,
							hideOnSinglePage: true,
							onChange: (page, pageSize) => {
								setCurrentPage(page);
							},
						}}
					/>
				</PDFExport>
				<div className="text-center">
					<ReactTooltip />
					<button className="button-primary my-2">
						{currentLocal.offerTable.makeOnlineSession}
					</button>
				</div>
			</div>
			<Footer />
		</section>
	);
}

export default OfferTable;
