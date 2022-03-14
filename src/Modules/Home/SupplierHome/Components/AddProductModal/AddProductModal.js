import { useEffect, useState } from "react";
import { Modal } from "antd";
import ImportOrAdd from "./ImportOrAdd/ImportOrAdd";
import AddProductDetails from "./AddProductDetails/AddProductDetails";
import AddProductSuccess from "./AddProductSuccess/AddProductSuccess";
import AddSizes from "./AddSizes/AddSizes";
import AddModels from "./AddModels/AddModels";
import { useSelector } from "react-redux";
import closeIcon from "../../../../../Resources/Assets/closeIcon.svg";
import { GetProductDetails } from "../../../network";
function AddProductModal({
	isModalVisible,
	onCancel,
	IsEditProduct,
	resetIsEditProduct,
}) {
	const [currentPage, updateCurrentPage] = useState(
		IsEditProduct.currentPage ? IsEditProduct.currentPage : "importOrAdd"
	);
	const { currentLanguageId, currentLocal } = useSelector(
		(state) => state.currentLocal
	);
	const [sizes, updateSizes] = useState([]);
	const [models, updateModels] = useState([]);
	const [lang, updateLang] = useState(null);
	const [data, updateData] = useState(null);
	useEffect(() => {
		if (IsEditProduct && IsEditProduct.product) {
			const data = {
				ProductId: IsEditProduct.product.id,
				languageId: currentLanguageId,
			};
			GetProductDetails(
				data,
				(success) => {
					let newData = {
						specs: {
							en: currentLocal.language === "English" ? success.data.specs : "",
							ar: currentLocal.language === "العربيه" ? success.data.specs : "",
						},
						productName: {
							en: currentLocal.language === "English" ? success.data.name : "",
							ar: currentLocal.language === "العربيه" ? success.data.name : "",
						},
						price: {
							en: currentLocal.language === "English" ? success.data.price : "",
							ar: currentLocal.language === "العربيه" ? success.data.price : "",
						},
						image: success.data.image,
						sizes: [],
						models: [],
						ProductId: success.data.id,
					};
					success.data.sizes.forEach((size) => {
						if (currentLocal.language === "English") {
							newData.sizes.push({ en: size.name, ar: "" });
						} else {
							newData.sizes.push({ en: "", ar: size.name });
						}
					});
					success.data.models.forEach((model) => {
						if (currentLocal.language === "English") {
							newData.models.push({ en: model.name, ar: "" });
						} else {
							newData.models.push({ en: "", ar: model.name });
						}
					});

					updateData(newData);
				},
				(fail) => {
					console.log(fail);
				}
			);
		}
	}, [IsEditProduct, currentLanguageId, currentLocal.language]);
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
