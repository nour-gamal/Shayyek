import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../../Services";
// components
import { Row, Col } from "antd";
import PersonalInfo from "../SubComponents/Personalnfo/Personalnfo";
import BusinessCard from "../SubComponents/BusinessCard/BusinessCard";
import PreviousWorks from "./../SubComponents/PreviousWorks/PreviousWorks";
import CompanyCard from "../SubComponents/CompanyCard/CompanyCard";
import AddWrokDetailsModal from "./../AddWorkModal/AddWorkModal";
import ShowSinglePrevWorkModal from "../SubComponents/ShowSinglePrevWorkModal/ShowSinglePrevWorkModal";
// network
import { SupplierContractorProfile } from "../../network";
// style
import "./SupplierContractorAdmin.css";

function SupplierContractorAdmin({ parent }) {
  const [companyDetails, setCompanyDetails] = useState(null);
  const [profileDetails, setProfileDetails] = useState(null);
  const [previousWorks, setPreviousWorks] = useState(null);
  const [AddModalVisibilty, toggleAddModalVisibilty] = useState(false);
  const [
    showPrevWorkModalVisibilty,
    toggleShowPrevWorkModalVisibilty,
  ] = useState(false);
  const [selectedPrevWorkId, setSelectedPrevWorkId] = useState(null);
  const [editableModalData, setEditableModalData] = useState(null);

  const { currentLanguageId } = useSelector((state) => state.currentLocal);
  useEffect(() => {
    SupplierContractorProfile(
      currentLanguageId,
      (success) => {
        if (success.success) {
          const { company, previousWorks, ...data } = success.data;
          setCompanyDetails(company);
          setProfileDetails(data);
          setPreviousWorks(previousWorks);
          console.log(company, previousWorks, data);
        }
      },
      (fail) => {
        console.log(fail);
      }
    );
  }, [currentLanguageId]);

  return (
    <div className="supplierContractorAdmin ppl">
      {companyDetails && profileDetails && (
        <Row className="flex-1">
          <Col md={16} lg={18} className="flex-1">
            <PersonalInfo
              parent={profileDetails.userTypeName}
              count={profileDetails.draftsCount}
            />
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
                  <CompanyCard
                    companyDetails={companyDetails}
                    parent={parent ? parent : "supplierContractorAdmin"}
                  />
                </Col>
              </Row>
            </div>
          </Col>
          <Col className="sideWorker" md={8} lg={6} xs={24}>
            <PreviousWorks
              togglePrevWorkModalVisibilty={toggleShowPrevWorkModalVisibilty}
              toggleAddModalVisibilty={toggleAddModalVisibilty}
              works={previousWorks}
              setSelectedPrevWorkId={setSelectedPrevWorkId}
              companyImage={
                companyDetails.image
                  ? baseUrl + companyDetails.image
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              previousWorks={previousWorks}
              parent={parent ? parent : "supplierContractorAdmin"}
            />
          </Col>
        </Row>
      )}
      {AddModalVisibilty && (
        <AddWrokDetailsModal
          onCancel={() => toggleAddModalVisibilty(false)}
          isModalVisible={AddModalVisibilty}
          previousWorks={previousWorks}
          setPreviousWorks={setPreviousWorks}
          // edit
          selectedPrevWorkId={selectedPrevWorkId}
          setSelectedPrevWorkId={setSelectedPrevWorkId}
          editableModalData={editableModalData}
          setEditableModalData={setEditableModalData}
        />
      )}
      {showPrevWorkModalVisibilty && (
        <ShowSinglePrevWorkModal
          onCancel={() => toggleShowPrevWorkModalVisibilty(false)}
          isModalVisible={showPrevWorkModalVisibilty}
          selectedPrevWorkId={selectedPrevWorkId}
          // to -> edit
          setSelectedPrevWorkId={setSelectedPrevWorkId}
          toggleAddModalVisibilty={toggleAddModalVisibilty}
          setEditableModalData={setEditableModalData}
        />
      )}
    </div>
  );
}

export default SupplierContractorAdmin;
