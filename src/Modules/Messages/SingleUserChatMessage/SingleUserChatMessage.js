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
import {
	getStorage,
	ref,
	uploadBytes,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
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
	const sendMessage = async (msgType, msgUrl) => {
		const roomsDocRef = doc(db, "rooms", currentRoomId);

		// const userDocRef=
		await updateDoc(roomsDocRef, {
			messages: arrayUnion({
				message: msgType === "text" ? messageText : msgUrl,
				senderId: authorization.id,
				createdAt: new Date().getTime(),
				msgType,
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
	const handleChooseDocImg = (e, type) => {
		handleUpload(e.target.files[0], type);
	};
	const generateUniqueId = () => {
		var unId = "id" + new Date().getTime();
		return unId;
	};
	const handleUpload = (file, type) => {
		const unId = generateUniqueId();
		const storage = getStorage();
		const storageRef = ref(
			storage,
			`${type}/${unId}-${file.name ? file.name : ""}`
		);
		const uploadTask = uploadBytesResumable(storageRef, file);

		// 'file' comes from the Blob or File API
		uploadBytes(storageRef, file).then((snapshot) => {
			getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
				sendMessage(type, downloadURL);
			});
		});
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
												{msg.msgType === "text" ? (
													<p className="text">
														<span className="vertically_center">
															{msg.message}
														</span>
													</p>
												) : msg.msgType === "images" ? (
													<img
														src={msg.message}
														alt="imageMsg"
														className="imageMsg"
													/>
												) : (
													<audio controls>
														<source src={msg.message} type="audio/ogg" />
														<source src={msg.message} type="audio/mpeg" />
													</audio>
												)}
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
							handleUpload={handleUpload}
						/>
					)}
					<div className="singleUserChatMessage_send">
						<div className="chat__uploader">
							<input
								type="file"
								className="d-none"
								id="sendImage"
								onChange={(e) => {
									handleChooseDocImg(e, "images");
								}}
								accept="image/*"
							/>
							<input
								type="file"
								className="d-none"
								id="sendDoc"
								onChange={(e) => {
									handleChooseDocImg(e, "docs");
								}}
							/>
							<Button type="text">
								<label htmlFor="sendDoc">
									<img
										className="chat-icon"
										src={PaperClip}
										alt="upload-paper"
									/>
								</label>
							</Button>
							<Button type="text">
								<label htmlFor="sendImage">
									<img
										className="chat-icon-camera"
										src={CameraIcon}
										alt="upload-images"
									/>
								</label>
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
							onClick={() => sendMessage("text")}
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
