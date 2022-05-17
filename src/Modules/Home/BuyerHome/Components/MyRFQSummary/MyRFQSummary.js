import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import stepsRight from "../../../../../Resources/Assets/stepsRight.svg"
import Package from "../../../../../Resources/Assets/package.svg"
import PackageDisabled from "../../../../../Resources/Assets/packageDisabled.svg"
import ReactTooltip from "react-tooltip";
import './MyRFQSummary.css'
import SummaryTable from '../SummaryTable/SummaryTable';
function MyRFQSummary() {
    const { currentLocal } = useSelector((state) => state.currentLocal);
    const [currentPackageId, updateCurrentPackageId] = useState(null);
    const [rfqDetails, updateRFQDetails] = useState({ packages: [1, 2, 3] })
    useEffect(() => {
    }, [])
    return (
        <div className='myRFQSummary'>
            <div className='procurementSteps d-flex align-items-center justify-content-center'>
                <div className='title fw-500 mx-2'>{currentLocal.rfqSummary.procSteps}:</div>
                <div className='d-flex  white-capsules-container'>
                    <div className='white-capsules d-flex'>
                        <div className='text'>{currentLocal.rfqSummary.Prequalification}</div>
                        <img src={stepsRight} alt='stepsRight' className='stepsRight' />
                    </div>
                    <div className='white-capsules d-flex'>
                        <div className='text'>{currentLocal.rfqSummary.technicalComparison}</div>
                        <img src={stepsRight} alt='stepsRight' className='stepsRight' />
                    </div>
                    <div className='white-capsules d-flex'>
                        <div className='text'>{currentLocal.rfqSummary.commercialComparison}</div>
                        <img src={stepsRight} alt='stepsRight' className='stepsRight' />
                    </div>
                </div>
            </div>
            <div className='pps ppe'>
                <div className='d-flex my-2 justify-content-between flex-wrap'>
                    <div className='mx-3'>{currentLocal.rfqSummary.projectName}:test</div>
                    <div className='mx-3'>{currentLocal.rfqSummary.projectOwner}:test</div>
                    <div className='mx-3'>{currentLocal.rfqSummary.projectContractor}:test</div>
                    <div className='mx-3'>{currentLocal.rfqSummary.deliveryDate}:test</div>
                    <div className='mx-3'>{currentLocal.rfqSummary.deliveryAddress}:test</div>
                    <div className='mx-3'>{currentLocal.rfqSummary.projectPackages}:test</div>
                </div>
                <div className="d-flex packages-container align-items-center my-4">
                    <div className="title mx-3 fw-500">{currentLocal.rfqSummary.projectPackages}</div>
                    {rfqDetails.packages.map((packageItem) => {
                        return (
                            <div className="packageInfo mx-4 cursorPointer">
                                <img src={currentPackageId === true ? Package : PackageDisabled} alt='Package' />
                                <div className={currentPackageId === true ? "packageName p-2 fw-500 flex-wrap" : "packageName p-2 fw-500 flex-wrap disabled"} data-tip="packageName">packageName</div>
                                <ReactTooltip />
                            </div>
                        )
                    })}
                </div>
            </div>
            <SummaryTable />
        </div >
    )
}

export default MyRFQSummary