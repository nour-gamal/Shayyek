import React, { useState } from "react";
import "./VerifyByEmail.css";
import send from "../../../../Resources/Assets/sent.svg";
import Footer from "../../../Common/Footer/Footer";
import Navbar from "../../../Common/Navbar/Navbar";
import { useSelector } from "react-redux";
import VerifyByMobile from "../VerifyByMobile/VerifyByMobile";
function VerifyByEmail() {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [isModalVisible, toggleModalVisible] = useState(false);
	const mobileNuumberState = localStorage.getItem("mobileNumber");
	const mobileNumber = mobileNuumberState.slice(8, 11);

	return (
		<section className="verifyByEmail">
			<Navbar navState={"light"} verifayState={true} />
			<div className="content">
				<div className="ContentContainer">
					<img src={send} alt="send" />
					<h3 className="f-21">{currentLocal.registration.regSuccessTitle}</h3>
					<p className="f-14">{currentLocal.registration.checkMail}</p>
					{/* <p className="f-14">{currentLocal.registration.or}</p>
					<div className="button">
						<button className="button-primary" onClick={toggleModalVisible}>
							{currentLocal.registration.verifyMobile}
						</button>
					</div> */}
				</div>
			</div>
			<VerifyByMobile
				isModalVisible={isModalVisible}
				toggleModal={() => {
					toggleModalVisible(!isModalVisible);
				}}
				mobileNumber={mobileNumber}
			/>
			<Footer />
		</section>
	);
}

export default VerifyByEmail;
