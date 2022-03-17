import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Radio } from "antd";
import RatingModal from "../RatingModal/RatingModal";
import "./ChooseCompaniesToRateModal.css";
function ChooseCompaniesToRateModal({ isModalVisible, onCancel, parent }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [ratingModalState, updateRatingModalState] = useState(false);
	const [value, setValue] = useState(null);

	const onChange = (e) => {
		setValue(e.target.value);
	};

	const users = [
		{
			id: "1",
			name: "Samc1",
			img:
				"https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg",
		},
		{
			id: "2",
			name: "Samc2",
			img:
				"https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg",
		},
	];
	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-lg ChooseCompaniesToRateModal"
		>
			<div>
				<div className="f-21 mb-4">
					{parent === "myRFQTable"
						? currentLocal.profilePage.selectSuppCont
						: currentLocal.profilePage.selectSupp}{" "}
					?
				</div>
				<Radio.Group onChange={onChange} value={value}>
					{users.map((user, userIndex) => (
						<div key={userIndex} className="my-2">
							<Radio value={user.id}>
								<figure className="userImgContainer mx-2">
									<img
										src={user.img}
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
				/>
			)}
		</Modal>
	);
}

export default ChooseCompaniesToRateModal;
