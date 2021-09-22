import React from "react";
import SuppliersGrid from "./Components/SuppliersGrid/SuppliersGrid";
import NavBar from "../Common/Navbar/Navbar";
import Footer from "../Common/Footer/Footer";
function Companies() {
	return (
		<section>
			<NavBar />
			<SuppliersGrid />
			<Footer />
		</section>
	);
}

export default Companies;
