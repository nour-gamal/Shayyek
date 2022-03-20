import React, { useState } from "react";
import { useSelector } from "react-redux";
import plusCircle from "../../../../../../Resources/Assets/plusCircle.svg";
import "./AddModels.css";
function AddModels({ getModels, onCurrentPageChange, models, lang }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [inputCount, updateInputCount] = useState(
		models.length === 0
			? [
					{ en: "", ar: "" },
					{ en: "", ar: "" },
			  ]
			: models
	);
	const handleAddModels = () => {
		const filteredInputs = inputCount.filter((input) => input.length !== 0);
		getModels(filteredInputs);
		onCurrentPageChange("AddProductDetails");
	};

	return (
		<div className="addModels">
			<div>
				<div className="inputArea">
					{inputCount.map((input, Index) => {
						return (
							<input
								type="text"
								key={Index}
								placeholder={`Models ${Index + 1}`}
								className="form-control"
								value={inputCount[Index][lang]}
								onChange={(e) => {
									let inputData = inputCount;
									inputData[Index][lang] = e.target.value;
									updateInputCount([...inputData]);
								}}
							/>
						);
					})}
				</div>
				<div className="d-flex">
					<img
						className="cursorPointer"
						src={plusCircle}
						alt="plusCircle"
						onClick={() => {
							updateInputCount([...inputCount, { en: "", ar: "" }]);
						}}
					/>
					<div className="mx-2 ">
						{currentLocal.supplierHome.addDifferentModels}
					</div>
				</div>
			</div>
			<div className="d-flex justify-content-center  actionsContainer">
				<button
					className="button-secondary mx-2"
					onClick={() => {
						onCurrentPageChange("AddProductDetails");
					}}
				>
					{currentLocal.supplierHome.cancel}
				</button>
				<button className={"button-primary mx-2"} onClick={handleAddModels}>
					{currentLocal.supplierHome.add}
				</button>
			</div>
		</div>
	);
}

export default AddModels;
