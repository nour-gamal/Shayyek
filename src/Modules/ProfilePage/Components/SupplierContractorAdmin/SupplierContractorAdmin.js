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
  const { currentLanguageId } = useSelector((state) => state.currentLocal);
  useEffect(() => {
    SupplierContractorProfile(
      currentLanguageId,
      (success) => {
        if (success.success) {
          const { company, ...data } = success.data;
          setCompanyDetails(company);
          setProfileDetails(data);
          console.log(data.userTypeName);
        }
      },
      (fail) => {}
    );
  }, [currentLanguageId]);
  return (
    <div className="ppl">
      {companyDetails && profileDetails && (
        <Row>
          <Col md={18}>
            <PersonalInfo parent={profileDetails.userTypeName} />
            <div className="bussiness-cards">
              <BusinessCard profileDetails={profileDetails} />
              <CompanyCard companyDetails={companyDetails} />
            </div>
          </Col>
          <Col className="sideWorker" md={6}>
            <PreviousWorks
              worksDetails={null}
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
