import React, { useState } from "react";
import { Table, Dropdown, Menu } from "antd";
import { PDFExport } from "@progress/kendo-react-pdf";
import { useSelector } from "react-redux";
import view from "../../../../../Resources/Assets/View.svg";
import star from "../../../../../Resources/Assets/star (1).svg";
import chat from "../../../../../Resources/Assets/chat.svg";
import download from "../../../../../Resources/Assets/direct-download.svg";
import share from "../../../../../Resources/Assets/share (5).svg";
import SingleRFQModal from "../SingleRFQModal/SingleRFQModal";
// import {
// 	EmailShareButton,
// 	FacebookShareButton,
// 	LinkedinShareButton,
// 	TwitterShareButton,
// 	WhatsappShareButton,
// } from "react-share";
import "./MyRFQs.css";

function MyRFQs({ buyerRFQs }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [currentPage, setCurrentPage] = useState(1);
	const [singleRFQModalState, updateSingleRFQModal] = useState(false);
	const [rfqId, updateRfqId] = useState(null);
	const [companyName, updateCompanyName] = useState("");
	const shareOffer = () => {
		alert("bye");
	};
	const location = "bottomRight";
	const liveMenu = (
		<Menu>
			<Menu.Item
				key="0"
				onClick={() => {
					updateSingleRFQModal(true);
				}}
			>
				<img src={view} alt="acceptOffer" />
				<span className="acceptOffer">{currentLocal.profilePage.view}</span>
			</Menu.Item>
		</Menu>
	);

	const endMenu = (
		<Menu>
			<Menu.Item
				key="1"
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
				key="1"
				onClick={() => {
					alert("hi 3");
				}}
			>
				<img src={star} alt="deletee" className="mx-1" />
				<span className="mx-1">{currentLocal.profilePage.rateNow}</span>
			</Menu.Item>
		</Menu>
	);

	const columns = [
		{
			title: currentLocal.profilePage.projectName,
			dataIndex: "projectName",
			key: "projectName",
		},

		{
			title: currentLocal.profilePage.compSuppName,
			dataIndex: "companyName",
			key: "companyName",
		},
		{
			title: currentLocal.profilePage.status,
			dataIndex: "status",
			key: "status",
		},
		{
			title: currentLocal.profilePage.note,
			dataIndex: "notes",
			key: "notes",
		},
		{
			title: currentLocal.profilePage.actionList,
			dataIndex: "list",
			key: "list",
			render: (list, _) => {
				return (
					<Dropdown.Button
						overlay={_.status === "Live" ? liveMenu : endMenu}
						trigger={["click"]}
						onClick={(e) => e.preventDefault()}
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
	const handleCancelRFQModal = () => {
		updateSingleRFQModal(false);
	};
	return (
		<div className="myRFQs my-4">
			<div className="p-4 d-flex justify-content-between ">
				<h6 className="title">{currentLocal.profilePage.myRFQs}</h6>
				<div>
					{/* <EmailShareButton onClick={() => {}} openShareDialogOnClick url={"x"}>
					</EmailShareButton> */}

					<img
						src={share}
						alt="share"
						className="mx-4 cursorPointer "
						// onClick={shareOffer}
					/>

					<img
						src={download}
						alt="download"
						onClick={exportPDFWithComponent}
						className="cursorPointer"
					/>
				</div>
			</div>
			<PDFExport
				ref={pdfExportComponent}
				paperSize="auto"
				margin={40}
				fileName={`My RFQs table`}
				author="shayyek"
			>
				<Table
					className="table-striped-rows"
					dataSource={buyerRFQs}
					columns={columns}
					scroll={{ x: "calc(100wh - 4em)" }}
					pagination={{
						position: [location],
						total: buyerRFQs.length,
						current: currentPage,
						pageSize: 5,
						hideOnSinglePage: true,
						onChange: (page, pageSize) => {
							setCurrentPage(page);
						},
					}}
					onRow={(record, rowIndex) => {
						return {
							onClick: (event) => {
								updateRfqId(record.rfqId);
								updateCompanyName(record.companyName);
							},
						};
					}}
				/>
			</PDFExport>

			{singleRFQModalState && (
				<SingleRFQModal
					isModalVisible={singleRFQModalState}
					onCancel={handleCancelRFQModal}
					rfqId={rfqId}
					parent="buyerProfile"
					companyName={companyName}
				/>
			)}
		</div>
	);
}

export default MyRFQs;
