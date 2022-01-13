import { useSelector } from "react-redux";
// style
import "./PreviousWorks.css";

const PreviousWorks = ({ works, companyImage, toggleAddModalVisibilty }) => {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  return (
    <div className="sideBarProfile">
      <header>
        <img className="companyLogo" src={companyImage} alt="CompanyImage" />
        <h2>{currentLocal.profilePage.prevWork}</h2>
      </header>
      <div className="sideBarProfile__body">
        {works && (
          <ul className="list-unstyled">
            {works.map((item) => (
              <li className="item" key={item.previousWorkId}>
                <h6>{item.projectName}</h6>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="sideBarProfile__add">
        <button
          onClick={() => toggleAddModalVisibilty(true)}
          className="btn sideBar__button"
        >
          {currentLocal.profilePage.addWork}
        </button>
      </div>
    </div>
  );
};

export default PreviousWorks;
