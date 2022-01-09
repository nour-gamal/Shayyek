import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import CloseIcon from "../../../../../Resources/Assets/closeIcon.svg";
import "./AddCompanyPhoneModal.css";

function AddCompanyPhoneModal({ isModalVisible, onCancel, appendNewPhone }) {
  const [newPhone, setNewPhone] = useState("");
  const [newPhoneError, setNewPhoneError] = useState(false);
  const { currentLocal } = useSelector((state) => state.currentLocal);
  function addPhone() {
    if (newPhone) {
      onCancel();
      appendNewPhone(newPhone);
    } else {
      setNewPhoneError(true);
    }
  }
  return (
    <Modal
      title="Basic Modal"
      visible={isModalVisible}
      onCancel={onCancel}
      className="modal-sm addPhoneModal"
    >
      <img
        onClick={() => onCancel()}
        src={CloseIcon}
        className="closeModalIcon cursorPointer"
        alt="close-modal"
      />
      <h3 className="f-16 primary-color">
        {currentLocal.profilePage.changePhoneNumber}
      </h3>
      <div className="inputWrapper">
        {newPhoneError && !newPhone && (
          <div className="mb-2">
            <small className="text-red text-error f-12">
              {currentLocal.registration.pleaseFillmobileNumber}
            </small>
          </div>
        )}
        <input
          type="number"
          className={`form-control ${
            newPhoneError && !newPhone ? "alertSign error-placeholder" : ""
          }`}
          value={newPhone}
          placeholder={currentLocal.profilePage.addPhoneNumber}
          onChange={(e) => setNewPhone(e.target.value)}
        />
      </div>

      <div className="text-center button-container">
        <button className="button-primary" onClick={addPhone}>
          {currentLocal.profilePage.add}
        </button>
      </div>
    </Modal>
  );
}

export default AddCompanyPhoneModal;
