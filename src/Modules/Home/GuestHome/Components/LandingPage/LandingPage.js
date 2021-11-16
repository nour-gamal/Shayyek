import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import Navbar from "../../../../Common/Navbar/Navbar";
import { searchCompany } from "../../../network";
import { Rate } from 'rsuite';
import SearchShayyek from "../../../../../Resources/Assets/Search Shayyek.svg";
import "./LandingPage.css";
function LandingPage() {
  const [searchWord, setSearchWord] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [searshResult, setSearshResult] = useState(false);
  const { currentLanguageId } = useSelector((state) => state.currentLocal);

  const SearchFun = (e) => {
    setSearchWord(e.target.value);
    searchCompany(
      currentLanguageId,
      searchWord,
      (success) => {
        setSearshResult(true);
        console.log(success.data);
        setSearchList(success.data);
      },
      (fail) => {},
      false
    );
  };

  useEffect(() => {
    localStorage.setItem("landingPage", LandingPage);
  }, []);

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
            <div className="search w-100">
              <div className="">
                <input type="search" value={searchWord} onChange={SearchFun} />
              </div>
              <img
                src={SearchShayyek}
                alt="SearchShayyek"
                className="SearchShayyek"
              />
              {searshResult && (
                <div className="searchResult">
                  {searchList.map((search) => {
                    console.log(search);
                    return (
                      <div style={{ background: "red" }} key={search.id}>
                        <Row>
                          <Col md={8} xs={8}>
                            <p className="mx-3"> {search.name}</p>
                          </Col>
                          <Col md={4} xs={4}>
                          <Rate readOnly defaultValue={2.5} allowHalf />                          </Col>
                        </Row>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
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
