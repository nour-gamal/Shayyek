import React from "react";
import { Table, Dropdown, Menu } from "antd";
import "./OfferTable.css"
function OfferTable() {
	const menu = (
		<Menu>
			<Menu.Item key="0">Accept Offer</Menu.Item>
			<Menu.Item key="1">Start Conversation</Menu.Item>
			<Menu.Divider />
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
			rating: "4.5",
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

<<<<<<< HEAD
  return (
    <div className="OfferTable">
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
=======
	return (
		<div className="OfferTable">
			<Table
				// pagination={{ position: [center,ceter] }}
				dataSource={dataSource}
				columns={columns}
			/>
		</div>
	);
>>>>>>> 6733f605b6d9f742fee135b2e2a7d8df2e811231
}

export default OfferTable;
