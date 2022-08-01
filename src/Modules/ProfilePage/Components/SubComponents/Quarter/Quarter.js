import React from "react";
import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import people from "../../../../../Resources/Assets/people.svg";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./Quarter.css";
function Quarter({ chartData }) {
	ChartJS.register(ArcElement, Tooltip, Legend);
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const backgroundColor = []
	const occurenceData = []
	chartData.buyerCategoryChart?.forEach(chart => {
		backgroundColor.push(chart.categoryColor)
		occurenceData.push(chart.occuranceCount)
	})
	const data = {
		labels: [],
		datasets: [
			{
				data: occurenceData,
				backgroundColor: backgroundColor,
				borderColor: ["#fff"],
				borderWidth: 7,
			},
		],
	};
	return (
		<div className="quarterCard">
			<div>
				<h6 className="f-18">{chartData.quarter}</h6>
				<div className="d-flex justify-content-between">
					<div className="d-flex">
						<img src={people} alt="people" />
						<div className="mx-2">{currentLocal.profilePage.activeVendors}</div>
					</div>
					<div>{chartData.activeVendor}</div>
				</div>
				<div className="d-flex justify-content-between">
					<div className="d-flex">
						<img src={people} alt="people" />
						<div className="mx-2">{currentLocal.profilePage.newVendors}</div>
					</div>
					<div>{chartData.newVendor}</div>
				</div>
			</div>
			<div className="doughnutContainer">
				<Doughnut data={data} />
				<div className="doughnutText">
					<div className="f-12 text-center">
						{currentLocal.profilePage.savingUpTo}
					</div>
					<div className="percentage text-center f-14">{chartData.savings}</div>
				</div>
			</div>
			<div className="f-12 text-center my-2">
				<span className="percentage">{currentLocal.profilePage.savings}</span>{" "}
				&asymp; EGP {chartData.savings}
			</div>
		</div>
	);
}

export default Quarter;
