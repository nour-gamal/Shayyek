import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Navbar from "../../../../Common/Navbar/Navbar";
import "./LandingPage.css";
function LandingPage() {
  const [searchWord, setSearchWord] = useState("");
  useEffect(() => {
    localStorage.setItem("landingPage", LandingPage);
  }, []);
  const handleSearch=(e)=>{
    console.log(e.target.value);
    setSearchWord(e.target.value);
    console.log(searchWord);
  }
  return (
    <div className="landingPage">
      <Navbar />
      <Container>
        <div className="content">
          <div className="companyInfo">
            <div>
              <h2 className="text-white">Shayyek</h2>
              <p className="text-white"> Optimizing Procurement.</p>
            </div>
            <div>
              <h3 className="text-white">Verified, Connected, Streamlined</h3>
              <p className="text-white">Procurement Management.</p>
            </div>
            <div className="search">
              <input
                type="search"
                className="input-field form-control"
                placeholder="Search by Field, Company name"
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="liveBox">
            <div className="button">
              <button className="button-primary  text-bold"> Live</button>
            </div>
            <div className="lastUpdatStock">
              <p className="text-white f-14">
                Stock Availability Last Updated
                <span className="mx-4">{"Today"}</span>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default LandingPage;
