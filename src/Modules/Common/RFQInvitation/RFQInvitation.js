import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Menu, Dropdown } from "antd";
import eye from "../../../Resources/Assets/eye.svg";
import edit from "../../../Resources/Assets/edit.svg";
import deletee from "../../../Resources/Assets/deletee.svg";
import { Redirect } from "react-router-dom";
import { DeleteRFQ } from "../../../Modules/Home/network";
import SingleRFQModal from "../../ProfilePage/Components/SubComponents/SingleRFQModal/SingleRFQModal";
import moment from "moment";
import { authorType } from "../../../helpers/authType";
import "./RFQInvitation.css";
import { inviteToSpecificRFQ } from "../Network";
import { toast } from "react-toastify";
function RFQInvitation({ revealPrices, rfqDetails, updateRFQsList, parent, vendorId, onCancel }) {
  const { authorization } = useSelector((state) => state.authorization);
  const userType = authorType(
    authorization.accountTypeId,
    authorization.userTypeId,
    authorization.roleId
  );
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const [redirectTo, updateRedirectTo] = useState(null);
  const [isRFQModalVisible, toggleRFQModal] = useState(false);
  const [selectedRfqPackageId, updateSelectedRfqPackageId] = useState(null);
  // const packages = userType.includes('buyer') ? rfqDetails.rfqPackageDetails : rfqDetails.rfqPackageInvitationDetails
  const packages = userType.includes("buyer")
    ? rfqDetails.rfqPackageDetails
      ? rfqDetails.rfqPackageDetails
      : []
    : rfqDetails.rfqPackageInvitationDetails
      ? rfqDetails.rfqPackageInvitationDetails
      : [];
  const handleInvite = () => {
    let data = {
      vendorId,
      rfqHeaderId: rfqDetails.rfqHeaderId
    }
    inviteToSpecificRFQ(data, success => {
      console.log(success)
      onCancel()
    }, fail => {
      toast.error(fail.data.message, {
        position: "bottom-right",
        rtl: true,
      });
    })
  }

  function handleMenuClick(e) {
    switch (e.key) {
      case "1":
        updateRedirectTo("RFQSummary");
        break;
      case "2":
        updateRedirectTo("edit");
        break;
      case "3":
        DeleteRFQ(
          rfqDetails.rfqHeaderId,
          (success) => {
            updateRFQsList();
          },
          (fail) => {
            console.log(fail);
          }
        );
        break;
      default:
        break;
    }
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<img src={eye} alt="eye" />}>
        {currentLocal.buyerHome.viewOffers}
      </Menu.Item>
      <Menu.Item key="2" icon={<img src={edit} alt="eye" />}>
        {currentLocal.buyerHome.edite}
      </Menu.Item>
      <Menu.Item key="3" icon={<img src={deletee} alt="eye" />}>
        {currentLocal.buyerHome.delete}
      </Menu.Item>
    </Menu>
  );


  if (redirectTo === "RFQSummary") {
    return <Redirect to={`/RFQSummary/${rfqDetails.rfqHeaderId}`} />;
  } else if (redirectTo === "edit")
    return <Redirect to={`/createrfq/${rfqDetails.rfqHeaderId}`} />;
  return (
    <div className="rfqInvitation">
      <div>
        <div className="d-flex flex-wrap justify-content-between">
          <div className="projectName f-14 my-1">{rfqDetails.projectName}</div>
          {userType.includes("buyer") && parent !== 'inviteToRFQ' && (
            <div>
              <Dropdown.Button
                overlay={menu}
                trigger={["click"]}
              ></Dropdown.Button>
            </div>
          )}
        </div>

        {packages.map((packageItem) => {
          return (
            <div className="package-container">
              <div className="packageName f-14 fw-500">
                {packageItem.packageName}
              </div>
              <div className="d-flex justify-content-between rfqInvContainer">
                <ul className="list-unstyled">
                  {packageItem.isBidders ? (
                    <div>
                      <li>{currentLocal.supplierHome.noOfQuotations} </li>
                      <li className="primary-color">
                        {packageItem.noOfQuotations}
                      </li>
                    </div>
                  ) : (
                    <div>
                      <li>{currentLocal.supplierHome.address} </li>
                      <li className="primary-color">{packageItem.address}</li>
                    </div>
                  )}
                  <li>{currentLocal.supplierHome.deadline}</li>
                  <li className="primary-color">
                    {moment(packageItem.deadline).format("DD-MM-YYYY")}
                  </li>
                </ul>
                {packageItem.isBidders && (
                  <div className="d-flex priceBox">
                    <div className="mt-2 mx-2">
                      <div className="redball"></div>
                      <div className="greenball"></div>
                    </div>
                    <div>
                      <label>{currentLocal.supplierHome.maxPrice}</label>
                      <div className="primary-color">
                        EGP {packageItem.maxPrice}
                      </div>
                      <label>{currentLocal.supplierHome.minPrice}</label>
                      <div className="primary-color">
                        EGP {packageItem.minPrice}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {userType.includes("supplier") && (
                <div className="text-center my-2">
                  <button
                    className="popup-button-primary"
                    onClick={() => {
                      toggleRFQModal(true);
                      updateSelectedRfqPackageId(packageItem.rfqPackageId);
                    }}
                  >
                    {currentLocal.supplierHome.fillSheet}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* 
      {packages.map((packageItem) => {
        return (
          <div className="package-container">
            <div className="packageName f-14 fw-500">
              {packageItem.packageName}
            </div>
            <div className="d-flex justify-content-between rfqInvContainer">
              <ul className="list-unstyled">
                {packageItem.isBidders || rfqDetails.isBidder ? (
                  <div>
                    <li>{currentLocal.supplierHome.noOfQuotations} </li>
                    <li className="primary-color">
                      {packageItem.noOfQuotations}
                    </li>
                  </div>
                ) : (
                  <div>
                    <li>{currentLocal.supplierHome.address} </li>
                    <li className="primary-color">{packageItem.address}</li>
                  </div>
                )}
                <li>{currentLocal.supplierHome.deadline}</li>
                <li className="primary-color">
                  {moment(packageItem.deadline).format("DD-MM-YYYY")}
                </li>
              </ul>
              {packageItem.isBidders && (
                <div className="d-flex priceBox">
                  <div className="mt-2 mx-2">
                    <div className="redball"></div>
                    <div className="greenball"></div>
                  </div>
                  <div>
                    <label>{currentLocal.supplierHome.maxPrice}</label>
                    <div className="primary-color">
                      EGP {packageItem.maxPrice}
                    </div>
                    <label>{currentLocal.supplierHome.minPrice}</label>
                    <div className="primary-color">
                      EGP {packageItem.minPrice}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {userType.includes("supplier") && (
              <div className="text-center my-2">
                <button
                  className="popup-button-primary"
                  onClick={() => {
                    toggleRFQModal(true);
                    updateSelectedRfqPackageId(packageItem.rfqPackageId);
                  }}
                >
                  {currentLocal.supplierHome.fillSheet}
                </button>
              </div>
            )}
          </div>
        );
      })} */}

      {isRFQModalVisible && (
        <SingleRFQModal
          isModalVisible={isRFQModalVisible}
          onCancel={() => {
            toggleRFQModal(false);
          }}
          rfqPackageId={selectedRfqPackageId}
        />
      )}
      {userType.includes("buyer") &&
        parent === 'inviteToRFQ' &&
        <div className='text-center'>
          <button className='popup-button-primary flat'
            onClick={handleInvite}>
            {currentLocal.buyerHome.invite}
          </button>
        </div>}
    </div>
  );
}


export default RFQInvitation;
