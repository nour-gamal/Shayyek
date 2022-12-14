import React, { useState } from "react";
import { Modal } from "antd";
import packageFile from "../../../../../Resources/Assets/package.svg";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addRFQDetails } from "../../../../../Redux/RFQ";
import { postRFQ, postRFQAsDraft } from "../../../network";
import { useLocation } from "react-router-dom";
import "./PostRFQSuccessModal.css";

function PostRFQSuccessModal({ isModalVisible, onCancel, alreadyHasPackage, rfqDetails, handleAddAnotherPackage }) {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const { rfqData } = useSelector((state) => state.rfq);
  const [redirectTo, updateRedirectTo] = useState(null);
  const dispatch = useDispatch();
  const search = useLocation().search;
  const firstRedirect = new URLSearchParams(search).get('firstRedirect');
  const draftedRfqId = new URLSearchParams(search).get('draftedRfqId');

  const handleSubmit = () => {
    let data = alreadyHasPackage ? { ...rfqData } : { ...rfqDetails }
    if (firstRedirect && draftedRfqId) {
      data.IsDraft = true;
      data.RFQId = draftedRfqId;
      postRFQAsDraft(data, success => {
        addRFQ(data)
      }, fail => {
        console.log(fail)
      })

    } else {
      addRFQ(data)
    }
  };
  const addRFQ = (data) => {
    postRFQ(
      data,
      (success) => {
        if (success.data) {
          if (rfqData.inviteByWhatsapp) {
            window.open(
              `https://api.whatsapp.com/send?text=${"You have been invited to fill The RFQ in the link below: https://shayyek.co?packageId=" +
              success.data}`,
              "_blank"
            );
          }
          updateRedirectTo("/");
          clearRFQStore();
        }
      },
      (fail) => {
        console.log(fail);
      }
    );
  }
  const clearRFQStore = () => {
    dispatch(addRFQDetails({}));
  };

  if (redirectTo) return <Redirect to={redirectTo} />;
  return (
    <Modal
      title="Basic Modal"
      visible={isModalVisible}
      onCancel={onCancel}
      className="modal-sm postRFQSuccessModal"
    >
      <img src={packageFile} alt="errorFile" />
      <div className="text-center my-4">
        <div className="my-4">
          {!alreadyHasPackage ? (
            <div>{currentLocal.buyerHome.readyToSubmit}</div>
          ) : (
            <div>
              <div>{currentLocal.buyerHome.beforeSumbit}</div>
              <div>{currentLocal.buyerHome.addAnotherPackage}</div>
            </div>
          )}
        </div>
        {alreadyHasPackage ? (
          <div className='d-flex'>
            <button
              className="button-secondary m-2"
              onClick={handleAddAnotherPackage}
            >
              {currentLocal.buyerHome.addPackage}
            </button>
            <button className="button-primary flat m-2" onClick={handleSubmit}>
              {currentLocal.buyerHome.submit}
            </button>
          </div>
        ) : (
          <div>
            <button
              className="button-secondary flat m-2"
              onClick={() => {
                onCancel();
              }}
            >
              {currentLocal.buyerHome.cancel}
            </button>
            <button className="button-primary flat m-2" onClick={handleSubmit}>
              {currentLocal.buyerHome.submit}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default PostRFQSuccessModal;
