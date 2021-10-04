import React from "react";
import { Table, Dropdown, Menu } from "antd";
import acceptOffer from "../../../../Resources/Assets/Group 1447.svg";
import deletee from "../../../../Resources/Assets/Group 1460.svg";
import chat from "../../../../Resources/Assets/Group 1597.svg";
import star from "../../../../Resources/Assets/star (1).svg";
import "./OfferTable.css";
function OfferTable() {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <img src={acceptOffer} alt="acceptOffer" />
        Accept Offer
      </Menu.Item>
      <Menu.Item key="1">
        <img src={chat} alt="chat" />
        Start Conversation
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <img src={deletee} alt="deletee" />
        Delete
      </Menu.Item>
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

      rating: (
        <span>
          4.5 <img src={star} alt="star" />
        </span>
      ),
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
      rating: (
        <span>
          4.5 <img src={star} alt="star" />
        </span>
      ),
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
      title: "Name",
      dataIndex: "name",
      key: "name",
	  className:"bordercol bottomBorderCol"
    },

    {
      title: "company",
      dataIndex: "company",
      key: "company",
	  className:"bordercol bottomBorderCol"

    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
	  className:"bordercol bottomBorderCol"

    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
	  className:"bordercol bottomBorderCol"

    },
    {
      title: "Payment Conditions",
      dataIndex: "PaymentConditions",
      key: "PaymentConditions",
	  className:"bordercol bottomBorderCol"

    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
	  className:"bordercol bottomBorderCol"

    },
    {
      title: "Volume of Work from Shayeek",
      dataIndex: "volumeWork",
      key: "volumeWork",
	  className:"bordercol bottomBorderCol"

    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
	  className:"bordercol bottomBorderCol"

    },
    {
      title: "Action List",
      dataIndex: "v",
      key: "v",
	  className:"bottomBorderCol"
    },
  ];

  return (
    <div className="OfferTable">
      <Table
        className="table-striped-rows"
        dataSource={dataSource}
        columns={columns}
      />
      ;
    </div>
  );
}

export default OfferTable;
