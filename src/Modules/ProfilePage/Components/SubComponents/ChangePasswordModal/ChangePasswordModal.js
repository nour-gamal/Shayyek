import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import { Alert } from "react-bootstrap";
import { changePassword } from "../../../network";
import CloseIcon from "../../../../../Resources/Assets/closeIcon.svg";
import "./ChangePasswordModal.css";

function ChangePasswordModal({ isModalVisible, onCancel, getNewPassword }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [showAlert, setShowAlert] = useState(null);
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const { currentLanguageId } = useSelector((state) => state.currentLocal);
  const updatePassword = () => {
    if (oldPassword && newPassword && confirmNewPassword) {
      if (confirmNewPassword !== newPassword) {
        setConfirmNewPasswordError(true);
      } else {
        let data = {
          oldPassword,
          newPassword,
          languageId: currentLanguageId,
        };
        changePassword(
          data,
          (success) => {
            if (success.success) {
              onCancel();
              getNewPassword(newPassword);
              setShowAlert(false);
            } else {
              setShowAlert(success.message);
            }
          },
          (fail) => {
            console.log("success", fail);
          }
        );
      }
    } else {
      setErrorMessage(true);
    }
  };
  return (
    <Modal
      title="Basic Modal"
      visible={isModalVisible}
      onCancel={onCancel}
      className="modal-sm changePasswordModal"
    >
      <img
        onClick={() => onCancel()}
        src={CloseIcon}
        className="closeModalIcon cursorPointer"
        alt="close-modal"
      />
      <h3 className="f-16 primary-color">
        {currentLocal.profilePage.changePassword}
      </h3>
      {showAlert && <Alert variant="danger">{showAlert}</Alert>}
      <div className="inputWrapper">
        {errorMessage && !oldPassword && (
          <div className="mb-2">
            <small className="text-red">
              {currentLocal.profilePage.requiredOldPassword}
            </small>
          </div>
        )}
        <input
          type="password"
          className={`form-control ${oldPassword ? "alertSign" : ""}`}
          value={oldPassword}
          placeholder={currentLocal.profilePage.oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div className="inputWrapper">
        {errorMessage && !newPassword ? (
          <div className="mb-2">
            <small className="text-red">
              {currentLocal.profilePage.requiredNewPassword}
            </small>
          </div>
        ) : null}
        <input
          type="password"
          className={`form-control ${newPassword ? "alertSign" : ""}`}
          placeholder={currentLocal.profilePage.newPassword}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="inputWrapper">
        {errorMessage && !confirmNewPassword ? (
          <div className="mb-2">
            <small className="text-red">
              {currentLocal.login.confirmPasswordIsRequired}
            </small>
            <br />
          </div>
        ) : null}
        {confirmNewPasswordError &&
        newPassword !== confirmNewPassword &&
        confirmNewPassword ? (
          <div className="mb-2">
            <small className="text-red">
              {currentLocal.login.passwordConfirmationDoesnotMatch}
            </small>
          </div>
        ) : null}
        <input
          type="password"
          className={`form-control ${confirmNewPassword ? "alertSign" : ""}`}
          placeholder={currentLocal.registration.confirmPassword}
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </div>
      <div className="text-center button-container">
        <button className="button-primary" onClick={updatePassword}>
          {currentLocal.buyerHome.confirm}
        </button>
      </div>
    </Modal>
  );
}

export default ChangePasswordModal;
