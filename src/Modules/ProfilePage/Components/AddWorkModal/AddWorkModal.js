import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Col, Row } from "antd";
import {
  SupplierContractorAddWork,
  supplierContractorEditWork,
} from "../../network";
import { v4 as uniqIdV4 } from "uuid";
// components
import UploadImage from "../../../../Resources/Assets/uploadImg.svg";
import closeIcon from "../../../../Resources/Assets/closeIcon.svg";
//style
import "./AddWorkModal.css";

function AddWrokDetailsModal({
  isModalVisible,
  onCancel,
  setPreviousWorks,
  editableModalData,
  setEditableModalData,
  selectedPrevWorkId,
  setSelectedPrevWorkId,
}) {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const [ProjectName, setProjectName] = useState("");
  const [ProjectLocation, setProjectLocation] = useState("");
  const [Description, setDescription] = useState("");
  const [SizeOfContract, setSizeOfContract] = useState("");
  const [PrevWorkDocuments, setPrevWorkDocuments] = useState(undefined);
  const [requiredFieldError, setRequiredFieldError] = useState(false);
  let data;
  function submitForm(e) {
    e.preventDefault();
    if (ProjectName && Description) {
      let PrevWorkId = uniqIdV4();
      data = {
        PrevWorkId,
        ProjectName,
        ProjectLocation,
        Description,
        SizeOfContract,
        PrevWorkDocuments,
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
      if (selectedPrevWorkId) {
        supplierContractorEditWork(
          payload,
          (success) => {
            onCancel();
          },
          (fail) => {}
        );
      } else {
        SupplierContractorAddWork(
          payload,
          (success) => {
            if (success.success) {
              onCancel();
              setPreviousWorks((prevState) => {
                if (prevState)
                  return [
                    { ProjectName, Description, PrevWorkId },
                    ...prevState,
                  ];
                else return [{ ProjectName, Description, PrevWorkId }];
              });
            }
          },
          (fail) => {}
        );
      }

      setRequiredFieldError(false);
    } else {
      setRequiredFieldError(true);
    }
  }
  useEffect(() => {
    if (selectedPrevWorkId) {
      const {
        projectName,
        projectLocation,
        description,
        sizeOfContract,
        prevWorkDocuments,
      } = editableModalData;
      setProjectName(projectName);
      setProjectLocation(projectLocation ? projectLocation : "");
      setDescription(description);
      setSizeOfContract(sizeOfContract ? sizeOfContract : "");
      setPrevWorkDocuments(prevWorkDocuments ? prevWorkDocuments : "");
    }
  }, [editableModalData, selectedPrevWorkId]);

  function selectFiles(e) {
    setPrevWorkDocuments([...e.target.files]);
  }

  function closeModal() {
    onCancel();
    setEditableModalData(null);
    setSelectedPrevWorkId(null);
  }

  console.log(editableModalData, PrevWorkDocuments);
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
              {requiredFieldError && !ProjectName && (
                <small className="text-red">
                  {currentLocal.supplierHome.projectNameFieldRequired}
                </small>
              )}
              <input
                type="text"
                className={`form-control primary-input-field red ${requiredFieldError &&
                  !ProjectName &&
                  "alertSign"}`}
                placeholder={currentLocal.profilePage.projectName}
                onChange={(e) => setProjectName(e.target.value)}
                value={ProjectName}
              />
            </div>
            <div className="addWorkModal__input">
              <input
                type="text"
                className="form-control primary-input-field"
                placeholder={currentLocal.buyerHome.projectLocation}
                onChange={(e) => setProjectLocation(e.target.value)}
                value={ProjectLocation}
              />
            </div>
            <div className="addWorkModal__input">
              {requiredFieldError && !Description && (
                <small className="text-red">
                  {currentLocal.supplierHome.descriptionFieldRequired}
                </small>
              )}
              <textarea
                type="text"
                className={`form-control primary-input-field ${requiredFieldError &&
                  !Description &&
                  "alertSign"}`}
                placeholder={currentLocal.registration.description}
                onChange={(e) => setDescription(e.target.value)}
                value={Description}
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
                value={SizeOfContract}
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
            onClick={closeModal}
            className="cancel  button-secondary"
            type="button"
          >
            {currentLocal.profilePage.cancel}
          </button>
          {selectedPrevWorkId ? (
            <button className="add  button-primary" type="submit">
              {currentLocal.profilePage.saveChanges}
            </button>
          ) : (
            <button className="add  button-primary" type="submit">
              {currentLocal.profilePage.add}
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}
export default AddWrokDetailsModal;
