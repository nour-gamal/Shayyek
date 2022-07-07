import React, { useState } from 'react'
import ArrowBack from '../../../../../Resources/Assets/arrowBack.svg'
import { useSelector } from "react-redux";
import Drafts from "../../../../../Resources/Assets/draft.svg";
import DraftedRFQItem from '../DraftedRFQItem/DraftedRFQItem';
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom';
import { getBuyerDrafts } from '../../../network'
import { useEffect } from 'react';
import './DraftsGrid.css'

function DraftsGrid() {
    const { currentLocal } = useSelector((state) => state.currentLocal);
    const [draftsCount, updateDraftsCount] = useState(0);
    const [draftedRFQsList, updateDraftedRFQsList] = useState([]);
    const [rerenderState, updateRerenderState] = useState(false)
    useEffect(() => {
        getBuyerDrafts(success => {
            updateDraftedRFQsList(success.data);
            updateDraftsCount(success.data.length)
        }, fail => {
            console.log(fail)
        })
    }, [rerenderState])
    const updateRerenderStateFun = () => {
        updateRerenderState(!rerenderState)
    }
    return (
        <div className='mt-4 flex-1'>
            <div className='d-flex justify-content-between align-items-center flex-1'>
                <Link to='/'>
                    <img src={ArrowBack} alt='ArrowBack' />
                    <span className='fw-600 mx-2'>{currentLocal.buyerHome.backToHome}</span>
                </Link>
                <div
                    className="mx-2 d-flex align-items-center justify-content-end cursorPointer"
                >
                    <img src={Drafts} alt="Drafts" className="mx-2" />
                    <span>{currentLocal.supplierHome.drafts}</span>
                    <div className="invitations_number mx-2">{draftsCount}</div>
                </div>
            </div>
            <div className="draftsItemsContainer">
                <Row>
                    {draftedRFQsList.map(rfq => <Col xs={24} md={12} lg={8}><DraftedRFQItem
                        updateRerenderStateFun={updateRerenderStateFun}
                        rfq={rfq} /></Col>)}
                </Row>
            </div>
        </div>
    )
}

export default DraftsGrid