import React, { useEffect, useState } from "react";
import RFQIcon from "../../../../../Resources/Assets/research@2x.png";
import RFQInvitation from "../RFQInvitation/RFQInvitation";
import { getRFQ } from "../../../network";
import "./RFQInvitations.css";
function RFQInvitations() {
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
		<div className="RFQInvitations">
			<div className="title section">
				<div>
					<img src={RFQIcon} alt="RFQIcon" className="RFQIcon mx-2" />
					<span>RFQ Invitations</span>
				</div>
				<div className="invitations_number f-12">{invitationCount}</div>
			</div>
			<div className="section">
				<RFQInvitation />
			</div>
		</div>
	);
}

export default RFQInvitations;
