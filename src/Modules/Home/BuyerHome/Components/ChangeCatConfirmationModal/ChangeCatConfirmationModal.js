import React from 'react'
import { Modal } from 'antd'
import { useSelector } from "react-redux";
import './ChangeCatConfirmationModal.css'
function ChangeCatConfirmationModal({ isModalVisible, onCancel, onSubmit }) {
    const { currentLocal } = useSelector((state) => state.currentLocal);
    console.log(isModalVisible.selectedCategories)
    return (
        <Modal
            title="Basic Modal"
            visible={isModalVisible.status}
            onCancel={onCancel}
            className="modal-sm deleteRFQRowModal text-center"
        >
            <div className='my-4 f-21'>{currentLocal.buyerHome.changeCatConfirmation}</div>
            <div className="d-flex justify-content-center buttonContainer">
                <button className="button-secondary primary-color" onClick={onCancel}>
                    {currentLocal.buyerHome.cancel}
                </button>
                <button className="button-primary" onClick={() => {
                    onSubmit(isModalVisible.selectedCategories);
                    onCancel();
                }}>
                    {currentLocal.buyerHome.confirm}
                </button>
            </div>
        </Modal>
    )
}

export default ChangeCatConfirmationModal