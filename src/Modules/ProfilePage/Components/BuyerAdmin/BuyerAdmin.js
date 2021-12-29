import React from "react";
import PersonalInfo from "../Common/Personalnfo/Personalnfo";
import { useSelector } from "react-redux";
import { Row, Col } from "antd";
import Quarter from "../Common/Quarter/Quarter";
import CompanyCard from "../Common/CompanyCard/CompanyCard";
import "./BuyerAdmin.css";
function BuyerAdmin() {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const Quarterdata = [{}, {}, {}, {}];
	return (
		<div className={currentLocal.language === "English" ? "ppl" : "ppr"}>
			<Row>
				<Col md={19} xs={16} className="pr-1">
					<PersonalInfo parent={"buyerAdmin"} />
					<Row>
						{Quarterdata.map((data, indexData) => (
							<Col
								key={indexData}
								md={12}
								lg={8}
								xl={6}
								className="margin-auto"
							>
								<Quarter index={indexData} />
							</Col>
						))}
					</Row>
				</Col>
				<Col md={5} xs={8}>
					<CompanyCard />
				</Col>
			</Row>
		</div>
	);
}

export default BuyerAdmin;
