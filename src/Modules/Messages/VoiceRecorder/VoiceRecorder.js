import { useState } from "react";
import { Recorder } from "react-voice-recorder";

import "./VoiceRecorder.css";
function VoiceRecorder({ resetRecord, handleUpload }) {
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
					const blob = new Blob(data.chunks, {
						type: "audio/ogg; codecs=opus",
					});
					handleUpload(blob, "audio");
				}}
				// handleOnChange={(value) => handleOnChange(value, "firstname")}
				// handleAudioUpload={(data) => handleAudioUpload(data)}
				handleRest={() => handleRest()}
			/>
		</div>
	);
}

export default VoiceRecorder;
