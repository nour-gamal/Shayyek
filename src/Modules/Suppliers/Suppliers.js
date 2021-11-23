import React from "react";
import SuppliersGrid from "./Components/SuppliersGrid/SuppliersGrid";
import NavBar from "../Common/Navbar/Navbar";
//import { useSelector } from "react-redux";
//import Filter from "./Components/Filter/Filter";
import Footer from "../Common/Footer/Footer";
function Companies() {
	//const { currentLocal } = useSelector((state) => state.currentLocal);
	return (
		<section>
			<NavBar />
			<SuppliersGrid />
			{/* <Filter /> */}
			<Footer />
		</section>
	);
}

export default Companies;
