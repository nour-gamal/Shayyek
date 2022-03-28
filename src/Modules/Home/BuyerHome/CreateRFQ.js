import React from "react";
import Navbar from "../../Common/Navbar/Navbar";
import Footer from "../../Common/Footer/Footer";
import AddRFQDetails from "./Components/AddRFQDetails/AddRFQDetails";

function CreateRFQ() {
	return (
		<section>
			<Navbar />
			<AddRFQDetails />
			<Footer />
		</section>
	);
}

export default CreateRFQ;
