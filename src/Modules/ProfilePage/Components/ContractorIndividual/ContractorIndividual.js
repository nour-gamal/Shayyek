import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../../Services";
import { Row, Col } from "antd";
// components
import PersonalInfo from "../SubComponents/Personalnfo/Personalnfo";
import BusinessCard from "../SubComponents/BusinessCard/BusinessCard";
import PreviousWorks from "./../SubComponents/PreviousWorks/PreviousWorks";
import AddWrokDetailsModal from "./../AddWorkModal/AddWorkModal";
import ShowSinglePrevWorkModal from "../SubComponents/ShowSinglePrevWorkModal/ShowSinglePrevWorkModal";
// network
import defaultImage from "../../../../Resources/Assets/DefaultProfileImage.png";
import { SupplierContractorProfile } from "../../network";
import "./ContractorIndividual.css";
// style

function SupplierContractorAdmin({ parent }) {
	const [companyDetails, setCompanyDetails] = useState(null);
	const [profileDetails, setProfileDetails] = useState(null);
	const [previousWorks, setPreviousWorks] = useState(null);

	const [selectedPrevWorkId, setSelectedPrevWorkId] = useState(null);
	const [editableModalData, setEditableModalData] = useState(null);

	// modals visibility
	const [AddModalVisibilty, toggleAddModalVisibilty] = useState(false);
	const [
		showPrevWorkModalVisibilty,
		toggleShowPrevWorkModalVisibilty,
	] = useState(false);

	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	useEffect(() => {
		SupplierContractorProfile(
			currentLanguageId,
			(success) => {
				if (success.success) {
					const { company, previousWorks, ...data } = success.data;
					setCompanyDetails(company);
					setProfileDetails(data);
					setPreviousWorks(previousWorks);
					console.log(company, previousWorks, data);
				}
			},
			(fail) => {
				console.log(fail);
			}
		);
	}, [currentLanguageId]);

	return (
		<div className="supplierContractorAdmin ppl d-flex flex-1 flex-column">
			{companyDetails && profileDetails && (
				<Row className="flex-1">
					<Col md={16} lg={18} className="flex-1 d-flex flex-column">
						<PersonalInfo
							parent={profileDetails.userTypeName}
							count={profileDetails.draftsCount}
						/>
						<div className="bussiness-cards flex-1 mb-3">
							<Row className="flex-1">
								<Col xs={24} className="flex-1">
									<BusinessCard
										profileDetails={profileDetails}
										parent={profileDetails.userTypeName}
									/>
								</Col>
							</Row>
						</div>
					</Col>
					<Col className="sideWorker" md={8} lg={6} xs={24}>
						<PreviousWorks
							togglePrevWorkModalVisibilty={toggleShowPrevWorkModalVisibilty}
							toggleAddModalVisibilty={toggleAddModalVisibilty}
							works={previousWorks}
							setSelectedPrevWorkId={setSelectedPrevWorkId}
							companyImage={
								companyDetails.image
									? baseUrl + companyDetails.image
									: defaultImage
							}
							previousWorks={previousWorks}
							parent={parent ? parent : "supplierContractorAdmin"}
						/>
					</Col>
				</Row>
			)}
			{AddModalVisibilty && (
				<AddWrokDetailsModal
					onCancel={() => toggleAddModalVisibilty(false)}
					isModalVisible={AddModalVisibilty}
					previousWorks={previousWorks}
					setPreviousWorks={setPreviousWorks}
					// edit
					selectedPrevWorkId={selectedPrevWorkId}
					setSelectedPrevWorkId={setSelectedPrevWorkId}
					editableModalData={editableModalData}
					setEditableModalData={setEditableModalData}
				/>
			)}
			{showPrevWorkModalVisibilty && (
				<ShowSinglePrevWorkModal
					onCancel={() => toggleShowPrevWorkModalVisibilty(false)}
					isModalVisible={showPrevWorkModalVisibilty}
					selectedPrevWorkId={selectedPrevWorkId}
					// to -> edit
					setSelectedPrevWorkId={setSelectedPrevWorkId}
					toggleAddModalVisibilty={toggleAddModalVisibilty}
					setEditableModalData={setEditableModalData}
				/>
			)}
		</div>
	);
}

export default SupplierContractorAdmin;
