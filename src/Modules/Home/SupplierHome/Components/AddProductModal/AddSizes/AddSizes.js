import React, { useState } from "react";
import { useSelector } from "react-redux";
import plusCircle from "../../../../../../Resources/Assets/plusCircle.svg";
import "./AddSizes.css";
function AddSizes({ getSizes, onCurrentPageChange, sizes }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [inputCount, updateInputCount] = useState(
		sizes.length === 0 ? ["", ""] : sizes
	);
	const handleAddSizes = () => {
		const filteredInputs = inputCount.filter((input) => input.length !== 0);
		getSizes(filteredInputs);
		onCurrentPageChange("AddProductDetails");
	};
	return (
		<div className="addSizes">
			<div>
				<div className="inputArea">
					{inputCount.map((input, Index) => {
						return (
							<input
								type="text"
								key={Index}
								placeholder={`Size ${Index + 1}`}
								className="form-control"
								value={inputCount[Index]}
								onChange={(e) => {
									let inputData = inputCount;
									inputData[Index] = e.target.value;
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
							updateInputCount([...inputCount, ""]);
						}}
					/>
					<div className="mx-2 ">
						{currentLocal.supplierHome.addDifferentSizes}
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
				<button className={"button-primary mx-2"} onClick={handleAddSizes}>
					{currentLocal.supplierHome.add}
				</button>
			</div>
		</div>
	);
}

export default AddSizes;
