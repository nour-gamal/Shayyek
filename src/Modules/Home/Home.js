import React from "react";
import Navbar from "../Common/Navbar/Navbar";
import Footer from "../Common/Footer/Footer";
import BuyerHome from "./BuyerHome/BuyerHome";
import ContractorHome from "./ContractorHome/ContractorHome";
import SupplierHome from "./SupplierHome/SupplierHome";
import { useSelector } from "react-redux";
import GuestHome from "./GuestHome/GuestHome";
function Home() {
	const { authorization } = useSelector((state) => state.authorization);
	return (
		<section>
			{authorization.userTypeId && <Navbar />}
			{authorization.userTypeId === "4dbe2854-fee8-4466-a9f0-aacf394a5b7e" ? (
				<BuyerHome />
			) : authorization.userTypeId ===
			  "2a9e1d5f-722e-404e-8041-a6a665149e03" ? (
				<SupplierHome />
			) : authorization.userTypeId ===
			  "fcb9fde8-4ae5-4f6c-88e2-62e412847b2e" ? (
				<ContractorHome />
			) : (
				<GuestHome />
			)}
			<Footer />
		</section>
	);
}

export default Home;
