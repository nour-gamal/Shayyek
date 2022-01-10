import { useSelector } from "react-redux";
// style
import "./PreviousWorks.css";

const PreviousWorks = ({ works, companyImage }) => {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  return (
    <div className="sideBar__profile">
      <header>
        <img className="companyLogo" src={companyImage} alt="CompanyImage" />
        <h2>{currentLocal.profilePage.prevWork}</h2>
      </header>
      <ul>
        <li className="item">
          <h2>Buyer Name</h2>
          <p>Desc</p>
        </li>
      </ul>
    </div>
  );
};

export default PreviousWorks;
