import { useState } from "react";
// component
import { Button, Input } from "antd";
import Microphone from "../../../Resources/Assets/microphone.svg";
import PaperClip from "../../../Resources/Assets/paperClip.svg";
import CameraIcon from "../../../Resources/Assets/camera.svg";
import SendMessage from "../../../Resources/Assets/sendMessage.png";
import DefaultProfileImage from "../../../Resources/Assets/DefaultProfileImage.png";
import { db } from "../../../firebase";
import { useSelector } from "react-redux";
import moment from "moment";
import { baseUrl } from "../../../Services";
import { doc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import VoiceRecorder from "../VoiceRecorder/VoiceRecorder";
import "react-voice-recorder/dist/index.css";
import "./SingleUserChatMessage.css";

const SingleUserChatMessage = ({ currentRoomId, applicantId }) => {
	const [messageText, setMessageText] = useState("");
	const { authorization } = useSelector((state) => state.authorization);
	const [room, updateRoom] = useState([]);
	const [applicantImage, updateApplicantImage] = useState(null);
	const [isRecording, updateIsRecording] = useState(false);
	const profileImage = authorization.profileImage
		? baseUrl + authorization.profileImage
		: DefaultProfileImage;

	useEffect(() => {
		if (currentRoomId) {
			onSnapshot(doc(db, "rooms", currentRoomId), (doc) => {
				updateRoom(doc.data().messages);
			});
		}

		if (applicantId) {
			onSnapshot(doc(db, "users", applicantId), (doc) => {
				if (doc.data().myImage) {
					updateApplicantImage(baseUrl + doc.data().myImage);
				} else {
					updateApplicantImage(DefaultProfileImage);
				}
			});
		}
	}, [currentRoomId, applicantId]);
	const sendMessage = async () => {
		const roomsDocRef = doc(db, "rooms", currentRoomId);

		// const userDocRef=
		await updateDoc(roomsDocRef, {
			messages: arrayUnion({
				message: messageText,
				senderId: authorization.id,
				createdAt: new Date().getTime(),
			}),
		});
		if (applicantId) {
			const userDocRef = doc(db, "users", applicantId);

			await updateDoc(userDocRef, {
				friends: arrayUnion({
					roomId: currentRoomId,
					friendId: authorization.id,
				}),
			});
			setMessageText("");
		}
	};

	return (
		<div className="singleUserChatMessage h-100">
			<div className="ppe pps singleUserChatMessage_container">
				<div className="singleUserChatMessage_chat d-flex flex-column justify-content-between">
					<div className="singleUserChatMessage_body flex-1">
						<ul className="chat__messages">
							{room.map((msg, msgIndex) => {
								return (
									<li
										className={
											authorization.id === msg.senderId
												? "message-item sender"
												: "message-item reciver"
										}
										key={msgIndex}
									>
										<div className="d-inline-flex flex-column  message-item__container">
											<div className="d-flex align-items-center justify-content-start wrapper">
												<img
													src={
														authorization.id === msg.senderId
															? profileImage
															: applicantImage
													}
													alt="user-avatar"
													className="rounded-circle user"
												/>
												<p className="text">
													<span className="vertically_center">
														{msg.message}
													</span>
												</p>
											</div>
											<div className="time mt-1 w-100">
												{moment(msg.createdAt).format("hh:mm")}
											</div>
										</div>
									</li>
								);
							})}
						</ul>
						<div className="chat__message me"></div>
					</div>
					{isRecording && (
						<VoiceRecorder
							resetRecord={() => {
								updateIsRecording(false);
							}}
						/>
					)}
					<div className="singleUserChatMessage_send">
						<div className="chat__uploader">
							<Button type="text">
								<img className="chat-icon" src={PaperClip} alt="upload-paper" />
							</Button>
							<input type="file" />
							<Button type="text">
								<img
									className="chat-icon-camera"
									src={CameraIcon}
									alt="upload-images"
								/>
							</Button>
							<Button type="text">
								<img
									className="chat-icon"
									src={Microphone}
									alt="record-voice"
									onClick={() => {
										updateIsRecording(!isRecording);
									}}
								/>
							</Button>
						</div>
						<Input.TextArea
							// onChange={this.onChange}
							placeholder="Controlled autosize"
							autoSize={{ minRows: 1, maxRows: 3 }}
							value={messageText}
							onChange={(e) => setMessageText(e.target.value)}
						/>
						<div
							className="chat__controller cursorPointer"
							onClick={sendMessage}
						>
							<img className="flip-image" src={SendMessage} alt="send-data" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleUserChatMessage;
