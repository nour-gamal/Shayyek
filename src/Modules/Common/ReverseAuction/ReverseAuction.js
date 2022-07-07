import React from 'react'
import Navbarr from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import ReverseAuctionSettings from './Components/ReverseAuctionSettings/ReverseAuctionSettings'
function ReverseAuction() {
    return (
        <section>
            <Navbarr />
            <div className="pps ppe flex-1 d-flex">
                <ReverseAuctionSettings />
            </div>
            <Footer />
        </section>
    )
}

export default ReverseAuction