import React from "react";
import RFQIcon from "../../../../../Resources/Assets/research@2x.png";
import RFQInvitation from "../../../../Common/RFQInvitation/RFQInvitation";
import { useSelector } from "react-redux";
import "./RFQInvitations.css";
function RFQInvitations({ invitationCount, rfqDetails }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);

	return (
		<div className="RFQInvitations">
			<div className="title section">
				<div>
					<img src={RFQIcon} alt="RFQIcon" className="RFQIcon mx-2" />
					<span>{currentLocal.supplierHome.rfqInvitations}</span>
				</div>
				<div className="invitations_number f-12">{invitationCount}</div>
			</div>
			<div className="section">
				<RFQInvitation revealPrices={true} location={"supplier"} />
			</div>
		</div>
	);
}

export default RFQInvitations;
