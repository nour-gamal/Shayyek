import React, { useState, useEffect, useRef } from "react";
import { Checkbox } from "antd";
import { Range } from "rc-slider";
import { useSelector } from "react-redux";
import "rc-slider/assets/index.css";
import "./Filter.css";
function Filter() {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const firstUpdate = useRef(true);
	const [minValue, setMinValue] = useState(20);
	const [maxValue, setMaxValue] = useState(60);
	const [qualityFilter, setQualityFilter] = useState([]);
	const [timeFilter, setTimeFilter] = useState([]);
	const QualityOptions = [
		{ label: "Quality 1", value: "QualityLabel1" },
		{ label: "Quality 2", value: "QualityLabel2" },
		{ label: "Quality 3", value: "QualityLabel3" },
	];
	const timeOptions = [
		{ label: "Time 1", value: "TimeLabel1" },
		{ label: "Time 2", value: "TimeLabel2" },
		{ label: "Time 3", value: "TimeLabel3" },
	];

	const onChange = (checkedValues, type) => {
		switch (type) {
			case "Quality": {
				setQualityFilter(checkedValues);
				break;
			}
			case "Time": {
				setTimeFilter(checkedValues);
				break;
			}
			default: {
				break;
			}
		}
	};

	useEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
			return;
		}

		//Calling filter method
	}, [qualityFilter, timeFilter, minValue, maxValue]);
	return (
		<aside className="suppliersFilter">
			<h5 className="title f-21">
				{currentLocal.suppliers.suppliersFilter.filter}
			</h5>
			<section>
				<h6 className="sideTitle fw-700">
					{currentLocal.suppliers.suppliersFilter.quality}
				</h6>
				<Checkbox.Group
					options={QualityOptions}
					onChange={(checkedValues) => {
						onChange(checkedValues, "Quality");
					}}
				/>
			</section>
			<section>
				<h6 className="sideTitle fw-700">
					{currentLocal.suppliers.suppliersFilter.time}
				</h6>
				<Checkbox.Group
					options={timeOptions}
					onChange={(checkedValues) => {
						onChange(checkedValues, "Time");
					}}
				/>
			</section>
			<section>
				<h6 className="sideTitle fw-700">
					{currentLocal.suppliers.suppliersFilter.price}
				</h6>
				<Range
					defaultValue={[minValue, maxValue]}
					allowCross={false}
					trackStyle={[
						{
							backgroundColor: "#003B6B",
						},
					]}
					onChange={(range) => {
						setMinValue(range[0]);
						setMaxValue(range[1]);
					}}
				/>
				<div className="valuesContainer">
					<div>{currentLocal.language === "English" ? maxValue : minValue}</div>
					<div>{currentLocal.language === "English" ? minValue : maxValue}</div>
				</div>
			</section>
		</aside>
	);
}

export default Filter;
