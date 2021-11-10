import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../../../../Common/Navbar/Navbar";
import SearchShayyek from "../../../../../Resources/Assets/Search Shayyek.svg";
import Fuse from "fuse.js";
import "./LandingPage.css";
import SelectSearch from "react-select-search";
function LandingPage() {
  function fuzzySearch(options) {
		const fuse = new Fuse(options, {
			keys: ["name", "groupName", "items.name"],
			threshold: 0.3,
		});

		return (value) => {
			if (!value.length) {
				return options;
			}

			return fuse.search(value);
		};
	}
    const countries = [
      {name: 'Swedish', value: 'sv'},
      {name: 'English', value: 'en'},
  ];
  const [searchWord, setSearchWord] = useState("");
  useEffect(() => {
    localStorage.setItem("landingPage", LandingPage);
  }, []);
  const handleSearch = (e) => {
    console.log(e.target.value);
    setSearchWord(e.target.value);
    console.log(searchWord);
  };
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
              <div className="search">
                <input
                  type="search"
                  className="input-field form-control px-5 py-4"
                  placeholder="Search by Field, Company name"
                  onChange={handleSearch}
                />
                <SelectSearch
                  options={countries}
                  search={true}
                  filterOptions={fuzzySearch}
                  placeholder="Select your country"
                />
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
              {/* <div className="liveBox">
              <div className="button">
                <div className="button-primary f-21  fw-bold"> Live</div>
              </div>
              <div className="lastUpdatStock">
                <p className="text-white f-14">
                  Stock Availability Last Updated
                  <span className="mx-4">{"Today"}</span>
                </p>
              </div>
            </div> */}
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
