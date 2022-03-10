import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Modal, Button } from "antd";
import { db } from "../../../firebase";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import BadgeSession from "../../../Resources/Assets/badge-session.svg";
import EndSession from "../../../Resources/Assets/end-session.svg";
import SendSession from "../../../Resources/Assets/send-session.svg";
import user from "../../../Resources/Assets/MessageAvatar.png";
import "./StartOnlineSession.css";

const StartOnlineSession = ({ isModalVisible, onCancel }) => {
	const { authorization } = useSelector((state) => state.authorization);
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [offerPrice, setOfferPrice] = useState("");
	// eslint-disable-next-line
	const [messages, updateMessages] = useState([]);
	const scrollTo = useRef();
	async function sendOffer(e) {
		e.preventDefault();

		let userDocRef = doc(db, `users/${authorization.id}`);
		const data = {
			sender: userDocRef,
			content: offerPrice,
			badget: false,
		};
		await addDoc(
			collection(
				db,
				"online-sessions",
				"7d6962a2-3db3-41e6-b1ef-432741a4bf0f",
				"messages"
			),
			data
		);
		// data.messageId += 1;
		// updateMessages((prevMessages) => [...prevMessages, data]);
		setOfferPrice("");
		scrollTo.current.scrollIntoView({ behavior: "smooth" });
	}

	useEffect(() => {
		async function getMessages() {
			const docRef = doc(
				db,
				"online-sessions",
				"7d6962a2-3db3-41e6-b1ef-432741a4bf0f"
			);

			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const { users } = docSnap.data();
				users?.forEach(async (item) => {
					let { user } = await item;
					let docSnapshot = await getDoc(user);
					console.log(docSnapshot.data());
				});
			} else {
				console.log("there's no messages here");
			}
		}
		getMessages();
	}, []);
	return (
		<Modal
			visible={isModalVisible}
			onCancel={() => onCancel()}
			className="StartOnlineSession-modal modal-lg"
		>
			<header className="d-flex flex-wrap">
				<div className="user justify-content-start">
					<img className="userImage" src={user} alt="user-avatar" />
					<p>Project Name</p>
				</div>
				<div className="lastPrice">
					{currentLocal.messages.lastPrice} 1200 LE
				</div>
				<div className="suppliers d-flex">
					<p className=" me-2">{currentLocal.messages.suppliers}</p>
					<img className="userImage" src={user} alt="user-avatar" />
					<img className="userImage" src={user} alt="user-avatar" />
					<img className="userImage" src={user} alt="user-avatar" />
					<img className="userImage" src={user} alt="user-avatar" />
				</div>
			</header>
			<div className="message-content mt-2 flex-1">
				<ul>
					{messages?.map((message) => (
						<div className="content" key={message.messageId}>
							<img
								className="message-content__user"
								src={message.senderImage}
								alt="user-avatar"
							/>
							<div>
								<h6>{message.senderName}</h6>
								<p>{message.senderPrice}</p>
							</div>
						</div>
					))}
					<div ref={scrollTo}></div>
				</ul>
			</div>
			<div className="StartOnlineSession__sendMessages mt-2 d-flex justify-content-between align-items-center">
				<div className="d-flex">
					<Button type="text">
						<img src={EndSession} alt="end-session" />
					</Button>
					<Button type="text">
						<img src={BadgeSession} alt="badge-session" />
					</Button>
				</div>
				<form onSubmit={sendOffer} className="flex-1 d-flex align-items-center">
					<input
						type="number"
						className="messageInput"
						value={offerPrice}
						placeholder={currentLocal.messages.enterOfferPrice}
						onChange={(e) => setOfferPrice(e.target.value)}
					/>
					<div className="d-flex icons-inside-form-field">
						<Button type="text">
							<img src={EndSession} alt="end-session" />
						</Button>
						<Button type="text">
							<img src={BadgeSession} alt="badge-session" />
						</Button>
					</div>
					<Button type="text" htmlType="submit">
						<img className="flip-image" src={SendSession} alt="send-session" />
					</Button>
				</form>
			</div>
		</Modal>
	);
};

export default StartOnlineSession;
