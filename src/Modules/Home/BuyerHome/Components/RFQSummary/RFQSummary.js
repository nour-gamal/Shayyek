import React from 'react'
import Footer from '../../../../Common/Footer/Footer'
import Navbarr from '../../../../Common/Navbar/Navbar'
import MyRFQSummary from '../MyRFQSummary/MyRFQSummary'
import './RFQSummary.css'
function RFQSummary(props) {
    const rfqId = props.match.params.id;
    return (
        <section>
            <Navbarr />
            <MyRFQSummary rfqId={rfqId} />
            <Footer />
        </section>
    )
}

export default RFQSummary