import DefaultProfileImage from "../../../Resources/Assets/DefaultProfileImage.png";
import { Dropdown, Button, Menu } from "antd";
import "./SidebarUserForMessage.css";

const SidebarUserForMessage = ({ friendsList }) => {
	const menu = (data) => (
		<Menu>
			<Menu.Item key={data}>
				<Button
					type="text"
					className="dropDown__item d-flex justify-content-start align-items-center"
				>
					item
				</Button>
			</Menu.Item>
		</Menu>
	);
	return (
		<div className="SidebarUserForMessage">
			{friendsList.length > 0 && (
				<ul className="SidebarUserForMessage__list">
					{friendsList.map((friend, friendIndex) => {
						return (
							<li
								className="SidebarUserForMessage__item d-flex justify-content-between"
								key={friendIndex}
							>
								<div className="d-flex align-items-center justify-content-center">
									<figure className="SidebarUserForMessage__figure">
										<img
											src={
												friend.myImage ? friend.myImage : DefaultProfileImage
											}
											alt="user"
										/>
									</figure>
									<h5>{friend.name}</h5>
								</div>
								<Dropdown
									overlay={() => menu(1)}
									overlayClassName="manageCompany__dropDown"
									placement="bottomCenter"
								>
									<Button type="text">...</Button>
								</Dropdown>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default SidebarUserForMessage;
