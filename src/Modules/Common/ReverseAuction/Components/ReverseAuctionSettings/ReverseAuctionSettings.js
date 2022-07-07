import React, { useState, useEffect } from 'react'
import { Col, Row, Checkbox } from 'antd';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { baseUrl } from '../../../../../Services'
import './ReverseAuctionSettings.css'
function ReverseAuctionSettings() {
    const { currentLocal } = useSelector(state => state.currentLocal)

    const {
        authorization
    } = useSelector((state) => state.authorization);
    const [membersList, updateMembersList] = useState([])
    const [selectedMembersList, updateSelectedMembersList] = useState([])

    const search = useLocation().search;
    const rfqId = new URLSearchParams(search).get('rfqId');

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
        console.log(rfqId);
        updateMembersList([
            { name: 'Fatma ElzahraaFatma ElzahraaFatma ElzahraaFatma ElzahraaFatma ElzahraaFatma Elzahraa', image: 'sss', id: 1, },
            { name: '22', image: 'sss', id: 2 },
            { name: '33', image: 'sss', id: 3 },
            { name: '44', image: 'sss', id: 4 },
            { name: '44', image: 'sss', id: 4 },
            { name: '44', image: 'sss', id: 4 },
            { name: '44', image: 'sss', id: 4 },
            { name: '44', image: 'sss', id: 4 }]

        )
    }, [rfqId]);
    console.log(authorization)

    return (
        <div className='py-4 reverseAuctionSettings'>
            <Row>
                <Col xs={24} md={12}>
                    <div className='title'>{currentLocal.reverseAuction.selectMembers}<span className='text-danger'>*</span></div>
                    <div className='membersBox'>
                        {membersList.map((member, index) =>
                            <div key={index} className='memberBox my-4'>
                                <Checkbox
                                    onChange={(e) => {
                                        onSelectedMembersChanged(e.target.checked, member.id)
                                    }}
                                    className='d-flex align-items-center'
                                >
                                    <img src={baseUrl + authorization.profileImage} alt='avatar'
                                        className='avatar rounded-circle mx-4' />
                                    <span> {member.name}</span>
                                </Checkbox>
                            </div>)}
                    </div>
                </Col>
                <Col xs={24} md={12}>
                    <div className='title'>{currentLocal.reverseAuction.selectMembers}</div>
                </Col>
            </Row>
        </div >
    )
}

export default ReverseAuctionSettings