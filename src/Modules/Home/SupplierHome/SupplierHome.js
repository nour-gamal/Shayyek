import React from "react";
import Products from "./Components/Products/Products";
import RFQInvitations from "./Components/RFQInvitations/RFQInvitations";
import { Row, Col } from "antd";
function SupplierHome() {
	return (
		<div>
			<Row>
				<Col md={16} xs={14} lg={18}>
					<Products />
				</Col>
				<Col md={8} xs={10} lg={6}>
					<RFQInvitations />
				</Col>
			</Row>
		</div>
	);
}

export default SupplierHome;
