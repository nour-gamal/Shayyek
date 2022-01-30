import React from "react";
import { Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import languages from "../../../Resources/Assets/languages.svg";
import { changeLocal } from "../../../Redux/Localization";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import arrowDown from "../../../Resources/Assets/arrowDown.svg";
import { logout } from "../../../Redux/Authorization";
import { baseUrl } from "../../../Services";
import AllSuppliers from "../../../Resources/Assets/All_suppliers.svg";
import cart from "../../../Resources/Assets/cart.svg";

function UserNav({ loginState }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { authorization } = useSelector((state) => state.authorization);
	const dispatch = useDispatch();
	const menu = (
		<Menu>
			<Menu.Item key="0">
				<Link to={`/me/${authorization.fullName}`}>
					{currentLocal.navbar.viewProfile}
				</Link>
			</Menu.Item>
			<Menu.Item
				key="1"
				onClick={() => {
					dispatch(logout({}));
				}}
			>
				{currentLocal.navbar.logout}
			</Menu.Item>
		</Menu>
	);

	return (
		<Nav className={!loginState && "loginNavbar"}>
			<div className="endNav">
				<div className="d-flex personalInfoContainer">
					<Dropdown
						overlay={menu}
						trigger={["click"]}
						className="mx-3 d-lg-none "
					>
						<a
							className="ant-dropdown-link d-flex align-item-center "
							onClick={(e) => e.preventDefault()}
							href="/"
						>
							<img src={arrowDown} alt="arrowDown" className="arrowDown" />
						</a>
					</Dropdown>

					<span
						className={
							currentLocal.language === "English"
								? "userType d-flex align-item-center leftStyles"
								: "userType d-flex align-item-center rightStyles"
						}
					>
						<Link
							to={`/me/${authorization.fullName}`}
							data-toggle="tooltip"
							title={authorization.fullName}
							className="nameContainer"
						>
							{authorization.fullName}
						</Link>
					</span>

					<Dropdown
						overlay={menu}
						trigger={["click"]}
						className="mx-3 d-none d-lg-flex dropDownIcon"
					>
						<a
							className="ant-dropdown-link d-flex align-item-center "
							onClick={(e) => e.preventDefault()}
							href="/"
						>
							<img src={arrowDown} alt="arrowDown" />
						</a>
					</Dropdown>

					<Link to={`/me/${authorization.fullName}`}>
						<img
							className={"avatar rounded-circle d-flex align-items-center mx-4"}
							src={
								authorization.profileImage
									? baseUrl + authorization.profileImage
									: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
							}
							alt="avatar"
						/>
					</Link>
				</div>
				<Link to="/suppliers" className="nav-link d-inline d-lg-none">
					<img src={AllSuppliers} alt="AllSuppliers" />
					<span className="color-white mx-1 ">
						{currentLocal.navbar.AllSuppliers}
					</span>
				</Link>
				<Link to="/cart" className="nav-link d-inline d-lg-none">
					<img src={cart} alt="cart" />
					<span className="color-white mx-1 ">{currentLocal.navbar.cart}</span>
				</Link>
				<Nav.Link href="#">
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
