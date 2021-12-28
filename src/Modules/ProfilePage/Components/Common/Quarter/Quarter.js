import React from "react";
import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./Quarter.css";
function Quarter() {
	ChartJS.register(ArcElement, Tooltip, Legend);
	const { currentLocal } = useSelector((state) => state.currentLocal);

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
	return (
		<div className="quarter">
			<div className="doughnutContainer">
				<Doughnut data={data} />
				<div className="doughnutText">
					<div className="f-12 text-center">
						{currentLocal.profilePage.savingUpTo}
					</div>
					<div className="percentage text-center f-14">30%</div>
				</div>
			</div>
		</div>
	);
}

export default Quarter;
