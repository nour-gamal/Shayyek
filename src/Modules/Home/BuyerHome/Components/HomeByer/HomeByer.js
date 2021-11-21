import React from "react";
import { Container } from "react-bootstrap";
import research from "../../../../../Resources/Assets/research@2x.png"
import "./HomeByer.css";
function HomeByer() {
  return (
    <div className="homeByer">
      <div className="CompanyContainer">
        <Container>
        <button className="btn btn-danger mt-4 mx-4">
            {/* <img src={Request_RFQ} alt="Request_RFQ" /> */}
            Add New RFQ</button>
            </Container>
      </div>
      <div className="projectContainer">
<div className="invitations px-3">
<div className="RFQinvitations">
<img src={research} alt="research" />
<p className="ml-2">RFQ Invitations</p>
</div>
<div className="mt-4">
  <p>5</p>
</div>
</div>
      </div>
    </div>
  );
}

export default HomeByer;
