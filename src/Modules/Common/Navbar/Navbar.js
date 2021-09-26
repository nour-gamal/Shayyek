import React from "react";
import { Nav, Container, Navbar } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import languages from "../../../Resources/Assets/languages.svg";
import { changeLocal } from "../../../Redux/Localization";
import shayyek_logo_dark from "../../../Resources/Assets/shayyek_logo_dark.svg";
import shayyek_logo_light from "../../../Resources/Assets/shayyek_logo_light.svg";
import AllSuppliers from "../../../Resources/Assets/All_suppliers.svg";
import cart from "../../../Resources/Assets/cart.svg";
import Request_RFQ from "../../../Resources/Assets/Request_RFQ.svg";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbarr({ navState }) {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const dispatch = useDispatch();

  return (
    <Navbar
      expand="md"
      className={navState ? "light f-14" : "dark f-14"}
      variant={"dark"}
      collapseOnSelect={true}
    >
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src={navState ? shayyek_logo_dark : shayyek_logo_light}
            alt="shayyek_logo"
          />
        </Navbar.Brand>
        {!navState && <Navbar.Toggle aria-controls="basic-navbar-nav" />}
        {!navState && (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <div className="centerNav">
                <Nav.Link href="/suppliers">
                  <img src={AllSuppliers} alt="AllSuppliers" />
                  {currentLocal.navbar.AllSuppliers}
                </Nav.Link>
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
                <Nav.Link href="#">{currentLocal.navbar.signin}</Nav.Link>
                <Link to="/registration" className="nav-link">
                  {/* <Nav.Link href="/registration"> */}
                  {currentLocal.navbar.register}
                </Link>
                {/* // </Nav.Link> */}

                <Nav.Link href="#">
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
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}

export default Navbarr;
