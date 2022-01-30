// import { useEffect, useState } from "react";
// import PersonalInfo from "../../ProfilePage/Components/SubComponents/Personalnfo/Personalnfo";
// import { useSelector } from "react-redux";
// import { Row, Col } from "antd";
// import Quarter from "../../ProfilePage/Components/SubComponents/Quarter/Quarter";
// import MyRFQs from "../../ProfilePage/Components/SubComponents/MyRFQs/MyRFQs";
// import MyOrders from "../../ProfilePage/Components/SubComponents/MyOrders/MyOrders";
// import { SupplierContractorProfile } from "../../ProfilePage/network";
// import { getRFQ } from "../network";
// // import CompanyCard from "../../ProfilePage/Components/SubComponents/CompanyCard/CompanyCard";
// // import SidePersonalInfo from "../../ProfilePage/Components/SubComponents/SidePersonalInfo/SidePersonalInfo";
// import RFQInvitations from "../SupplierHome/Components/RFQInvitations/RFQInvitations";
// import "./ContractorHome.css";

function ContractorHome() {
  // const { currentLocal } = useSelector((state) => state.currentLocal);
  // const { currentLanguageId } = useSelector((state) => state.currentLocal);
  // // const [buyerChartWorks, updateBuyerChartWorks] = useState([]);
  // const [invitationRFQs, updateInvitationRFQs] = useState([]);
  // const [buyerOrders, updateBuyerOrders] = useState([]);
  // const [company, updateCompany] = useState(null);
  // const [allData, updateAllDate] = useState(null);
  // // const labelData = [
  // //   {
  // //     label:
  // //       currentLanguageId === "274c0b77-90cf-4ee3-976e-01e409413057"
  // //         ? "Consultant"
  // //         : "مستشار",
  // //     color: "#00172A",
  // //   },
  // // ];

  // console.log(currentLanguageId);
  // useEffect(() => {
  //   getRFQ(
  //     false,
  //     (success) => {
  //       if (success.success) {
  //         const { data } = success;
  //         updateInvitationRFQs(data);
  //       }
  //     },
  //     (fail) => {
  //       console.log(fail);
  //     }
  //   );
  // }, [currentLanguageId]);
  // return (
  //   <div className={currentLocal.language === "English" ? "ppl" : "ppr"}>
  //     <Row>
  //       <Col md={19} xs={16} className="pr-1">
  //         <PersonalInfo parent={"buyerAdmin"} />
  //         <Row>
  //           {/* {buyerChartWorks.map((data, indexData) => (
  //             <Col
  //               key={indexData}
  //               md={12}
  //               lg={8}
  //               xl={6}
  //               className="margin-auto"
  //             >
  //               <Quarter chartData={data} />
  //             </Col>
  //           ))} */}
  //         </Row>
  //         {/* <MyRFQs buyerRFQs={invitationRFQs.invitationsCount} /> */}
  //         <MyOrders />
  //       </Col>
  //       <Col md={5} xs={8}>
  //         <div className="profileSideMenu">
  //           {/* <RFQInvitations
  //             invitationCount={invitationRFQs.invitationsCount}
  //             rfqInvitationDetails={invitationRFQs.rfqInvitationDetails}
  //             buyerRFQs={invitationRFQs.rfqInvitationDetails}
  //           /> */}
  //         </div>
  //       </Col>
  //     </Row>
  //   </div>
  // );
  return <div>Contractor Home</div>;
}

export default ContractorHome;
