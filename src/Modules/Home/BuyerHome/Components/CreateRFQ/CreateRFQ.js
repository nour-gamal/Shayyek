import React, { useState } from "react";
import { Table } from "antd";
import importIcon from "../../../../../Resources/Assets/import.svg";
import addIcon from "../../../../../Resources/Assets/addIcon.svg";
import { useSelector } from "react-redux";
import "./CreateRFQ.css";
function CreateRFQ() {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [dataSource, updateDataSource] = useState([]);

	const addNewItem = () => {
		const key = Math.ceil(Math.random() * 999999999);

		updateDataSource([
			...dataSource,
			{
				key,
			},
		]);
	};

	const columns = [
		{
			title: currentLocal.buyerHome.item,
			dataIndex: "item",
			key: "item",
		},
		{
			title: currentLocal.buyerHome.describtion,
			dataIndex: "describtion",
			key: "describtion",
		},
		{
			title: currentLocal.buyerHome.quantity,
			dataIndex: "quantity",
			key: "quantity",
		},
		{
			title: currentLocal.buyerHome.preferedBrands,
			dataIndex: "preferredBrands",
			key: "preferredBrands",
		},
		{
			title: currentLocal.buyerHome.categories,
			dataIndex: "categories",
			key: "categories",
		},
		{
			title: currentLocal.buyerHome.includeInstallation,
			dataIndex: "includeInstallation",
			key: "includeInstallation",
		},
		{
			title: currentLocal.buyerHome.notes,
			dataIndex: "notes",
			key: "notes",
		},
	];

	return (
		<div className="ppl ppr f-14 my-4">
			<div className="actionsContainer">
				<div>
					<div className="mb-3">
						<img src={importIcon} alt="importIcon" className="mx-3" />
						<label>{currentLocal.buyerHome.importExcelFile}</label>
					</div>
					<div className="mb-3">
						<img
							src={addIcon}
							alt="addIcon"
							className="mx-3"
							onClick={addNewItem}
						/>
						<label>{currentLocal.buyerHome.addNewItem}</label>
					</div>
				</div>
				<div className="mb-3">
					<img src={addIcon} alt="addIcon" className="mx-3" />
					<label>{currentLocal.buyerHome.ccCollugues}</label>
				</div>
			</div>
			<Table columns={columns} dataSource={dataSource} className="my-4" />
		</div>
	);
}

export default CreateRFQ;
