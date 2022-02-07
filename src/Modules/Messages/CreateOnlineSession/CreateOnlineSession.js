import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Checkbox, Row, Col, DatePicker } from "antd";
import {
  GetSuppliersAndContratorsThatFilledRFQ,
  // AddOnlineSession,
} from "../network";
import "./CreateOnlineSession.css";
import { baseUrl } from "./../../../Services";
import defaultProfileImage from "../../../Resources/Assets/DefaultProfileImage.png";
const CreateOnineSession = ({ isModalVisible, onCancel, rfqId }) => {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const [members, setMembers] = useState(null);
  const [checkedMembers, setCheckedMembers] = useState(undefined);
  useEffect(() => {
    GetSuppliersAndContratorsThatFilledRFQ(
      rfqId,
      (success) => {
        if (success.success) {
          setMembers(success.data);
        }
      },
      (fail) => {}
    );
  }, [rfqId]);

  function onChange(value) {
    console.log(value);
  }
  function onOk(value) {
    console.log(value);
  }
  function changeGroupCheckbox(data) {
    setCheckedMembers(data);
  }
  console.log(checkedMembers);
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
                <Checkbox.Group onChange={changeGroupCheckbox}>
                  {members &&
                    members.map((member) => (
                      <li className="item d-flex" key={member.userId}>
                        <Checkbox value={member} />
                        <img
                          src={
                            member.userImage
                              ? baseUrl + member.userImage
                              : defaultProfileImage
                          }
                          alt="user-avatar"
                        />
                        <p>{member.userName}</p>
                      </li>
                    ))}
                </Checkbox.Group>
              </ul>
            </form>
          </Col>
          <Col md={12}>
            <header>
              <h4>{currentLocal.messages.pickOnlineSession}</h4>
            </header>
            <DatePicker showTime onChange={onChange} onOk={onOk} />
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
