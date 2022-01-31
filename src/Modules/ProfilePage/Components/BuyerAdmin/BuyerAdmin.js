import { useEffect, useState } from "react";
import PersonalInfo from "../SubComponents/Personalnfo/Personalnfo";
import { useSelector } from "react-redux";
import { Row, Col } from "antd";
import Quarter from "../SubComponents/Quarter/Quarter";
import MyRFQs from "../SubComponents/MyRFQs/MyRFQs";
import MyOrders from "../SubComponents/MyOrders/MyOrders";
import CompanyCard from "../SubComponents/CompanyCard/CompanyCard";
import SidePersonalInfo from "../SubComponents/SidePersonalInfo/SidePersonalInfo";
import { getBuyerProfile } from "../../network";
import "./BuyerAdmin.css";
function BuyerAdmin() {
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
          <PersonalInfo parent={"buyerAdmin"} company={company} />
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
          <div className="profileSideMenu">
            <SidePersonalInfo allData={allData} />
            <CompanyCard
              buyerOrders={buyerOrders}
              companyDetails={company}
              sidebar={true}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default BuyerAdmin;
