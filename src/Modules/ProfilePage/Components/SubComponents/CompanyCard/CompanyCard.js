import React from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../../../Services";
import "./CompanyCard.css";
function CompanyCard({ companyDetails }) {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  return (
    <>
      {companyDetails && (
        <div className="companyCard">
          <div className="d-flex align-items-center">
            <img
              src={
                companyDetails.image
                  ? baseUrl + companyDetails.image
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt="companyProfile"
              className="rounded-circle companyImg"
            />
            <div className="mx-2">{companyDetails.name}</div>
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
                {currentLocal.profilePage.commercialRecord}:{" "}
              </span>
              <img
                src={baseUrl + companyDetails.commercialRecord}
                alt="CommercialRecord"
              />
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default CompanyCard;
