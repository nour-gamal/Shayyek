import { useState } from "react";
import { Modal } from "antd";
import ImportOrAdd from "./ImportOrAdd/ImportOrAdd";
import AddProductDetails from "./AddProductDetails/AddProductDetails";
import AddProductSuccess from "./AddProductSuccess/AddProductSuccess";
import AddSizes from "./AddSizes/AddSizes";
import AddModels from "./AddModels/AddModels";
import closeIcon from "../../../../../Resources/Assets/closeIcon.svg";
function AddProductModal({ isModalVisible, onCancel }) {
	const [currentPage, updateCurrentPage] = useState("importOrAdd");
	const [sizes, updateSizes] = useState([]);
	const [models, updateModels] = useState([]);
	const [lang, updateLang] = useState(null);
	const [data, updateData] = useState(null);
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
					getModels={(models) => {
						updateModels(models);
					}}
					getCurrentLang={(lang) => {
						updateLang(lang);
					}}
					getData={(data) => {
						updateData(data);
					}}
					data={data}
					sizes={sizes}
					models={models}
					lang={lang}
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
					lang={lang}
				/>
			) : currentPage === "addModels" ? (
				<AddModels
					onCurrentPageChange={(pageName) => {
						updateCurrentPage(pageName);
					}}
					getModels={(models) => {
						updateModels(models);
					}}
					models={models}
					lang={lang}
				/>
			) : (
				<></>
			)}
		</Modal>
	);
}

export default AddProductModal;
