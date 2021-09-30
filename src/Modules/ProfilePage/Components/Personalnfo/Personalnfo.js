import React from "react";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import "./Personalnfo.css";

function Personalnfo() {
	const { currentLocal } = useSelector((state) => state.currentLocal);

	return (
		<div className="PersonalInfo">
			<img
				src={
					"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
				}
				alt="profile"
			/>
			<div className="info">
				<div className="name">Mohamed Ali</div>
				<ReactStars
					edit={false}
					count={5}
					value={3}
					size={24}
					activeColor="#ffd700"
					classNames={
						currentLocal.language === "English" ? "ltrStars" : "rtlStars"
					}
				/>
			</div>
		</div>
	);
}

export default Personalnfo;
