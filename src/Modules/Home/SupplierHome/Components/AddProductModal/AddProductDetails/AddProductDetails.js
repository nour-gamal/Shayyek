import { useEffect, useState } from "react";
import { Row, Col, Select } from "antd";
import languages from "../../../../../../Resources/Assets/languages.svg";
import add from "../../../../../../Resources/Assets/plusCircle.svg";
import positive from "../../../../../../Resources/Assets/postive.svg";
import negative from "../../../../../../Resources/Assets/negative.svg";
import darkCross from "../../../../../../Resources/Assets/DarkCross.svg";
import AddProductPhoto from "../../../../../../Resources/Assets/AddProductPhoto.svg";
import { GetLanguages } from "../../../../../../Network";
import { useSelector } from "react-redux";
import "./AddProductDetails.css";
function AddProductDetails({
	onCurrentPageChange,
	sizes,
	models,
	getSizes,
	getModels,
	getCurrentLang,
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
	const { Option } = Select;
	let langName =
		langValue === "274c0b77-90cf-4ee3-976e-01e409413057" ? "en" : "ar";
	getCurrentLang(langName);
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

	const uploadImgHandler = (event) => {
		if (event.target.files && event.target.files[0]) {
			setImage(URL.createObjectURL(event.target.files[0]));
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
						<img src={image} alt="uploadedImg" className="uploadedImg" />
					) : (
						<div>
							<input
								type="file"
								id="actual-btn"
								onChange={uploadImgHandler}
								className="d-none"
							/>

							<label
								htmlFor="actual-btn"
								className="primary-color cursorPointer"
							>
								<img
									src={AddProductPhoto}
									alt="AddProductPhoto"
									className="mx-2"
								/>
							</label>
						</div>
					)}
					<textarea
						placeholder={currentLocal.supplierHome.specs}
						value={specs[langName]}
						onChange={(e) => {
							updateSpecs({ ...specs, [langName]: e.target.value });
						}}
					/>
				</Col>
				<Col xs={24} md={12} className="dataSection">
					<input
						type="text"
						value={productName[langName]}
						id="productName"
						placeholder={currentLocal.supplierHome.productName}
						onChange={handleChangeField}
						className="form-control withBorder"
					/>
					<input
						type="number"
						value={price[langName]}
						id="price"
						className="form-control withBorder"
						placeholder={currentLocal.supplierHome.price}
						onChange={handleChangeField}
						min={0}
						step={1}
					/>
					<div className="inputField form-control d-flex justify-content-between withBorder">
						<div>{currentLocal.supplierHome.addDifferentSizes}</div>
						<img
							src={add}
							alt="add"
							className="cursorPointer"
							onClick={() => {
								onCurrentPageChange("addSizes");
								getSizes(sizess);
							}}
						/>
					</div>
					<div>
						{sizess.map((size, sizeIndex) => {
							return (
								<div className="capsules">
									{size[langName]}{" "}
									<img
										src={darkCross}
										className="mx-1 cursorPointer"
										alt="darkCross"
										id={size}
										onClick={(e) => {
											let filteredSizes = sizess.filter(
												(size) => size[langName] !== e.target.id
											);
											updateSizess(filteredSizes);
										}}
									/>
								</div>
							);
						})}
					</div>
					<div className="inputField form-control d-flex justify-content-between withBorder">
						<div>{currentLocal.supplierHome.addDifferentModels}</div>
						<img
							src={add}
							alt="add"
							className="cursorPointer"
							onClick={() => {
								onCurrentPageChange("addModels");
								getModels(modelss);
							}}
						/>
					</div>
					<div>
						{modelss.map((model) => (
							<div className="capsules">
								{model}
								<img
									src={darkCross}
									className="mx-1 cursorPointer"
									alt="darkCross"
									id={model}
									onClick={(e) => {
										let filteredModels = modelss.filter(
											(model) => model !== e.target.id
										);
										updateModelss(filteredModels);
									}}
								/>
							</div>
						))}
					</div>
					<div className="mt-2 d-flex px-2 justify-content-between inputField">
						<div>{currentLocal.supplierHome.availableQuantity}</div>
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
			<div className="d-flex justify-content-center   actionsContainer">
				<button className="button-secondary mx-2">
					{currentLocal.supplierHome.saveAndAdd}
				</button>
				<button className={"button-primary mx-2"}>
					{currentLocal.supplierHome.save}
				</button>
			</div>
		</div>
	);
}

export default AddProductDetails;
