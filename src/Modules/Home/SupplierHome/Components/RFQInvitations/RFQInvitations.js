import React from "react";
import RFQIcon from "../../../../../Resources/Assets/research@2x.png";
import RFQInvitation from "../../../../Common/RFQInvitation/RFQInvitation";
import NoRFQs from "../../../../../Resources/Assets/noRFQs.svg";
import { useSelector } from "react-redux";
import "./RFQInvitations.css";
function RFQInvitations({
  invitationCount,
  rfqDetails,
  parent,
  updateRFQsList,
  recallGetRFQ,
}) {
  const { currentLocal } = useSelector((state) => state.currentLocal);

  return (
    <div className="RFQInvitations">
      <div className="title section">
        <div className="d-flex">
          <img src={RFQIcon} alt="RFQIcon" className="RFQIcon mx-2" />
          <span>{currentLocal.supplierHome.rfqInvitations}</span>
        </div>
        <div className="invitations_number f-12">{invitationCount}</div>
      </div>
      {rfqDetails.length === 0 ? (
        <div className="text-center my-4">
          <img src={NoRFQs} alt="NoRFQs" />
          <div className="noRFqs">{currentLocal.supplierHome.noRFQs}</div>
        </div>
      ) : (
        rfqDetails.map((details, rfqIndex) => {
          return (
            <div className="section" key={rfqIndex}>
              <RFQInvitation
                revealPrices={details.isBidders}
                parent={parent}
                rfqDetails={details}
                updateRFQsList={updateRFQsList}
                recallGetRFQ={recallGetRFQ}
              />
            </div>
          );
        })
      )}
    </div>
  );
}

export default RFQInvitations;
