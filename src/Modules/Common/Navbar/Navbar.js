import React from "react";
import { Nav, Container, Navbar } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import languages from "../../../Resources/Assets/languages.svg";
import { changeLocal } from "../../../Redux/Localization";
import ShayyekLogoDark from "../../../Resources/Assets/shayyek_logo_dark";
import ShayyekLogoLight from "../../../Resources/Assets/Group 3.svg";
import AllSuppliers from "../../../Resources/Assets/All_suppliers.svg";
import cart from "../../../Resources/Assets/cart.svg";
import Request_RFQ from "../../../Resources/Assets/Request_RFQ.svg";
import Notification from "../../../Resources/Assets/Notification Icon.svg";
import Chat from "../../../Resources/Assets/Path 9.svg";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from "antd";
import arrowDown from "../../../Resources/Assets/small-down.svg";
import "./Navbar.css";
import { Link } from "react-router-dom";
function Navbarr({ navState }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const loginState = false;
	const dispatch = useDispatch();
	const menu = (
		<Menu>
			<Menu.Item key="0">
				<Link to="/me/name">{currentLocal.navbar.viewProfile}</Link>
			</Menu.Item>
			<Menu.Item key="1">
				<a href="https://www.antgroup.com"> {currentLocal.navbar.logout}</a>
			</Menu.Item>
		</Menu>
	);

	return (
		<Navbar
			expand="md"
			className={navState ? "light f-14 ppl ppr" : "dark f-14 ppl ppr"}
			variant={"dark"}
			collapseOnSelect={true}
		>
			<Container fluid>
				<Link to="/">
					{navState ? (
						<ShayyekLogoDark />
					) : (
						<img src={ShayyekLogoLight} alt="ShayyekLogoLight" />
					)}
				</Link>
				{!navState && <Navbar.Toggle aria-controls="basic-navbar-nav" />}
				{!navState && (
					<Navbar.Collapse id="basic-navbar-nav">
						{!loginState ? (
							<Nav>
								<div className="centerNav">
									<Link to="/suppliers" className="nav-link">
										<img src={AllSuppliers} alt="AllSuppliers" />
										{currentLocal.navbar.AllSuppliers}
									</Link>
									<Nav.Link href="#link">
										<img src={Request_RFQ} alt="Request_RFQ" />
										{currentLocal.navbar.requestRFQ}
									</Nav.Link>
									<Nav.Link href="#link">
										<img src={cart} alt="cart" />
										{currentLocal.navbar.cart}
									</Nav.Link>
								</div>
								<div className="endNav">
									<Link to="/login" className="nav-link">
										{currentLocal.navbar.signin}
									</Link>
									<Link to="/registration" className="nav-link">
										{/* <Nav.Link href="/registration"> */}
										{currentLocal.navbar.register}
									</Link>
									{/* // </Nav.Link> */}

									<Nav.Link href="#">
										<img
											src={languages}
											alt="languages"
											className="langIcon"
											onClick={() => {
												dispatch(
													changeLocal(
														currentLocal.language === "English" ? "ar" : "en"
													)
												);
											}}
										/>
										<span className="px-2">
											{currentLocal.language === "العربيه" ? "عربي" : "En"}
										</span>
									</Nav.Link>
								</div>
							</Nav>
						) : (
							<Nav className={!loginState && "loginNavbar"}>
								<div className="endNav">
									<Link to="/login" className="nav-link">
										<img src={Chat} alt="Chat" />
									</Link>
									<Link to="/registration" className="nav-link  registration">
										<img src={Notification} alt="Notification" />
									</Link>
									<Dropdown
										overlay={menu}
										trigger={["click"]}
										className="mb-2 mx-3"
									>
										<a
											className="ant-dropdown-link"
											onClick={(e) => e.preventDefault()}
											href="/"
										>
											<img src={arrowDown} alt="arrowDown" />
										</a>
									</Dropdown>
									<span className="pb-2  userType">
										{currentLocal.navbar.admin}
									</span>
									,
									<Link to="/me/name">
										<Avatar icon={<UserOutlined />} className="mb-1" />{" "}
									</Link>
									<Nav.Link href="#" className="mx-3">
										<img
											src={languages}
											alt="languages"
											className="langIcon"
											onClick={() => {
												dispatch(
													changeLocal(
														currentLocal.language === "English" ? "ar" : "en"
													)
												);
											}}
										/>
										<span className="mx-2">
											{currentLocal.language === "العربيه" ? "عربي" : "En"}
										</span>
									</Nav.Link>
								</div>
							</Nav>
						)}
					</Navbar.Collapse>
				)}
			</Container>
		</Navbar>
	);
}

export default Navbarr;
