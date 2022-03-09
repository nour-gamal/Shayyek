import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SupplierContractorProfileForBuyer } from "./network";
import { useSelector } from "react-redux";

function BuyerSeeProfiles() {
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
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
				console.log(success);
			},
			(fail) => {
				console.log(fail);
			}
		);
	}, [userId, currentLanguageId]);
	return <div>buyerSeeProfiles</div>;
}

export default BuyerSeeProfiles;
