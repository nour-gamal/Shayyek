import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../../../Services";
import ProfileDetailsModal from "../ProfileDetailsModal/ProfileDetailsModal";
import { authorType } from "../../../../../helpers/authType";
import "./CompanyCard.css";
function CompanyCard({ companyDetails, sidebar }) {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const {
    authorization,
    authorization: { accountTypeId, userTypeId, roleId },
  } = useSelector((state) => state.authorization);
  const [porfileDetailsModalVisible, setProfileDetailsModalVisible] = useState(
    false
  );
  const userTypeName = authorType(accountTypeId, userTypeId, roleId);

  return (
    <>
      {userTypeName.includes("company_admin") && companyDetails && (
        <div
          className={`companyCard ${
            userTypeName.includes("company_admin") ? "min-height-100" : ""
          } ${sidebar ? "sidebar" : ""}`}
        >
          <div className="d-flex align-items-center justify-content-between companyCard__header">
            <header className="d-flex align-items-center justify-content-start">
              <img
                src={
                  authorization.companyLogo
                    ? baseUrl + authorization.companyLogo
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt="companyProfile"
                className="rounded-circle companyImg"
              />
              <h6 className="companyProfile__header mx-2">
                {companyDetails.name}
              </h6>
              <button
                className="companCard__edit"
                onClick={() => setProfileDetailsModalVisible(true)}
              >
                ...
              </button>
            </header>
            <Link to={`/company/${companyDetails.name}`}>
              <button className="btn companyCard__btn">
                {currentLocal.profilePage.manageyourCompany}
              </button>
            </Link>
          </div>
          <ul className="list-unstyled">
            <li className="item">
              <span className="companyCard__label">
                {currentLocal.profilePage.address}:
              </span>
              <span className="companyCard__val">{companyDetails.address}</span>
            </li>
            <li className="item">
              <span className="companyCard__label">
                {currentLocal.profilePage.governorate}:
              </span>
              <span className="companyCard__val">
                {companyDetails.governorateName}
              </span>
            </li>
            <li className="item">
              <span className="companyCard__label">
                {currentLocal.profilePage.phoneNumber}:
              </span>
              <span className="companyCard__val">
                {companyDetails.phones.map((phone, index) => (
                  <div key={index}>{phone}</div>
                ))}
              </span>
            </li>
            <li className="item">
              <span className="companyCard__label">
                {currentLocal.profilePage.email}:
              </span>
              <span className="companyCard__val">{companyDetails.email}</span>
            </li>
            <li className="item">
              <span className="companyCard__label">
                {currentLocal.profilePage.organizLegalStruc}:
              </span>
              <span className="companyCard__val">
                {companyDetails.typeName}
              </span>
            </li>
            <li className="item">
              <span className="companyCard__label">
                {currentLocal.profilePage.companyWebsite}:
              </span>
              <span className="companyCard__val">{companyDetails.website}</span>
            </li>
            <li className="item">
              <span className="companyCard__label">
                {currentLocal.profilePage.commercialRecord}:
              </span>
              {companyDetails.commercialRecord && (
                <img
                  src={baseUrl + companyDetails.commercialRecord}
                  alt="CommercialRecord"
                />
              )}
            </li>
          </ul>
        </div>
      )}
      {porfileDetailsModalVisible && (
        <ProfileDetailsModal
          isModalVisible={porfileDetailsModalVisible}
          onCancel={() => setProfileDetailsModalVisible(false)}
        />
      )}
    </>
  );
}

export default CompanyCard;
