import React from "react";
import { useSelector } from "react-redux";
import ShayyekLogoLight from "../../../Resources/Assets/shayyekLogoLight.svg";
import "./Footer.css";

function Footer() {
	const { currentLocal } = useSelector((state) => state.currentLocal);

	return (
		<footer className="footer">
			<div>
				<img src={ShayyekLogoLight} alt="ShayyekLogoLight" />
				{/* <ShayyekLogoLight /> */}
			</div>
			<div className="divider"></div>
			<div className="f-14">&copy; {currentLocal.footer.copyRights}</div>
		</footer>
	);
}

export default Footer;
