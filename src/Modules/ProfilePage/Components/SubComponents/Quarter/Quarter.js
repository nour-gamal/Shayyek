import React from "react";
import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import people from "../../../../../Resources/Assets/people.svg";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { authorType } from "../../../../../helpers/authType";
import "./Quarter.css";
function Quarter({ chartData }) {
	ChartJS.register(ArcElement, Tooltip, Legend);
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const {
		authorization: { userTypeId, accountTypeId, roleId },
	} = useSelector((state) => state.authorization);
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
	const isBuyer = authorType(accountTypeId, userTypeId, roleId).includes('buyer')
	const conversationalRate = parseInt(chartData.totalRFQsSubmitted) /
		parseInt(chartData.projectsWon)
	return (
		<div className="quarterCard">
			<div>
				<h6 className="f-18">{chartData.quarter}</h6>
				<div className="d-flex justify-content-between">
					<div className="d-flex align-items-center">
						{isBuyer ? <img src={people} alt="people" /> : <div className='colorLabel blue'></div>}
						<div className="mx-2">{isBuyer ?
							currentLocal.profilePage.activeVendors :
							currentLocal.contractorHome.totalRFQ
						}</div>
					</div>
					<div>{isBuyer ? chartData.activeVendor : chartData.totalRFQsSubmitted}</div>
				</div>
				<div className="d-flex justify-content-between">
					<div className="d-flex align-items-center">
						{isBuyer ? <img src={people} alt="people" /> :
							<div className='colorLabel orange'></div>}
						<div className="mx-2">{isBuyer ?
							currentLocal.profilePage.newVendors :
							currentLocal.contractorHome.projectsWon}</div>
					</div>
					<div>{isBuyer ? chartData.newVendor : chartData.projectsWon}</div>
				</div>
			</div>
			<div className="doughnutContainer">
				<Doughnut data={data} />
				<div className="doughnutText">
					<div className="f-12 text-center">
						{isBuyer ? currentLocal.profilePage.savingUpTo :
							<span className='fw-600 f-13'>{
								conversationalRate ? conversationalRate : 0}%</span>}
					</div>
					<div className="percentage text-center f-14">{isBuyer ?
						chartData.savings :
						currentLocal.contractorHome.conversationRate}</div>
				</div>
			</div>
			{isBuyer && <div className="f-12 text-center my-2">
				<span className="percentage">{currentLocal.profilePage.savings}</span>{" "}
				&asymp; EGP {chartData.savings}
			</div>}
		</div>
	);
}

export default Quarter;
