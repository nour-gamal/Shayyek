import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Col, Row } from "antd";
import { SupplierContractorAddWork } from "../../network";
import { v4 as uniqIdV4 } from "uuid";
// components
import UploadImage from "../../../../Resources/Assets/uploadImg.svg";
import closeIcon from "../../../../Resources/Assets/closeIcon.svg";
//style
import "./AddWorkModal.css";

function AddWrokDetailsModal({ isModalVisible, onCancel, setPreviousWorks }) {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const [projectName, setProjectName] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [description, setDescription] = useState("");
  const [sizeOfContract, setSizeOfContract] = useState("");
  const [uploadFiles, setUploadFiles] = useState(undefined);
  const [requiredFieldError, setRequiredFieldError] = useState(false);

  function submitForm(e) {
    e.preventDefault();
    if (projectName && description) {
      const prevWorkId = uniqIdV4();
      const data = {
        PrevWorkId: prevWorkId,
        ProjectName: projectName,
        ProjectLocation: projectLocation,
        Description: description,
        SizeOfContract: sizeOfContract,
        PrevWorkDocuments: uploadFiles,
      };

      let payload = new FormData();
      for (let item in data) {
        if (Array.isArray(data[item])) {
          data[item].forEach((file) => {
            payload.append("PrevWorkDocuments", file);
          });
        } else {
          payload.append(item, data[item]);
        }
      }
      SupplierContractorAddWork(
        payload,
        (success) => {
          if (success.success) {
            onCancel();
            setPreviousWorks((prevState) => {
              if (prevState)
                return [...prevState, { projectName, description, prevWorkId }];
              else return [{ projectName, description, prevWorkId }];
            });
          }
        },
        (fail) => {}
      );
      setRequiredFieldError(false);
    } else {
      setRequiredFieldError(true);
    }
  }

  function selectFiles(e) {
    setUploadFiles([...e.target.files]);
  }
  return (
    <Modal
      title="Basic Modal"
      visible={isModalVisible}
      onCancel={onCancel}
      className="modal-lg addWorkModal"
    >
      <header className="addWorkModal__header">
        <img
          className="cursorPointer closeIcon"
          onClick={onCancel}
          src={closeIcon}
          alt="close-modal"
        />
      </header>
      <form onSubmit={submitForm}>
        <Row>
          <Col md={12} xs={24}>
            <div className="addWorkModal__input">
              {requiredFieldError && !projectName && (
                <small className="text-red">
                  {currentLocal.supplierHome.projectNameFieldRequired}
                </small>
              )}
              <input
                type="text"
                className={`form-control primary-input-field red ${requiredFieldError &&
                  !projectName &&
                  "alertSign"}`}
                placeholder={currentLocal.profilePage.projectName}
                onChange={(e) => setProjectName(e.target.value)}
                value={projectName}
              />
            </div>
            <div className="addWorkModal__input">
              <input
                type="text"
                className="form-control primary-input-field"
                placeholder={currentLocal.buyerHome.projectLocation}
                onChange={(e) => setProjectLocation(e.target.value)}
                value={projectLocation}
              />
            </div>
            <div className="addWorkModal__input">
              {requiredFieldError && !description && (
                <small className="text-red">
                  {currentLocal.supplierHome.descriptionFieldRequired}
                </small>
              )}
              <textarea
                type="text"
                className={`form-control primary-input-field ${requiredFieldError &&
                  !description &&
                  "alertSign"}`}
                placeholder={currentLocal.registration.description}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </div>
          </Col>
          <Col md={12} xs={24}>
            <div className="addWorkModal__input">
              <input
                type="number"
                className="form-control primary-input-field"
                placeholder={currentLocal.supplierHome.sizeOfContract}
                onChange={(e) => setSizeOfContract(e.target.value)}
                value={sizeOfContract}
              />
            </div>
            <div className="addWorkModal__upload">
              <label htmlFor="upload">
                <div className="cursorPointer">
                  <div className="d-flex">
                    <img
                      src={UploadImage}
                      alt="uploadDocument"
                      className="icon"
                    />
                    {currentLocal.supplierHome.uploadDocuments}
                  </div>
                  <p>{currentLocal.supplierHome.uploadDocumentsExample}</p>
                </div>
              </label>
              <input
                id="upload"
                type="file"
                className="form-control primary-input-field d-none"
                onChange={selectFiles}
                multiple
              />
            </div>
          </Col>
        </Row>
        <div className="addWorkModal__btns">
          <button
            onClick={onCancel}
            className="cancel  button-secondary"
            type="button"
          >
            {currentLocal.profilePage.cancel}
          </button>
          <button className="add  button-primary" type="submit">
            {currentLocal.profilePage.add}
          </button>
        </div>
      </form>
    </Modal>
  );
}
export default AddWrokDetailsModal;
