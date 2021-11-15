import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import Navbar from "../../../../Common/Navbar/Navbar";
import {searchCompany} from "../../../network"
import SearchShayyek from "../../../../../Resources/Assets/Search Shayyek.svg";
import "./LandingPage.css";
function LandingPage() {
  const [searchWord, setSearchWord] = useState("");
  const { currentLanguageId } = useSelector((state) => state.currentLocal);

  const SearchFun = (e) => {
    setSearchWord(e.target.value);
     searchCompany(
      currentLanguageId,
      searchWord,
      (success) => {
        console.log(success.data);
        // setCompaniesName(success.data);
      },
      (fail) => {},
      false
    );
  }
  // function onSelectChange(optionId, selectedOption) {
  //   let filteredOptions = options;
  //   let optionSelected = selectedOptions;

  //   filteredOptions = options.filter((option) => option.value !== optionId);

  //   updateOptions(filteredOptions);

  //   optionSelected.push(selectedOption);
  //   updateSelectedOptions(optionSelected);
  // }
  // const [searchWord, setSearchWord] = useState("");
  useEffect(() => {
    localStorage.setItem("landingPage", LandingPage);
  }, []);
  // const handleSearch = (e) => {
  //   console.log(e.target.value);
  //   setSearchWord(e.target.value);
  //   console.log(searchWord);
  // };
  return (
    <>
      <div className="overlay"></div>
      <div className="landingPage">
        <Navbar transparent={true} />
        <Container>
          <Row>
            <Col md={6} xs={12}>
              <h2 className="text-white my-0 f-27">Shayyek</h2>
              <p className="text-white f-21 mb-4 fw-light">
                Optimizing Procurement.
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={6} xs={12}>
              <h3 className="f-27 my-0">Verified, Connected, Streamlined</h3>
              <p className="text-white f-21 mb-5 fw-light">
                Procurement Management.
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={6} xs={12}>
              <div className="search w-100">
                <div className="d-flex align-items-center">
                  <input
                    type="search"
                    value={searchWord}
                    onChange={SearchFun}
                  />
         



         
                </div>
                <img
                  src={SearchShayyek}
                  alt="SearchShayyek"
                  className="SearchShayyek"
                />
              </div>
            </Col>
          </Row>
          <Row className="liveBoxContainer">
            <Col md={6} xs={12}>
              <Row>
                <Col md={6} xs={12}>
                  <div className="button">
                    <button className="button-primary f-21  fw-bold">
                      {" "}
                      Live
                    </button>
                  </div>
                </Col>
                <Col md={6} xs={12}>
                  <div className="lastUpdatStock">
                    <p className="text-white f-14">
                      Stock Availability Last Updated {"Today"}
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default LandingPage;
