import React, { useEffect, useState } from "react";
import Navbar from "../../Common/Navbar/Navbar";
import Footer from "../../Common/Footer/Footer";
import AddRFQDetails from "./Components/AddRFQDetails/AddRFQDetails";
import RFQTable from "./Components/RFQTable/RFQTable";
import { useSelector } from "react-redux";
import { GetSuppliersAndContratorsThatFilledRFQ } from "../network";
import { useLocation } from "react-router-dom";

function CreateRFQ(props) {
  const [rfqPages, updateRFQPages] = useState("addRFQDetails");
  const { rfqData } = useSelector((state) => state.rfq);
  const rfqId = props.match.params.id;
  const search = useLocation().search;
  const draftedRfqId = new URLSearchParams(search).get('draftedRfqId');
  const firstRedirect = new URLSearchParams(search).get('firstRedirect');
  useEffect(() => {
    if (draftedRfqId) {
      if (firstRedirect) {
        updateRFQPages('addRFQDetails')
      } else {
        updateRFQPages('rfqTable')
      }
    }
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
  }, [firstRedirect, draftedRfqId, rfqId])
  const getRFQPageName = (pageName) => {
    updateRFQPages(pageName);
  };
  useEffect(() => {
    if (rfqData.rfqPages && !draftedRfqId) {
      updateRFQPages(rfqData.rfqPages);
    }
  }, [rfqData.rfqPages, draftedRfqId]);


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
