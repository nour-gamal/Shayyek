import React from 'react'
import { Modal } from 'antd'
import './ChangeCatConfirmationModal.css'
function ChangeCatConfirmationModal({ isModalVisible, onCancel, onSubmit }) {
    return (
        <Modal
            title="Basic Modal"
            visible={isModalVisible}
            onCancel={onCancel}
            className="modal-sm deleteRFQRowModal text-center"
        >
            ChangeCatConfirmationModal
        </Modal>
    )
}

export default ChangeCatConfirmationModal