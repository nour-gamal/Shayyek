import React from "react";
import { useSelector } from "react-redux";
import ShayyekLogoLightEn from "../../../Resources/Assets/shayyekLogoLight.png";
import ShayyekLogoLightAr from "../../../Resources/Assets/ShayyekLogoLightAr.svg";
import "./Footer.css";

function Footer() {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	return (
		<footer className="footer">
			<div>
				{currentLanguageId === "274c0b77-90cf-4ee3-976e-01e409413057" ? (
					<img src={ShayyekLogoLightEn} alt="ShayyekLogoLight" />
				) : (
					<img src={ShayyekLogoLightAr} alt="ShayyekLogoLight" />
				)}
				{/* <ShayyekLogoLight /> */}
			</div>
			<div className="divider"></div>
			<div className="f-14">&copy; {currentLocal.footer.copyRights}</div>
		</footer>
	);
}

export default Footer;
