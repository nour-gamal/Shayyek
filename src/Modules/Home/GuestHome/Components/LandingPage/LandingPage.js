import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import Navbar from "../../../../Common/Navbar/Navbar";
import logo from "../../../../../Resources/Assets/no-profile-img-240x300.gif";
import { searchCompany } from "../../../network";
import StarsRating from "stars-rating";
import SearchShayyek from "../../../../../Resources/Assets/Search Shayyek.svg";
import emptyIcon from "../../../../../Resources/Assets/emptyIcon.svg";
import "./LandingPage.css";
function LandingPage() {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const [searchWord, setSearchWord] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [searshResult, setSearshResult] = useState(false);
  const [emptyState, setEmptyState] = useState(false);
  const { currentLanguageId } = useSelector((state) => state.currentLocal);

  const SearchFun = (e) => {
    setSearchWord(e.target.value);
    searchCompany(
      currentLanguageId,
      e.target.value,
      (success) => {
        if (
          success.data !== null ||
          (success.data === null && e.target.value)
        ) {
          if (success.data === null && e.target.value) {
            setEmptyState(true);
          } else {
            setEmptyState(false);
          }
          setSearshResult(true);
        } else {
          setSearshResult(false);
        }
        // if (success.data === null) {
        // 	console.log(success.data === null&&!e.target.value);
        //   setSearshResult(false);
        // } else {
        //   setSearshResult(true);
        // }
        setSearchList(success.data);
      },
      (fail) => {},
      false
    );
  };

  return (
    <>
      <div className="landingPage">
        <Navbar transparent={true} />
        <Container>
          <Row>
            <Col md={6} xs={12}>
              <h1 className="text-white pt-5 f-34 text-bold">
                {currentLocal.home.shayek}
              </h1>
              <p className="text-white f-21  fw-light">
                {currentLocal.home.optimizingProcurement}
              </p>
            </Col>
          </Row>
          <Row>
            <Col
              md={6}
              xs={12}
              className={
                currentLocal.language === "العربيه"
                  ? "procurementManagement"
                  : null
              }
            >
              <h3 className="f-27 my-0">
                {currentLocal.home.verifiedConnectedStreamlined}
              </h3>
              <p className="text-white f-21 mb-0 fw-light">
                {currentLocal.home.procurementManagement}
              </p>
            </Col>
          </Row>
          <Row>
            <div className="search w-100">
              <div
                className={`inputWrapper ${
                  currentLanguageId === "274c0b77-90cf-4ee3-976e-01e409413057"
                    ? ""
                    : "rtl"
                }`}
              >
                <input
                  type="search"
                  value={searchWord}
                  onChange={SearchFun}
                  className={searshResult ? "selectInput" : undefined}
                />
                <img
                  src={SearchShayyek}
                  alt="SearchShayyek"
                  className="searchIcon"
                />
                {searshResult && (
                  <div className="searchResult">
                    {emptyState ? (
                      <>
                        <div className="d-flex">
                          <div>
                            <img src={emptyIcon} alt="emptyIcon" />
                          </div>
                          <div className="empty-text mx-4">
                            <p className="f-17 fw-bold">
                              {currentLocal.home.noResultFound}
                            </p>
                            <p className="f-17">
                              {currentLocal.home.tryAnotherKeyword}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {searchList &&
                          searchList.map((search) => {
                            return (
                              <div
                                key={search.id}
                                className="searchResultBox mb-3"
                              >
                                <div className="d-flex">
                                  <div
                                    className={`companyInfo ${
                                      currentLanguageId ===
                                      "274c0b77-90cf-4ee3-976e-01e409413057"
                                        ? "mr-4"
                                        : "ml-4"
                                    }`}
                                  >
                                    <img
                                      src={logo}
                                      alt={logo}
                                      className="rounded-circle"
                                    />
                                  </div>
                                  <div className="d-flex justify-content-between align-items-center flex-1 item">
                                    <div className="searchName">
                                      {search.name}
                                    </div>
                                    <StarsRating
                                      count={5}
                                      value={search.rate}
                                      size={24}
                                      color2={"#ffd700"}
                                      edit={false}
                                      className="stars"
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Row>
          <Row className="liveBoxContainer">
            <Col md={6} xs={12}>
              <Row>
                <Col md={6} xs={12}>
                  <div
                    className={
                      currentLocal.language === "العربيه"
                        ? "btnArb button"
                        : "button"
                    }
                  >
                    <button className="button-primary f-21  fw-bold">
                      {currentLocal.home.live}
                    </button>
                  </div>
                </Col>
                <Col md={6} xs={12}>
                  <div className="lastUpdatStock">
                    <p className="text-white f-14">
                      {currentLocal.home.Updated}

                      <span> {currentLocal.home.today} </span>
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
