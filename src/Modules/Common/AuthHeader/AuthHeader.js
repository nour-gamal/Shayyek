import React, { useEffect, useState } from "react";
import "./AuthHeader.css";
import { changeLocal } from "../../../Redux/Localization";
import { Alert, Col, Row } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Dropdown } from "antd";
import dropDownArrow from "../../../Resources/Assets/dropDownArrow.svg";
import { GetUserTypes } from "../Network";
import languages from "../../../Resources/Assets/languages.svg";
function AuthHeader({
	title,
	showState,
	onSelectUserType,
	sendDataToParent,
	alert,
	login,
	firstName,
	parent,
}) {
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [item, setItem] = useState("");
	const [userType, setUserType] = useState([]);
	const dispatch = useDispatch();
	const menu = (
		<Menu>
			{userType.map((user) => {
				return (
					<Menu.Item
						key={user.id}
						onClick={(e) => {
							onSelectUserType(user.name);
							setItem(user.name);
							sendDataToParent(user.id);
						}}
					>
						{user.name}
					</Menu.Item>
				);
			})}
		</Menu>
	);

	useEffect(() => {
		if (localStorage.getItem("redirectToRegistration")) {
			setItem(localStorage.getItem("redirectToRegistration"));
		} else {
			setItem(currentLocal.registration.userType);
		}
		GetUserTypes(
			currentLanguageId,
			(success) => {
				setUserType(success.data);
			},
			(fail) => {},
			false
		);
	}, [currentLanguageId, currentLocal.registration.userType]);

	return (
		<div
			className={parent === "register" ? "AuthHeader" : "AuthHeader ppl ppr"}
		>
			{alert && !firstName && (
				<Row>
					<Alert
						w-10
						message={currentLocal.registration.pleaseFillAllRequiredFields}
						type="error"
						className="text-center"
					/>
				</Row>
			)}

			<Row>
				<Col md={12} xs={login === "login" ? 12 : 24}>
					<div className="f-21 title">{title}</div>
				</Col>

				<Col md={12} xs={login === "login" ? 12 : 24}>
					<div className="dropdownmenu">
						{showState && (
							<Dropdown overlay={menu} trigger={["click"]}>
								<a
									href="/"
									className="ant-dropdown-link"
									onClick={(e) => e.preventDefault()}
								>
									{item}
									<img src={dropDownArrow} alt="dropDownArrow" />
								</a>
							</Dropdown>
						)}
						<span className="languageWord">
							{currentLocal.language === "??????????????" ? "????????" : "English"}
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
				</Col>
			</Row>
		</div>
	);
}

export default AuthHeader;
