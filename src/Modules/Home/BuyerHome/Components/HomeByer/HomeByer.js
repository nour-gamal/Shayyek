import React from "react";
import "./HomeByer.css";
function HomeByer() {
  return (
    <div className="homeByer">
      <div className="CompanyContainer">
        <button className="btn btn-danger mt-4">
            {/* <img src={Request_RFQ} alt="Request_RFQ" /> */}
            Add New RFQ</button>
      </div>
      <div className="projectContainer">projectContainer</div>
    </div>
  );
}

export default HomeByer;
