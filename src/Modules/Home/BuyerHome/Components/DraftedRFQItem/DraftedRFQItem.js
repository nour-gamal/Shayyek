import React from 'react';
import Garbage from "../../../../../Resources/Assets/GarbageLg.svg";
import { useSelector } from "react-redux";

import './DraftedRFQItem.css';
import { Button } from 'antd';
function DraftedRFQItem() {
    const { currentLocal } = useSelector((state) => state.currentLocal);
    return (
        <div className='draftedRFQItem p-2 my-4'>
            <div className='d-flex justify-content-between'>
                <div className='projectName fw-500'>Project 1</div>
                <img src={Garbage} alt='Garbage' className='cursorPointer' />
            </div>
            <div className='label my-2 f-14'>
                <div className='title'>{currentLocal.buyerHome.packageName}</div>
                <div className='value'>value</div>
            </div>
            <div className='label my-2 f-14'>
                <div className='title'>{currentLocal.buyerHome.projectLocation}</div>
                <div className='value'>value</div>
            </div>
            <div className='label my-2 f-14'>
                <div className='title'>{currentLocal.buyerHome.projectOwner}</div>
                <div className='value'>value</div>
            </div>
            <div className="text-center">
                <Button className='button-primary my-2 flat'>
                    {currentLocal.buyerHome.completeRFQ}
                </Button>
            </div>
        </div >
    )
}

export default DraftedRFQItem