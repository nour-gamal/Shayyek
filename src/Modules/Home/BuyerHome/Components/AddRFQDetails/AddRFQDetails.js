import { Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Input, Checkbox, Select, Radio } from "antd";
import { governmentList } from "../../../../Registration/Network";
import PublicTender from "../PublicTender/PublicTender";
import PrivateTender from "../PrivateTender/PrivateTender";
import { useDispatch, useSelector } from "react-redux";
import { addRFQDetails } from "../../../../../Redux/RFQ";
import "./AddRFQDetails.css";

function AddRFQDetails({ getRFQPageName }) {
	const [projectName, updateProjectName] = useState("");
	const [govList, updateGovList] = useState([]);
	const [alert, updateAlert] = useState(false);
	const [selectedGov, updateSelectedGov] = useState(null);
	const [projectOwner, updateProjectOwner] = useState({
		name: "",
		makeNotVisibleToVendors: false,
	});
	const [revealPrices, updateRevealPrices] = useState(false);
	const [projectConsultant, updateProjectConsultant] = useState({
		name: "",
		makeNotVisibleToVendors: false,
	});
	const [projectContractor, updateProjectContractor] = useState({
		name: "",
		makeNotVisibleToVendors: false,
	});
	const { currentLocal, currentLanguageId } = useSelector(
		(state) => state.currentLocal
	);
	const { rfqData } = useSelector((state) => state.rfq);
	const [tenderType, setTenderType] = useState("private");
	const [publicTenderData, updatePublicTenderData] = useState({});
	const [privateTenderData, updatePrivateTenderData] = useState({});
	const { Option } = Select;
	const dispatch = useDispatch();

	useEffect(() => {
		const countryId = "ab534c08-ddc1-4389-8d5c-2e3a88cb5417";
		governmentList(
			currentLanguageId,
			countryId,
			(success) => {
				updateGovList(success.data);
			},
			(fail) => {
				console.log(fail);
			}
		);
	}, [currentLanguageId]);
	useEffect(() => {
		if (rfqData) {
			console.log(rfqData);
			updateProjectName(rfqData.projectName);
			//govList.filter((gov) => gov.id === rfqData.projectLocationId);
			updateSelectedGov(rfqData.projectLocationId);
		}
	}, []);

	const getPublicTenderData = (data) => {
		updatePublicTenderData(data);
	};
	const getPrivateTenderData = (data) => {
		updatePrivateTenderData(data);
	};
	const handleSubmit = () => {
		let data = {
			projectName: projectName,
			projectLocationId: selectedGov,
			projectOwner: projectOwner.name,
			isShownProjectOwner: projectOwner.makeNotVisibleToVendors,
			projectConsultant: projectConsultant.name,
			isShownProjectConsultant: projectConsultant.makeNotVisibleToVendors,
			projectContractor: projectContractor.name,
			isShownProjectContractor: projectContractor.makeNotVisibleToVendors,
			publicTender: tenderType === "public" ? true : false,
			isRevealPricesToBidders: revealPrices,
		};
		data = { ...data, ...publicTenderData, ...privateTenderData };
		if (
			!projectName.length ||
			!selectedGov ||
			!projectOwner.name.length ||
			!projectConsultant.name ||
			!projectContractor.name
		) {
			updateAlert(true);
		} else {
			updateAlert(false);
			dispatch(addRFQDetails(data));
			getRFQPageName("rfqTable");
		}
	};

	return (
		<div className="pps ppe my-4 addRFQDetails">
			{alert && (
				<Alert variant={"danger"} className="text-center">
					{currentLocal.registration.pleaseFillAllRequiredFields}
				</Alert>
			)}
			<div className="d-flex justify-content-between rfq-info-container">
				<div className="flex-1 mx-2">
					<div className="d-flex  my-4 field-container flex-1">
						<label className="f-14 fw-500 d-flex align-items-start label">
							<span>{currentLocal.buyerHome.projectName}</span>
							<span className="errorSign">*</span>
						</label>
						<div className="d-flex flex-1">
							<Input
								type="text"
								className="input-field"
								value={projectName}
								onChange={(e) => {
									updateProjectName(e.target.value);
								}}
								placeholder={currentLocal.buyerHome.typeProjectName}
							/>
						</div>
					</div>
					<div className="d-flex  my-4 field-container">
						<label className="f-14 fw-500 d-flex align-items-start label">
							<span>{currentLocal.buyerHome.projectLocation}</span>
							<span className="errorSign">*</span>
						</label>
						<div className="d-flex flex-1">
							<Select
								placeholder={currentLocal.buyerHome.selectFromCities}
								className="input-field"
								onChange={(val) => {
									updateSelectedGov(val);
								}}
								defaultValue={selectedGov}
							>
								{govList.map((gov) => {
									return (
										<Option value={gov.id} key={gov.id}>
											{gov.name}
										</Option>
									);
								})}
							</Select>
						</div>
					</div>
					<div className="d-flex my-4 field-container">
						<label className="f-14 fw-500 d-flex align-items-start label ">
							<span>{currentLocal.buyerHome.projectOwner}</span>
							<span className="errorSign">*</span>
						</label>
						<div className="flex-1">
							<Input
								type="text"
								className="input-field"
								value={projectOwner.name}
								onChange={(e) => {
									updateProjectOwner({
										projectOwner,
										name: e.target.value,
									});
								}}
								placeholder={currentLocal.buyerHome.typeProjectOwner}
							/>
							<Checkbox
								onChange={(e) => {
									updateProjectOwner({
										projectOwner,
										makeNotVisibleToVendors: e.target.checked,
									});
								}}
								className="my-2"
							>
								{currentLocal.buyerHome.makeNotVisibleToVendors}
							</Checkbox>
						</div>
					</div>
				</div>
				<div className="flex-1 mx-2">
					<div className="d-flex my-4 field-container">
						<label className="f-14 fw-500 d-flex align-items-start label">
							<span>{currentLocal.buyerHome.projectConsultant}</span>

							<span className="errorSign">*</span>
						</label>
						<div className="d-flex flex-column flex-1">
							<Input
								type="text"
								className="input-field"
								value={projectConsultant.name}
								onChange={(e) => {
									updateProjectConsultant({
										projectConsultant,
										name: e.target.value,
									});
								}}
								placeholder={currentLocal.buyerHome.typeProjectConsultantName}
							/>
							<Checkbox
								onChange={(e) => {
									updateProjectConsultant({
										projectConsultant,
										makeNotVisibleToVendors: e.target.checked,
									});
								}}
								className="my-2"
							>
								{currentLocal.buyerHome.makeNotVisibleToVendors}
							</Checkbox>
						</div>
					</div>
					<div className="d-flex my-4 field-container flex-1">
						<label className="f-14 fw-500 d-flex align-items-start label">
							<span>{currentLocal.buyerHome.projectContractor}</span>

							<span className="errorSign">*</span>
						</label>
						<div className="d-flex flex-column flex-1 ">
							<Input
								type="text"
								className="input-field"
								value={projectContractor.name}
								onChange={(e) => {
									updateProjectContractor({
										projectContractor,
										name: e.target.value,
									});
								}}
								placeholder={currentLocal.buyerHome.typeProjectContractorName}
							/>
							<Checkbox
								onChange={(e) => {
									updateProjectContractor({
										projectContractor,
										makeNotVisibleToVendors: e.target.checked,
									});
								}}
								className="my-2"
							>
								{currentLocal.buyerHome.makeNotVisibleToVendors}
							</Checkbox>
						</div>
					</div>
				</div>
			</div>
			<div className="tenderType">
				<Radio.Group
					onChange={(e) => setTenderType(e.target.value)}
					value={tenderType}
				>
					<Radio value={"private"} className="mx-1">
						{currentLocal.buyerHome.privateTender}
					</Radio>
					<Radio value={"public"} className="mx-1">
						{currentLocal.buyerHome.publicTender}
					</Radio>
				</Radio.Group>
				{tenderType === "public" ? (
					<PublicTender getPublicTenderData={getPublicTenderData} />
				) : (
					<PrivateTender getPrivateTenderData={getPrivateTenderData} />
				)}
			</div>
			<Checkbox
				className="m-4"
				onChange={() => {
					updateRevealPrices(!revealPrices);
				}}
			>
				{currentLocal.buyerHome.revealPrices}
			</Checkbox>
			<div className="text-center">
				<button className="button-primary" onClick={handleSubmit}>
					{currentLocal.buyerHome.confirm}
				</button>
			</div>
		</div>
	);
}

export default AddRFQDetails;
