import React from "react";
import { Navbar } from "react-bootstrap";
import ShayyekLogoDarkEn from "../../../Resources/Assets/shayyekLogoDark.png";
import ShayyekLogoLightEn from "../../../Resources/Assets/shayyekLogoLight.png";
import ShayyekLogoDarkAr from "../../../Resources/Assets/ShayyekLogoDarkAr.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import languages from "../../../Resources/Assets/languages.svg";
import GuestNav from "./GuestNav";
import { changeLocal } from "../../../Redux/Localization";
import Chat from "../../../Resources/Assets/ChatIcon.svg";
import Notification from "../../../Resources/Assets/Notification Icon.svg";
import UserNav from "./UserNav";
import "./Navbar.css";

function Navbarr({ navState, verifayState, transparent }) {
  const dispatch = useDispatch();
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const { currentLanguageId } = useSelector((state) => state.currentLocal);
  const { authorization } = useSelector((state) => state.authorization);
  const loginState = authorization.userTypeId ? true : false;
  return (
    <Navbar
      expand="lg"
      className={
        transparent
          ? "transparent f-14 ppl ppr"
          : navState
          ? verifayState
            ? "light f-14 ppl ppr d-flex justify-content-between"
            : "light f-14 ppl ppr"
          : "dark f-14 ppl ppr"
      }
      variant={"dark"}
      collapseOnSelect={true}
    >
      <Link to="/">
        {navState ? (
          currentLanguageId === "274c0b77-90cf-4ee3-976e-01e409413057" ? (
            <img src={ShayyekLogoDarkEn} alt="ShayyekLogoDark" />
          ) : (
            <img
              src={ShayyekLogoDarkAr}
              style={{ height: 40 }}
              alt="ShayyekLogoDark"
            />
          )
        ) : currentLanguageId === "274c0b77-90cf-4ee3-976e-01e409413057" ? (
          <img src={ShayyekLogoLightEn} alt="ShayyekLogoLight" />
        ) : (
          <img src={ShayyekLogoDarkAr} alt="ShayyekLogoLight" />
        )}
      </Link>

      {!navState && loginState && (
        <span className="controlIcon d-flex justify-content-end">
          <Link to="/loginByEmail" className="nav-link">
            <img src={Chat} alt="Chat" />
          </Link>
          <Link to="/registration" className="nav-link  registration">
            <img src={Notification} alt="Notification" />
          </Link>
        </span>
      )}
      {verifayState && (
        <>
          <div className="lang">
            <span className="languageWord mx-2">
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
        </>
      )}
      {!navState && <Navbar.Toggle aria-controls="basic-navbar-nav" />}

      {!navState && (
        <Navbar.Collapse
          id="basic-navbar-nav"
          className={loginState ? "flex-grow-0" : "flex-grow-1"}
        >
          {!loginState ? <GuestNav /> : <UserNav loginState={loginState} />}
        </Navbar.Collapse>
      )}
    </Navbar>
  );
}

export default Navbarr;
