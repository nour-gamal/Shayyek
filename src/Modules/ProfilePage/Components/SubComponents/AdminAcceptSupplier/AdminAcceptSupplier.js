import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userDetailsForAdminActions } from "../../../network";
import Navbar from "../../../../Common/Navbar/Navbar";
import Footer from "../../../../Common/Footer/Footer";
import BusinessCard from "./../BusinessCard/BusinessCard";

const AdminAcceptSupplier = (props) => {
  const [profileDetails, setProfileDetails] = useState(null);
  const { currentLanguageId } = useSelector((state) => state.currentLocal);
  const { employeeId } = props.location.state;
  useEffect(() => {
    userDetailsForAdminActions(
      { languageId: currentLanguageId, userId: employeeId },
      (success) => {
        if (success.success) {
          setProfileDetails(success.data);
        }
      },
      (fail) => {
        console.log(fail);
      }
    );
  }, [currentLanguageId, employeeId]);
  return (
    <section>
      <Navbar />
      <BusinessCard profileDetails={profileDetails} />
      <Footer />
    </section>
  );
};

export default AdminAcceptSupplier;
