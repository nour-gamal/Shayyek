import React, { useEffect, useState, useRef } from 'react'
import { Modal } from 'antd'
import { doc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../../../firebase";
import { baseUrl } from '../../../../../Services';
import GiveBadge from "../../../../../Resources/Assets/GiveBadge.svg";
import EndSession from "../../../../../Resources/Assets/endSession.svg";
import groupSendMsg from "../../../../../Resources/Assets/groupSendMsg.svg";
import { useSelector } from 'react-redux';
import defaultAvatar from "../../../../../Resources/Assets/DefaultProfileImage.png"
import './Room.css'

function Room({ isModalVisible, onCancel, roomId }) {
    const { currentLocal } = useSelector(state => state.currentLocal);
    const {
        authorization,
    } = useSelector((state) => state.authorization);
    const [buyerData, updateBuyerData] = useState(null);
    const [isBuyer, updateisBuyer] = useState(false)
    const [room, updateRoom] = useState([]);
    const [msg, updateMsg] = useState('')
    const [vendorMembers, updateVendorMembers] = useState([]);
    const msgRef = useRef()
    useEffect(() => {
        const reverseAuctionRef = doc(db, "reverseAuctionRooms", roomId);
        onSnapshot(reverseAuctionRef, (doc) => {
            const data = doc.data()
            if (data) {
                updateBuyerData(data.buyerData)
                updateRoom(data.room);
                updateVendorMembers(data.vendorMembers);
                if (authorization.id === data.buyerData.id) {
                    updateisBuyer(true)
                }
            }
        });
    }, [roomId, authorization]);
    const handleSendMsg = async (e) => {
        e.preventDefault();
        if (msg.length > 0) {
            const reverseAuctionRef = doc(db, "reverseAuctionRooms", roomId);
            const discountValue = msg *
                vendorMembers.filter(member => member.id === authorization.id).totalPrice
            await updateDoc(reverseAuctionRef, {
                room: arrayUnion({
                    msg: discountValue,
                    name: authorization.fullName,
                    id: authorization.id,
                    image: authorization.profileImage
                })
            });
            updateMsg('')
        }
    }
    useEffect(() => {
        msgRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, [room])
    return (
        <Modal
            title="Basic Modal"
            visible={isModalVisible}
            onCancel={onCancel}
            className="modal-lg roomModal"
        >
            {buyerData && <>
                <div className="d-flex justify-content-between">
                    <div className='d-flex align-items-center'>
                        <div className='d-flex align-items-center flex-column'>
                            <img src={buyerData?.image ? `${baseUrl}${buyerData?.image}` : defaultAvatar} className='avatar' alt='buyerImage' />
                            <div className='f-14'>{currentLocal.reverseAuction.projectOwner}</div>
                        </div>
                        <div className="mx-2 d-flex align-items-center">
                            <label className='text-danger'>{currentLocal.reverseAuction.targetPrice}</label>
                            <div className="targetBox text-danger">12,0000 LE</div>
                        </div>
                    </div>
                    {isBuyer && <div>
                        <label className='suppliersTitle'>{currentLocal.reverseAuction.suppliers}</label>
                        {vendorMembers.map(member => {
                            return <img src={member.userImage ? `${baseUrl}${member.userImage}` : defaultAvatar} className='avatar mx-2' alt="memberImg" />
                        })}
                    </div>}
                </div>
                <div className="msgBox p-4">
                    <div className="msg">
                        {room.map((msg, index) => {
                            return <div className={index % 2 ? "d-flex my-2 justify-content-end align-items-center" : 'align-items-center d-flex my-2'}>
                                <img src={baseUrl + msg.image} alt='avatar' className='avatar' />
                                <div className='mx-3'>
                                    <div className='f-12'>{msg.name}</div>
                                    <div className="msgCapsule">
                                        {msg.msg} LE
                                    </div>
                                </div>

                            </div>
                        })}
                    </div>
                    <div ref={msgRef}></div>
                </div>
                <form className="d-flex align-items-center actionCenter mt-4" onSubmit={handleSendMsg}>
                    {isBuyer && <>
                        <div className='mx-4 text-center cursorPointer'>
                            <img src={EndSession} alt='EndSession' />
                            <div className='f-12 my-2'>{currentLocal.reverseAuction.endSession}</div>
                        </div>
                        <div className='mx-4 text-center cursorPointer'>
                            <img src={GiveBadge} alt='GiveBadge' />
                            <div className='f-12 my-2'>{currentLocal.reverseAuction.endAndGiveBadge}</div>
                        </div>
                    </>}
                    {!isBuyer && <>
                        <input
                            type='number'
                            className='flex-1 sendMsgInput'
                            onChange={(e) => {
                                updateMsg(e.target.value)
                            }}
                            value={msg}
                            placeholder={currentLocal.reverseAuction.discountPercent}
                            min='0'
                            max='100'
                        />
                        <button type='submit' className='sendMsgBtn'>
                            <img src={groupSendMsg} alt='groupSendMsg' className='mx-2' />
                        </button>
                    </>}
                </form>
            </>}
        </Modal>
    )
}

export default Room