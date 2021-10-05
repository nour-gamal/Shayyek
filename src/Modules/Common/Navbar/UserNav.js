import React from "react";
import { Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import languages from "../../../Resources/Assets/languages.svg";
import { changeLocal } from "../../../Redux/Localization";
import { Link } from "react-router-dom";
import { Avatar } from "antd";
import Chat from "../../../Resources/Assets/Path 9.svg";
import { UserOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from "antd";
import arrowDown from "../../../Resources/Assets/small-down.svg";

function UserNav({ loginState }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
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
		<Nav className={!loginState && "loginNavbar"}>
			<div className="endNav">
				<Link to="/login" className="nav-link">
					<img src={Chat} alt="Chat" />
				</Link>
				<Link to="/registration" className="nav-link  registration">
					<img src={Notification} alt="Notification" />
				</Link>
				<Dropdown overlay={menu} trigger={["click"]} className="mb-2 mx-3">
					<a
						className="ant-dropdown-link"
						onClick={(e) => e.preventDefault()}
						href="/"
					>
						<img src={arrowDown} alt="arrowDown" />
					</a>
				</Dropdown>
				<span className="pb-2  userType">{currentLocal.navbar.admin}</span>,
				<Link to="/me/name">
					<Avatar icon={<UserOutlined />} className="mb-1" />{" "}
				</Link>
				<Nav.Link href="#" className="ml-3">
					<img
						src={languages}
						alt="languages"
						className="langIcon "
						onClick={() => {
							dispatch(
								changeLocal(currentLocal.language === "English" ? "ar" : "en")
							);
						}}
					/>
					<span className="px-2">
						{currentLocal.language === "العربيه" ? "عربي" : "En"}
					</span>
				</Nav.Link>
			</div>
		</Nav>
	);
}

export default UserNav;
