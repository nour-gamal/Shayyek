import { useSelector } from "react-redux";
import { Modal, Checkbox } from "antd";
import user from "../../../Resources/Assets/MessageAvatar.png";
import "./CreateOnineSession.css";
const CreateOnineSession = ({ isModalVisible, onCancel }) => {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  console.log(isModalVisible);
  return (
    <Modal
      visible={isModalVisible}
      onCancel={() => onCancel()}
      className="createOnlineSession-modal modal-lg"
    >
      <header>
        <h4>{currentLocal.messages.selectOnlineSessionMembers}</h4>
      </header>
      <div className="createOnlineSession-body">
        <ul className="createOnlineSession-items">
          <li className="item d-flex">
            <Checkbox />
            <img src={user} alt="user-avatar" />
            <p>Joe Weak Hoi</p>
          </li>
        </ul>
      </div>
      <div className="createOnlineSession-footer"></div>
    </Modal>
  );
};

export default CreateOnineSession;
