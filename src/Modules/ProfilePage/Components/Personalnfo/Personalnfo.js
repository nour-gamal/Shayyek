import { ProgressBar } from "react-bootstrap";
import React from "react";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import "./Personalnfo.css";

function Personalnfo() {
	const { currentLocal } = useSelector((state) => state.currentLocal);

	return (
		<div className="PersonalInfo">
			<div>
				<img
					src={
						"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
					}
					alt="profile"
				/>
				<div className="info">
					<div className="fw-600">Mohamed Ali</div>
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
					{/* <progress id="file" value="40" max="100">
					40%
				</progress> */}
					<span className="progressContainer">
						<ProgressBar now={30} />
						<span className="f-14">
							{currentLocal.profilePage.completedPercentage}
						</span>
					</span>
					<div className="f-10">{currentLocal.profilePage.addMoreWork}</div>
				</div>
			</div>
			<div className="actions">
				<button className="button-secondary mx-2">Reject</button>
				<button className="button-primary mx-2">Accept</button>
			</div>
		</div>
	);
}

export default Personalnfo;
