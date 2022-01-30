import { useEffect, useState } from "react";
import PersonalInfo from "../../ProfilePage/Components/SubComponents/Personalnfo/Personalnfo";
import { useSelector } from "react-redux";
import { Row, Col } from "antd";
import Quarter from "../../ProfilePage/Components/SubComponents/Quarter/Quarter";
import MyRFQs from "../../ProfilePage/Components/SubComponents/MyRFQs/MyRFQs";
import MyOrders from "../../ProfilePage/Components/SubComponents/MyOrders/MyOrders";
import CompanyCard from "../../ProfilePage/Components/SubComponents/CompanyCard/CompanyCard";
import SidePersonalInfo from "../../ProfilePage/Components/SubComponents/SidePersonalInfo/SidePersonalInfo";
import RFQInvitations from "../SupplierHome/Components/RFQInvitations/RFQInvitations";
import { getBuyerProfile } from "../../ProfilePage/network";
import "./ContractorHome.css";

function ContractorHome() {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const { currentLanguageId } = useSelector((state) => state.currentLocal);
  const [buyerChartWorks, updateBuyerChartWorks] = useState([]);
  const [buyerRFQs, updataBuyerRFQs] = useState([]);
  const [buyerOrders, updateBuyerOrders] = useState([]);
  const [company, updateCompany] = useState(null);
  const [allData, updateAllDate] = useState({});
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
        updateCompany(success.data.company);
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
          <div className="profileSideMenu">{/* <RFQInvitations /> */}</div>
        </Col>
      </Row>
    </div>
  );
}

export default ContractorHome;
