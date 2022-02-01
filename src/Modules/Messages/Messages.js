import Navbar from "../Common/Navbar/Navbar";
import Footer from "../Common/Footer/Footer";
import SidebarUserForMessage from "./SidebarUserForMessage/SidebarUserForMessage";
import SingleUserChatMessage from "./SingleUserChatMessage/SingleUserChatMessage";
//import { db } from "../../firebase";
import "./Messages.css";
const messages = () => {
	return (
		<section>
			<Navbar />
			<div className="d-flex  flex-1">
				<div className="sidebarUserForMessageContainer">
					<SidebarUserForMessage />
				</div>
				<div className="singleUserChatMessageContainer">
					<SingleUserChatMessage />
				</div>
			</div>
			<Footer />
		</section>
	);
};

export default messages;
