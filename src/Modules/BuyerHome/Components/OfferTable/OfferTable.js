import React from "react";
import { Table, Dropdown, message, Menu } from "antd";

function OfferTable() {
  function handleButtonClick(e) {
    message.info("Click on left button.");
    console.log("click left button", e);
  }
  function handleMenuClick(e) {
    message.info("Click on menu item.");
    console.log("click", e);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Accept Offer </Menu.Item>
      <Menu.Item key="2">Start Conversation </Menu.Item>
      <Menu.Item key="3">Delete</Menu.Item>
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
      rating: "4.5",
      volumeWork: "500.00 L.E",
      notes: "loremloremloremloremloremloremloremloremlorem",
      v: (
        <Dropdown.Button
          onClick={handleButtonClick}
          overlay={menu}
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
      rating: "4.5",
      volumeWork: "500.00 L.E",
      notes: "lorem",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Payment Conditions",
      dataIndex: "PaymentConditions",
      key: "PaymentConditions",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Volume of Work from Shayeek",
      dataIndex: "volumeWork",
      key: "volumeWork",
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: "Action List",
      dataIndex: "v",
      key: "v",
    },
  ];

  //     const offers=[
  //         {

  //         name:"employee1",
  //         company:"employee1",
  //         price:"500.000",
  //         city:"Giza",
  //         paymentConditions:"50-50%",
  //         rating:"4.5",
  //         volumOfWork:"500.00 L.E",
  //         note:"Loremhi",
  //         actionList:""

  //     },
  //         {

  //         name:"employee1",
  //         company:"employee1",
  //         price:"500.000",
  //         city:"Giza",
  //         paymentConditions:"50-50%",
  //         rating:"4.5",
  //         volumOfWork:"500.00 L.E",
  //         note:"Loremhi",
  //         actionList:""

  //     },
  //         {

  //         name:"employee1",
  //         company:"employee1",
  //         price:"500.000",
  //         city:"Giza",
  //         paymentConditions:"50-50%",
  //         rating:"4.5",
  //         volumOfWork:"500.00 L.E",
  //         note:"Loremhi",
  //         actionList:""

  //     },
  //         {

  //         name:"employee1",
  //         company:"employee1",
  //         price:"500.000",
  //         city:"Giza",
  //         paymentConditions:"50-50%",
  //         rating:"4.5",
  //         volumOfWork:"500.00 L.E",
  //         note:"Loremhi",
  //         actionList:""

  //     },
  //         {

  //         name:"employee1",
  //         company:"employee1",
  //         price:"500.000",
  //         city:"Giza",
  //         paymentConditions:"50-50%",
  //         rating:"4.5",
  //         volumOfWork:"500.00 L.E",
  //         note:"Loremhi",
  //         actionList:""

  //     },
  // ]
  return (
    <div className="OfferTable">
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
}

export default OfferTable;
