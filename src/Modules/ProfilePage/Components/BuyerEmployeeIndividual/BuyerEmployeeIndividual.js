import { useEffect, useState } from "react";
import PersonalInfo from "../SubComponents/Personalnfo/Personalnfo";
import { useSelector } from "react-redux";
import { Row, Col } from "antd";
import Quarter from "../SubComponents/Quarter/Quarter";
import MyRFQs from "../SubComponents/MyRFQs/MyRFQs";
import MyOrders from "../SubComponents/MyOrders/MyOrders";
import SidePersonalInfo from "../SubComponents/SidePersonalInfo/SidePersonalInfo";
import { getBuyerProfile } from "../../network";
import "./BuyerEmployeeIndividual.css";
function BuyerEmployeeIndividual() {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	const [buyerChartWorks, updateBuyerChartWorks] = useState([]);
	const [buyerRFQs, updataBuyerRFQs] = useState([]);
	const [allData, updateAllDate] = useState({});

	useEffect(() => {
		getBuyerProfile(
			currentLanguageId,
			(success) => {
				const { buyerChartWorks, buyerRFQs } = success.data;
				updateBuyerChartWorks(buyerChartWorks);
				updataBuyerRFQs(buyerRFQs);
				updateAllDate(success.data);
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
					<PersonalInfo parent={allData.userTypeName} />
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
					<MyRFQs buyerRFQs={buyerRFQs} />
					<MyOrders buyerOrders={allData.buyerOrders} />
				</Col>
				<Col md={5} xs={8}>
					<div className="profileSideMenu">
						<SidePersonalInfo allData={allData} />
					</div>
				</Col>
			</Row>
		</div>
	);
}

export default BuyerEmployeeIndividual;
