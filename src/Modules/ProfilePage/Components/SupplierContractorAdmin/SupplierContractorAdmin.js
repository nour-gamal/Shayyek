import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../../Services";
// components
import { Row, Col } from "antd";
import PersonalInfo from "../SubComponents/Personalnfo/Personalnfo";
import BusinessCard from "../SubComponents/BusinessCard/BusinessCard";
import CompanyCard from "../SubComponents/CompanyCard/CompanyCard";
// import SidePersonalInfo from "./../SubComponents/SidePersonalInfo/SidePersonalInfo";
// network
import { SupplierContractorProfile } from "../../network";
// style
import "./SupplierContractorAdmin.css";
import PreviousWorks from "./../SubComponents/PreviousWorks/PreviousWorks";
function SupplierContractorAdmin() {
  const [companyDetails, setCompanyDetails] = useState(null);
  const [profileDetails, setProfileDetails] = useState(null);
  const [works, setWorks] = useState(null);
  const { currentLanguageId } = useSelector((state) => state.currentLocal);
  useEffect(() => {
    SupplierContractorProfile(
      currentLanguageId,
      (success) => {
        if (success.success) {
          const { company, previousWorks, ...data } = success.data;
          setCompanyDetails(company);
          setProfileDetails(data);
          setWorks(previousWorks);
          console.log(data.userTypeName);
        }
      },
      (fail) => {}
    );
  }, [currentLanguageId]);
  return (
    <div className="supplierContractorAdmin ppl">
      {companyDetails && profileDetails && (
        <Row className="flex-1">
          <Col md={16} lg={18} className="flex-1">
            <PersonalInfo parent={profileDetails.userTypeName} />
            <div className="bussiness-cards">
              <Row
                style={{
                  width: "100%",
                }}
              >
                <Col md={12} xs={24} className="mb-4">
                  <BusinessCard profileDetails={profileDetails} />
                </Col>
                <Col md={12} xs={24} className="mb-4">
                  <CompanyCard companyDetails={companyDetails} />
                </Col>
              </Row>
            </div>
          </Col>
          <Col className="sideWorker" md={8} lg={6} xs={24}>
            <PreviousWorks
              works={works}
              companyImage={
                companyDetails.image
                  ? baseUrl + companyDetails.image
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
            />
          </Col>
        </Row>
      )}
    </div>
  );
}

export default SupplierContractorAdmin;
