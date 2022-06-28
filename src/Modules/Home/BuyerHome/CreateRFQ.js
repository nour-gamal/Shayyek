import React, { useEffect, useState } from "react";
import Navbar from "../../Common/Navbar/Navbar";
import Footer from "../../Common/Footer/Footer";
import AddRFQDetails from "./Components/AddRFQDetails/AddRFQDetails";
import RFQTable from "./Components/RFQTable/RFQTable";
import { useSelector } from "react-redux";
import { GetSuppliersAndContratorsThatFilledRFQ } from "../network";

function CreateRFQ(props) {
  const [rfqPages, updateRFQPages] = useState("addRFQDetails");
  const { rfqData } = useSelector((state) => state.rfq);
  const rfqId = props.match.params.id;
  if (rfqId) {
    let data = {
      rfqId,
    };
    GetSuppliersAndContratorsThatFilledRFQ(
      data,
      (success) => {
        console.log(success.data);
      },
      (fail) => {
        console.log(fail);
      }
    );
  }
  const getRFQPageName = (pageName) => {
    updateRFQPages(pageName);
  };
  useEffect(() => {
    if (rfqData.rfqPages) {
      updateRFQPages(rfqData.rfqPages);
    }
  }, [rfqData.rfqPages]);


  return (
    <section>
      <Navbar />
      {rfqPages === "addRFQDetails" && !rfqId ? (
        <AddRFQDetails getRFQPageName={getRFQPageName} />
      ) : rfqPages === "rfqTable" || rfqId ? (
        <RFQTable getRFQPageName={getRFQPageName} rfqId={rfqId} />
      ) : (
        <></>
      )}
      <Footer />
    </section>
  );
}

export default CreateRFQ;
