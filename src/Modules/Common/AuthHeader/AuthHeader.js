import React, { useEffect, useState } from "react";
import "./AuthHeader.css";
import { changeLocal } from "../../../Redux/Localization";
import { Alert, Col, Row } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Dropdown } from "antd";
import  dropDownArrow  from "../../../Resources/Assets/dropDownArrow.svg";
import { GetUserTypes } from "../Network";
import languages from "../../../Resources/Assets/languages.svg";
function AuthHeader({ title, showState, onSelectUserType,sendDataToParent ,alert}) {
  const { currentLanguageId } = useSelector((state) => state.currentLocal);
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const [item, setItem] = useState(currentLocal.registration.userType);
  const [userType, setUserType] = useState([]);
  // const [emptyCampanyName, setEmptyCampanyName] = useState(false)
  const dispatch = useDispatch();
  // const [buyer, setBuyer] = useState("");
  // console.log(emptyCampanyName);
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
              //state change when click on dropdown of usertype to make state of comapanyname false
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
    
        setUserType(success.data);
      },
      (fail) => console.log(fail),
      false
    );
  }, [currentLanguageId]);

  return (
    <div className="AuthHeader">
      
      <Row>
        {alert&&
      <Alert w-10 message="* Please fill all required fields" type="error" />
        }
      </Row>
    
      <Row>
        <Col md={12} xs={24}>
          <div className="f-21 title" >
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
                  <img src={dropDownArrow} alt="dropDownArrow" />
                </a>
              </Dropdown>
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
