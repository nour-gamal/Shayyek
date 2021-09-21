import React from "react";
import { useSelector } from "react-redux";
import "./Footer.css";

function Footer() {
	const { currentLocal } = useSelector((state) => state.currentLocal);

	return (
		<div className="footer">
			<div className="f3 fw-500">Shayyek</div>
			<div className="divider"></div>
			<div>&copy; {currentLocal.footer.copyRights}</div>
		</div>
	);
}

export default Footer;
