import { useEffect, useState } from "react";
import { Row, Col, Select } from "antd";
import languages from "../../../../../../Resources/Assets/languages.svg";
import add from "../../../../../../Resources/Assets/plusCircle.svg";
import positive from "../../../../../../Resources/Assets/postive.svg";
import negative from "../../../../../../Resources/Assets/negative.svg";
import darkCross from "../../../../../../Resources/Assets/DarkCross.svg";
import AddProductPhoto from "../../../../../../Resources/Assets/AddProductPhoto.svg";
import { GetLanguages } from "../../../../../../Network";
import { addProduct, addProductImg, EditProduct } from "../../../../network";
import { useSelector } from "react-redux";
import "./AddProductDetails.css";
import { baseUrl } from "../../../../../../Services";
function AddProductDetails({
	onCurrentPageChange,
	sizes,
	models,
	getSizes,
	getModels,
	getCurrentLang,
	getData,
	data,
	onCancel,
	isEdit,
}) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [image, setImage] = useState(null);
	const [specs, updateSpecs] = useState({ ar: "", en: "" });
	const [productName, updateProductName] = useState({ ar: "", en: "" });
	const [price, updatePrice] = useState({ ar: "", en: "" });
	const [sizess, updateSizess] = useState(sizes);
	const [modelss, updateModelss] = useState(models);
	const [langList, updateLangList] = useState([]);
	const [langValue, updateLangValue] = useState("");
	const [quantityCount, updateQuantityCount] = useState(0);
	const [errSign, updateErrSign] = useState(false);
	const [validImg, isValidImg] = useState(true);
	const { Option } = Select;
	let langName =
		langValue === "274c0b77-90cf-4ee3-976e-01e409413057" ? "en" : "ar";
	getCurrentLang(langName);

	useEffect(() => {
		if (data && data.specs) updateSpecs(data.specs);
		if (data && data.productName) updateProductName(data.productName);
		if (data && data.price) updatePrice(data.price);
		if (data && data.image) setImage(data.image);
		if (data && data.quantityCount) updateQuantityCount(data.quantityCount);
		if (data && data.sizes) updateSizess(data.sizes);
		if (data && data.models) updateModelss(data.models);
	}, [data]);

	useEffect(() => {
		GetLanguages(
			(success) => {
				updateLangValue(success.data[0].id);
				updateLangList(success.data);
			},
			(fail) => {
				console.log(fail);
			}
		);
	}, []);

	const handleSave = (saveAndAdd) => {
		if (isEdit) {
			if (saveAndAdd) {
				onCancel();
			} else {
				if (price[langName].length === 0 || quantityCount === null) {
					updateErrSign(true);
				} else {
					let finalData = {
						ProductId: data.id,
						Price: price.en,
						LanguageId: "",
						AvailabilityInStock: quantityCount,
					};
					EditProduct(
						finalData,
						(success) => {
							console.log(success);
						},
						(fail) => {
							console.log(fail);
						}
					);
				}
			}
		} else {
			if (
				image === null ||
				specs[langName].length === 0 ||
				productName[langName].length === 0 ||
				price[langName].length === 0 ||
				quantityCount === null
			) {
				updateErrSign(true);
			} else {
				let imageData = new FormData();
				let product = [];
				let sizesList = [];
				let modelsList = [];

				langList.forEach((lang) => {
					product.push({
						LanguageId: lang.id,
						ProductName:
							productName[
								lang.id === "274c0b77-90cf-4ee3-976e-01e409413057" ? "en" : "ar"
							].length > 0
								? productName[
										lang.id === "274c0b77-90cf-4ee3-976e-01e409413057"
											? "en"
											: "ar"
								  ]
								: productName[langName],
						Specs:
							specs[
								lang.id === "274c0b77-90cf-4ee3-976e-01e409413057" ? "en" : "ar"
							].length > 0
								? specs[
										lang.id === "274c0b77-90cf-4ee3-976e-01e409413057"
											? "en"
											: "ar"
								  ]
								: specs[langName],
						Price: parseInt(
							price[
								lang.id === "274c0b77-90cf-4ee3-976e-01e409413057" ? "en" : "ar"
							].length > 0
								? price[
										lang.id === "274c0b77-90cf-4ee3-976e-01e409413057"
											? "en"
											: "ar"
								  ]
								: price[langName]
						),
					});
				});

				sizess.forEach((size, sizeIndex) => {
					sizesList.push({
						sizeLocalizations: [],
					});
					langList.forEach((lang) => {
						sizesList[sizeIndex].sizeLocalizations.push({
							id: lang.id,
							name:
								size[
									lang.id === "274c0b77-90cf-4ee3-976e-01e409413057"
										? "en"
										: "ar"
								].length > 0
									? size[
											lang.id === "274c0b77-90cf-4ee3-976e-01e409413057"
												? "en"
												: "ar"
									  ]
									: size[langName],
						});
					});
				});
				modelss.forEach((model, modelIndex) => {
					modelsList.push({
						modelLocalizations: [],
					});
					langList.forEach((lang) => {
						modelsList[modelIndex].modelLocalizations.push({
							Id: lang.id,
							Name:
								model[
									lang.id === "274c0b77-90cf-4ee3-976e-01e409413057"
										? "en"
										: "ar"
								].length > 0
									? model[
											lang.id === "274c0b77-90cf-4ee3-976e-01e409413057"
												? "en"
												: "ar"
									  ]
									: model[langName],
						});
					});
				});

				imageData.append("Image", image);

				let data = {
					ProductLocalizations: product,
					AvailabilityInStock: quantityCount,
					Models: modelsList,
					Sizes: sizesList,
					ImagePath: "",
				};
				addProductImg(
					imageData,
					(success) => {
						if (success.success) {
							data.ImagePath = success.data;
							addProduct(
								data,
								(success) => {
									if (success.success) {
										if (saveAndAdd) {
											onCurrentPageChange("importOrAdd");
										} else {
											onCurrentPageChange("addProductSuccess");
										}
									}
								},
								(fail) => {
									console.log(fail);
								}
							);
						}
					},
					(fail) => {
						console.log(fail);
					}
				);
			}
		}
	};

	const uploadImgHandler = (event) => {
		if (event.target.files && event.target.files[0]) {
			if (event.target.files[0].type.includes("image")) {
				setImage(event.target.files[0]);
				isValidImg(true);
			} else {
				isValidImg(false);
			}
		}
	};
	const changeLangHandler = (selected) => {
		updateLangValue(selected);
	};

	const handleChangeField = (e) => {
		switch (e.target.id) {
			case "productName": {
				updateProductName({ ...productName, [langName]: e.target.value });
				break;
			}
			case "price": {
				updatePrice({ ...price, [langName]: e.target.value });
				break;
			}
			default: {
				break;
			}
		}
	};

	return (
		<div className="d-flex justify-content-between addProdContainer">
			<div className="d-flex detailsSection mx-5 my-2">
				{langList.length > 0 && (
					<Select
						style={{ width: 160 }}
						defaultValue={langList[0].name}
						onChange={changeLangHandler}
					>
						{langList.map((lang) => (
							<Option key={lang.id}>{lang.name}</Option>
						))}
					</Select>
				)}
				<img src={languages} alt="languages" className="mx-2" />
			</div>
			<Row className="addProductDetails">
				<Col xs={24} md={12}>
					{image ? (
						<img
							src={
								typeof image === "string"
									? baseUrl + image
									: URL.createObjectURL(image)
							}
							alt="uploadedImg"
							className="uploadedImg"
						/>
					) : (
						<div>
							<input
								type="file"
								id="actual-btn"
								onChange={uploadImgHandler}
								className="d-none"
							/>
							{errSign && image === null && validImg && (
								<div className="danger-font">
									* {currentLocal.supplierHome.pleaseAddPhoto}
								</div>
							)}

							{!validImg && (
								<div className="danger-font">
									* {currentLocal.supplierHome.pleaseAddPhoto}
								</div>
							)}

							<label
								htmlFor="actual-btn"
								className="primary-color cursorPointer"
							>
								<img
									src={AddProductPhoto}
									alt="AddProductPhoto"
									className={
										errSign && image === null ? "mx-2 danger-border" : "mx-2"
									}
								/>
							</label>
						</div>
					)}
					<div className="mt-5">
						{errSign && specs[langName].length === 0 && (
							<div className="danger-font">
								* {currentLocal.supplierHome.pleaseAddSpecs}
							</div>
						)}
						<textarea
							disabled={isEdit}
							placeholder={currentLocal.supplierHome.specs}
							value={specs[langName]}
							onChange={(e) => {
								updateSpecs({ ...specs, [langName]: e.target.value });
							}}
							className={
								errSign && specs[langName].length === 0 && "danger-border"
							}
						/>
					</div>
				</Col>
				<Col xs={24} md={12} className="dataSection">
					<div className="mb-2">
						{errSign && productName[langName].length === 0 && (
							<div className="danger-font">
								* {currentLocal.supplierHome.pleaseAddName}
							</div>
						)}
						<input
							disabled={isEdit}
							type="text"
							value={productName[langName]}
							id="productName"
							placeholder={currentLocal.supplierHome.productName}
							onChange={handleChangeField}
							className={
								errSign && productName[langName].length === 0
									? "form-control danger-border"
									: "form-control withBorder"
							}
						/>
					</div>
					<div className="mb-2">
						{errSign && price[langName].length === 0 && (
							<div className="danger-font">
								* {currentLocal.supplierHome.pleaseAddPrice}
							</div>
						)}

						<input
							type="number"
							value={price[langName]}
							id="price"
							className={
								errSign && price[langName].length === 0
									? "form-control danger-border"
									: "form-control withBorder"
							}
							placeholder={currentLocal.supplierHome.price}
							onChange={handleChangeField}
							min={0}
							step={1}
						/>
					</div>
					{!isEdit && (
						<div className="inputField form-control d-flex justify-content-between withBorder mb-2">
							<div className="label">
								{currentLocal.supplierHome.addDifferentSizes}
							</div>
							<img
								src={add}
								alt="add"
								className="cursorPointer"
								onClick={() => {
									getData({ image, productName, specs, price, quantityCount });
									onCurrentPageChange("addSizes");
									getSizes(sizess);
								}}
							/>
						</div>
					)}
					<div>
						{isEdit && sizess.length > 0 && (
							<span> {currentLocal.supplierHome.sizes}</span>
						)}
						{sizess.map((size) => {
							return (
								<span>
									{size[langName].length === 0 ? (
										<></>
									) : (
										<div className="capsules">
											{size[langName]}
											{!isEdit && (
												<img
													src={darkCross}
													className="mx-1 cursorPointer"
													alt="darkCross"
													id={size[langName]}
													onClick={(e) => {
														let filteredSizes = sizess.filter(
															(size) => size[langName] !== e.target.id
														);

														updateSizess(filteredSizes);
													}}
												/>
											)}
										</div>
									)}
								</span>
							);
						})}
					</div>
					{!isEdit && (
						<div className="inputField form-control d-flex justify-content-between withBorder mb-2">
							<div className="label">
								{currentLocal.supplierHome.addDifferentModels}
							</div>
							<img
								src={add}
								alt="add"
								className="cursorPointer"
								onClick={() => {
									if (!isEdit) {
										onCurrentPageChange("addModels");
										getData({
											image,
											productName,
											specs,
											price,
											quantityCount,
										});
										getModels(modelss);
									}
								}}
							/>
						</div>
					)}
					<div>
						{isEdit && modelss.length > 0 && (
							<span>{currentLocal.supplierHome.models}</span>
						)}

						{modelss.map((model) => (
							<span>
								{model[langName].length === 0 ? (
									<></>
								) : (
									<div className="capsules">
										{model[langName]}
										{!isEdit && (
											<img
												src={darkCross}
												className="mx-1 cursorPointer"
												alt="darkCross"
												id={model[langName]}
												onClick={(e) => {
													let filteredModels = modelss.filter(
														(model) => model[langName] !== e.target.id
													);
													updateModelss(filteredModels);
												}}
											/>
										)}
									</div>
								)}
							</span>
						))}
					</div>
					{errSign && quantityCount === null && (
						<div className="danger-font">
							* {currentLocal.supplierHome.pleaseAddQty}
						</div>
					)}
					<div className="d-flex  justify-content-between inputField avQty align-items-center">
						<div className="label">
							{currentLocal.supplierHome.availableQuantity}
						</div>
						<div className="d-flex align-items-center">
							<div>
								<img
									src={negative}
									alt="negative"
									onClick={() => {
										if (quantityCount !== 0) {
											updateQuantityCount(quantityCount - 1);
										}
									}}
									className="cursorPointer"
								/>
							</div>
							<div className="quantityCount mx-2">{quantityCount}</div>
							<div>
								<img
									src={positive}
									alt="positive"
									onClick={() => {
										updateQuantityCount(quantityCount + 1);
									}}
									className="cursorPointer"
								/>
							</div>
						</div>
					</div>
				</Col>
			</Row>
			<div className="d-flex justify-content-center  actionsContainer">
				<button
					className="button-secondary mx-2"
					onClick={() => {
						handleSave(true);
					}}
				>
					{isEdit
						? currentLocal.supplierHome.discardChanges
						: currentLocal.supplierHome.saveAndAdd}
				</button>
				<button
					className={"button-primary mx-2"}
					onClick={() => {
						handleSave(false);
					}}
				>
					{isEdit
						? currentLocal.supplierHome.saveChanges
						: currentLocal.supplierHome.save}
				</button>
			</div>
		</div>
	);
}

export default AddProductDetails;
