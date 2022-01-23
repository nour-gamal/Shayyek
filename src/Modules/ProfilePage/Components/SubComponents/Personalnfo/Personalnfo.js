import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import { ProgressBar } from "react-bootstrap";
import { withRouter } from "react-router-dom";
// component
import DraftIcon from "../../../../../Resources/Assets/draft.svg";
import { baseUrl } from "../../../../../Services";
import { acceptOrRejectUser } from "../../../network";
import "./Personalnfo.css";

function Personalnfo({ parent, count, profileDetails, adminView, history }) {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const { authorization } = useSelector((state) => state.authorization);
  const [isActive, setIsActive] = useState(profileDetails?.isActive);

  function acceptOrRejectUserAction(isActive) {
    acceptOrRejectUser(
      { isActive, rejectedUserId: profileDetails.userId },
      (success) => {
        if (success.success && success.data) {
          setIsActive(false);
        } else {
          history.goBack();
        }
      }
    );
  }

  return (
    <div className="PersonalInfo">
      {adminView ? (
        <header className="profileHeader">
          <div className="profileHeader__personal">
            <img
              className="user"
              src={
                profileDetails.image
                  ? baseUrl + profileDetails.image
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt="profile"
            />
            <div className="info mx-4">
              <div className="fw-600 info__name">{profileDetails.name}</div>
              <div className="fw-600 info__companyName">
                {profileDetails.companyName}
              </div>

              {
                // if the employee is already accepted and have an rating data
                /* {parent === "buyerAdmin" ? (
                <>
                  <div className="my-1">{authorization.email}</div>
                  <div className="my-1 mobile">{authorization.mobile}</div>
                </>
              ) : (
                <>
                  <ReactStars
                    edit={false}
                    count={5}
                    value={3}
                    size={24}
                    activeColor="#ffd700"
                    classNames={
                      currentLocal.language === "English"
                        ? "ltrStars"
                        : "rtlStars"
                    }
                  />

                  <span className="progressContainer">
                    <ProgressBar now={30} />
                    <span className="f-14">
                      {currentLocal.profilePage.completedPercentage}
                    </span>
                  </span>
                  <div className="f-10">
                    {currentLocal.profilePage.addMoreWork}
                  </div>
                </>
              )} */
              }
            </div>
          </div>
          <div className="profileHeader__info">
            {parent.includes("company_admin") && !isActive && (
              <div
                className={
                  currentLocal.language === "English"
                    ? "actions left"
                    : "actions right"
                }
              >
                <button
                  className="popup-button-secondary mx-2"
                  onClick={() => acceptOrRejectUserAction(false)}
                >
                  {currentLocal.profilePage.reject}
                </button>
                <button
                  className="popup-button-primary mx-2"
                  onClick={() => acceptOrRejectUserAction(true)}
                >
                  {currentLocal.profilePage.accept}
                </button>
              </div>
            )}
          </div>
        </header>
      ) : (
        <header className="profileHeader">
          <div className="profileHeader__personal">
            <img
              className="user"
              src={
                authorization.profileImage
                  ? baseUrl + authorization.profileImage
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt="profile"
            />
            <div className="info mx-4">
              <div className="fw-600">{authorization.fullName}</div>
              {parent === "buyerAdmin" ? (
                <>
                  <div className="my-1">{authorization.email}</div>
                  <div className="my-1 mobile">{authorization.mobile}</div>
                </>
              ) : (
                <>
                  <ReactStars
                    edit={false}
                    count={5}
                    value={3}
                    size={24}
                    activeColor="#ffd700"
                    classNames={
                      currentLocal.language === "English"
                        ? "ltrStars"
                        : "rtlStars"
                    }
                  />
                  <span className="progressContainer">
                    <ProgressBar now={30} />
                    <span className="f-14">
                      {currentLocal.profilePage.completedPercentage}
                    </span>
                  </span>
                  <div className="f-10">
                    {currentLocal.profilePage.addMoreWork}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="profileHeader__info">
            {parent === "buyerAdmin" ? (
              <>
                <button className="orange_btn mx-2">
                  {currentLocal.profilePage.manageCompany}
                </button>
              </>
            ) : parent === "Supplier" ? (
              <>
                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center ">
                    <img className="draftIcon" src={DraftIcon} alt="Draft" />
                    <div className="draft">
                      {currentLocal.profilePage.draft}
                    </div>
                  </div>
                  <div className="num">{count}</div>
                </div>
              </>
            ) : (
              parent.includes("company_admin") && (
                <div
                  className={
                    currentLocal.language === "English"
                      ? "actions left"
                      : "actions right"
                  }
                >
                  <button className="popup-button-secondary mx-2">
                    {currentLocal.profilePage.reject}
                  </button>
                  <button className="popup-button-primary mx-2">
                    {currentLocal.profilePage.accept}
                  </button>
                </div>
              )
            )}
          </div>
        </header>
      )}
    </div>
  );
}

export default withRouter(Personalnfo);
