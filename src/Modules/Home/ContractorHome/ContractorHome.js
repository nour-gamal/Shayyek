import { useEffect, useState } from "react";
import Drafts from "../../../Resources/Assets/draft.svg";
import { useSelector } from "react-redux";
import { Row, Col } from "antd";
import Quarter from "../../ProfilePage/Components/SubComponents/Quarter/Quarter";
import { getRFQ, getSupplierContractorHomePage } from "../network";
import Projects from "./Projects/Projects";
import RFQInvitations from "../SupplierHome/Components/RFQInvitations/RFQInvitations";
import "./ContractorHome.css";
import DraftsModal from "../../ProfilePage/Components/SubComponents/DraftsModal/DraftsModal";

function ContractorHome() {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const { currentLanguageId } = useSelector((state) => state.currentLocal);
  const [rfqDetails, updateRfqDetails] = useState([]);
  const [draftsCount, updateDraftsCount] = useState([]);
  const [projects, setProjects] = useState(null);
  const [invitationsCount, updateInvitationsCount] = useState(null);
  const [supplierContractorCharts, setSupplierContractorCharts] = useState(
    null
  );
  const [draftsModalVisibility, setDraftsModalVisibility] = useState(false);
  useEffect(() => {
    getSupplierContractorHomePage(
      currentLanguageId,
      (success) => {
        if (success.success) {
          const { supplierContractorCharts, projects } = success.data;
          setSupplierContractorCharts(supplierContractorCharts);
          setProjects(projects);
        }
      },
      (fail) => {
        console.log(fail);
      }
    );
  }, [currentLanguageId]);

  useEffect(() => {
    getRFQ(
      false,
      (success) => {
        if (success.success) {
          updateRfqDetails(success.data.rfqInvitationDetails);
          updateDraftsCount(success.data.draftsCount);
          updateInvitationsCount(success.data.invitationsCount);
        }
      },
      (fail) => {
        console.log(fail);
      }
    );
  }, []);

  return (
    <div className={currentLocal.language === "English" ? "ppl" : "ppr"}>
      <Row>
        <Col md={19} xs={16} className="pr-1">
          <div
            className="my-4 d-flex align-items-center justify-content-end cursorPointer"
            onClick={() => setDraftsModalVisibility(true)}
          >
            <img src={Drafts} alt="Drafts" className="mx-2" />
            <span>{currentLocal.supplierHome.drafts}</span>
            <div className="invitations_number mx-2">{draftsCount}</div>
          </div>
          <Row>
            {supplierContractorCharts?.map((data, indexData) => (
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
          <div className="mt-4">
            <Projects projects={projects} />
          </div>
        </Col>
        <Col md={5} xs={8}>
          <div className="profileSideMenu">
            <RFQInvitations
              invitationCount={invitationsCount}
              rfqDetails={rfqDetails}
              parent={"supplier"}
              recallGetRFQ={() => {
                getRFQ(
                  false,
                  (success) => {
                    if (success.success) {
                      updateRfqDetails(success.data.rfqInvitationDetails);
                      updateDraftsCount(success.data.draftsCount);
                      updateInvitationsCount(success.data.invitationsCount);
                    }
                  },
                  (fail) => {
                    console.log(fail);
                  }
                );
              }}
            />
          </div>
        </Col>
      </Row>
      {draftsModalVisibility && (
        <DraftsModal
          isVisible={draftsModalVisibility}
          onCancel={() => setDraftsModalVisibility(false)}
        />
      )}
    </div>
  );
}

export default ContractorHome;
