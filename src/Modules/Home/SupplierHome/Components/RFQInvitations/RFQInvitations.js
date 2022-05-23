import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { assignRfqToSupplierContractor } from "../../../network";
import { deletePackageId } from "../../../../../Redux/packageId";
import { authorType } from "../../../../../helpers/authType";
import RFQIcon from "../../../../../Resources/Assets/research@2x.png";
import RFQInvitation from "../../../../Common/RFQInvitation/RFQInvitation";
import NoRFQs from "../../../../../Resources/Assets/noRFQs.svg";
import "./RFQInvitations.css";

function RFQInvitations({
  invitationCount,
  rfqDetails,
  parent,
  updateRFQsList,
  recallGetRFQ,
}) {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const { packageId } = useSelector((state) => state.packageId);
  const { authorization } = useSelector((state) => state.authorization);
  const dispatch = useDispatch();
  const { push } = useHistory();

  const userType = authorType(
    authorization.accountTypeId,
    authorization.userTypeId,
    authorization.roleId
  );

  useEffect(() => {
    if (packageId) {
      if (userType.includes("buyer") || userType.includes("supplier")) {
        assignRfqToSupplierContractor(
          packageId,
          (success) => {
            if (success.success) {
              push("/");
              dispatch(deletePackageId());
            } else {
              push("/");
              dispatch(deletePackageId());
            }
          },
          (fail) => {}
        );
      } else {
        push("/");
        dispatch(deletePackageId());
      }
    } else {
      push("/");
      dispatch(deletePackageId());
    }
  }, [dispatch, packageId, push]);

  return (
    <div className="RFQInvitations">
      <div className="title section">
        <div className="d-flex flex-1 align-items-center">
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
