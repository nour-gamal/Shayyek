import { useState } from "react";
import { Input, Modal } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addRFQDetails } from "../../../../../Redux/RFQ";
import "./AddPackage.css";
import { Redirect } from "react-router-dom";

function AddPackage({ isModalVisible, onCancel, rfqDetails }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [packagesName, updatePackagesName] = useState(["", ""]);
	const [isMobile, updateIsMobile] = useState(false);
	const { rfqData } = useSelector((state) => state.rfq);
	const mq = window.matchMedia("(min-width: 768px)");
	const dispatch = useDispatch();
	const [reset, updateReset] = useState(false)
	const hasOldPackages = rfqData.rfqPackages.length > 0;

	window.addEventListener("resize", () => {
		updateIsMobile(!mq.matches);
	});

	// useEffect(() => {
	// 	// dispatch(addRFQDetails(rfqDetails));

	// }, [rfqDetails])

	const handleAddPackage = () => {
		if (hasOldPackages) {
			rfqDetails.nextPackageName = packagesName[0]
		} else {
			if (packagesName[0].length && packagesName[1].length) {
				rfqDetails.rfqPackages[rfqDetails.rfqPackages.length - 1].packageName = packagesName[0];
				rfqDetails.nextPackageName = packagesName[1];
				dispatch(addRFQDetails(rfqDetails));
				updateReset(true)
				onCancel()
			}
		}
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
					{currentLocal.buyerHome.addPack} {rfqData.rfqPackages.length + 1} {currentLocal.buyerHome.name}
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
						{currentLocal.buyerHome.addPack} {rfqData.rfqPackages.length + 2} {currentLocal.buyerHome.name}
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
