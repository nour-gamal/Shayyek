import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import StarsRating from "stars-rating";
import research from "../../../../../Resources/Assets/research@2x.png";
import "./HomeByer.css";
function HomeByer() {
  const companies = [
    {
      img: "",
      companyName: "hhh",
      companyType: "tyyy",
      comanyddress: "fff",
    },
    {
      img: "",
      companyName: "hhh",
      companyType: "tyyy",
      comanyddress: "fff",
    },
    {
      img: "",
      companyName: "hhh",
      companyType: "tyyy",
      comanyddress: "fff",
    },
    {
      img: "",
      companyName: "hhh",
      companyType: "tyyy",
      comanyddress: "fff",
    },
    {
      img: "",
      companyName: "hhh",
      companyType: "tyyy",
      comanyddress: "fff",
    },
    {
      img: "",
      companyName: "hhh",
      companyType: "tyyy",
      comanyddress: "fff",
    },
    {
      img: "",
      companyName: "hhh",
      companyType: "tyyy",
      comanyddress: "fff",
    },
    {
      img: "",
      companyName: "hhh",
      companyType: "tyyy",
      comanyddress: "fff",
    },
    {
      img: "",
      companyName: "hhh",
      companyType: "tyyy",
      comanyddress: "fff",
    },
    {
      img: "",
      companyName: "hhh",
      companyType: "tyyy",
      comanyddress: "fff",
    },
    {
      img: "",
      companyName: "hhh",
      companyType: "tyyy",
      comanyddress: "fff",
    },
    {
      img: "",
      companyName: "hhh",
      companyType: "tyyy",
      comanyddress: "fff",
    },
    {
      img: "",
      companyName: "hhh",
      companyType: "tyyy",
      comanyddress: "fff",
    },
  ];
  return (
    <div className="homeByer">
      <div className="CompanyContainer">
        <Container>
          <button className="btn btn-danger mt-4 mx-4">
            {/* <img src={Request_RFQ} alt="Request_RFQ" /> */}
            Add New RFQ
          </button>

          <h3 className="f-17 mx-4  mt-5 mb-2">Related MarketPlace</h3>
          <div className="company mx-3">
            <Row>
              {companies.map((company, i) => {
                return (
                  <Col md="3" xs="12" key={i}>
                    <div className="companyCard">
                      <div className="logo">
                        <img src={company.img} alt="logo" />
                      </div>
                  
                      <StarsRating
                        count={5}
                        // value={search.rate}
                        size={24}
                        color2={"#ffd700"}
                        edit={false}
                        className="stars"
                      />
                      <h4>{company.companyName}</h4>
                      <h5>{company.companyType}</h5>
                      <h5>{company.comanyddress}</h5>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Container>
      </div>
      <div className="projectContainer">
        <div className="invitations px-3">
          <div className="RFQinvitations">
            <img src={research} alt="research" />
            <p className="ml-2 f-17">RFQ Invitations</p>
          </div>
          <div className="mt-4 number">
            <p className="text-white">5</p>
          </div>
        </div>
        <div className="projects">

          <h5>Projects</h5>
        </div>
      </div>
    </div>
  );
}

export default HomeByer;
