import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
// components
import { ProgressBar } from "react-bootstrap";
import DraftIcon from "../../../../../Resources/Assets/draft.svg";
// style
import "./Personalnfo.css";

function Personalnfo({ parent, count }) {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const { authorization } = useSelector((state) => state.authorization);
  return (
    <div className="PersonalInfo">
      <header className="profileHeader">
        <div class="profileHeader__personal">
          <img
            className="user"
            src={
              authorization.image
                ? authorization.image
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
                  <img class="draftIcon" src={DraftIcon} alt="Draft" />
                  <div className="draft">{currentLocal.profilePage.draft}</div>
                </div>
                <div className="num">{count}</div>
              </div>
            </>
          ) : (
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
          )}
        </div>
      </header>
    </div>
  );
}

export default Personalnfo;
