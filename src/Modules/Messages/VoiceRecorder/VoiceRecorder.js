import { useState } from "react";
import { Recorder } from "react-voice-recorder";
import { getStorage, ref, uploadBytes } from "firebase/storage";

import "./VoiceRecorder.css";
function VoiceRecorder({ resetRecord }) {
	const [audioDetails, updateAudioDetails] = useState({
		url: null,
		blob: null,
		chunks: null,
		duration: {
			h: null,
			m: null,
			s: null,
		},
	});
	const handleRest = () => {
		const reset = {
			url: null,
			blob: null,
			chunks: null,
			duration: {
				h: null,
				m: null,
				s: null,
			},
		};
		updateAudioDetails(reset);
	};
	const handleAudioUpload = (file) => {
		const storage = getStorage();
		const storageRef = ref(storage, "voicenotes");
		console.log(file);
		// 'file' comes from the Blob or File API
		uploadBytes(storageRef, file).then((snapshot) => {
			console.log(snapshot);
		});
		resetRecord();
	};
	const handleAudioStop = (data) => {
		updateAudioDetails(data);
	};

	return (
		<div>
			<Recorder
				record={true}
				title={"New recording"}
				audioURL={audioDetails.url}
				handleAudioStop={(data) => {
					handleAudioStop(data);
					handleAudioUpload(data);
				}}
				// handleOnChange={(value) => handleOnChange(value, "firstname")}
				handleAudioUpload={(data) => handleAudioUpload(data)}
				handleRest={() => handleRest()}
			/>
		</div>
	);
}

export default VoiceRecorder;
