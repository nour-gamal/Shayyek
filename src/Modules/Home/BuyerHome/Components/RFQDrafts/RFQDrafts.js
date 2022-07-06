import React from 'react'
import { useEffect } from 'react'
import Footer from '../../../../Common/Footer/Footer'
import Navbarr from '../../../../Common/Navbar/Navbar'
import { getBuyerDrafts } from '../../../network'
import DraftsGrid from '../DraftsGrid/DraftsGrid'

function RFQDrafts() {

    useEffect(() => {
        getBuyerDrafts(success => {
            console.log(success)
        }, fail => {
            console.log(fail)
        })
    }, [])
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