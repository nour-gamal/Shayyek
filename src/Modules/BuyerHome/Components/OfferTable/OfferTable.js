import React, { useState } from "react";
import { Table, Dropdown, Menu } from "antd";
import { PDFExport } from "@progress/kendo-react-pdf";
import acceptOffer from "../../../../Resources/Assets/acceptOffer.svg";
import deletee from "../../../../Resources/Assets/deletee.svg";
import chat from "../../../../Resources/Assets/chat.svg";
import star from "../../../../Resources/Assets/star (1).svg";
import download from "../../../../Resources/Assets/direct-download.svg";
import share from "../../../../Resources/Assets/share (5).svg";
import ReactTooltip from 'react-tooltip';
import "./OfferTable.css";
import { useSelector } from "react-redux";
function OfferTable() {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const [currentPage, setCurrentPage] = useState(1);
  
  const shareOffer = () => {
    alert("bye");
  };
  const bottom="bottomRight"
  const menu = (
    <Menu>
      <Menu.Item
        key="0"
        onClick={() => {
          alert("hi");
        }}
      >
        <img src={acceptOffer} alt="acceptOffer" />
        <span className="acceptOffer">
          {currentLocal.offerTable.acceptOffer}
        </span>
      </Menu.Item>
      <Menu.Item
        key="1"
        onClick={() => {
          alert("hi 2");
        }}
      >
        <img src={chat} alt="chat" />
        <span className="chat">{currentLocal.offerTable.startConversation}</span>
      </Menu.Item>
      <Menu.Item
        key="1"
        className={currentLocal.language !== "English" && "delete"}
        onClick={() => {
          alert("hi 3");
        }}
      >
        <img src={deletee} alt="deletee" />
        <span className="delete">{currentLocal.offerTable.delete}</span>
      </Menu.Item>{" "}
    </Menu>
  );

  const dataSource = [
    {
      key: "1",
      name: "employee",
      company: "employee1111111111111111111111 11111111111111111",
      price: "500.00",
      city: "elseikh  zayed",
      PaymentConditions: "50-50%",
      rating: 4,
      volumeWork: "500.00 L.E",
      notes: "loremloremloremlore  mloremloremloremloremlorem",
      list: "hello",
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
    },
    {
      key: "3",
      name: "John",
      company: "employee 3",
      price: "500.00",
      city: "Giza",
      PaymentConditions: "50-50%",
      rating: 4,
      volumeWork: "500.00 L.E",
      notes: "lorem",
    },
    {
      key: "4",
      name: "John",
      company: "employee 4",
      price: "500.00",
      city: "Giza",
      PaymentConditions: "50-50%",
      rating: 4,
      volumeWork: "500.00 L.E",
      notes: "lorem",
    },
    {
      key: "5",
      name: "John",
      company: "employee 5",
      price: "500.00",
      city: "Giza",
      PaymentConditions: "50-50%",
      rating: 4,
      volumeWork: "500.00 L.E",
      notes: "lorem",
    },
    {
      key: "6",
      name: "John",
      company: "employee 6",
      price: "500.00",
      city: "Giza",
      PaymentConditions: "50-50%",
      rating: 4,
      volumeWork: "500.00 L.E",
      notes: "lorem",
    },
    {
      key: "7",
      name: "John",
      company: "employee 7",
      price: "500.00",
      city: "Giza",
      PaymentConditions: "50-50%",
      rating: 4,
      volumeWork: "500.00 L.E",
      notes: "lorem",
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
      render: (company) => {
        return <div className="shortText" data-tip={company}>{company}</div>;
      },
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
      render: (city) => {
        return <div className="shortText" data-tip={city}>{city}</div>;
      },
    },
    {
      title: currentLocal.offerTable.paymentRequired,
      dataIndex: "PaymentConditions",
      key: "PaymentConditions",
      className: "bordercol bottomBorderCol PaymentConditions",
    },
    {
      title: currentLocal.offerTable.rating,
      dataIndex: "rating",
      key: "rating",
      className: "bordercol bottomBorderCol",
      render: (rate) => (
        <div>
         {rate } {" "}<img src={star} alt="star" /> 
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
      render: (notes) => {
        return <div className="shortText" data-tip={notes}>{notes}</div>;
      },
    },
    {
      title: currentLocal.offerTable.actionList,
      dataIndex: "list",
      key: "list",
      className: "bottomBorderCol",
      render: (list, _) => {
        return (
          <Dropdown.Button
            overlay={menu}
            trigger={["click"]}
            onClick={(e) => e.preventDefault()}
          ></Dropdown.Button>
        );
      },
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
            position: [ bottom],
            total: dataSource.length,
            current: currentPage,
            pageSize: 5,
            hideOnSinglePage: true,
            onChange: (page, pageSize) => {
              setCurrentPage(page);
            },
          }}
        />
      </PDFExport>
      <div className="text-center">
      <ReactTooltip />
        <button className="button-primary">
          {currentLocal.offerTable.makeOnlineSession}
        </button>
      </div>
    </div>
  );
}

export default OfferTable;
