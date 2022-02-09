import { useRecorder } from "voice-recorder-react";
import { useEffect, useRef } from "react";
import SendMessage from "../../../Resources/Assets/sendMessage.png";
import Garbage from "../../../Resources/Assets/garbage.svg";

// Recorder Hook component
export default function VoiceRecorder({
	isRecording,
	handleUpload,
	resetIsRecording,
}) {
	const audioRef = useRef(null);
	const { time, data, stop, start } = useRecorder();

	useEffect(() => {
		if (data.url && audioRef.current) {
			audioRef.current.src = data.url;
			const blob = new Blob(data.chunks, {
				type: "audio/ogg; codecs=opus",
			});
			handleUpload(blob, "audio");
			resetIsRecording();
		}
		// eslint-disable-next-line
	}, [data.chunks, data.url]);

	useEffect(() => {
		if (isRecording) {
			start();
		}
		// eslint-disable-next-line
	}, [isRecording]);
	return (
		<div className="d-flex justify-content-between flex-1 align-items-center">
			<img
				src={Garbage}
				alt="Garbage"
				onClick={() => {
					resetIsRecording();
				}}
				className="cursorPointer"
			/>
			<p className="f-18 f-600">
				{time.h}:{time.m}:{time.s}
			</p>
			<img
				src={SendMessage}
				alt="SendMessage"
				className="cursorPointer"
				onClick={() => {
					stop();
				}}
			/>

			<audio ref={audioRef} hidden />
		</div>
	);
}
