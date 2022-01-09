import { useSelect } from "react-select-search";
// style
import "./PreviousWorks.css";
const PreviousWorks = () => {
  const { currentLocal } = useSelect((state) => state.currentLocal);
  return (
    <div className="sideBar__profile">
      <header>
        <img src="" alt="" />
        <h2>{}</h2>
      </header>
    </div>
  );
};

export default PreviousWorks;
