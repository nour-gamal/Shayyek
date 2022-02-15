import { useState } from "react";
import Navbar from "../Common/Navbar/Navbar";
import Footer from "../Common/Footer/Footer";
import SidebarUserForMessage from "./SidebarUserForMessage/SidebarUserForMessage";
import SingleUserChatMessage from "./SingleUserChatMessage/SingleUserChatMessage";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { db } from "../../firebase";
import {
	getDoc,
	doc,
	where,
	query,
	collection,
	getDocs,
} from "firebase/firestore";
import "./Messages.css";
const Messages = (props) => {
	const { authorization } = useSelector((state) => state.authorization);
	// eslint-disable-next-line
	const [friendsList, updateFriendsList] = useState([]);
	const [currentRoomId, updateCurrentRoomId] = useState(null);
	const [applicantId, updateApplicantId] = useState(null);
	const [roomsData, updateRoomsDate] = useState([]);
	const [isEmptyMsgs, updateIsEmptyMsgs] = useState(false);
	const getFriendsList = async () => {
		const userDocRef = doc(db, "users", authorization.id);
		const usersRef = collection(db, "users");
		const docSnap = await getDoc(userDocRef);
		if (docSnap.exists()) {
			let data = docSnap.data();
			updateRoomsDate(data.friends);
			if (data.friends.length > 0) {
				updateIsEmptyMsgs(false);
				var IDsArr = [];
				var friendsList = [];
				data.friends.forEach((friend) => {
					IDsArr.push(friend.friendId);
				});
				let currentRoomId = data.friends[0].roomId;
				let applicantId = data.friends[0].friendId;
				updateCurrentRoomId(currentRoomId);
				updateApplicantId(applicantId);
				const usersQuery = query(usersRef, where("id", "in", IDsArr));
				const querySnapshot = await getDocs(usersQuery);

				querySnapshot.forEach((doc) => {
					friendsList.push(doc.data());
				});
				updateFriendsList(friendsList);
			} else {
				updateIsEmptyMsgs(true);
			}
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	};
	useEffect(() => {
		getFriendsList();
		// eslint-disable-next-line
	}, []);
	const updateRoomSelection = (friendId) => {
		const selectedRoom = roomsData.filter(
			(item) => item.friendId === friendId
		)[0].roomId;
		updateCurrentRoomId(selectedRoom);
		updateApplicantId(friendId);
	};
	return (
		<section>
			<Navbar />
			<div className="d-flex  flex-1 chat-page">
				{!isEmptyMsgs && (
					<div className="sidebarUserForMessageContainer">
						<SidebarUserForMessage
							friendsList={friendsList}
							applicantId={applicantId}
							updateRoomSelection={updateRoomSelection}
						/>
					</div>
				)}
				<div className="singleUserChatMessageContainer flex-1">
					<SingleUserChatMessage
						currentRoomId={currentRoomId}
						applicantId={applicantId}
						isEmptyMsgs={isEmptyMsgs}
					/>
				</div>
			</div>
			<Footer />
		</section>
	);
};

export default Messages;
