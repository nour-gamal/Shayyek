import React from "react";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import plusIcon from "../../../../../../Resources/Assets/add (3).svg";
import importIcon from "../../../../../../Resources/Assets/import.svg";
import { ImportProductsAsExcelSheet } from "../../../../network";
import "./ImportOrAdd.css";
function ImportOrAdd({ onCancel, onCurrentPageChange }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [rows, updateRows] = useState([]);
	const [cols, updateCols] = useState([]);
	const [validation, setValidation] = useState(false);
	const [excelFile, updateExcelFile] = useState(null);
	const fileHandler = (event) => {
		if (
			event.target.files[0] &&
			event.target.files[0].type ===
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
		) {
			setValidation(false);
			let fileObj = event.target.files[0];
			updateExcelFile(event.target.files[0]);
			//just pass the fileObj as parameter
			ExcelRenderer(fileObj, (err, resp) => {
				if (err) {
					console.log(err);
				} else {
					updateRows(resp.rows);
					updateCols(resp.cols);
				}
			});
		} else {
			setValidation(true);
		}
	};
	const handleUploadFile = () => {
		if (excelFile) {
			const productsSheet = new FormData();
			productsSheet.append("productsSheet", excelFile);
			ImportProductsAsExcelSheet(
				productsSheet,
				(success) => {
					if (success.success) {
						updateExcelFile(null);
						updateRows([]);
						updateCols([]);
						//onCancel();
						onCurrentPageChange("addProductSuccess");
					}
				},
				(fail) => {
					console.log(fail);
				}
			);
		}
	};

	return (
		<div className="importOrAdd">
			<div className="d-flex mx-5  toolsSection">
				<div
					onClick={() => {
						onCurrentPageChange("AddProductDetails");
					}}
					className="cursorPointer"
				>
					<img src={plusIcon} alt="Plus" className="mx-2" />
					<span>{currentLocal.supplierHome.addPriceList}</span>
				</div>
				<div className="d-flex align-items-end">
					<input
						type="file"
						id="actual-btn"
						onChange={fileHandler}
						className="d-none"
					/>

					<label htmlFor="actual-btn" className="primary-color cursorPointer">
						<img src={importIcon} alt="importIcon" className="mx-2" />
					</label>
					<label htmlFor="actual-btn" className="cursorPointer">
						{currentLocal.buyerHome.importExcelFile}
					</label>
				</div>
			</div>
			<div className="uploadingArea">
				{validation && (
					<Alert variant={"danger"} className="text-center">
						{currentLocal.supplierHome.pleaseUploadExcel}
					</Alert>
				)}
				<OutTable
					data={rows}
					columns={cols}
					tableClassName="ExcelTable2007"
					tableHeaderRowClass="heading"
				/>
			</div>
			<div className="d-flex justify-content-center  mt-4 actionsContainer">
				<button className="button-secondary mx-2">
					{currentLocal.supplierHome.cancel}
				</button>
				<button
					className={
						excelFile
							? "button-primary mx-2"
							: "button-primary disabledBtn mx-2"
					}
					onClick={handleUploadFile}
				>
					{currentLocal.supplierHome.save}
				</button>
			</div>
		</div>
	);
}

export default ImportOrAdd;
