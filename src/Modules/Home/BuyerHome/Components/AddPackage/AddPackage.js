import { useState } from "react";
import { Input, Modal } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ADDNEWPACKAGE } from "../../../../../Redux/RFQ";
import "./AddPackage.css";
import { Redirect } from "react-router-dom";

function AddPackage({ isModalVisible, onCancel, rfqDetails, switchToLastPack }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [packagesName, updatePackagesName] = useState(["", ""]);
	const [isMobile, updateIsMobile] = useState(false);
	const { rfqData } = useSelector((state) => state.rfq);
	const mq = window.matchMedia("(min-width: 768px)");
	const dispatch = useDispatch();
	const [reset, updateReset] = useState(false)
	const hasOldPackages = rfqData.rfqPackages?.length > 0;
	window.addEventListener("resize", () => {
		updateIsMobile(!mq.matches);
	});


	const handleAddPackage = () => {
		var data = []
		for (let index = 0; index <= 4; index++) {
			data.push({
				key: index,
				item: index,
				description: "",
				quantity: 1,
				unit: "",
				preferredBrands: "",
				isInstallSupplierAndContructor: false,
				filePath: "",
			});
		}
		if (!hasOldPackages) {
			if (packagesName[0].length && packagesName[1].length) {
				rfqDetails.packageName = packagesName[0];
			} else {
				return;
			}
		}

		let newPackageData = {
			packageName: hasOldPackages ? packagesName[0] : packagesName[1],
			rfqPackageDetailsRequests: data,
			notes: "",
			receivingOffersDeadline: null,
			deliveryDate: null,
			address: "",
			deliveryToId: "a9c83c89-4aeb-46b8-b245-a144276d927f",
			packageCCColleagues: [],
			packageFiles: [],
			categoryId: null,
			packageTempId: new Date().getTime(),
			ImportedSheet: null
		};
		if (hasOldPackages) {
			dispatch(ADDNEWPACKAGE({
				newPackageData
			}));
		} else {
			dispatch(ADDNEWPACKAGE({
				oldPackageData: rfqDetails, newPackageData
			}));
		}

		switchToLastPack(newPackageData.packageTempId, rfqData.rfqPackages.length)
		updateReset(true)
		onCancel()
	}
	if (reset) {
		return <Redirect to='/rerender' />
	}
	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-sm addPackageModal pt-4"
		>
			<div className='my-4'>
				<div className="f-14">
					{currentLocal.buyerHome.addPack} {rfqData.rfqPackages?.length + 1} {currentLocal.buyerHome.name}
					<span className='text-danger'> *</span>
				</div>
				<div className="text-center">
					<Input
						type="text"
						className="packageNameField my-2"
						value={packagesName[0]}
						onChange={(e) => {
							let packagesNameArr = [...packagesName]
							packagesNameArr[0] = e.target.value
							updatePackagesName(packagesNameArr);
						}}
						placeholder={currentLocal.buyerHome.typePackageName}
					/>
				</div>
			</div>
			{!hasOldPackages &&
				<div className='my-2'>
					<div className="f-14">
						{currentLocal.buyerHome.addPack}  {rfqData.rfqPackages?.length + 2} {currentLocal.buyerHome.name}
						<span className='text-danger'> *</span>
					</div>
					<div className="text-center">
						<Input
							type="text"
							className="packageNameField my-2"
							value={packagesName[1]}
							onChange={(e) => {
								let packagesNameArr = [...packagesName]
								packagesNameArr[1] = e.target.value
								updatePackagesName(packagesNameArr);
							}}
							placeholder={currentLocal.buyerHome.typePackageName}
						/>
					</div>
				</div>}

			<div className="d-flex button-container justify-content-center mt-4">
				<button
					className={
						isMobile ? "button-secondary mx-1" : "button-secondary flat mx-1"
					}
					onClick={() => {
						onCancel();
					}}
				>
					{currentLocal.buyerHome.cancel}
				</button>
				<button
					className={
						isMobile ? "button-primary mx-1" : "button-primary flat mx-1"
					}
					onClick={handleAddPackage}
				>
					{currentLocal.buyerHome.submit}
				</button>
			</div>
		</Modal>
	);
}

export default AddPackage;
