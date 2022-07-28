import React, { useEffect, useState } from 'react'
import { Col, Modal, Row } from 'antd'
import RFQInvitation from '../../../../Common/RFQInvitation/RFQInvitation'
import { BuyerRFQ } from '../../../../Home/network';
import './InviteToRFQModal.css'
function InviteToRFQModal({ isModalVisible, onCancel, vendorId }) {
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
                    return <Col xs={24} sm={12} md={8} lg={6} className="rfqInvitationContainer">
                        <RFQInvitation
                            rfqDetails={detail}
                            parent={'inviteToRFQ'}
                            vendorId={vendorId}
                            onCancel={onCancel}
                        />
                    </Col>
                })}
            </Row>
        </Modal>
    )
}

export default InviteToRFQModal