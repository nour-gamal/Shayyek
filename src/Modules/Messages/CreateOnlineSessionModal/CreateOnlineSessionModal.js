import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { minBy } from "lodash";
import { Modal, Checkbox, Row, Col, DatePicker } from "antd";
import {
  GetSuppliersAndContratorsThatFilledRFQ,
  AddOnlineSession,
} from "../network";
import { db } from "../../../firebase";
import { doc } from "firebase/firestore";
import { baseUrl } from "../../../Services";
import defaultProfileImage from "../../../Resources/Assets/DefaultProfileImage.png";

import "./CreateOnlineSessionModal.css";

const CreateOnineSession = ({
  isModalVisible,
  onCancel,
  rfqId,
  rfqDetails,
}) => {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const [members, setMembers] = useState(null);
  const [time, updateTime] = useState(null);
  const [selectedMembers, updateSelectedMembers] = useState([]);

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

  function submitOnlineSession() {
    if (selectedMembers.length && time) {
      let data = {
        rfqId,
        membersIds: selectedMembers,
        sessionDate: time._d,
        projectName: "static projectName from createOnlineSession.js",
      };
      AddOnlineSession(
        data,
        async (success) => {
          if (success.success) {
            let users = [];
            selectedMembers.forEach(async (userId) => {
              let userDoc = doc(db, `users/${userId}`);
              users.push({
                user: userDoc,
                isOnline: false,
                lastPrice: 0,
              });
            });
            // members -> 3amro will add
            let { totalPrice } = minBy(members, "totalPrice");
            console.log(totalPrice);
            // await setDoc(doc(collection(db, "online-sessions")), {
            //   lastPrice,
            //   rfqId,
            //   users,
            //   sessionDate: time._d,
            //   buyerId: authorization.id,
            // });

            onCancel();
          }
        },
        (fail) => {}
      );
    }
  }

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
                <Checkbox.Group
                  onChange={(data) => updateSelectedMembers(data)}
                >
                  {members &&
                    members.map((member) => (
                      <li className="item d-flex" key={member.userId}>
                        <Checkbox value={member.userId} />
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
            <DatePicker
              showTime
              onOk={(data) => updateTime(data)}
              onChange={(data) => updateTime(data)}
            />
          </Col>
        </Row>
      </div>
      <div className="createOnlineSession-footer text-center">
        <button
          className="btn button-primary"
          type="submit"
          onClick={submitOnlineSession}
        >
          Submit
        </button>
      </div>
    </Modal>
  );
};

export default CreateOnineSession;
