import React, { useState, useEffect } from "react";
import Products from "./Components/Products/Products";
import RFQInvitations from "./Components/RFQInvitations/RFQInvitations";
import { Row, Col } from "antd";
import { getRFQ } from "../network";
function SupplierHome() {
	const [invitationCount, updateInvitationsCount] = useState(0);
	const [draftsCount, updateDraftsCount] = useState(0);
	const [rfqDetails, updateRfqDetails] = useState([]);

	useEffect(() => {
		getRFQ(
			false,
			(success) => {
				if (success.success) {
					updateRfqDetails(success.data.rfqInvitationDetails);
					updateDraftsCount(success.data.draftsCount);
					updateInvitationsCount(success.data.invitationsCount);
				}
			},
			(fail) => {
				console.log(fail);
			}
		);
	}, []);
	return (
		<div>
			<Row>
				<Col md={16} xs={14} lg={18} className="mt-2">
					<Products draftsCount={draftsCount} />
				</Col>
				<Col md={8} xs={10} lg={6}>
					<RFQInvitations
						invitationCount={invitationCount}
						rfqDetails={rfqDetails}
					/>
				</Col>
			</Row>
		</div>
	);
}

export default SupplierHome;
