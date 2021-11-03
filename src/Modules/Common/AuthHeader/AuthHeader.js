import React, { useEffect, useState } from "react";
import "./AuthHeader.css";
import { changeLocal } from "../../../Redux/Localization";
import { Alert, Col, Row } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Dropdown } from "antd";
import  dropDownArrow  from "../../../Resources/Assets/dropDownArrow.svg";
import { GetUserTypes } from "../Network";
import languages from "../../../Resources/Assets/languages.svg";
function AuthHeader({ title, showState, onSelectUserType,sendDataToParent,toggleValue,alert,firstName}) {
  const { currentLanguageId } = useSelector((state) => state.currentLocal);
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const [item, setItem] = useState("");
  const [toggleState, setToggleState] = useState(false)
  const [userType, setUserType] = useState([]);
  // const [emptyCampanyName, setEmptyCampanyName] = useState(false)
  const dispatch = useDispatch();
  // const [buyer, setBuyer] = useState("");
  // console.log(emptyCampanyName);
  console.log(currentLocal.registration.userType);
  const menu = (
    <Menu>
      {userType.map((user) => {
        return (
          <Menu.Item
            key={user.id}
            onClick={(e) => {
              if(user.name==="Supplier"){
                setToggleState(true)
              }else{
                setToggleState(false)
              }
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
    setItem(currentLocal.registration.userType)
    GetUserTypes(
      currentLanguageId,
      (success) => {
    console.log(success.data);
        setUserType(success.data);
      },
      (fail) => console.log(fail),
      false
    );
  }, [currentLanguageId,currentLocal.registration.userType]);
  setTimeout(() => {
    toggleValue(toggleState)
  
  }, 100);
  console.log(alert);
  return (
    <div className="AuthHeader">
        {alert&&!firstName&&
      <Row>
      
      <Alert w-10 message={currentLocal.registration.PleaseFillAllRequiredFields} type="error" />
       
      </Row>
       }
    
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
