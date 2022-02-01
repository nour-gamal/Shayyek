// layout
import Navbar from "../Common/Navbar/Navbar";
import Footer from "../Common/Footer/Footer";
// main-component
import SidebarUserForMessage from "./SidebarUserForMessage/SidebarUserForMessage";
import SingleUserChatMessage from "./SingleUserChatMessage/SingleUserChatMessage";
import "./Messages.css";
const messages = () => {
  return (
    <section>
      <Navbar />
      <div className="d-flex  flex-1 chat-page">
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
