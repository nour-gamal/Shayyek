import React from "react";
import { Nav, Container, Navbar } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import languages from "../../../Resources/Assets/languages.svg";
import { changeLocal } from "../../../Redux/Localization";
import ShayyekLogoDark from "../../../Resources/Assets/shayyek_logo_dark";
import ShayyekLogoLight from "../../../Resources/Assets/shayyek_logo_light";
import AllSuppliers from "../../../Resources/Assets/All_suppliers.svg";
import cart from "../../../Resources/Assets/cart.svg";
import Request_RFQ from "../../../Resources/Assets/Request_RFQ.svg";
import Notification from "../../../Resources/Assets/Notification Icon.svg";
import Chat from "../../../Resources/Assets/Path 9.svg";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbarr({ navState }) {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const loginState = false;

  const dispatch = useDispatch();

  return (
    <Navbar
      expand="md"
      className={navState ? "light f-14" : "dark f-14"}
      variant={"dark"}
      collapseOnSelect={true}
    >
      <Container fluid>
        <Link to="/">
          {navState ? (
            <ShayyekLogoDark />
          ) : (
            <ShayyekLogoLight width={"135"} height={"28"} />
          )}
        </Link>
        {!navState && <Navbar.Toggle aria-controls="basic-navbar-nav" />}
        {!navState && (
          <Navbar.Collapse id="basic-navbar-nav">
            {loginState ? (
              <Nav>
                <div className="centerNav">
                  <Link to="/suppliers" className="nav-link">
                    <img src={AllSuppliers} alt="AllSuppliers" />
                    {currentLocal.navbar.AllSuppliers}
                  </Link>
                  <Nav.Link href="#link">
                    <img src={Request_RFQ} alt="Request_RFQ" />
                    {currentLocal.navbar.requestRFQ}
                  </Nav.Link>
                  <Nav.Link href="#link">
                    <img src={cart} alt="cart" />
                    {currentLocal.navbar.cart}
                  </Nav.Link>
                </div>
                <div className="endNav">
                  <Link to="/login" className="nav-link">
                    {currentLocal.navbar.signin}
                  </Link>
                  <Link to="/registration" className="nav-link">
                    {/* <Nav.Link href="/registration"> */}
                    {currentLocal.navbar.register}
                  </Link>
                  {/* // </Nav.Link> */}

                  <Nav.Link href="#">
                    <span>
                      {currentLocal.language === "العربيه" ? "عربي" : "English"}
                    </span>
                    <img
                      src={languages}
                      alt="languages"
                      className="langIcon"
                      onClick={() => {
                        dispatch(
                          changeLocal(
                            currentLocal.language === "English" ? "ar" : "en"
                          )
                        );
                      }}
                    />
                  </Nav.Link>
                </div>
              </Nav>
            ) : (
              <Nav className={!loginState && "loginNavbar"}>
                <div className="endNav">
                  <Link to="/login" className="nav-link">
                    <img src={Chat} alt="Chat" />
                  </Link>
                  <Link to="/registration" className="nav-link  registration">
                    <img src={Notification} alt="Notification" />
                  </Link>
                  <span className="pb-2 px-3">Admin</span>
                  {/* <Avatar size={64} icon={<UserOutlined />} /> */}
                  <Nav.Link href="#">
                    <span>
                      {currentLocal.language === "العربيه" ? "عربي" : "English"}
                    </span>
                    <img
                      src={languages}
                      alt="languages"
                      className="langIcon"
                      onClick={() => {
                        dispatch(
                          changeLocal(
                            currentLocal.language === "English" ? "ar" : "en"
                          )
                        );
                      }}
                    />
                  </Nav.Link>
                </div>
              </Nav>
            )}
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}

export default Navbarr;
