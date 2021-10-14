import React, { useEffect, useState } from "react";
import "./AuthHeader.css";
import { changeLocal } from "../../../Redux/Localization";
import { Col, Row } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Dropdown } from "antd";
import  dropDownArrow  from "../../../Resources/Assets/dropDownArrow.svg";
import { GetUserTypes } from "../Network";
import languages from "../../../Resources/Assets/languages.svg";
function AuthHeader({ title, showState, onSelectUserType }) {
  const { currentLanguageId } = useSelector((state) => state.currentLocal);
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const [item, setItem] = useState(currentLocal.registration.userType);
  const [userType, setUserType] = useState([]);
  const dispatch = useDispatch();
  const [buyer, setBuyer] = useState("");

  const menu = (
    <Menu>
      {userType.map((user) => {
        return (
          <Menu.Item
            key={user.id}
            onClick={(e) => {
              setBuyer(user.name);
              onSelectUserType(user.name);
              setItem(user.name);
            }}
          >
            {user.name}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  useEffect(() => {
    GetUserTypes(
      currentLanguageId,
      (success) => {
        console.log(success.data);
        setUserType(success.data);
      },
      (fail) => console.log(fail),
      false
    );
  }, []);

  return (
    <div className="AuthHeader">
      <Row>
        <Col md={12} xs={24}>
          <div className="f-21 title" n>
            {title}
          </div>
        </Col>

        <Col md={12} xs={24}>
          <div className="dropdownmenu">
            {showState && (
              <Dropdown overlay={menu} trigger={["click"]}>
                <a
                  href="/"
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  {item}
                  {/* <dropDownArrow /> */}
                  <img src={dropDownArrow} alt="dropDownArrow" />
                </a>
              </Dropdown>
              // <Dropdown>
              //   <Dropdown.Toggle id="dropdown-basic">
              //     {buyer ? buyer : currentLocal.registration.userType}
              //   </Dropdown.Toggle>

              //   <Dropdown.Menu>
              //     {userType.map((user)=>{
              //       console.log(user.name);
              //       return(
              //         <Dropdown.Item value="buyer" id="Buyer" onClick={toggleKind}>
              //         {user.name}
              //       </Dropdown.Item>
              //       )
              //     })}

              //   </Dropdown.Menu>
              // </Dropdown>
            )}
            <span className="languageWord">
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
        </Col>
      </Row>
    </div>
  );
}

export default AuthHeader;
