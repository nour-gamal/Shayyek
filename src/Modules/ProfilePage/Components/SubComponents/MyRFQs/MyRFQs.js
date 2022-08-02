import React, { useState, createRef, useEffect } from "react";
import { Table, Dropdown, Menu } from "antd";
import { PDFExport } from "@progress/kendo-react-pdf";
import { useSelector } from "react-redux";
import view from "../../../../../Resources/Assets/View.svg";
import star from "../../../../../Resources/Assets/star (1).svg";
//import chat from "../../../../../Resources/Assets/chat.svg";
import download from "../../../../../Resources/Assets/direct-download.svg";
import share from "../../../../../Resources/Assets/share (5).svg";
import SingleRFQModal from "../SingleRFQModal/SingleRFQModal";
import { useScreenshot } from "use-react-screenshot";
import { baseUrl } from "../../../../../Services";
import Whatsapp from "../../../../../Resources/Assets/whatsapp.svg";
import CopyLink from "../../../../../Resources/Assets/copyLink.svg";
import Email from "../../../../../Resources/Assets/email.svg";
import ChooseCompaniesToRateModal from "../Ratings/ChooseCompaniesToRateModal/ChooseCompaniesToRateModal";
import { GetImagePath } from "../../../network";
import { EmailShareButton, WhatsappShareButton } from "react-share";
import "./MyRFQs.css";
import { Link } from "react-router-dom";

function MyRFQs({ buyerRFQs }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [currentPage, setCurrentPage] = useState(1);
	const [singleRFQModalState, updateSingleRFQModal] = useState(false);
	const [rfqId, updateRfqId] = useState(null);
	const [companyName, updateCompanyName] = useState("");
	const [rateModal, updateRateModal] = useState(false);
	const [image, takeScreenshot] = useScreenshot();
	const pdfExportComponent = React.useRef(null);
	const [imageURL, updateImageURL] = useState(null);

	const shareOffer = () => {
		getImage();
	};
	useEffect(() => {
		if (image) {
			getBlobImg(image);
		}
	}, [image]);
	const getBlobImg = async (image) => {
		const blob = await fetch(image).then((res) => res.blob());
		// const blobUrl = window.URL.createObjectURL(blob);
		var file = new File([blob], `${new Date().getTime()}.png`);

		const data = new FormData();
		data.append("image", file);

		GetImagePath(
			data,
			(success) => {
				updateImageURL(baseUrl + success.data);
			},
			(fail) => {
				console.log(fail);
			}
		);
	};
	const location = "bottomRight";
	const liveMenu = (
		<Menu>
			<Menu.Item
				key="0"
			>
				<Link to={`/RFQSummary/${rfqId}`}>
					<img src={view} alt="acceptOffer" />
					<span className="acceptOffer">{currentLocal.profilePage.view}</span>
				</Link>
			</Menu.Item>
		</Menu>
	);

	const endMenu = (
		<Menu>
			<Menu.Item
				key="0"
			>
				<Link to={`/RFQSummary/${rfqId}`}>
					<img src={view} alt="acceptOffer" />
					<span className="acceptOffer">{currentLocal.profilePage.view}</span>
				</Link>
			</Menu.Item>
			<Menu.Item
				key="1"
				onClick={() => {
					updateRateModal(true);
				}}
			>
				<img src={star} alt="deletee" className="mx-1" />
				<span className="mx-1">{currentLocal.profilePage.rateNow}</span>
			</Menu.Item>
		</Menu>
	);
	const shareMenu = (
		<Menu>
			<Menu.Item key="1">
				<WhatsappShareButton
					url={imageURL}
					children={
						<div className="d-flex">
							<img src={Whatsapp} alt="Whatsapp" />
							<div className="mx-2">{currentLocal.profilePage.whatsapp}</div>
						</div>
					}
				/>
			</Menu.Item>
			<Menu.Item key="2">
				<EmailShareButton
					url={imageURL}
					children={
						<div className="d-flex">
							<img src={Email} alt="email" />
							<div className="mx-2">{currentLocal.profilePage.email}</div>
						</div>
					}
				/>
			</Menu.Item>
			<Menu.Item
				key="3"
				onClick={() => {
					navigator.clipboard.writeText(imageURL);
				}}
			>
				<div className="d-flex">
					<img src={CopyLink} alt="CopyLink" />
					<div className="mx-2">{currentLocal.profilePage.copyLink}</div>
				</div>
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
			title: currentLocal.profilePage.projectLocation,
			dataIndex: "projectLocation",
			key: "projectLocation",
		},
		{
			title: currentLocal.profilePage.projectOwner,
			dataIndex: "projectOwner",
			key: "projectOwner",
		},
		{
			title: currentLocal.profilePage.status,
			dataIndex: "status",
			key: "status",
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

	const exportPDFWithComponent = () => {
		if (pdfExportComponent.current) {
			pdfExportComponent.current.save();
		}
	};
	const handleCancelRFQModal = () => {
		updateSingleRFQModal(false);
	};
	const ref = createRef(null);

	const getImage = () => takeScreenshot(ref.current);
	return (
		<div className="myRFQs my-4" ref={ref}>
			<div className="p-4 d-flex justify-content-between ">
				<h6 className="title">{currentLocal.profilePage.myProjects}</h6>
				<div className="d-flex">
					<Dropdown.Button
						overlay={shareMenu}
						trigger={["click"]}
						onClick={(e) => e.preventDefault()}
						icon={<img src={share} alt="share" onClick={shareOffer} />}
					></Dropdown.Button>

					<img
						src={download}
						alt="download"
						onClick={exportPDFWithComponent}
						className="cursorPointer mx-4"
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
			{rateModal && (
				<ChooseCompaniesToRateModal
					onCancel={() => {
						updateRateModal(false);
					}}
					isModalVisible={rateModal}
					parent="myRFQTable"
				/>
			)}
		</div>
	);
}

export default MyRFQs;
