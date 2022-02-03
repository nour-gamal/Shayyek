import { useState } from "react";
import { useSelector } from "react-redux";
import BadgeSession from "../../../Resources/Assets/badge-session.svg";
import EndSession from "../../../Resources/Assets/end-session.svg";
import SendSession from "../../../Resources/Assets/send-session.svg";
import { Modal, Button } from "antd";
import user from "../../../Resources/Assets/MessageAvatar.png";
import { db } from "../../../firebase";
import { doc, setDoc, collection } from "firebase/firestore";
import "./StartOnlineSession.css";

const StartOnlineSession = ({ isModalVisible, onCancel }) => {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const [sendOfferText, setSendOfferText] = useState("");

  function sendOffer() {
    // await setDoc(doc(db, "data", "one"), docData);
    setSendOfferText("");
  }
  return (
    <Modal
      visible={isModalVisible}
      onCancel={() => onCancel()}
      className="StartOnlineSession-modal modal-lg"
    >
      <header className="d-flex flex-wrap">
        <div className="user justify-content-start">
          <img className="userImage" src={user} alt="user-avatar" />
          <p>Project Name</p>
        </div>
        <div className="lastPrice">
          {currentLocal.messages.lastPrice} 1200 LE
        </div>
        <div className="suppliers d-flex">
          <p className=" me-2">{currentLocal.messages.suppliers}</p>
          <img className="userImage" src={user} alt="user-avatar" />
          <img className="userImage" src={user} alt="user-avatar" />
          <img className="userImage" src={user} alt="user-avatar" />
          <img className="userImage" src={user} alt="user-avatar" />
        </div>
      </header>
      <div className="message-content mt-2 flex-1">
        <div>
          <div className="content">
            <img class="message-content__user" src={user} alt="user-avatar" />
            <div>
              <h6>Omar</h6>
              <p>1200 L.E</p>
            </div>
          </div>
          <div className="content">
            <img class="message-content__user" src={user} alt="user-avatar" />
            <div>
              <h6>Omar</h6>
              <p>1200 L.E</p>
            </div>
          </div>
          <div className="content">
            <img class="message-content__user" src={user} alt="user-avatar" />
            <div>
              <h6>Omar</h6>
              <p>1200 L.E</p>
            </div>
          </div>
        </div>
      </div>
      <div className="StartOnlineSession__sendMessages mt-2 d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <Button type="text">
            <img src={EndSession} alt="end-session" />
          </Button>
          <Button type="text">
            <img src={BadgeSession} alt="badge-session" />
          </Button>
        </div>
        <form onSubmit={sendOffer} className="flex-1 d-flex align-items-center">
          <input
            type="text"
            className="messageInput"
            value={sendOfferText}
            placeholder={currentLocal.messages.enterOfferPrice}
            onChange={(e) => setSendOfferText(e.target.value)}
          />
          <div className="d-flex icons-inside-form-field">
            <Button type="text">
              <img src={EndSession} alt="end-session" />
            </Button>
            <Button type="text">
              <img src={BadgeSession} alt="badge-session" />
            </Button>
          </div>
        </form>
        <Button type="text">
          <img className="flip-image" src={SendSession} alt="send-session" />
        </Button>
      </div>
    </Modal>
  );
};

export default StartOnlineSession;
