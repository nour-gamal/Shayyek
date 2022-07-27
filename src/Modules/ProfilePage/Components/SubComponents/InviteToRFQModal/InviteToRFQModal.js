import React, { useEffect, useState } from 'react'
import { Col, Modal, Row } from 'antd'
import RFQInvitation from '../../../../Common/RFQInvitation/RFQInvitation'
import { BuyerRFQ } from '../../../../Home/network';
import './InviteToRFQModal.css'
function InviteToRFQModal({ isModalVisible, onCancel }) {
    const [RFQDetails, updateRFQDetails] = useState([])
    useEffect(() => {
        BuyerRFQ(
            (success) => {
                updateRFQDetails(success.data);
            },
            (fail) => {
                console.log(fail);
            }
        );
    }, []);
    return (
        <Modal
            title="Basic Modal"
            visible={isModalVisible}
            onCancel={onCancel}
            className="modal-lg inviteToRFQModal"
        >
            <Row>
                {RFQDetails.map(detail => {
                    return <Col sm={24} md={6} className="rfqInvitationContainer">
                        <RFQInvitation
                            rfqDetails={detail}
                            parent={'inviteToRFQ'}
                        />
                    </Col>
                })}
            </Row>
        </Modal>
    )
}

export default InviteToRFQModal