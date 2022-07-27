import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import Footer from '../../../../Common/Footer/Footer'
import Navbarr from '../../../../Common/Navbar/Navbar'
import { BuyerRFQ } from '../../../network'
import RFQInvitations from '../../../SupplierHome/Components/RFQInvitations/RFQInvitations'
import FavVendorsBox from './Components/FavVendorsBox/FavVendorsBox'
import './MyFavVendors.css'
function MyFavVendors() {
    const [invitationCount, updateInvitationsCount] = useState(0);
    const [rfqDetails, updateRFQDetails] = useState(null);

    useEffect(() => {
        BuyerRFQ(
            (success) => {
                updateInvitationsCount(success.data.length);
                updateRFQDetails(success.data);
            },
            (fail) => {
                console.log(fail);
            }
        );
    }, [])
    const updateRFQsList = () => {
        BuyerRFQ(
            (success) => {
                updateInvitationsCount(success.data.length);
                updateRFQDetails(success.data);
            },
            (fail) => {
                console.log(fail);
            }
        );
    };
    return (
        <section>
            <Navbarr />
            <Row className='pps'>
                <Col md={16} xs={14} lg={18} className="mt-2">
                    <FavVendorsBox />
                </Col>
                <Col md={8} xs={10} lg={6}>
                    {rfqDetails && (
                        <RFQInvitations
                            invitationCount={invitationCount}
                            rfqDetails={rfqDetails}
                            parent={"buyer"}
                            updateRFQsList={updateRFQsList}
                        />
                    )}
                </Col>
            </Row>
            <Footer />
        </section>
    )
}

export default MyFavVendors