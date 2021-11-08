import React from "react";
import Navbar from "../Common/Navbar/Navbar";
import Footer from "../Common/Footer/Footer";
import BuyerHome from "./BuyerHome/BuyerHome";
import ContractorHome from "./ContractorHome/ContractorHome";
import SupplierHome from "./SupplierHome/SupplierHome";
import GuestHome from "./GuestHome/GuestHome";
function Home() {
	const userType = "buyer";
	return (
		<section>
			{userType !== "landingPage" && <Navbar />}
			{userType === "buyer" ? (
				<BuyerHome />
			) : userType === "supplier" ? (
				<SupplierHome />
			) : userType === "contractor" ? (
				<ContractorHome />
			) : (
				<GuestHome />
			)}
			<Footer />
		</section>
	);
}

export default Home;
