import { Row, Col } from "antd";
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
      <Row className="flex-1">
        <Col md={6}>
          <SidebarUserForMessage />
        </Col>
        <Col md={18}>
          <SingleUserChatMessage />
        </Col>
      </Row>
      <Footer />
    </section>
  );
};

export default messages;
