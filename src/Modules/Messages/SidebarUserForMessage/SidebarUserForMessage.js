import MessageAvatar from "../../../Resources/Assets/MessageAvatar2x.png";
import { Dropdown, Button, Menu } from "antd";
import "./SidebarUserForMessage.css";

const SidebarUserForMessage = () => {
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
      <ul className="SidebarUserForMessage__list">
        <li className="SidebarUserForMessage__item d-flex justify-content-between">
          <div className="d-flex align-items-center justify-content-center">
            <figure className="SidebarUserForMessage__figure">
              <img src={MessageAvatar} alt="user" />
            </figure>
            <h5>Joe Taw Lee</h5>
          </div>
          <Dropdown
            overlay={() => menu(1)}
            overlayClassName="manageCompany__dropDown"
            placement="bottomCenter"
          >
            <Button type="text">...</Button>
          </Dropdown>
        </li>

        <li className="SidebarUserForMessage__item d-flex justify-content-between px-2">
          <div className="d-flex align-items-center justify-content-center">
            <figure className="SidebarUserForMessage__figure">
              <img src={MessageAvatar} alt="user" />
            </figure>
            <h5>Joe Taw Lee</h5>
          </div>
          <Dropdown
            overlay={() => menu(1)}
            overlayClassName="manageCompany__dropDown"
            placement="bottomCenter"
          >
            <Button type="text">...</Button>
          </Dropdown>
        </li>

        <li className="SidebarUserForMessage__item d-flex justify-content-between">
          <div className="d-flex align-items-center justify-content-center">
            <figure className="SidebarUserForMessage__figure">
              <img src={MessageAvatar} alt="user" />
            </figure>
            <h5>Joe Taw Lee</h5>
          </div>
          <Dropdown
            overlay={() => menu(1)}
            overlayClassName="manageCompany__dropDown"
            placement="bottomCenter"
          >
            <Button type="text">...</Button>
          </Dropdown>
        </li>

        <li className="SidebarUserForMessage__item d-flex justify-content-between">
          <div className="d-flex align-items-center justify-content-center">
            <figure className="SidebarUserForMessage__figure">
              <img src={MessageAvatar} alt="user" />
            </figure>
            <h5>Joe Taw Lee</h5>
          </div>
          <Dropdown
            overlay={() => menu(1)}
            overlayClassName="manageCompany__dropDown"
            placement="bottomCenter"
          >
            <Button type="text">...</Button>
          </Dropdown>
        </li>
      </ul>
    </div>
  );
};

export default SidebarUserForMessage;
