import React from "react";
import { Navbar } from "react-bootstrap";
import ShayyekLogoDark from "../../../Resources/Assets/shayyekLogoDark.svg";
import ShayyekLogoLight from "../../../Resources/Assets/shayyekLogoLight.svg";
import { Link } from "react-router-dom";
import GuestNav from "./GuestNav";
import UserNav from "./UserNav";
import "./Navbar.css";

function Navbarr({ navState }) {
	const loginState = true;

	return (
		<Navbar
			expand="md"
			className={navState ? "light f-14 ppl ppr" : "dark f-14 ppl ppr"}
			variant={"dark"}
			collapseOnSelect={true}
		>
			<Link to="/">
				{navState ? (
					<img src={ShayyekLogoDark} alt="ShayyekLogoDark" />
				) : (
					<img src={ShayyekLogoLight} alt="ShayyekLogoLight" />
				)}
			</Link>
			{!navState && <Navbar.Toggle aria-controls="basic-navbar-nav" />}
			{!navState && (
				<Navbar.Collapse id="basic-navbar-nav">
					{!loginState ? <GuestNav /> : <UserNav loginState={loginState} />}
				</Navbar.Collapse>
			)}
		</Navbar>
	);
}

export default Navbarr;
