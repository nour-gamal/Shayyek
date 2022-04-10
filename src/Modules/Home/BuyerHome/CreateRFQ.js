import React, { useState } from "react";
import Navbar from "../../Common/Navbar/Navbar";
import Footer from "../../Common/Footer/Footer";
import AddRFQDetails from "./Components/AddRFQDetails/AddRFQDetails";
function CreateRFQ() {
	const [rfqPages, updateRFQPages] = useState("addRFQDetails");

	const getRFQPageName = (pageName) => {
		updateRFQPages(pageName);
	};
	return (
		<section>
			<Navbar />
			{rfqPages === "addRFQDetails" ? (
				<AddRFQDetails getRFQPageName={getRFQPageName} />
			) : (
				<></>
			)}
			<Footer />
		</section>
	);
}

export default CreateRFQ;
