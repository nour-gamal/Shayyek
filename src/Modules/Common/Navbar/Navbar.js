import { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Navbar } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Dropdown, Button, List, Avatar } from "antd";
import GuestNav from "./GuestNav";
import UserNav from "./UserNav";
import { changeLocal } from "../../../Redux/Localization";
import { authorType } from "../../../helpers/authType";
import ShayyekLogoDarkAr from "../../../Resources/Assets/ShayyekLogoDarkAr.png";
import ShayyekLogoDarkEn from "../../../Resources/Assets/shayyekLogoDark.png";
import ShayyekLogoLightEn from "../../../Resources/Assets/shayyekLogoLight.png";
import ShayyekLogoLightAr from "../../../Resources/Assets/ShayyekLogoLightAr.svg";
import Chat from "../../../Resources/Assets/ChatIcon.png";
import Notification from "../../../Resources/Assets/Notification Icon.svg";
import languages from "../../../Resources/Assets/languages.svg";
import cart from "../../../Resources/Assets/cart.svg";
import AllSuppliers from "../../../Resources/Assets/All_suppliers.svg";
import userAvatar from "../../../Resources/Assets/people.svg";
import { getNotifications, readNotificationsAPI } from "./../Network";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import Room from "../ReverseAuction/Components/Room/Room";
import "./Navbar.css";

