import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getBuyerProfile } from "../../../network";
import { Modal, Col, Row } from "antd";
import "./ProfileDetailsModal.css";
function ProfileDetailsModal({ isModalVisible, onCancel, userType }) {
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	const { authorization } = useSelector((state) => state.authorization);
	useEffect(() => {
		getBuyerProfile(
			currentLanguageId,
			(success) => {
				console.log(success.data);
			},
			(fail) => {
				console.log(fail);
			}
		);
	}, [currentLanguageId]);
	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-lg profileDetailsModal"
		>
			<Row>
				<Col xs={24} md={12}>
					<div className="d-flex align-items-center">
						<img
							src={
								authorization.image
									? authorization.image
									: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
							}
							alt="profileImage"
							className="profileImage"
						/>
						<div className="mx-2">
							<div className="primary-color f-14 fw-600">
								{authorization.fullName}
							</div>
							<div className="userType my-1">{userType}</div>
						</div>
					</div>
				</Col>
				<Col xs={24} md={12}>
					test
				</Col>
			</Row>
		</Modal>
	);
}

export default ProfileDetailsModal;
