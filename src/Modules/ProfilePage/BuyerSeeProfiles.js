import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SupplierContractorProfileForBuyer } from "./network";
import Navbar from "../../Modules/Common/Navbar/Navbar";
import Footer from "../../Modules/Common/Footer/Footer";
import { Row, Col } from "antd";
import { baseUrl } from "../../Services";
import defaultImage from "../../Resources/Assets/DefaultProfileImage.png";
import PersonalInfo from "./Components/SubComponents/Personalnfo/Personalnfo";
import { useSelector } from "react-redux";
import SidePersonalInfo from "./Components/SubComponents/SidePersonalInfo/SidePersonalInfo";
import PreviousWorks from "./Components/SubComponents/PreviousWorks/PreviousWorks";
import CompanyCard from "./Components/SubComponents/CompanyCard/CompanyCard";
import ShowSinglePrevWorkModal from "./Components/SubComponents/ShowSinglePrevWorkModal/ShowSinglePrevWorkModal";
function BuyerSeeProfiles() {
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	const [profileDetails, updateProfileDetails] = useState(null);

	const [
		showPrevWorkModalVisibilty,
		toggleShowPrevWorkModalVisibilty,
	] = useState(false);
	const [selectedPrevWorkId, setSelectedPrevWorkId] = useState(null);

	function useQuery() {
		const { search } = useLocation();

		return React.useMemo(() => new URLSearchParams(search), [search]);
	}

	let query = useQuery();
	var userId = query.get("userId");

	useEffect(() => {
		const data = {
			currentLanguageId,
			userId,
		};
		SupplierContractorProfileForBuyer(
			data,
			(success) => {
				updateProfileDetails(success.data);
			},
			(fail) => {
				console.log(fail);
			}
		);
	}, [userId, currentLanguageId]);

	return (
		<section>
			<Navbar />
			<div className="pps">
				{profileDetails && (
					<Row>
						<Col lg={18} md={16} xs={24}>
							<PersonalInfo
								buyerView={true}
								profileDetails={profileDetails}
								parent={"buyerSee"}
							/>
							<Row>
								<Col md={12} xs={24} className={"px-4"}>
									<SidePersonalInfo
										allData={{
											name: profileDetails.name,
											type: profileDetails.userType,
											categories: profileDetails.categories,
										}}
										parent={"buyerSee"}
									/>
								</Col>
								<Col md={12} xs={24}>
									{profileDetails.company && (
										<CompanyCard
											companyDetails={profileDetails.company}
											parent={"buyerSee"}
										/>
									)}
								</Col>
							</Row>
						</Col>
						<Col className="sideWorker" lg={6} md={8} xs={24}>
							<PreviousWorks
								togglePrevWorkModalVisibilty={toggleShowPrevWorkModalVisibilty}
								works={profileDetails.previousWorks}
								setSelectedPrevWorkId={setSelectedPrevWorkId}
								companyImage={
									profileDetails.company.image
										? baseUrl + profileDetails.company.image
										: defaultImage
								}

								// parent={parent ? parent : "supplierContractorAdmin"}
							/>
						</Col>
					</Row>
				)}
			</div>
			<Footer />
			{showPrevWorkModalVisibilty && (
				<ShowSinglePrevWorkModal
					onCancel={() => toggleShowPrevWorkModalVisibilty(false)}
					isModalVisible={showPrevWorkModalVisibilty}
					selectedPrevWorkId={selectedPrevWorkId}
					setSelectedPrevWorkId={setSelectedPrevWorkId}
					parent={"buyerSeeProfiles"}
				/>
			)}
		</section>
	);
}

export default BuyerSeeProfiles;
