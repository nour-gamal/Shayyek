import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// components
import { Table, Dropdown, Menu, Button, ConfigProvider } from "antd";
import Footer from "../../../../Common/Footer/Footer";
import Navbar from "../../../../Common/Navbar/Navbar";
import eyeIcon from "../../../../../Resources/Assets/eye.svg";
import deleteIcon from "../../../../../Resources/Assets/deletee.svg";
import resetpasswordIcon from "../../../../../Resources/Assets/resetPasswork.svg";
import {
  getUsersByComapnyAdmin,
  acceptOrRejectUser,
} from "../../../../ProfilePage/network";

// style
import "./ManageCompany.css";

const ManageCompany = () => {
  const { currentLocal, currentLanguageId } = useSelector(
    (state) => state.currentLocal
  );

  const {
    authorization: { companyId },
  } = useSelector((state) => state.authorization);

  const [data, updateData] = useState(null);
  useEffect(() => {
    getUsersByComapnyAdmin(
      { companyId, languageId: currentLanguageId },
      (success) => {
        if (success.success) {
          let items = [];
          success.data.forEach((item, i) => {
            items.push({ ...item, key: i });
          });
          updateData(items);
        } else {
          // fail
        }
      },
      (fail) => {
        console.log(fail);
      }
    );
  }, [companyId, currentLanguageId]);

  function acceptOrRejectUserAction(isActive, employeeId) {
    acceptOrRejectUser(
      { isActive, rejectedUserId: employeeId },
      (success) => {
        if (success.success) {
          updateData((prevState) =>
            prevState.map((item) =>
              item.userId === employeeId
                ? { ...item, isActive: success.data }
                : item
            )
          );
        }
      },
      (fail) => {
        console.log(fail);
      }
    );
  }

  const menu = (employee) => (
    <Menu>
      <Menu.Item key={employee.userId + "1"}>
        <Button
          type="text"
          className="dropDown__item d-flex justify-content-start align-items-center"
        >
          <Link
            to={{
              pathname: `/view/${employee.profileName}`,
              state: {
                employeeId: employee.userId,
                isActive: employee.isActive,
              },
            }}
          >
            <img className="icon" src={eyeIcon} alt="view" />
            <span>{currentLocal.profilePage.view}</span>
          </Link>
        </Button>
      </Menu.Item>
      {!employee.isActive ? (
        <>
          <Menu.Item key={employee.userId + "2"}>
            <Button
              type="text"
              className="dropDown__item d-flex justify-content-start align-items-center"
              onClick={() => acceptOrRejectUserAction(true, employee.userId)}
            >
              <img className="icon" src={resetpasswordIcon} alt="view" />
              <span>{currentLocal.profilePage.accept}</span>
            </Button>
          </Menu.Item>
          <Menu.Item key={employee.userId + "3"}>
            <Button
              type="text"
              className="dropDown__item d-flex justify-content-start align-items-center"
              onClick={() => acceptOrRejectUserAction(false, employee.userId)}
            >
              <img className="icon" src={deleteIcon} alt="view" />
              <span>{currentLocal.profilePage.reject}</span>
            </Button>
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key={employee.userId + "2"}>
            <Button
              type="text"
              className="dropDown__item d-flex justify-content-start align-items-center"
            >
              <Link
                to={`/reset-password/${employee.profileName}`}
                params={employee.userId}
              >
                <img className="icon" src={resetpasswordIcon} alt="view" />
                <span>{currentLocal.login.ResetPassword}</span>
              </Link>
            </Button>
          </Menu.Item>
          <Menu.Item key={employee.userId + "3"}>
            <Button
              type="text"
              className="dropDown__item d-flex justify-content-start align-items-center"
            >
              <Link to={`/delete/${employee.profileName}`}>
                <img className="icon" src={deleteIcon} alt="view" />
                <span>{currentLocal.offerTable.delete}</span>
              </Link>
            </Button>
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  const columns = [
    {
      title: currentLocal.profilePage.profileName,
      dataIndex: "profileName",
      key: "profileName",
    },
    {
      title: currentLocal.profilePage.type,
      dataIndex: "type",
      key: "type",
    },
    {
      title: currentLocal.registration.mobileNumber,
      dataIndex: "mobileNumber",
      key: "mobileNumber",
    },
    {
      title: currentLocal.registration.email,
      dataIndex: "email",
      key: "emai",
    },
    {
      title: currentLocal.profilePage.actionList,
      dataIndex: "actionList",
      key: "actionList",
      render: (_, data) => {
        return (
          <Dropdown
            overlay={() => menu(data)}
            overlayClassName="manageCompany__dropDown"
            placement="bottomCenter"
          >
            <Button type="text">...</Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <section>
      <Navbar></Navbar>
      <ConfigProvider
        direction={`${currentLocal.language === "English" ? "ltr" : "rtl"}`}
      >
        <div className="pps ppe mt-4">
          <Table
            className="manageCompany__table"
            dataSource={data}
            columns={columns}
            pagination={{
              position: ["bottomRight"],
              pageSize: 5,
              hideOnSinglePage: false,
            }}
            scroll={{ x: true }}
          />
        </div>
      </ConfigProvider>
      <Footer />
    </section>
  );
};

export default ManageCompany;
