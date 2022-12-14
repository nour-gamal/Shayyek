import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { BuyerRFQ } from "./../network";
import RFQInvitations from "./../SupplierHome/Components/RFQInvitations/RFQInvitations";
import RelatedMarket from "./Components/RelatedMarket/RelatedMarket";
//import Drafts from "../../../Resources/Assets/draft.svg";

function BuyerHome() {
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
	}, []);
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
		<div>
			<Row>
				<Col md={16} xs={14} lg={18} className="mt-2">
					<RelatedMarket />
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
		</div>
	);
}

export default BuyerHome;
