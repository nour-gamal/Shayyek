import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Radio } from "antd";
import RatingModal from "../RatingModal/RatingModal";
import { getVendorsForRating } from "../../../../network";
import { baseUrl } from "../../../../../../Services";
import defaultAvatar from "../../../../../../Resources/Assets/DefaultProfileImage.png"
import "./ChooseCompaniesToRateModal.css";

function ChooseCompaniesToRateModal({ isModalVisible, onCancel, orderId, rfqId }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [ratingModalState, updateRatingModalState] = useState(false);
	const [value, setValue] = useState(null);
	const [users, updateUsers] = useState([])
	const onChange = (e) => {
		setValue(e.target.value);
	};
	useEffect(() => {
		if (orderId || rfqId) {
			let data = {
				headerIdOrOrderId: orderId ? orderId : rfqId,
				isOrder: orderId ? true : false
			}
			getVendorsForRating(data, success => {
				updateUsers(success.data)
			}, fail => {
				console.log(fail)
			})

		}
	}, [orderId, rfqId])


	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-lg ChooseCompaniesToRateModal"
		>
			<div>
				<div className="f-21 mb-4">
					{currentLocal.profilePage.selectSuppCont}?
				</div>
				<div className="suppliersContainers">
					<Radio.Group onChange={onChange} value={value}>
						{users.map((user, userIndex) => (
							<div key={userIndex} className="my-2">
								<Radio value={user.id}>
									<figure className="userImgContainer mx-2">
										<img
											src={user.image ? baseUrl + user.image : defaultAvatar}
											alt="userImg"
											className="rounded-circle"
										/>
									</figure>
									<span>{user.name}</span>
								</Radio>
							</div>
						))}
					</Radio.Group>
				</div>
			</div>
			<div className="text-center">
				<button
					className={
						value
							? "button-primary"
							: "button-primary cursorDisabled button-primary-disabled"
					}
					disabled={!value}
					onClick={() => {
						updateRatingModalState(true);
					}}
				>
					{currentLocal.profilePage.rateCompany}
				</button>
			</div>
			{ratingModalState && (
				<RatingModal
					isModalVisible={ratingModalState}
					onCancel={() => {
						updateRatingModalState(false);
						onCancel();
					}}
					orderId={orderId}
					rfqId={rfqId}
					selectedVendor={value}
				/>
			)}
		</Modal>
	);
}

export default ChooseCompaniesToRateModal;
