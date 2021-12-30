import { useEffect, useState } from "react";
import PersonalInfo from "../Common/Personalnfo/Personalnfo";
import { useSelector } from "react-redux";
import { Row, Col } from "antd";
import Quarter from "../Common/Quarter/Quarter";
import MyRFQs from "../Common/MyRFQs/MyRFQs";
import MyOrders from "../Common/MyOrders/MyOrders";
import CompanyCard from "../Common/CompanyCard/CompanyCard";
import { getBuyerProfile } from "../../network";
import "./BuyerAdmin.css";
function BuyerAdmin() {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	const [buyerChartWorks, updateBuyerChartWorks] = useState([]);
	const [buyerRFQs, updataBuyerRFQs] = useState([]);
	const [buyerOrders, updateBuyerOrders] = useState([]);
	// const labelData = [
	// 	{
	// 		label:
	// 			currentLanguageId === "274c0b77-90cf-4ee3-976e-01e409413057"
	// 				? "Consultant"
	// 				: "مستشار",
	// 		color: "#00172A",
	// 	},
	// ];

	useEffect(() => {
		getBuyerProfile(
			currentLanguageId,
			(success) => {
				updateBuyerChartWorks(success.data.buyerChartWorks);
				updataBuyerRFQs(success.data.buyerRFQs);
				updateBuyerOrders(success.data.buyerOrders);
				console.log(success.data);
			},
			(fail) => {
				console.log(fail);
			}
		);
	}, [currentLanguageId]);
	return (
		<div className={currentLocal.language === "English" ? "ppl" : "ppr"}>
			<Row>
				<Col md={19} xs={16} className="pr-1">
					<PersonalInfo parent={"buyerAdmin"} />
					<Row>
						{buyerChartWorks.map((data, indexData) => (
							<Col
								key={indexData}
								md={12}
								lg={8}
								xl={6}
								className="margin-auto"
							>
								<Quarter chartData={data} />
							</Col>
						))}
					</Row>
					{/* <div className="d-flex">
						{labelData.map((label) => (
							<div className="colorLabel d-flex">
								<div style={{ background: label }}></div>
								<div>test</div>
							</div>
						))}
					</div> */}

					<MyRFQs buyerRFQs={buyerRFQs} />
					<MyOrders />
				</Col>
				<Col md={5} xs={8}>
					<CompanyCard buyerOrders={buyerOrders} />
				</Col>
			</Row>
		</div>
	);
}

export default BuyerAdmin;
