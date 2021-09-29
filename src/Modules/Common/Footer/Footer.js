import React from "react";
import { useSelector } from "react-redux";
import shayyek_logo_light from "../../../Resources/Assets/shayyek_logo_light.svg";
import "./Footer.css";

function Footer() {
	const { currentLocal } = useSelector((state) => state.currentLocal);

	return (
		<footer className="footer">
			<div>
				<img src={shayyek_logo_light} alt="shayyek_logo_light" />
			</div>
			<div className="divider"></div>
			<div className="f-14">&copy; {currentLocal.footer.copyRights}</div>
		</footer>
	);
}

export default Footer;
