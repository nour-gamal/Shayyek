import { useState } from "react";
import { useSelector } from "react-redux";
import { Checkbox, Radio } from "antd";
import "./PublicTender.css";
function PublicTender() {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [verifiedByShayyek, updateVerifiedByShayyek] = useState(false);
	const [sameVendorLocation, updateSameVendorLocation] = useState(false);
	const [relevantVolumeOfBusiness, updateRelevantVolumeOfBusiness] = useState(
		false
	);
	const [moreThan5Years, updateMoreThan5Years] = useState(false);
	return (
		<div className="publicTender my-4">
			<Radio.Group name="radiogroup" defaultValue={"publish"}>
				<Radio value={"publish"}>
					{currentLocal.buyerHome.publishToNetwork}
				</Radio>
				<span className="f-18 fw-500  orTitle mx-2">
					{currentLocal.buyerHome.or}
				</span>
				<span>
					<Radio value={"filter"}>
						{currentLocal.buyerHome.filterForPreQual}
					</Radio>
					<div className="my-2 filter-container d-flex">
						<div className="d-flex flex-column">
							<Checkbox
								onChange={() => {
									updateVerifiedByShayyek(!verifiedByShayyek);
								}}
							>
								{currentLocal.buyerHome.verifiedByShayyek}
							</Checkbox>
							<Checkbox
								onChange={() => {
									updateSameVendorLocation(!sameVendorLocation);
								}}
							>
								{currentLocal.buyerHome.sameVendorLocation}
							</Checkbox>
						</div>
						<div className="d-flex flex-column">
							<Checkbox
								onChange={() => {
									updateRelevantVolumeOfBusiness(!relevantVolumeOfBusiness);
								}}
							>
								{currentLocal.buyerHome.relevantVolumeOfBusiness}
							</Checkbox>
							<Checkbox
								onChange={() => {
									updateMoreThan5Years(!moreThan5Years);
								}}
							>
								{currentLocal.buyerHome.moreThan5Years}
							</Checkbox>
						</div>
					</div>
				</span>
			</Radio.Group>
		</div>
	);
}

export default PublicTender;
