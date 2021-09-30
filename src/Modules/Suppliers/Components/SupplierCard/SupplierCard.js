import React from "react";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import "./SupplierCard.css";

function SupplierCard({ supplier, i, overlay }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);

	return (
		<div className="supplierCard">
			<img src={supplier.img} alt="supplier" className="supplierImg" />
			<div
				className={
					overlay.state && overlay.no === i ? "overlay" : "fadeOutOverlay"
				}
			>
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
				<div className="f-17">{supplier.type}</div>
				<div className="f-17">{supplier.address}</div>
			</div>
		</div>
	);
}

export default SupplierCard;
