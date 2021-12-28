import React from "react";
import PersonalInfo from "../Common/Personalnfo/Personalnfo";
import { useSelector } from "react-redux";
import Quarter from "../Common/Quarter/Quarter";
import "./BuyerAdmin.css";
function BuyerAdmin() {
	const { currentLocal } = useSelector((state) => state.currentLocal);

	return (
		<div
			className={currentLocal.language === "English" ? "ppl mx-2" : "ppr mx-2"}
		>
			<PersonalInfo parent={"buyerAdmin"} />
			<Quarter />
		</div>
	);
}

export default BuyerAdmin;
