import React from "react";
import RFQIcon from "../../../../../Resources/Assets/research@2x.png";
import RFQInvitation from "../RFQInvitation/RFQInvitation";
import "./RFQInvitations.css";
function RFQInvitations({ invitationCount, rfqDetails }) {
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
