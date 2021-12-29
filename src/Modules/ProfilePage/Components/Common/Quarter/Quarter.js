import React from "react";
import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import people from "../../../../../Resources/Assets/people.svg";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./Quarter.css";
function Quarter({ index }) {
	ChartJS.register(ArcElement, Tooltip, Legend);

	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { currentLanguageId } = useSelector((state) => state.currentLocal);

	const data = {
		labels: [],
		datasets: [
			{
				data: [50, 25, 12.5, 12.5],
				backgroundColor: ["#0370FF", "#B33D32", "#FC6B5E", "#B2B0AC"],
				borderColor: ["#fff"],
				borderWidth: 7,
			},
		],
	};
	const arabicSy = {
		1: "الاول",
		2: "التاني",
		3: "التالت",
		4: "الرابع",
	};
	return (
		<div className="quarterCard">
			<div>
				<h6 className="f-18">
					{currentLocal.profilePage.q}
					{currentLanguageId === "46f4621f-9f96-46c7-a2d4-94b4c3393914"
						? " " + arabicSy[index + 1]
						: index + 1}
				</h6>
				<div className="d-flex justify-content-between">
					<div className="d-flex">
						<img src={people} alt="people" />
						<div className="mx-2">{currentLocal.profilePage.activeVendors}</div>
					</div>
					<div>17</div>
				</div>
				<div className="d-flex justify-content-between">
					<div className="d-flex">
						<img src={people} alt="people" />
						<div className="mx-2">{currentLocal.profilePage.newVendors}</div>
					</div>
					<div>4</div>
				</div>
			</div>
			<div className="doughnutContainer">
				<Doughnut data={data} />
				<div className="doughnutText">
					<div className="f-12 text-center">
						{currentLocal.profilePage.savingUpTo}
					</div>
					<div className="percentage text-center f-14">30%</div>
				</div>
			</div>
			<div className="f-12 text-center my-2">
				<span className="percentage">{currentLocal.profilePage.savings}</span>{" "}
				&asymp; EGP300K
			</div>
		</div>
	);
}

export default Quarter;
