import { Modal } from "antd";
import user from "../../../Resources/Assets/MessageAvatar.png";
import user2x from "../../../Resources/Assets/MessageAvatar2x.png";

const StartOnlineSession = ({ isModalVisible, onCancel }) => {
  return (
    <Modal
      visible={isModalVisible}
      onCancel={() => onCancel()}
      className="modal-lg"
    >
      <header>
        <div className="user">
          <img className="userImage" src={user} alt="user-avatar" />
          <p>Project Name</p>
        </div>
        <div className="lastPrice"></div>
      </header>
    </Modal>
  );
};

export default StartOnlineSession;
