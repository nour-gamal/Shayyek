import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { BuyerRFQ, getBuyerCompany } from "./../network";
import RFQInvitations from "./../SupplierHome/Components/RFQInvitations/RFQInvitations";

function BuyerHome() {
	const [invitationCount, updateInvitationsCount] = useState(0);
	const [rfqDetails, updateRFQDetails] = useState([]);

	useEffect(() => {
		BuyerRFQ(
			(success) => {
				updateInvitationsCount(success.data.rfqCount);
				updateRFQDetails(success.data.rfqInvitationDetails);
			},
			(fail) => {
				console.log(fail);
			}
		);
	});
	return (
		<div>
			<Row>
				<Col md={12} xs={14} lg={18} className="mt-2">
					test
				</Col>
				<Col md={12} xs={10} lg={6}>
					{/* <RFQInvitations
						invitationCount={invitationCount}
						rfqDetails={rfqDetails}
						parent={"buyer"}
					/> */}
				</Col>
			</Row>
		</div>
	);
}

export default BuyerHome;
