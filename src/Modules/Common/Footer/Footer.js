import React from "react";
import { useSelector } from "react-redux";
import ShayyekLogoLight from "../../../Resources/Assets/shayyek_logo_light";
import "./Footer.css";

function Footer() {
	const { currentLocal } = useSelector((state) => state.currentLocal);

	return (
		<footer className="footer">
			<div>
				<ShayyekLogoLight />
			</div>
			<div className="divider"></div>
			<div className="f-14">&copy; {currentLocal.footer.copyRights}</div>
		</footer>
	);
}

export default Footer;
