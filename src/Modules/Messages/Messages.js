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
	collectionGroup,
} from "firebase/firestore";
import "./Messages.css";
const Messages = (props) => {
	const { authorization } = useSelector((state) => state.authorization);
	const [friendsList, updateFriendsList] = useState([]);
	const [currentRoomId, updateCurrentRoomId] = useState(null);
	const [applicantId, updateApplicantId] = useState(null);
	const getFriendsList = async () => {
		const userDocRef = doc(db, "users", authorization.id);
		const usersRef = collection(db, "users");

		const docSnap = await getDoc(userDocRef);
		if (docSnap.exists()) {
			let data = docSnap.data();
			if (data.friends.length > 0) {
				let currentRoomId = data.friends[data.friends.length - 1].roomId;
				let applicantId = data.friends[data.friends.length - 1].friendId;
				updateCurrentRoomId(currentRoomId);
				updateApplicantId(applicantId);
				console.log(usersRef);
				const usersQuery = query(
					usersRef,
					where("name", "in", ["Nour Gamal", "Nour Mohamed"])
				);
				const querySnapshot = await getDocs(usersQuery);

				querySnapshot.forEach((doc) => {
					console.log(doc.data());
				});
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

	return (
		<section>
			<Navbar />
			<div className="d-flex  flex-1 chat-page">
				<div className="sidebarUserForMessageContainer">
					<SidebarUserForMessage friendsList={friendsList} />
				</div>
				<div className="singleUserChatMessageContainer flex-1">
					<SingleUserChatMessage
						currentRoomId={currentRoomId}
						applicantId={applicantId}
					/>
				</div>
			</div>
			<Footer />
		</section>
	);
};

export default Messages;
