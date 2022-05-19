import React, { useState, createRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Table, Menu, Dropdown, Radio } from "antd";
import { GetImagePath } from "../../../../ProfilePage/network";
import { PDFExport } from "@progress/kendo-react-pdf";
import { useScreenshot } from "use-react-screenshot";
import addIcon from "../../../../../Resources/Assets/plusGray.svg";
import heartIcon from "../../../../../Resources/Assets/heartGray.svg";
import acceptOfferIcon from "../../../../../Resources/Assets/acceptOffer.svg";
import viewIcon from "../../../../../Resources/Assets/View.svg";
import chatIcon from "../../../../../Resources/Assets/chat.svg";
import deleteIcon from "../../../../../Resources/Assets/deletee.svg";

import { baseUrl } from "../../../../../Services";
import actionListIcon from "../../../../../Resources/Assets/actionList.svg";
import "./AllQuotationsRecievedTable.css";

function AllQuotaionsRecievedForRFQ({ dataSourceProp }) {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  // eslint-disable-next-line
  const [loading, updateLoading] = useState(false);
  const [imageURL, updateImageURL] = useState(null);
  const [image, takeScreenshot] = useScreenshot();
  const [hideTable, setHideTable] = useState(false);

  const dataSource = [
    {
      name: "name",
      company: "company",
      price: "price",
      city: "city",
      paymentConditions: "paymentConditions",
      rating: "rating",
      volumeOfWorkFromShyeek: "volumeOfWorkFromShyeek",
      notes: "notes",
      actionList: "actionList",
    },
    {
      name: "name",
      company: "company",
      price: "price",
      city: "city",
      paymentConditions: "paymentConditions",
      rating: "rating",
      volumeOfWorkFromShyeek: "volumeOfWorkFromShyeek",
      notes: "notes",
      actionList: "actionList",
    },
  ];
  const ref = createRef(null);
  const getBlobImg = async (image) => {
    const blob = await fetch(image).then((res) => res.blob());
    // const blobUrl = window.URL.createObjectURL(blob);
    var file = new File([blob], `${new Date().getTime()}.png`);

    const data = new FormData();
    data.append("image", file);

    GetImagePath(
      data,
      (success) => {
        updateImageURL(baseUrl + success.data);
      },
      (fail) => {
        console.log(fail);
      }
    );
  };
  useEffect(() => {
    if (image) {
      getBlobImg(image);
    }
  }, [image]);

  const actionMenu = (
    <Menu>
      <Menu.Item key="4">
        <div className="d-flex">
          <img src={viewIcon} alt="CopyLink" />
          <div className="mx-2">{currentLocal.profilePage.view}</div>
        </div>
      </Menu.Item>
      <Menu.Item key="3">
        <div className="d-flex">
          <img src={heartIcon} alt="heart icon" />
          <div className="mx-2">{currentLocal.profilePage.addToFavVendors}</div>
        </div>
      </Menu.Item>
      <Menu.Item key="4">
        <div className="d-flex">
          <img src={acceptOfferIcon} alt="accept offer" />
          <div className="mx-2">{currentLocal.profilePage.acceptOffer}</div>
        </div>
      </Menu.Item>
      <Menu.Item key="3">
        <div className="d-flex">
          <img src={addIcon} alt="add icon" />
          <div className="mx-2">{currentLocal.profilePage.addToMySummary}</div>
        </div>
      </Menu.Item>
      <Menu.Item key="4">
        <div className="d-flex">
          <img src={chatIcon} alt="conversation icon" />
          <div className="mx-2">
            {currentLocal.offerTable.startConversation}
          </div>
        </div>
      </Menu.Item>
      <Menu.Item key="3">
        <div className="d-flex">
          <img src={deleteIcon} alt="delete icon" />
          <div className="mx-2">{currentLocal.profilePage.addToFavVendors}</div>
        </div>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: currentLocal.suppliers.name,
      dataIndex: "name",
      key: "name",
    },
    {
      title: currentLocal.registration.company,
      dataIndex: "company",
      key: "company",
    },
    {
      title: currentLocal.supplierHome.price,
      dataIndex: "price",
      key: "price",
    },
    {
      title: currentLocal.offerTable.city,
      dataIndex: "city",
      key: "city",
    },
    {
      title: currentLocal.offerTable.paymentConditions,
      dataIndex: "paymentConditions",
      key: "paymentConditions",
    },
    {
      title: currentLocal.offerTable.rating,
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: currentLocal.offerTable.volumeOfWorkFromShyeek,
      dataIndex: "volumeOfWorkFromShyeek",
      key: "volumeOfWorkFromShyeek",
    },
    {
      title: currentLocal.offerTable.notes,
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: currentLocal.profilePage.actionList,
      dataIndex: "actionList",
      key: "actionList",
      render: () => (
        <Dropdown.Button
          overlay={actionMenu}
          trigger={["click"]}
          icon={<img src={actionListIcon} alt="share" onClick={shareOffer} />}
        ></Dropdown.Button>
      ),
    },
  ];

  const getImage = () => takeScreenshot(ref.current);

  const shareOffer = () => {
    getImage();
  };

  const pdfExportComponent = React.useRef(null);

  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };
  function handleHideTable() {
    setHideTable((prevState) => !prevState);
  }
  return (
    <div className="pps ppe summaryTable mb-3" ref={ref}>
      <div className="d-flex justify-content-between align-items-end">
        <div className="title fw-500 mx-3">
          {currentLocal.offerTable.allQuotationsRecivedForThisRFQ}
        </div>
        <button className="hideTableBtn" onClick={handleHideTable}>
          {hideTable ? (
            <>{currentLocal.offerTable.show}</>
          ) : (
            <>{currentLocal.offerTable.hide}</>
          )}
        </button>
      </div>
      <PDFExport
        ref={pdfExportComponent}
        paperSize="auto"
        margin={40}
        fileName={`RFQ ProjectName Response`}
        author="shayyek"
      >
        <Table
          key={dataSource}
          style={{
            display: `${hideTable ? "none" : "block"}`,
          }}
          indentSize={300}
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          className="my-4"
        />
      </PDFExport>
      <div className="text-center">
        <button className="button-primary flat my-2">
          {currentLocal.rfqSummary.covertToReverseAuction}
        </button>
      </div>
    </div>
  );
}

export default AllQuotaionsRecievedForRFQ;
