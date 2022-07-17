import React, { useState, useEffect } from 'react'
import { Col, Row, Checkbox, DatePicker, Radio, Button } from 'antd';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useLocation } from "react-router-dom";
import { baseUrl } from '../../../../../Services';
import defaultAvatar from "../../../../../Resources/Assets/DefaultProfileImage.png"
import './ReverseAuctionSettings.css'
import { getVendorsReverseAuction } from '../../../Network';
function ReverseAuctionSettings() {
    const { currentLocal } = useSelector(state => state.currentLocal)
    const {
        authorization
    } = useSelector((state) => state.authorization);
    const [membersList, updateMembersList] = useState([]);
    const [selectedMembersList, updateSelectedMembersList] = useState([]);
    const [reverseAuctionDate, updateReverseAuctionDate] = useState(null);
    const [reverseAuctionReason, updateReverseAuctionReason] = useState(0);
    const [notes, updateNotes] = useState('');
    const [isDisabled, updateIsDisabled] = useState(true)
    const search = useLocation().search;
    const rfqId = new URLSearchParams(search).get('rfqId');
    const currentPackageId = new URLSearchParams(search).get('currentPackageId');

    const onSelectedMembersChanged = (checked, id) => {
        let selectedMembersListVar = [...selectedMembersList]
        if (checked) {
            selectedMembersListVar.push(id)
        } else {
            selectedMembersListVar = selectedMembersListVar.filter(member => member !== id)
        }
        updateSelectedMembersList(selectedMembersListVar)
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
    }
    const handleChangeNotes = (e) => {
        updateNotes(e.target.value)
    }


    useEffect(() => {
        if (
            selectedMembersList.length > 0
            && reverseAuctionDate
        ) {
            updateIsDisabled(false)
        } else {
            updateIsDisabled(true)
        }
    }, [selectedMembersList, reverseAuctionDate])
    const handleSubmit = () => { }

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
                                        onSelectedMembersChanged(e.target.checked, member.userId)
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
                            <Radio value={1}>{currentLocal.reverseAuction.selectSomeItems}</Radio>
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
                    {currentLocal.reverseAuction.submit}
                </Button>
            </div>
        </div >
    )
}

export default ReverseAuctionSettings