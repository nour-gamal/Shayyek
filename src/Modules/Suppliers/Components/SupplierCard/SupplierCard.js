import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import RateDetailsModal from "../RateDetailsModal/RateDetailsModal";
import infoIcon from "../../../../Resources/Assets/infoIcon.svg";
import defaultCompImg from "../../../../Resources/Assets/infoIcon.svg";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../../Services";
import "./SupplierCard.css";

function SupplierCard({ supplier, i, overlay }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [isModalVisible, toggleModalVisible] = useState(false);
	return (
		<div className="supplierCard">
			<img
				src={
					supplier.image === null ? defaultCompImg : baseUrl + supplier.image
				}
				alt="supplier"
				className="supplierImg"
			/>
			<div
				className={
					overlay.state && overlay.no === i ? "overlay" : "fadeOutOverlay"
				}
			>
				<div className="d-flex align-items-end justify-content-between">
					<Link to={`supplier/${supplier.id}`}>
						<div>
							<ReactStars
								edit={false}
								count={5}
								value={supplier.rate}
								size={24}
								activeColor="#ffd700"
								classNames={
									currentLocal.language === "English" ? "ltrStars" : "rtlStars"
								}
							/>
							<div className="name f-21">{supplier.name}</div>
							<div className="f-17 font-white">{supplier.typeName}</div>
							<div className="f-17 font-white">{supplier.address}</div>
						</div>
					</Link>
					<img
						src={infoIcon}
						alt="infoIcon"
						className="infoIcon"
						onClick={() => {
							toggleModalVisible(!isModalVisible);
						}}
					/>
				</div>
				<RateDetailsModal
					isModalVisible={isModalVisible}
					onCancel={() => {
						toggleModalVisible(!isModalVisible);
					}}
					supplier={supplier}
				/>
			</div>
		</div>
	);
}

export default SupplierCard;
