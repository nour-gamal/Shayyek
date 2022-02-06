import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Checkbox, Row, Col, DatePicker } from "antd";
import user from "../../../Resources/Assets/MessageAvatar.png";
import "./CreateOnlineSession.css";
const CreateOnineSession = ({ isModalVisible, onCancel }) => {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const [checkedState, setCheckedState] = useState(new Array(5).fill(false));
  // const [total, setTotal] = useState()
  function setChecked() {}
  return (
    <Modal
      visible={isModalVisible}
      onCancel={() => onCancel()}
      className="createOnlineSession-modal modal-lg"
    >
      <div className="createOnlineSession-body">
        <Row>
          <Col md={12}>
            <header>
              <h4>{currentLocal.messages.selectOnlineSessionMembers}</h4>
            </header>
            <form>
              <ul className="createOnlineSession-items">
                <li className="item d-flex">
                  <Checkbox />
                  <img src={user} alt="user-avatar" />
                  <p>Joe Weak Hoi</p>
                </li>
                <li className="item d-flex">
                  <Checkbox />
                  <img src={user} alt="user-avatar" />
                  <p>Joe Weak Hoi</p>
                </li>
                <li className="item d-flex">
                  <Checkbox />
                  <img src={user} alt="user-avatar" />
                  <p>Joe Weak Hoi</p>
                </li>
              </ul>
            </form>
          </Col>
          <Col md={12}>
            <header>
              <h4>{currentLocal.messages.pickOnlineSession}</h4>
            </header>
            {/*  onChange={onChange} onOk={onOk}  */}
            <DatePicker showTime />
          </Col>
        </Row>
      </div>
      <div className="createOnlineSession-footer text-center">
        <button className="btn button-primary" type="submit">
          Submit
        </button>
      </div>
    </Modal>
  );
};

export default CreateOnineSession;
