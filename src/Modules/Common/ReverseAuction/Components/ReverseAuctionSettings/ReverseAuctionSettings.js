import React, { useState, useEffect } from 'react'
import { Col, Row, Checkbox, DatePicker, Radio, Button, Spin } from 'antd';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useLocation } from "react-router-dom";
import { baseUrl } from '../../../../../Services';
import defaultAvatar from "../../../../../Resources/Assets/DefaultProfileImage.png"
import { getVendorsReverseAuction, postReverseAuction } from '../../../Network';
import RFQTableModal from '../RFQTableModal/RFQTableModal';
import { db } from "../../../../../firebase";
import {
    doc,
    setDoc,
} from "firebase/firestore";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import './ReverseAuctionSettings.css';

function ReverseAuctionSettings() {
    const { currentLocal } = useSelector(state => state.currentLocal)
    const { authorization } = useSelector(state => state.authorization)
    const [membersList, updateMembersList] = useState([]);
    const [selectedMembersDataList, updateSelectedMembersDataList] = useState([])
    const [selectedMembersList, updateSelectedMembersList] = useState([]);
    const [reverseAuctionDate, updateReverseAuctionDate] = useState(null);
    const [reverseAuctionReason, updateReverseAuctionReason] = useState(null);
    const [notes, updateNotes] = useState('');
    const [packageItems, updatePackageItems] = useState([])
    const [isDisabled, updateIsDisabled] = useState(true)
    const [isModalVisible, updateIsModalVisible] = useState(false)
    const [redirectTo, updateRedirectTo] = useState(null);
    const [isLoading, updateIsLoading] = useState(false)
    const search = useLocation().search;
    const rfqId = new URLSearchParams(search).get('rfqId');
    const currentPackageId = new URLSearchParams(search).get('currentPackageId');



    const onSelectedMembersChanged = (checked, id, memberData) => {
        let selectedMembersListVar = [...selectedMembersList]
        let selectedMembersDataListVar = [...selectedMembersDataList]

        if (checked) {
            selectedMembersListVar.push(id)
            selectedMembersDataListVar.push({ ...memberData, hasBadge: false })
        } else {
            selectedMembersListVar = selectedMembersListVar.filter(member => member !== id)
            selectedMembersDataListVar = selectedMembersDataListVar.filter(member => member !== memberData)
        }
        updateSelectedMembersList(selectedMembersListVar)
        updateSelectedMembersDataList(selectedMembersDataListVar)
    };

    useEffect(() => {
        getVendorsReverseAuction(currentPackageId, success => {
            updateMembersList(success.data)
        }, fail => {
            console.log(fail)
        })
    }, [currentPackageId]);

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().subtract(1, 'days').endOf('day');
    };
    const handleChangeDateTime = (date, dateString) => {
        updateReverseAuctionDate(dateString)
    }
    const onReverseAuctionReasonChange = (e) => {
        updateReverseAuctionReason(e.target.value)
        if (e.target.value.toString() === "1") {
            updateIsModalVisible(true)
        } else {
            updatePackageItems([])
        }
    }
    const handleChangeNotes = (e) => {
        if (e.target.value.length < 70) {
            updateNotes(e.target.value)
        }
    }


    useEffect(() => {
        if (
            selectedMembersList.length > 0
            && reverseAuctionDate &&
            reverseAuctionReason !== null
        ) {
            updateIsDisabled(false)
        } else {
            updateIsDisabled(true)
        }
    }, [selectedMembersList, reverseAuctionDate, reverseAuctionReason])
    const handleSubmit = () => {
        updateIsLoading(true)
        let data = {
            packageId: currentPackageId,
            membersIds: selectedMembersList,
            meetingDate: reverseAuctionDate,
            packageItems,
            notes,
        }
        postReverseAuction(data, async (success) => {
            const roomId = success.data.sessionId
            const roomsDocRef = doc(db, "reverseAuctionRooms", roomId);
            await setDoc(roomsDocRef, {
                vendorMembers: selectedMembersDataList,
                buyerData: {
                    name: authorization.fullName,
                    id: authorization.id,
                    image: authorization.profileImage
                },
                room: []
            });
            toast.success(success.message, {
                position: "bottom-right",
                rtl: true,
            });

            updateRedirectTo('/')
        }, fail => {
            console.log(fail)
        })
    }
    if (redirectTo) return <Redirect to={redirectTo} />
    return (
        <div className='py-4 reverseAuctionSettings'>
            <Row>
                <Col xs={24} md={16}>
                    <div className='title'>
                        {currentLocal.reverseAuction.selectMembers}
                        <span className='text-danger'>*</span>
                    </div>
                    <div className='membersBox'>
                        {membersList.map((member, index) =>
                            <div key={index} className='memberBox my-4'>
                                <Checkbox
                                    onChange={(e) => {
                                        onSelectedMembersChanged(e.target.checked, member.userId, member)
                                    }}
                                    className='d-flex align-items-center'
                                >
                                    <img src={member.userImage ? baseUrl + member.userImage : defaultAvatar} alt='avatar'
                                        className='avatar rounded-circle mx-4' />
                                    <span>{member.userName}</span>
                                </Checkbox>
                            </div>)}
                    </div>
                </Col>
                <Col xs={24} md={8}>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <div className='f-18'>
                            {currentLocal.reverseAuction.meetingTime}
                            <span className='text-danger'>*</span>
                        </div>
                        <DatePicker
                            format="YYYY-MM-DD HH:mm"
                            showTime={{
                                defaultValue: moment('00:00:00', 'HH:mm'),
                            }}
                            disabledDate={disabledDate}
                            className='dateTimePicker'
                            showNow={false}
                            placeholder=""
                            onChange={handleChangeDateTime}
                        />
                    </div>
                    <div className="mt-4">
                        <div className='title my-2'>
                            {currentLocal.reverseAuction.reverseAuctionFor}
                            <span className='text-danger'>*</span>
                        </div>
                        <Radio.Group
                            onChange={onReverseAuctionReasonChange}
                            value={reverseAuctionReason}
                            className='d-flex flex-column radioButton'
                            buttonStyle={{ color: '#005FB1' }}
                        >
                            <Radio value={0}>{currentLocal.reverseAuction.allItems}</Radio>
                            <Radio
                                value={1}
                                onClick={() => {
                                    updateIsModalVisible(true)
                                }}>{currentLocal.reverseAuction.selectSomeItems}
                            </Radio>
                        </Radio.Group>
                    </div>
                    <div className='my-4'>
                        <div className="title">
                            {currentLocal.reverseAuction.anyNotes}
                        </div>
                        <textarea
                            className='form-control'
                            value={notes}
                            onChange={handleChangeNotes}
                        />
                    </div>
                </Col>
            </Row>
            <div className="text-center">
                <Button
                    className='button-primary flat'
                    disabled={isDisabled}
                    onClick={handleSubmit}
                >
                    {isLoading ? <Spin /> : <>{currentLocal.reverseAuction.submit}</>}

                </Button>
            </div>
            <RFQTableModal
                isModalVisible={isModalVisible}
                onCancel={() => {
                    updateIsModalVisible(false)
                }}
                rfqId={rfqId}
                currentPackageId={currentPackageId}
                getSelectedRows={(val) => {
                    updatePackageItems(val)
                }}
            />
        </div >
    )
}

export default ReverseAuctionSettings