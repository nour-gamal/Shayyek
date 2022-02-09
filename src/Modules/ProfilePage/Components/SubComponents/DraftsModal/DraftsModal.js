import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Row, Col } from "antd";
import { getRFQ } from "../../../../Home/network";
import RFQInvitation from "./../../../../Common/RFQInvitation/RFQInvitation";
// style
import "./DraftsModal.css";

const DraftsModal = ({ isVisible, onCancel }) => {
  const [rfqDrafts, updateRfqDrafts] = useState(null);
  const { currentLocal } = useSelector((state) => state.currentLocal);

  useEffect(() => {
    getRFQ(
      true,
      (success) => {
        if (success.success) {
          console.log(success.data);
          updateRfqDrafts(success.data.rfqInvitationDetails);
        }
      },
      (fail) => {
        console.log(fail);
      }
    );
  }, []);
  return (
    <Modal
      className="modal-lg draftsModal"
      visible={isVisible}
      onCancel={onCancel}
    >
      <header className="draftsModal__header">
        <h2>{currentLocal.supplierHome.drafts}</h2>
      </header>
      <Row gutter={[16, 16]}>
        {rfqDrafts?.map((draft) => (
          <Col md={8} key={draft.rfqHeaderId}>
            <div className="item">
              <RFQInvitation
                revealPrices={draft.isBidders}
                rfqDetails={draft}
                parent="supplier"
              />
            </div>
          </Col>
        ))}
      </Row>
    </Modal>
  );
};

export default DraftsModal;
