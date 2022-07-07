import React from 'react'
import Footer from '../../../../Common/Footer/Footer'
import Navbarr from '../../../../Common/Navbar/Navbar'
import DraftsGrid from '../DraftsGrid/DraftsGrid'

function RFQDrafts() {
    return (
        <section>
            <Navbarr />
            <div className="pps ppe flex-1 d-flex">
                <DraftsGrid />
            </div>
            <Footer />
        </section>
    )
}

export default RFQDrafts