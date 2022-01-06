import React, { useState } from "react";
import { Table, Dropdown, Menu } from "antd";
import view from "../../../../../Resources/Assets/View.svg";
import star from "../../../../../Resources/Assets/star (1).svg";
import { useSelector } from "react-redux";
import "./MyOrders.css";
function MyOrders({ buyerOrders }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [currentPage, setCurrentPage] = useState(1);

	const location = "bottomRight";
	const menu = (
		<Menu>
			<Menu.Item
				key="0"
				onClick={() => {
					alert("hi");
				}}
			>
				<img src={view} alt="acceptOffer" />
				<span className="acceptOffer">{currentLocal.profilePage.view}</span>
			</Menu.Item>
			<Menu.Item
				key="1"
				onClick={() => {
					alert("hi 3");
				}}
			>
				<img src={star} alt="deletee" className="mx-1" />
				<span className="mx-1">{currentLocal.profilePage.rateNow}</span>
			</Menu.Item>
		</Menu>
	);

	const columns = [
		{
			title: currentLocal.profilePage.projectName,
			dataIndex: "orderIndex",
			key: "orderIndex",
		},

		{
			title: currentLocal.profilePage.compSuppName,
			dataIndex: "companyName",
			key: "companyName",
		},
		{
			title: currentLocal.profilePage.status,
			dataIndex: "orderDate",
			key: "orderDate",
		},
		{
			title: currentLocal.profilePage.note,
			dataIndex: "orderTotalPrice",
			key: "orderTotalPrice",
		},
		{
			title: currentLocal.profilePage.actionList,
			dataIndex: "list",
			key: "list",
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

	return (
		<div className="myOrders">
			<h6 className="title p-4">{currentLocal.profilePage.myOrders}</h6>

			<Table
				className="table-striped-rows"
				dataSource={buyerOrders}
				columns={columns}
				scroll={{ x: "calc(100wh - 4em)" }}
				pagination={{
					position: [location],
					current: currentPage,
					pageSize: 5,
					hideOnSinglePage: true,
					onChange: (page, pageSize) => {
						setCurrentPage(page);
					},
				}}
			/>
		</div>
	);
}

export default MyOrders;