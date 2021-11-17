import React from "react";
import { Navbar } from "react-bootstrap";
import ShayyekLogoDark from "../../../Resources/Assets/shayyekLogoDark.svg";
import ShayyekLogoLight from "../../../Resources/Assets/shayyekLogoLight.svg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import languages from "../../../Resources/Assets/languages.svg";
import GuestNav from "./GuestNav";
import { changeLocal } from "../../../Redux/Localization";
import Chat from "../../../Resources/Assets/ChatIcon.svg";
import Notification from "../../../Resources/Assets/Notification Icon.svg";
import UserNav from "./UserNav";
import "./Navbar.css";

function Navbarr({ navState, verifayState, transparent }) {
	const dispatch = useDispatch();
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { authorization } = useSelector((state) => state.authorization);

	const loginState = authorization.userTypeId ? true : false;
	return (
		<Navbar
			expand="lg"
			className={
				transparent
					? "transparent f-14 ppl ppr "
					: navState
					? "light f-14 ppl ppr "
					: "dark f-14 ppl ppr "
			}
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
					<Link to="/loginByEmail" className="nav-link">
						<img src={Chat} alt="Chat" />
					</Link>
					<Link to="/registration" className="nav-link  registration">
						<img src={Notification} alt="Notification" />
					</Link>
				</span>
			)}
			{verifayState && (
				<>
					<div className="lang">
						<span className="languageWord">
							{currentLocal.language === "العربيه" ? "عربي" : "English"}
						</span>
						<span>
							<img
								src={languages}
								alt="languages"
								onClick={() => {
									dispatch(
										changeLocal(
											currentLocal.language === "English" ? "ar" : "en"
										)
									);
								}}
								className="languages"
							/>
						</span>
					</div>
				</>
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
