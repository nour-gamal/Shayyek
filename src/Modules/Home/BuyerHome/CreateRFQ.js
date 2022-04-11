import React, { useEffect, useState } from "react";
import Navbar from "../../Common/Navbar/Navbar";
import Footer from "../../Common/Footer/Footer";
import AddRFQDetails from "./Components/AddRFQDetails/AddRFQDetails";
import RFQTable from "./Components/RFQTable/RFQTable";
import { useSelector } from "react-redux";

function CreateRFQ() {
	const [rfqPages, updateRFQPages] = useState("addRFQDetails");
	const { rfqData } = useSelector((state) => state.rfq);

	const getRFQPageName = (pageName) => {
		updateRFQPages(pageName);
	};
	useEffect(() => {
		if (rfqData.rfqPages) {
			updateRFQPages(rfqData.rfqPages);
		}
	}, [rfqData.rfqPages]);

	return (
		<section>
			<Navbar />
			{rfqPages === "addRFQDetails" ? (
				<AddRFQDetails getRFQPageName={getRFQPageName} />
			) : rfqPages === "rfqTable" ? (
				<RFQTable />
			) : (
				<></>
			)}
			<Footer />
		</section>
	);
}

export default CreateRFQ;
