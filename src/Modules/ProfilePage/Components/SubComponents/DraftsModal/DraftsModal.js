import { Modal } from "antd";
import RFQInvitation from "../../../../Common/RFQInvitation/RFQInvitation";

const DraftsModal = ({ visible }) => {
  function onCancel() {
    console.log("close");
  }
  return (
    <Modal className="modal-lg" onCancel={onCancel} visible={true}>
      <div className="modal-header">header</div>
      <div className="modal-body">
        <RFQInvitation />
      </div>
      <div className="modal-footer">body</div>
    </Modal>
  );
};

export default DraftsModal;
