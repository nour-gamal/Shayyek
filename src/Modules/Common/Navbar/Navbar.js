import React from "react";
import { Navbar } from "react-bootstrap";
import ShayyekLogoDark from "../../../Resources/Assets/shayyekLogoDark.svg";
import ShayyekLogoLight from "../../../Resources/Assets/shayyekLogoLight.svg";
import { Link } from "react-router-dom";
import GuestNav from "./GuestNav";
import Chat from "../../../Resources/Assets/ChatIcon.svg";
import Notification from "../../../Resources/Assets/Notification Icon.svg";
import UserNav from "./UserNav";
import "./Navbar.css";

function Navbarr({ navState }) {
	const loginState = true;
	return (
		<Navbar
			expand="lg"
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

			{!navState && loginState && (
				<span className="controlIcon d-flex justify-content-end">
					<Link to="/login" className="nav-link">
						<img src={Chat} alt="Chat" />
					</Link>
					<Link to="/registration" className="nav-link  registration">
						<img src={Notification} alt="Notification" />
					</Link>
				</span>
			)}
			{!navState && <Navbar.Toggle aria-controls="basic-navbar-nav" />}

			{!navState && (
				<Navbar.Collapse
					id="basic-navbar-nav"
					className={loginState ? "flex-grow-0" : "flex-grow-1"}
				>
					{!loginState ? <GuestNav /> : <UserNav loginState={loginState} />}
				</Navbar.Collapse>
			)}
		</Navbar>
	);
}

export default Navbarr;
