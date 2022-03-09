import { useState } from "react";
import DefaultProfileImage from "../../../Resources/Assets/DefaultProfileImage.png";
import eye from "../../../Resources/Assets/eye.svg";
import profileIcon from "../../../Resources/Assets/profileIcon.svg";
import garbage from "../../../Resources/Assets/garbage.svg";
import { baseUrl } from "../../../Services";
import { authorType } from "../../../helpers/authType";
import { Dropdown, Button, Menu } from "antd";
import { useSelector } from "react-redux";
import { doc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../firebase";
import { Redirect } from "react-router-dom";
import "./SidebarUserForMessage.css";

const SidebarUserForMessage = ({
	friendsList,
	updateRoomSelection,
	applicantId,
}) => {
	const {
		authorization: { id, accountTypeId, userTypeId, roleId },
	} = useSelector((state) => state.authorization);

	const userType = authorType(accountTypeId, userTypeId, roleId);
	const [redirectTo, updateRedirectTo] = useState(null);
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const DeleteConversation = async (friendId) => {
		const userDocRef = doc(db, "users", id);
		let friends = [];
		onSnapshot(userDocRef, (doc) => {
			friends = doc.data().friends;
			friends.forEach((friend, friendIndex) => {
				if (friend.friendId === friendId) {
					friends[friendIndex].isDeleted = true;
				}
			});
		});
		await updateDoc(userDocRef, { friends: arrayUnion(friends) });
	};
	const menu = (friendId) => (
		<Menu className="sideBarForMsgs">
			<Menu.Item key={0}>
				<Button
					type="text"
					className="dropDown__item d-flex justify-content-start align-items-center"
					onClick={() => {
						updateRoomSelection(friendId);
					}}
				>
					<img src={eye} alt="eye" className="mx-2" />
					<div>{currentLocal.messages.viewChat}</div>
				</Button>
			</Menu.Item>
			{userType.includes("buyer") && (
				<Menu.Item key={1}>
					<Button
						type="text"
						className="dropDown__item d-flex justify-content-start align-items-center"
						onClick={() => {
							updateRedirectTo(
								`/suppliercontractorprofiles?userId=${friendId}`
							);
						}}
					>
						<img src={profileIcon} alt="profileIcon" className="mx-2" />
						<div>{currentLocal.messages.viewProfile}</div>
					</Button>
				</Menu.Item>
			)}
			<Menu.Item key={2}>
				<Button
					type="text"
					className="dropDown__item d-flex justify-content-start align-items-center"
					onClick={() => {
						DeleteConversation(friendId);
					}}
				>
					<img src={garbage} alt="garbage" className="mx-2" />
					<div>{currentLocal.messages.deleteConversation}</div>
				</Button>
			</Menu.Item>
		</Menu>
	);

	if (redirectTo) {
		return <Redirect to={redirectTo} />;
	}

	return (
		<div className="SidebarUserForMessage">
			{friendsList.length > 0 && (
				<ul className="SidebarUserForMessage__list">
					{friendsList.map((friend, friendIndex) => {
						return (
							<li
								className={
									applicantId === friend.id
										? "SidebarUserForMessage__item SidebarUserForMessage__item__selected cursorPointer d-flex justify-content-between"
										: "SidebarUserForMessage__item  cursorPointer d-flex justify-content-between"
								}
								key={friendIndex}
							>
								<div className="d-flex align-items-center justify-content-center">
									<figure className="SidebarUserForMessage__figure">
										<img
											src={
												friend.image
													? baseUrl + friend.image
													: DefaultProfileImage
											}
											alt="user"
											className="rounded-circle"
										/>
									</figure>
									<h5>{friend.name}</h5>
								</div>
								<Dropdown
									overlay={() => menu(friend.id)}
									overlayClassName="manageCompany__dropDown"
									placement="bottomCenter"
								>
									<Button type="text">...</Button>
								</Dropdown>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default SidebarUserForMessage;
