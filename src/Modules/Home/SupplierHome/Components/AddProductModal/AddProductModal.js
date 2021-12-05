import { useState } from "react";
import { Modal } from "antd";
import ImportOrAdd from "./ImportOrAdd/ImportOrAdd";
import closeIcon from "../../../../../Resources/Assets/closeIcon.svg";
import "./AddProductModal.css";
import AddProductSuccess from "./AddProductSuccess/AddProductSuccess";
function AddProductModal({ isModalVisible, onCancel }) {
	const [currentPage, updateCurrentPage] = useState("importOrAdd");
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
			) : (
				<></>
			)}
		</Modal>
	);
}

export default AddProductModal;
