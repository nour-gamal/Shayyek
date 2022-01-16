import { useSelector } from "react-redux";
// style
import "./PreviousWorks.css";

const PreviousWorks = ({
  works,
  companyImage,
  togglePrevWorkModalVisibilty,
  toggleAddModalVisibilty,
  setSelectedPrevWorkId,
}) => {
  const { currentLocal } = useSelector((state) => state.currentLocal);

  function showPrevWorkModal(prevWorkId) {
    setSelectedPrevWorkId(prevWorkId);
    togglePrevWorkModalVisibilty(true);
  }

  return (
    <div className="sideBarProfile">
      <header>
        <img
          className="companyLogo close cursorPointer"
          src={companyImage}
          alt="CompanyImage"
        />
        <h2>{currentLocal.profilePage.prevWork}</h2>
      </header>
      <div className="sideBarProfile__body">
        {works && (
          <ul className="list-unstyled">
            {works.map((item) => (
              <li
                className="item cursorPointer"
                key={item.previousWorkId}
                onClick={() => showPrevWorkModal(item.previousWorkId)}
              >
                <h6>{item.projectName}</h6>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="sideBarProfile__add">
        <button
          className="button-primary"
          onClick={() => toggleAddModalVisibilty(true)}
        >
          {currentLocal.profilePage.addWork}
        </button>
      </div>
    </div>
  );
};

export default PreviousWorks;
