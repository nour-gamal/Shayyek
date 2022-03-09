import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { GetWorkAddedBySupplierContractor } from "../../../network";
// components
import CloseIcon from "../../../../../Resources/Assets/closeIcon.svg";
import docIcon from "../../../../../Resources/Assets/docIcon.png";
import pdfIcon from "../../../../../Resources/Assets/pdfs.png";
import imageIcon from "../../../../../Resources/Assets/images.png";
import { Modal, Row, Col, Tooltip } from "antd";
//style
import "./ShowSinglePrevWorkModal.css";
function ShowSinglePrevWorkModal({
	isModalVisible,
	onCancel,
	selectedPrevWorkId,
	setSelectedPrevWorkId,
	toggleAddModalVisibilty,
	setEditableModalData,
	parent,
}) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [prevWorkData, setPrevWorkData] = useState(null);
	const mb = 1000000;
	useEffect(() => {
		// effect
		GetWorkAddedBySupplierContractor(
			selectedPrevWorkId,
			(success) => {
				if (success.success) {
					setPrevWorkData(success.data);
				}
			},
			(fail) => {}
		);
	}, [selectedPrevWorkId]);

	function editPrevWork() {
		onCancel(true);
		setEditableModalData(prevWorkData);
		toggleAddModalVisibilty(true);
	}

	function closeModal() {
		onCancel(true);
		setSelectedPrevWorkId(null);
	}

	return (
		prevWorkData && (
			<Modal
				title="Basic Modal"
				visible={isModalVisible}
				onCancel={() => {
					onCancel();
					setSelectedPrevWorkId(null);
				}}
				className="modal-lg showWorkModal"
			>
				<header className="showWorkModal__header">
					<img
						className="cursorPointer closeIcon"
						onClick={onCancel}
						src={CloseIcon}
						alt="close-modal"
					/>
				</header>
				<div className="showWorkModal__body">
					<div className="showWorkModal__item">
						<h2>{prevWorkData.projectName}</h2>
						<p>{prevWorkData.description}</p>
						<Row className="showWorkModal__files">
							{prevWorkData.documents &&
								prevWorkData.documents.map((doc) => (
									<Col md={6} key={doc.documnentId} className="doc">
										{doc.contentType.includes("image") ? (
											<img src={imageIcon} alt={doc.fileName} />
										) : doc.contentType === "application/pdf" ? (
											<img src={pdfIcon} alt={doc.fileName} />
										) : (
											<img src={docIcon} alt={doc.fileName} />
										)}
										<div className="doc__desc">
											<Tooltip placement="bottom" title={doc.fileName}>
												<h6>{doc.fileName}</h6>
											</Tooltip>
											<p>
												{doc.size > mb
													? Math.round(10 * (doc.size / mb)) * 10 + " mb"
													: doc.size > 999
													? Math.round(doc.size / 1000) / 1000 + " kb"
													: doc.size + " by"}
											</p>
										</div>
									</Col>
								))}
						</Row>
					</div>
					{parent !== "buyerSeeProfiles" && (
						<div className="showWorkModal__footer">
							<button className="button-secondary" onClick={closeModal}>
								{currentLocal.profilePage.close}
							</button>
							<button className="edit button-primary" onClick={editPrevWork}>
								{currentLocal.supplierHome.edit}
							</button>
						</div>
					)}
				</div>
			</Modal>
		)
	);
}
export default ShowSinglePrevWorkModal;
