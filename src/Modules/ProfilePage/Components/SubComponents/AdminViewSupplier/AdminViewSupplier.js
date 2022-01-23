import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userDetailsForAdminActions } from "../../../network";
import Navbar from "../../../../Common/Navbar/Navbar";
import Footer from "../../../../Common/Footer/Footer";
import BusinessCard from "../BusinessCard/BusinessCard";
import PersonalInfo from "./../Personalnfo/Personalnfo";
import { authorType } from "./../../../../../helpers/authType";
const AdminAcceptSupplier = (props) => {
  const [profileDetails, setProfileDetails] = useState(null);
  const { currentLanguageId } = useSelector((state) => state.currentLocal);
  const {
    authorization: { userTypeId, accountTypeId, roleId },
  } = useSelector((state) => state.authorization);
  const { employeeId, isActive } = props.location.state;
  const userType = authorType(accountTypeId, userTypeId, roleId);

  useEffect(() => {
    userDetailsForAdminActions(
      { languageId: currentLanguageId, userId: employeeId },
      (success) => {
        if (success.success) {
          setProfileDetails({ ...success.data, userId: employeeId, isActive });
        }
      },
      (fail) => {
        console.log(fail);
      }
    );
  }, [currentLanguageId, employeeId, isActive]);

  return (
    <section>
      <Navbar />
      <div className="pps ppe">
        {profileDetails && (
          <>
            <PersonalInfo
              profileDetails={profileDetails}
              adminView={true}
              parent={userType}
            />
            <BusinessCard profileDetails={profileDetails} adminView={true} />
          </>
        )}
      </div>
      <Footer />
    </section>
  );
};

export default AdminAcceptSupplier;