function Navbarr({ navState, verifayState, transparent }) {
	const dispatch = useDispatch();

	const [userNotifications, setUserNotifications] = useState([]);
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	const { authorization } = useSelector((state) => state.authorization);
	const [isRoomModalVis, updateRoomModalVis] = useState(false);
	const [hasNotifications, updateHasNotifications] = useState(false);
	const [roomId, updateRoomId] = useState("")
	const loginState = authorization.userTypeId ? true : false;
	const {
		authorization: { userTypeId, accountTypeId, roleId },
	} = useSelector((state) => state.authorization);
	const isBuyer =
		authorType(accountTypeId, userTypeId, roleId) &&
		authorType(accountTypeId, userTypeId, roleId).includes("buyer");

	const [unreadMsgCount, updateUnreadMsgCount] = useState(0);
	useEffect(() => {
		if (authorization.id) {
			const userDocRef = doc(db, "users", authorization.id);

			onSnapshot(userDocRef, (doc) => {
				if (doc.data()) {
					updateUnreadMsgCount(doc.data().unreadMsgCount);
				}
			});
		}
	}, [unreadMsgCount, authorization.id]);


	const readNotifications = (notificationId) => {
		let data = {}
		if (notificationId) {
			data.notificationId = notificationId
		}
		readNotificationsAPI(data, success => {
			if (success.success) {
				updateHasNotifications(false)
				getNotifications(
					currentLanguageId,
					(success) => {
						if (success.success) {
							const { notifications } = success.data;
							setUserNotifications(notifications);
							const hasNewNotification = notifications.some(notification => !notification.isSeen)
							if (hasNewNotification) {
								updateHasNotifications(true)
							}
						}
					},
					(fail) => { }
				);
			}
		}, fail => {
			console.log(fail)
		})
	}

	useEffect(() => {
		getNotifications(
			currentLanguageId,
			(success) => {
				if (success.success) {
					const { notifications } = success.data;
					setUserNotifications(notifications);
					const hasNewNotification = notifications.some(notification => !notification.isSeen)
					if (hasNewNotification) {
						updateHasNotifications(true)
					}
				}
			},
			(fail) => { }
		);
	}, [currentLanguageId]);

	const notificationMenu = (
		<div
			id="scrollableDiv"
			style={{
				width: 400,

				border: "1px solid rgba(140, 140, 140, 0.35)",
			}}
		>
			<Scrollbars style={{ height: 400 }}>
				<List
					dataSource={userNotifications}
					renderItem={(item) => (
						<List.Item
							className={`mb-2 ${!item.isDetailsSeen ? "not-seen" : ""}`}
							key={item.notificationId}
							onClick={() => {
								readNotifications(item.notificationId)
							}}
						>
							<List.Item.Meta
								avatar={<Avatar src={userAvatar} />}
								title={<div>{item.title}</div>}
								onClick={() => {
									if (item.route && !item.route.includes('/')) {
										updateRoomModalVis(true)
										updateRoomId(item.route)
									}
								}}
								description={
									<div>
										<div>{item.message}</div>
										<div className="text-end">
											{moment(item.sendDate).format("LLL")}
										</div>
									</div>
								}
							/>
						</List.Item>
					)}
				/>
			</Scrollbars>
		</div >
	);
	return (
		<Navbar
			expand="lg"
			className={
				transparent
					? "transparent f-14 pps ppe"
					: navState
						? verifayState
							? "light f-14 pps ppe d-flex justify-content-between"
							: "light f-14 pps ppe"
						: "dark f-14 pps ppe"
			}
			variant={"dark"}
			collapseOnSelect={true}
		>
			<Link to="/">
				{navState ? (
					currentLanguageId === "274c0b77-90cf-4ee3-976e-01e409413057" ? (
						<img
							style={{ height: "30px" }}
							src={ShayyekLogoDarkEn}
							alt="ShayyekLogoDark"
						/>
					) : (
						<img
							src={ShayyekLogoDarkAr}
							style={{ height: "30px" }}
							alt="ShayyekLogoDark"
						/>
					)
				) : currentLanguageId === "274c0b77-90cf-4ee3-976e-01e409413057" ? (
					<img
						style={{ height: "30px" }}
						src={ShayyekLogoLightEn}
						alt="ShayyekLogoLight"
					/>
				) : (
					<img
						style={{ height: "30px" }}
						src={ShayyekLogoLightAr}
						alt="ShayyekLogoLight"
					/>
				)}
			</Link>
			{!navState && loginState && (
				<span className="controlIcon d-flex justify-content-end">
					{isBuyer && (
						<span className="align-content-center d-flex">
							<Link to="/suppsiers" className="nav-link d-none d-lg-inline">
								<img src={AllSuppliers} alt="AllSuppsiers" />
								<span className="color-white mx-1 ">
									{currentLocal.navbar.AllSuppliers}
								</span>
							</Link>
							<Link to="/cart" className="nav-link d-none d-lg-inline">
								<img src={cart} alt="cart" />
								<span className="color-white mx-1 ">
									{currentLocal.navbar.cart}
								</span>
							</Link>
						</span>
					)}
					<Link to="/chat" className="nav-link chat-icon">
						{unreadMsgCount > 0 && (
							<div className="chatNotifications f-12"></div>
						)}
						<img src={Chat} alt="Chat" />
					</Link>
					<Dropdown overlay={notificationMenu} trigger={["click"]}>
						<Button
							type="text"
							className="nav-link notification-icon"
							style={{ padding: "0.5rem 1rem" }}
							onClick={() => { readNotifications() }}
						>
							{hasNotifications && <div className="notifications f-12"></div>}
							<img src={Notification} alt="Notification" />
						</Button>
					</Dropdown>
				</span>
			)
			}
			{
				verifayState && (
					<>
						<div className="lang">
							<span className="languageWord mx-2">
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
				)
			}
			{!navState && <Navbar.Toggle aria-controls="basic-navbar-nav" />}
			{
				!navState && (
					<Navbar.Collapse
						id="basic-navbar-nav"
						className={loginState ? "flex-grow-0" : "flex-grow-1"}
					>
						{!loginState ? <GuestNav /> : <UserNav loginState={loginState} />}
					</Navbar.Collapse>
				)
			}
			{
				isRoomModalVis && <Room
					isModalVisible={isRoomModalVis}
					onCancel={() => { updateRoomModalVis(false) }}
					roomId={roomId}
				/>
			}
		</Navbar >
	);
}

export default Navbarr;
