import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SupplierContractorProfileForBuyer } from "./network";
import Navbar from "../../Modules/Common/Navbar/Navbar";
import Footer from "../../Modules/Common/Footer/Footer";
import PersonalInfo from "./Components/SubComponents/Personalnfo/Personalnfo";
import { useSelector } from "react-redux";
function BuyerSeeProfiles() {
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	const [profileDetails, updateProfileDetails] = useState(null);
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
			<div className="ppl ppr">
				<PersonalInfo buyerView={true} profileDetails={profileDetails} />
			</div>
			<Footer />
		</section>
	);
}

export default BuyerSeeProfiles;
