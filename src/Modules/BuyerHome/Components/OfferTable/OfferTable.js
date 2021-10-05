import React from "react";
import { Table, Dropdown, Menu } from "antd";
// import { PDFExport } from "@progress/kendo-react-pdf";
import {PDFExport} from "@progress/kendo-react-pdf"
import acceptOffer from "../../../../Resources/Assets/Group 1447.svg";
import deletee from "../../../../Resources/Assets/Group 1460.svg";
import chat from "../../../../Resources/Assets/Group 1597.svg";
import star from "../../../../Resources/Assets/star (1).svg";
import download from "../../../../Resources/Assets/direct-download.svg";
import share from "../../../../Resources/Assets/share (5).svg";
import "./OfferTable.css";
import { useSelector } from "react-redux";
function OfferTable() {
  const { currentLocal } = useSelector((state) => state.currentLocal);

  const shareOffer = () => {
    alert("bye");
  };
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <img src={acceptOffer} alt="acceptOffer" />
        {currentLocal.offerTable.acceptOffer}
      </Menu.Item>
      <Menu.Item key="1">
        <img src={chat} alt="chat" />
        {currentLocal.offerTable.startConversation}
      </Menu.Item>
      <Menu.Item
        key="1"
        className={currentLocal.language !== "English" && "delete"}
      >
        <img src={deletee} alt="deletee" />
        {currentLocal.offerTable.delete}
      </Menu.Item>{" "}
    </Menu>
  );

  const dataSource = [
    {
      key: "1",
      name: "employee",
      company: "employee 1",
      price: "500.00",
      city: "Giza",
      PaymentConditions: "50-50%",

      rating: 4,
      volumeWork: "500.00 L.E",
      notes: "loremloremloremloremloremloremloremloremlorem",
      v: (
        <Dropdown.Button
          overlay={menu}
          trigger={["click"]}
          onClick={(e) => e.preventDefault()}
        ></Dropdown.Button>
      ),
    },
    {
      key: "2",
      name: "John",
      company: "employee 2",
      price: "500.00",
      city: "Giza",
      PaymentConditions: "50-50%",
      rating: 4,
      volumeWork: "500.00 L.E",
      notes: "lorem",
      v: (
        <Dropdown.Button
          overlay={menu}
          trigger={["click"]}
          onClick={(e) => e.preventDefault()}
        ></Dropdown.Button>
      ),
    },
    {
      key: "2",
      name: "John",
      company: "employee 3",
      price: "500.00",
      city: "Giza",
      PaymentConditions: "50-50%",
      rating: 4,
      volumeWork: "500.00 L.E",
      notes: "lorem",
      v: (
        <Dropdown.Button
          overlay={menu}
          trigger={["click"]}
          onClick={(e) => e.preventDefault()}
        ></Dropdown.Button>
      ),
    },
    {
      key: "2",
      name: "John",
      company: "employee 4",
      price: "500.00",
      city: "Giza",
      PaymentConditions: "50-50%",
      rating: 4,
      volumeWork: "500.00 L.E",
      notes: "lorem",
      v: (
        <Dropdown.Button
          overlay={menu}
          trigger={["click"]}
          onClick={(e) => e.preventDefault()}
        ></Dropdown.Button>
      ),
    },
    {
      key: "2",
      name: "John",
      company: "employee 5",
      price: "500.00",
      city: "Giza",
      PaymentConditions: "50-50%",
      rating: 4,
      volumeWork: "500.00 L.E",
      notes: "lorem",
      v: (
        <Dropdown.Button
          overlay={menu}
          trigger={["click"]}
          onClick={(e) => e.preventDefault()}
        ></Dropdown.Button>
      ),
    },
    {
      key: "2",
      name: "John",
      company: "employee 6",
      price: "500.00",
      city: "Giza",
      PaymentConditions: "50-50%",
      rating: 4,
      volumeWork: "500.00 L.E",
      notes: "lorem",
      v: (
        <Dropdown.Button
          overlay={menu}
          trigger={["click"]}
          onClick={(e) => e.preventDefault()}
        ></Dropdown.Button>
      ),
    },
    {
      key: "2",
      name: "John",
      company: "employee 7",
      price: "500.00",
      city: "Giza",
      PaymentConditions: "50-50%",
      rating: 4,
      volumeWork: "500.00 L.E",
      notes: "lorem",
      v: (
        <Dropdown.Button
          overlay={menu}
          trigger={["click"]}
          onClick={(e) => e.preventDefault()}
        ></Dropdown.Button>
      ),
    },
  ];

  const columns = [
    {
      title: currentLocal.offerTable.name,
      dataIndex: "name",
      key: "name",
      className: "bordercol bottomBorderCol",
    },

    {
      title: currentLocal.offerTable.company,
      dataIndex: "company",
      key: "company",
      className: "bordercol bottomBorderCol",
    },
    {
      title: currentLocal.offerTable.price,
      dataIndex: "price",
      key: "price",
      className: "bordercol bottomBorderCol",
    },
    {
      title: currentLocal.offerTable.city,
      dataIndex: "city",
      key: "city",
      className: "bordercol bottomBorderCol",
    },
    {
      title: currentLocal.offerTable.paymentRequired,
      dataIndex: "PaymentConditions",
      key: "PaymentConditions",
      className: "bordercol bottomBorderCol",
    },
    {
      title: currentLocal.offerTable.rating,
      dataIndex: "rating",
      key: "rating",
      className: "bordercol bottomBorderCol",
      render: (rate) => (
        <div>
          <img src={star} alt="star" /> {rate}
        </div>
      ),
    },
    {
      title: currentLocal.offerTable.volumeOfWorkFromShyeek,
      dataIndex: "volumeWork",
      key: "volumeWork",
      className: "bordercol bottomBorderCol",
    },
    {
      title: currentLocal.offerTable.note,
      dataIndex: "notes",
      key: "notes",
      className: "bordercol bottomBorderCol",
    },
    {
      title: currentLocal.offerTable.actionList,
      dataIndex: "v",
      key: "v",
      className: "bottomBorderCol",
    },
  ];
  const pdfExportComponent = React.useRef(null);

  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };
  return (
    <div className="OfferTable ppr ppl">
      <div className="py-4 d-flex justify-content-end mx-4">
        <img
          src={share}
          alt="share"
          className="mx-4 share"
          onClick={shareOffer}
        />

        <img
          src={download}
          alt="download"
          onClick={exportPDFWithComponent}
          className="download"
        />
      </div>
      <PDFExport
        ref={pdfExportComponent}
        paperSize="auto"
        margin={40}
        fileName={`RFQ ProjectName Response`}
        author="shayyek"
      >
        <Table
          className="table-striped-rows"
          dataSource={dataSource}
          columns={columns}
          scroll={{ x: "calc(100wh - 4em)" }}
          pagination={{
            pageSize: 3,
            hideOnSinglePage: true,
          }}
        />
      </PDFExport>
      <div className="text-center">
        <button className="button-primary">
          {currentLocal.offerTable.makeOnlineSession}
        </button>
      </div>
    </div>
  );
}

export default OfferTable;
