import React from "react";
import RFQIcon from "../../../../../Resources/Assets/research@2x.png";
import "./RFQInvitations.css";
function RFQInvitations() {
	return (
		<div className="RFQInvitations">
			<div className="title">
				<div>
					<img src={RFQIcon} alt="RFQIcon" className="RFQIcon mx-2" />
					<span>RFQ Invitations</span>
				</div>
				<div className="invitations_number f-12">1</div>
			</div>
		</div>
	);
}

export default RFQInvitations;
