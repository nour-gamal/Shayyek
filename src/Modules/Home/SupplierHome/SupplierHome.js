import React from "react";
import RFQInvitations from "./Components/RFQInvitations/RFQInvitations";
import { Row, Col } from "antd";
function SupplierHome() {
	return (
		<div>
			<Row>
				<Col xs={18}>test</Col>
				<Col xs={6}>
					<RFQInvitations />
				</Col>
			</Row>
		</div>
	);
}

export default SupplierHome;
