import { useState } from "react";
import { Modal } from "antd";
import { useSelector } from "react-redux";
import closeIcon from "../../../../../Resources/Assets/closeIcon.svg";
import plusIcon from "../../../../../Resources/Assets/add (3).svg";
import importIcon from "../../../../../Resources/Assets/import.svg";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import "./AddProductModal.css";
function AddProductModal({ isModalVisible, onCancel }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [rows, updateRows] = useState([]);
	const [cols, updateCols] = useState([]);

	const fileHandler = (event) => {
		let fileObj = event.target.files[0];

		//just pass the fileObj as parameter
		ExcelRenderer(fileObj, (err, resp) => {
			if (err) {
				console.log(err);
			} else {
				updateRows(resp.rows);
				updateCols(resp.cols);
			}
		});
	};
	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-lg addProductModal"
		>
			<img
				src={closeIcon}
				alt="closeIcon"
				onClick={onCancel}
				className="close d-block cursorPointer"
			/>
			<div className="d-flex mx-5  toolsSection">
				<div>
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
				<button className="button-primary mx-2">
					{currentLocal.supplierHome.save}
				</button>
			</div>
		</Modal>
	);
}

export default AddProductModal;
