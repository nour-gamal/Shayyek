import React, { useState } from 'react'
import ArrowBack from '../../../../../Resources/Assets/arrowBack.svg'
import { useSelector } from "react-redux";
import Drafts from "../../../../../Resources/Assets/draft.svg";
import DraftedRFQItem from '../DraftedRFQItem/DraftedRFQItem';
import { Row, Col } from 'antd'
import './DraftsGrid.css'
import { Link } from 'react-router-dom';

function DraftsGrid() {
    const { currentLocal } = useSelector((state) => state.currentLocal);
    // eslint-disable-next-line
    const [draftsCount, updateDraftsCount] = useState(0);
    // eslint-disable-next-line
    const [draftedRFQsList, updateDraftedRFQsList] = useState([1, 2, 2, 3, 3, 3, 3,])

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
                    {draftedRFQsList.map(rfq => <Col xs={24} md={12} lg={8}><DraftedRFQItem /></Col>)}
                </Row>
            </div>
        </div>
    )
}

export default DraftsGrid