import React, { useState } from "react";
import "./AuthHeader.css";
import { changeLocal } from "../../../Redux/Localization";
import { Col, Row } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "react-bootstrap";
import languages from "../../../Resources/Assets/languages.svg";
function AuthHeader({ title, showState }) {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const dispatch = useDispatch();
  const [buyer, setBuyer] = useState("");

  const toggleKind = (e) => {
    e.preventDefault();
    if (e.target.id === "buyer") {
      setBuyer(e.target.id);
    } else if (e.target.id === "Contractor") {
      setBuyer(e.target.id);
    } else if (e.target.id === "supplies") {
      setBuyer(e.target.id);
    }
  };
  return (
    <div className="AuthHeader">
      <Row>
        <Col md={12} xs={12}>
          <div className="f-27 mx-3 title">{title}</div>
        </Col>

        <Col md={12} xs={12}>
          <div className="dropdownmenu">
            {showState && (
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  {buyer ? buyer : currentLocal.registration.userType}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item value="buyer" id="buyer" onClick={toggleKind}>
                    {currentLocal.registration.buyer}
                  </Dropdown.Item>
                  <Dropdown.Item
                    value="Contractor"
                    id="Contractor"
                    onClick={toggleKind}
                  >
                    {currentLocal.registration.Contractor}
                  </Dropdown.Item>
                  <Dropdown.Item
                    value="supplies"
                    id="supplies"
                    onClick={toggleKind}
                  >
                    {currentLocal.registration.supplies}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
				<span>
				{currentLocal.language==="العربيه" ? "عربي":"English"} 
			</span>
			<span> 
            <img
              src={languages}
              alt="languages"
              onClick={() => {
                dispatch(
                  changeLocal(currentLocal.language === "English" ? "ar" : "en")
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
