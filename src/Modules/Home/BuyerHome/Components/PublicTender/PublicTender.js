import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Checkbox, Radio } from "antd";
import { getPublicTenderFilters } from "../../../network";

import "./PublicTender.css";
import { getVolumeOfBusiness } from "../../../../Registration/Network";
function PublicTender({
	getPublicTenderData,
}) {
	const { currentLocal, currentLanguageId } = useSelector((state) => state.currentLocal);
	const [publishOrFilter, updatePublishOrFilter] = useState("publish");
	const [preQualificationsFilters, updatepreQualificationsFilters] = useState([]);
	const [publicTenderFilterDraft, updatePublicTenderFilterDraft] = useState([]);
	const [volumeOfBusinessList, updateVolumeOfBusinessList] = useState([])
	const [selectedVolumeOfBusiness, updateSelectedVolumeOfBusiness] = useState(null);
	const [isVolOfBussOpened, updateIsVolOfBussOpened] = useState(false)
	const onSpecificBusinessChange = (e) => {
		updateSelectedVolumeOfBusiness(e.target.value);
	};
	useEffect(() => {
		getPublicTenderFilters(currentLanguageId, success => {
			updatepreQualificationsFilters(success.data);
			let selectedFilters = []
			success.data.forEach(filter => {
				selectedFilters.push({ filterId: filter.id, isSelected: false })
			})
			updatePublicTenderFilterDraft(selectedFilters);
		}, fail => {
			console.log(fail)
		})
		getVolumeOfBusiness(currentLanguageId, success => {
			updateVolumeOfBusinessList(success.data);
			updateSelectedVolumeOfBusiness(success.data[0].id)
		}, fail => {
			console.log(fail)
		})
	}, [currentLanguageId])


	useEffect(() => {
		let data = {
			isPublishToSuppliersNetwork: publishOrFilter === "publish",
			publicTenderFilterDraft,
			volumeOfBusinessFilter: isVolOfBussOpened ? selectedVolumeOfBusiness : null
		};
		getPublicTenderData(data);
		// eslint-disable-next-line
	}, [
		publishOrFilter,
		publicTenderFilterDraft
	]);
	return (
		<div className="publicTender my-4">
			<Radio.Group
				name="radiogroup"
				defaultValue={publishOrFilter}
				onChange={(e) => {
					updatePublishOrFilter(e.target.value);
				}}
				key={publishOrFilter}
				className='d-flex justify-content-between'
			>
				<Radio value={"publish"}>
					{currentLocal.buyerHome.publishToNetwork}
				</Radio>
				<span className="f-18 fw-500  orTitle">
					{currentLocal.buyerHome.or}
				</span>
				<span className='preQualificationsContainer'>
					<Radio value={"filter"}>
						{currentLocal.buyerHome.filterForPreQual}
					</Radio>
					<div className="my-2 filter-container d-flex flex-wrap">
						{preQualificationsFilters.map((preQualification, index) => {
							return <Checkbox
								onChange={(e) => {
									let allSelectedQualifications = [...publicTenderFilterDraft];
									allSelectedQualifications[index].isSelected = e.target.checked
									updatePublicTenderFilterDraft(allSelectedQualifications);
									if (preQualification.id === 'cd736b5f-fd33-42f5-813f-dbafe87ea336') {
										updateIsVolOfBussOpened(e.target.checked)
									}
								}}
								className="my-2 d-flex preQualItem"
								disabled={publishOrFilter === "publish"}
							>
								{preQualification.name}
							</Checkbox>
						})}
						{isVolOfBussOpened && <div className='customVolumeOfBusiness preQualItem p-2'>
							<div>{currentLocal.buyerHome.interestedInVolumeOfBusiness}</div>
							<Radio.Group
								onChange={onSpecificBusinessChange}
								value={selectedVolumeOfBusiness}
								className='d-flex flex-column'>
								{volumeOfBusinessList.map(volume => <Radio className='my-2' value={volume.id}>{volume.name}</Radio>)}
							</Radio.Group>
						</div>}
					</div>
				</span>
			</Radio.Group>
		</div>
	);
}

export default PublicTender;
