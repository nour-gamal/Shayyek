import React from "react";
import Navbar from "../Common/Navbar/Navbar";
import Footer from "../Common/Footer/Footer";
import { useSelector } from "react-redux";
// import PersonalInfo from "./Components/Personalnfo/Personalnfo";
// import BuyerPortfolio from "./Components/BuyerPortfolio/BuyerPortfolio";
// import BusinessCard from "./Components/BusinessCard/BusinessCard";
// import CompanyCard from "./Components/CompanyCard/CompanyCard";
// import { Col, Container, Row } from "react-bootstrap";
import SupplierContractorAdmin from "./Components/SupplierContractorAdmin/SupplierContractorAdmin";
import SupplierContractorEmployee from "./Components/SupplierContractorEmployee/SupplierContractorEmployee";
import ContractorIndividual from "./Components/ContractorIndividual/ContractorIndividual";
import BuyerAdmin from "./Components/BuyerAdmin/BuyerAdmin";
import BuyerEmployeeIndividual from "./Components/BuyerEmployeeIndividual/BuyerEmployeeIndividual";
function ProfilePage() {
	const { authorization } = useSelector((state) => state.authorization);
	//const { currentLocal } = useSelector((state) => state.currentLocal);
	// let typesEnum = {
	// 	Individual: "436b77d6-bc46-4527-bc72-ec7fc595e16d",
	// 	Company: "d23f2c1e-1ed3-4066-96d6-66a970e39a7f",
	// 	Contractor: "fcb9fde8-4ae5-4f6c-88e2-62e412847b2e",
	// 	Supplier: "2a9e1d5f-722e-404e-8041-a6a665149e03",
	// 	Buyer: "4dbe2854-fee8-4466-a9f0-aacf394a5b7e",
	//  Admin:"274c0b77-90cf-4ee3-976e-01e409413057",
	//  Employee:"4940d4e9-8bfd-467d-a9d9-20f719cdff93"
	// };
	console.log(authorization);
	return (
		<section>
			<Navbar />
			{/* if supplier or Contractor?if Admin?<Admin>:</Employee>:if buyer?if admin?<Admin/>:<Employee/>:<ContructorIndividual> */}

			{authorization.userTypeId === "2a9e1d5f-722e-404e-8041-a6a665149e03" ||
			authorization.userTypeId === "fcb9fde8-4ae5-4f6c-88e2-62e412847b2e" ? (
				authorization.roleId === "274c0b77-90cf-4ee3-976e-01e409413057" ? (
					<SupplierContractorAdmin />
				) : (
					<SupplierContractorEmployee />
				)
			) : authorization.userTypeId ===
			  "4dbe2854-fee8-4466-a9f0-aacf394a5b7e" ? (
				authorization.roleId === "274c0b77-90cf-4ee3-976e-01e409413057" ? (
					<BuyerAdmin />
				) : (
					<BuyerEmployeeIndividual />
				)
			) : (
				<ContractorIndividual />
			)}

			{/* <Container
				fluid
				className={currentLocal.language === "English" ? "ppl" : "ppr"}
			>
				<Row>
					<Col xs={8} md={10}>
						<PersonalInfo />
						<Container fluid className="my-2">
							<Row>
								<Col md={6}>
									<BusinessCard />
								</Col>
								<Col md={6}>
									<CompanyCard />
								</Col>
							</Row>
						</Container>
					</Col>
					<Col xs={4} md={2} className="px-0">
						<BuyerPortfolio />
					</Col>
				</Row>
			</Container> */}
			<Footer />
		</section>
	);
}

export default ProfilePage;
