import { useEffect, useState } from "react";
import { Row, Col, Select } from "antd";
import languages from "../../../../../../Resources/Assets/languages.svg";
import AddProductPhoto from "../../../../../../Resources/Assets/AddProductPhoto.svg";
import { GetLanguages } from "../../../../../../Network";
import { useSelector } from "react-redux";
import "./AddProductDetails.css";
function AddProductDetails() {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [image, setImage] = useState(null);
	const [specs, updateSpecs] = useState("");
	const [langList, updateLangList] = useState([]);
	const [langValue, updateLangValue] = useState("");
	const [productName, updateProductName] = useState("");
	const [price, updatePrice] = useState(null);
	const { Option } = Select;

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
				updateProductName(e.target.value);
				break;
			}
			case "price": {
				updatePrice(e.target.value);
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
						value={specs}
						onChange={(e) => {
							updateSpecs(e.target.value);
						}}
					/>
				</Col>
				<Col xs={24} md={12} className="dataSection">
					<input
						type="text"
						value={productName}
						id="productName"
						placeholder={currentLocal.supplierHome.productName}
						onChange={handleChangeField}
						className="form-control"
					/>
					<input
						type="number"
						value={price}
						id="price"
						className="form-control"
						placeholder={currentLocal.supplierHome.price}
						onChange={handleChangeField}
						min={0}
						step={1}
					/>
					<div className="inputField">
						{currentLocal.supplierHome.addDifferentSizes}
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
