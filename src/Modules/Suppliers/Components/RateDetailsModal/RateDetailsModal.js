import React from "react";
import ReactStars from "react-rating-stars-component";
import { Modal, Row, Col } from "antd";
import { baseUrl } from "../../../../Services";
import { useSelector } from "react-redux";
import "./RateDetailsModal.css";
function RateDetailsModal({ onCancel, isModalVisible, supplier }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-lg rateDetailsModal"
		>
			<div className="d-flex justify-content-between my-2">
				<div>
					<img
						src={baseUrl + supplier.image}
						alt="supplierImage"
						className="supplierImage"
					/>
					<span className="mx-2">{supplier.name}</span>
				</div>
				<ReactStars
					edit={false}
					count={5}
					value={supplier.rate}
					size={24}
					activeColor="#ffd700"
					classNames={
						currentLocal.language === "English" ? "ltrStars" : "rtlStars "
					}
				/>
			</div>
			<div className="my-2">
				<Row>
					<Col xs={16}>
						<ul className="list-unstyled primary-color questions f-14 fw-600">
							<li>{currentLocal.suppliers.rateDetails.amountOfWorkOpinion}</li>
							<li>
								{currentLocal.suppliers.rateDetails.paymentFacilitiesOpinion}
							</li>
							<li>
								{currentLocal.suppliers.rateDetails.relativePricesOpinion}
							</li>
							<li>{currentLocal.suppliers.rateDetails.handlingWayOpinion}</li>
							<li>{currentLocal.suppliers.rateDetails.timingOpinion}</li>
							<li>{currentLocal.suppliers.rateDetails.workQualityOpinion}</li>
						</ul>
					</Col>
					<Col xs={8}>
						<ul className="list-unstyled questions f-14 fw-600 primary-color-light">
							<li>test</li>
							<li>test</li>
							<li>test</li>
							<li>test</li>
							<li>test</li>
							<li>test</li>
						</ul>
					</Col>
				</Row>
			</div>
		</Modal>
	);
}

export default RateDetailsModal;
