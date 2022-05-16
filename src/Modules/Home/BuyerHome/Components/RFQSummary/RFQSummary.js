import React from 'react'
import Footer from '../../../../Common/Footer/Footer'
import Navbarr from '../../../../Common/Navbar/Navbar'
import MyRFQSummary from '../MyRFQSummary/MyRFQSummary'
import './RFQSummary.css'
function RFQSummary() {
    return (
        <section>
            <Navbarr />
            <MyRFQSummary />
            <Footer />
        </section>
    )
}

export default RFQSummary