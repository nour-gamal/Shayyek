import { useEffect, useState } from "react";
import { Modal } from "antd";
import ImportOrAdd from "./ImportOrAdd/ImportOrAdd";
import AddProductDetails from "./AddProductDetails/AddProductDetails";
import AddProductSuccess from "./AddProductSuccess/AddProductSuccess";
import AddSizes from "./AddSizes/AddSizes";
import AddModels from "./AddModels/AddModels";
//import { useSelector } from "react-redux";
import closeIcon from "../../../../../Resources/Assets/closeIcon.svg";
import { GetProductDetailsForEdit } from "../../../network";
function AddProductModal({
	isModalVisible,
	onCancel,
	IsEditProduct,
	resetIsEditProduct,
}) {
	const [currentPage, updateCurrentPage] = useState("importOrAdd");
	// const { currentLanguageId, currentLocal } = useSelector(
	// 	(state) => state.currentLocal
	// );
	const [sizes, updateSizes] = useState([]);
	const [models, updateModels] = useState([]);
	const [lang, updateLang] = useState(null);
	const [data, updateData] = useState(null);

	const getProductsForEdit = () => {
		let data = { productId: IsEditProduct.product.id };
		updateCurrentPage("AddProductDetails");
		GetProductDetailsForEdit(
			data,
			(success) => {
				const {
					imagePath,
					availabilityInStock,
					productLocalizations,
					id,
				} = success.data;

				let data = {
					id,
					image: imagePath,
					quantityCount: availabilityInStock,
					specs: { en: "", ar: "" },
					productName: { en: "", ar: "" },
					price: { en: "", ar: "" },
					models: [],
					sizes: [],
				};
				console.log(success.data);

				success.data.sizes.forEach((size, sizeIndex) => {
					sizes.push({ en: "", ar: "" });
					if (size.languageId === "274c0b77-90cf-4ee3-976e-01e409413057") {
						// data.sizes.p
					}
				});
				productLocalizations.forEach((product) => {
					//English
					if (product.languageId === "274c0b77-90cf-4ee3-976e-01e409413057") {
						data.specs.en = product.specs;
						data.productName.en = product.productName;
						data.price.en = product.price;
					} //Arabic
					else {
						data.specs.ar = product.specs;
						data.productName.ar = product.productName;
						data.price.ar = product.price;
					}
				});
				updateData(data);
			},
			(fail) => {
				console.log(fail);
			}
		);
	};
	useEffect(() => {
		if (Object.keys(IsEditProduct).length) getProductsForEdit();
		// eslint-disable-next-line
	}, [IsEditProduct]);

	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={() => {
				onCancel();
				resetIsEditProduct();
			}}
			className="modal-lg addProductModal"
		>
			<img
				src={closeIcon}
				alt="closeIcon"
				onClick={() => {
					onCancel();
					resetIsEditProduct();
				}}
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
					onCancel={() => {
						onCancel();
						resetIsEditProduct();
					}}
					isEdit={IsEditProduct.status}
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
