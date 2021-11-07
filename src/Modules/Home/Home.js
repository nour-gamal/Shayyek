import React from "react";
import Navbar from "../Common/Navbar/Navbar";
import Footer from "../Common/Footer/Footer";
import BuyerHome from "./BuyerHome/BuyerHome";
import ContractorHome from "./ContractorHome/ContractorHome";
import SupplierHome from "./SupplierHome/SupplierHome";
import GetInTouch from "./GetInTouch/GetInTouch";
function Home() {
	const userType = "buyer";
	return (
		<section>
			<Navbar />
			{/* {userType === "buyer" ? (
				<BuyerHome />
			) : userType === "supplier" ? (
				<SupplierHome />
			) : (
				<ContractorHome />
			)} */}
			<GetInTouch />
			<Footer />
		</section>
	);
}

export default Home;
