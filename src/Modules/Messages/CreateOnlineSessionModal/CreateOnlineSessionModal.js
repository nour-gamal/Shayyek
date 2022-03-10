import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { minBy } from "lodash";
import { Modal, Checkbox, Row, Col, DatePicker } from "antd";
import {
	GetSuppliersAndContratorsThatFilledRFQ,
	AddOnlineSession,
} from "../network";
import { db } from "../../../firebase";
import { baseUrl } from "../../../Services";
import defaultProfileImage from "../../../Resources/Assets/DefaultProfileImage.png";

import "./CreateOnlineSessionModal.css";

const CreateOnineSession = ({ isModalVisible, onCancel, rfqId }) => {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { authorization } = useSelector((state) => state.authorization);
	const [members, setMembers] = useState(null);
	const [time, updateTime] = useState(null);
	const [selectedMembers, updateSelectedMembers] = useState([]);
	const [selectedMemberIds, updateSelectedMemberIds] = useState([]);
	const [disableSubmit, updateDisableSubmit] = useState(true);

	useEffect(() => {
		GetSuppliersAndContratorsThatFilledRFQ(
			rfqId,
			(success) => {
				if (success.success) {
					setMembers(success.data);
				}
			},
			(fail) => {}
		);
	}, [rfqId]);

	// add new online-session
	function submitOnlineSession() {
		console.log(selectedMembers);
		if (selectedMembers.length && time) {
			// users for firebase
			let users = [];
			selectedMembers.forEach(async (userData) => {
				const { userId } = userData;
				let userDoc = doc(db, `users/${userId}`);
				users.push({
					user: userDoc,
					isOnline: false,
					lastPrice: 0,
				});
			});

			let data = {
				rfqId,
				membersIds: selectedMemberIds,
				sessionDate: time._d,
				projectName: "static project name!",
			};
			AddOnlineSession(
				data,
				async (success) => {
					if (success.success) {
						const {
							data: { sessionId },
						} = success;

						const { price } = minBy(selectedMembers, "price");
						await setDoc(doc(db, "online-sessions", sessionId), {
							rfqId,
							users,
							sessionDate: time._d,
							buyerId: authorization.id,
							lastPrice: price,
						});
						onCancel();
					}
				},
				(fail) => {}
			);
		}
	}

	// update submitbutton disabled property
	useEffect(() => {
		if (selectedMembers.length && time) updateDisableSubmit(false);
		else updateDisableSubmit(true);
	}, [time, selectedMembers]);

	//set users on the online session
	function setMembersOnSelectCheckbox(data) {
		let memberIds = [];
		data.forEach((item) => {
			const { userId } = item;
			memberIds.push(userId);
		});
		updateSelectedMembers(data);
		updateSelectedMemberIds(memberIds);
	}

	return (
		<Modal
			visible={isModalVisible}
			onCancel={() => onCancel()}
			className="createOnlineSession-modal modal-lg"
		>
			<div className="createOnlineSession-body">
				<Row>
					<Col md={12}>
						<header>
							<h4>{currentLocal.messages.selectOnlineSessionMembers}</h4>
						</header>
						<form>
							<ul className="createOnlineSession-items">
								<Checkbox.Group onChange={setMembersOnSelectCheckbox}>
									{members &&
										members.map((member) => (
											<li className="item d-flex" key={member.userId}>
												<Checkbox value={member} />
												<img
													src={
														member.userImage
															? baseUrl + member.userImage
															: defaultProfileImage
													}
													alt="user-avatar"
												/>
												<p>{member.userName}</p>
											</li>
										))}
								</Checkbox.Group>
							</ul>
						</form>
					</Col>
					<Col md={12}>
						<header>
							<h4>{currentLocal.messages.pickOnlineSession}</h4>
						</header>
						<DatePicker
							showTime
							onOk={(data) => updateTime(data)}
							onChange={(data) => updateTime(data)}
						/>
					</Col>
				</Row>
			</div>
			<div className="createOnlineSession-footer text-center">
				<button
					disabled={disableSubmit}
					className="btn button-primary"
					type="submit"
					onClick={submitOnlineSession}
				>
					Submit
				</button>
			</div>
		</Modal>
	);
};

export default CreateOnineSession;
