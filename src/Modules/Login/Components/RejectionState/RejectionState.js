import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./RejectionState.css";
function RejectionState() {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  return (
    <div className="RejectionState">
      <div className="RejectionStateContainer">
        <p className="f-21">
          Company admin has put this account on hold Alternatively, you can
          register as an individual
        </p>
        <div className="text-center">
            <Link to="/registration">
              <button  className="button-primary text-white f-14">
            {currentLocal.login.registerNow}
            </button>
            </Link>
        </div>
      </div>
    </div>
  );
}

export default RejectionState;
