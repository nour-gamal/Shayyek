import React from "react";
import VerificationInput from "react-verification-input";
import { Modal } from "antd";
import smallsend from "../../../../Resources/Assets/smallSend.svg";
import closIcon from "../../../../Resources/Assets/closeIcon.svg";
import "./VerifyByMobile.css";
function VerifyByMobile({ isModalVisible, toggleModal, mobileNumber }) {
	const handleSubmit = () => {};
	return (
		<div>
			<Modal
				title="Basic Modal"
				visible={isModalVisible}
				onCancel={toggleModal}
				className="modal-lg verifyByMobile"
			>
				<img
					src={closIcon}
					alt="closIcon"
					className="closIcon"
					onClick={toggleModal}
				/>
				<div className="text-center">
					<img src={smallsend} alt="send" className="msgImg" />
					<p className="f-17 mobileNumber">
						Code Sent to *******{mobileNumber}
					</p>
					<p className="checkMobile f-14 pb-4">
						Check Your Mobile to Verify Your Acount
					</p>
					<div className="code">
						<VerificationInput placeholder={""} value={""} />
					</div>
					<div className="button">
						<button onClick={handleSubmit} className="button-primary">
							Submit
						</button>
					</div>
					<p className="f-14" style={{ color: "#707070" }}>
						It may take a minute to receive your code, Haven't received it ?
						<span
							className="resendCodev f-14"
							onClick={() => {
								alert("hi");
							}}
						>
							{" "}
							Resend a new code.
						</span>
					</p>
				</div>
			</Modal>
		</div>
	);
}

export default VerifyByMobile;
