import { useSelector } from "react-redux";
// style
import "./PreviousWorks.css";

const PreviousWorks = ({ works, companyImage }) => {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  function addWork() {
    console.log("add work");
  }
  console.log(works);
  return (
    <div className="sideBar__profile">
      <header>
        <img className="companyLogo" src={companyImage} alt="CompanyImage" />
        <h2>{currentLocal.profilePage.prevWork}</h2>
      </header>
      {works && (
        <ul
          className="list-unstyled"
          style={{
            height: works.length > 4 ? "375px" : "250px",
          }}
        >
          {works.map((item) => (
            <li className="item" key={item.previousWorkId}>
              <h6>{item.projectName}</h6>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      )}
      <div className="text-center my-4">
        <button className="btn sideBar__button" onClick={addWork}>
          {currentLocal.profilePage.addWork}
        </button>
      </div>
    </div>
  );
};

export default PreviousWorks;
