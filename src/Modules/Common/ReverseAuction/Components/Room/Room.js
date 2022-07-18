import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../../firebase";
import { baseUrl } from '../../../../../Services';
import { useSelector } from 'react-redux';
import './Room.css'

function Room({ isModalVisible, onCancel, roomId }) {
    const { currentLocal } = useSelector(state => state.currentLocal)
    const [buyerData, updateBuyerData] = useState(null);
    const [room, updateRoom] = useState([]);
    const [vendorMembers, updateVendorMembers] = useState([])
    useEffect(() => {
        const reverseAuctionRef = doc(db, "reverseAuctionRooms", roomId);
        onSnapshot(reverseAuctionRef, (doc) => {
            const data = doc.data()
            if (data) {
                updateBuyerData(data.buyerData)
                updateRoom(data.room);
                updateVendorMembers(data.vendorMembers)
            }
        });
    }, [roomId])
    return (
        <Modal
            title="Basic Modal"
            visible={isModalVisible}
            onCancel={onCancel}
            className="modal-lg roomModal"
        >
            
            <div className='d-flex align-items-center flex-column'>
                <img src={`${baseUrl}${buyerData?.image}`} className='avatar' alt='buyerImage' />
                <div className='f-14'>{currentLocal.reverseAuction.projectOwner}</div>
            </div>
            <label>{currentLocal.reverseAuction.targetPrice}</label>
        </Modal>
    )
}

export default Room