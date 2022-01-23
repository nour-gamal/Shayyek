import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// components
import { Tree } from "antd";
import ProfileDetailsModal from "../ProfileDetailsModal/ProfileDetailsModal";
// style
import "./BusinessCard.css";

function BusinessCard({ profileDetails, parent, AdminView }) {
  const [workField, updateWorkField] = useState([]);
  const [
    profileDetailsModalVisibility,
    toggleProfileDetailsModalVisibility,
  ] = useState(false);
  const { currentLocal } = useSelector((state) => state.currentLocal);

  useEffect(() => {
    var treeData = [];
    if (profileDetails.categories) {
      profileDetails.categories.forEach((mainCat, mainCatIndex) => {
        treeData.push({
          title: mainCat.mainCategory.name,
          key: mainCat.mainCategory.id,
          children: [],
        });
        mainCat.categories.forEach((cat, catId) => {
          treeData[mainCatIndex].children.push({
            title: cat.category.name,
            key: cat.category.id,
            children: [],
          });
          cat.subCategories.forEach((subCat) => {
            treeData[mainCatIndex].children[catId].children.push({
              title: subCat.name,
              key: subCat.id,
            });
          });
        });
      });
    }

    updateWorkField(treeData);
  }, [profileDetails]);

  return (
    <>
      <div
        className={`businessCard ${parent === "contractorIndividual" &&
          "d-flex flex-1"}`}
      >
        {AdminView && (
          <button
            className="businessCard__edit"
            onClick={() => toggleProfileDetailsModalVisibility(true)}
          >
            ...
          </button>
        )}

        <ul className="list-unstyled f-14">
          <li className="item">
            <span className="businessCard__label">
              {currentLocal.profilePage.name}:
            </span>
            <span className="businessCard__val">{profileDetails.name}</span>
          </li>
          <li className="item">
            <span className="businessCard__label">
              {currentLocal.profilePage.type}:
            </span>
            <span className="businessCard__val">
              {profileDetails.userTypeName}
            </span>
          </li>
          <li className="item">
            <span className="businessCard__label">
              {currentLocal.profilePage.workField}:
            </span>
            <div className="businessCard__val">
              <Tree checkedKeys={"checkable"} treeData={workField} />
            </div>
          </li>
          <li className="item">
            <span className="businessCard__label">
              {currentLocal.profilePage.phoneNumber} :
            </span>
            <span className="businessCard__val">{profileDetails.phone}</span>
          </li>
          <li className="item">
            <span className="businessCard__label">
              {currentLocal.profilePage.email} :
            </span>
            <span className="businessCard__val">{profileDetails.email}</span>
          </li>
        </ul>
      </div>
      {profileDetailsModalVisibility && (
        <ProfileDetailsModal
          onCancel={() => toggleProfileDetailsModalVisibility(false)}
          isModalVisible={profileDetailsModalVisibility}
        />
      )}
    </>
  );
}

export default BusinessCard;
