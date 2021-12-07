import { useState } from "react";
import { Modal } from "antd";
import ImportOrAdd from "./ImportOrAdd/ImportOrAdd";
import AddProductDetails from "./AddProductDetails/AddProductDetails";
import AddProductSuccess from "./AddProductSuccess/AddProductSuccess";
import AddSizes from "./AddSizes/AddSizes";
import closeIcon from "../../../../../Resources/Assets/closeIcon.svg";
function AddProductModal({ isModalVisible, onCancel }) {
	const [currentPage, updateCurrentPage] = useState("AddProductDetails");
	const [sizes, updateSizes] = useState([]);
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
			{currentPage === "importOrAdd" ? (
				<ImportOrAdd
					onCancel={onCancel}
					onCurrentPageChange={(pageName) => {
						updateCurrentPage(pageName);
					}}
				/>
			) : currentPage === "addProductSuccess" ? (
				<AddProductSuccess onCancel={onCancel} />
			) : currentPage === "AddProductDetails" ? (
				<AddProductDetails
					onCurrentPageChange={(pageName) => {
						updateCurrentPage(pageName);
					}}
					getSizes={(sizes) => {
						updateSizes(sizes);
					}}
					sizes={sizes}
				/>
			) : currentPage === "addSizes" ? (
				<AddSizes
					onCurrentPageChange={(pageName) => {
						updateCurrentPage(pageName);
					}}
					getSizes={(sizes) => {
						updateSizes(sizes);
					}}
					sizes={sizes}
				/>
			) : (
				<></>
			)}
		</Modal>
	);
}

export default AddProductModal;
