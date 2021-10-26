import React, { useState } from "react";
import { Table } from "antd";
import importIcon from "../../../../../Resources/Assets/import.svg";
import addIcon from "../../../../../Resources/Assets/addIcon.svg";
import { useSelector } from "react-redux";
import { ExcelRenderer } from "react-excel-renderer";
import "./CreateRFQ.css";
function CreateRFQ() {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [dataSource, updateDataSource] = useState([]);
	var index = {
		item: null,
		notes: null,
		description: null,
	};
	const addNewItem = () => {
		const key = Math.ceil(Math.random() * 999999999);

		updateDataSource([
			...dataSource,
			{
				key,
			},
		]);
	};

	const fileHandler = (event) => {
		let fileObj = event.target.files[0];

		//just pass the fileObj as parameter
		ExcelRenderer(fileObj, (err, resp) => {
			if (err) {
				console.log(err);
			} else {
				//Loop to indicate the index of each row
				resp.rows[0].forEach((item, itemIndex) => {
					switch (item.toLowerCase()) {
						case "item": {
							index.item = itemIndex;
							break;
						}
						case "notes": {
							index.notes = itemIndex;
							break;
						}
						case "description": {
							index.description = itemIndex;
							break;
						}
						default: {
							break;
						}
					}
				});

				resp.rows[0].forEach((item) => {
					columns.forEach((col) => {
						if (item.toLowerCase() === col.dataIndex) {
							resp.rows.forEach((name, rowIndex) => {
								if (rowIndex !== 0) {
									updateDataSource((oldDataSource) => [
										...oldDataSource,
										{
											key: Math.ceil(Math.random() * 111111111),
											item: name[index.item],
											notes: name[index.notes],
											description: name[index.description],
										},
									]);
								}
							});
						}
					});
				});
			}
		});
	};

	const columns = [
		{
			title: currentLocal.buyerHome.item,
			dataIndex: "item",
			key: "item",
		},
		{
			title: currentLocal.buyerHome.description,
			dataIndex: "description",
			key: "description",
		},
		{
			title: currentLocal.buyerHome.quantity,
			dataIndex: "quantity",
			key: "quantity",
		},
		{
			title: currentLocal.buyerHome.preferredBrands,
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
						<input
							type="file"
							id="actual-btn"
							onChange={fileHandler}
							className="d-none"
						/>

						<label htmlFor="actual-btn">
							<img src={importIcon} alt="importIcon" className="mx-3" />
						</label>
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
			<Table
				columns={columns}
				dataSource={dataSource}
				// loading={true}
				className="my-4"
			/>
		</div>
	);
}

export default CreateRFQ;
