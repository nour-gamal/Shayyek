import React from 'react'
import { useSelector } from "react-redux";

function MyRFQSummary() {
    const { currentLocal } = useSelector((state) => state.currentLocal);

    return (
        <div>
            <div className='procurementSteps'>
                {currentLocal.rfqSummary.procSteps}
            </div>
        </div>
    )
}

export default MyRFQSummary