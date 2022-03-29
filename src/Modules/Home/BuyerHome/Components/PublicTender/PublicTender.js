import { useEffect, useState } from "react";
import { Input, Select } from "antd";
import { useSelector } from "react-redux";
import { GetFavVendor } from "../../../network";
import PlusCircle from "../../../../../Resources/Assets/plusCircle.svg";
function PublicTender() {
	const [emailOrWhatsapp, updateEmailOrWhatsapp] = useState("");
	// eslint-disable-next-line
	const [favVendorsList, updateFavVendorsList] = useState([]);
	// eslint-disable-next-line
	const [favVendor, updateFavVendor] = useState("");
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { Option } = Select;
	useEffect(() => {
		let data = {};
		GetFavVendor(
			data,
			(success) => {
				console.log(success);
			},
			(fail) => {
				console.log(fail);
			}
		);
	}, []);
	return (
		<div>
			<div className="d-flex  my-4 field-container">
				<label className="f-14 fw-500 d-flex align-items-start mx-2">
					<span>{currentLocal.buyerHome.inviteByEmailOrWhatsapp}</span>
				</label>
				<span>
					<Input
						type="text"
						placeholder={currentLocal.buyerHome.enterEmailOrWhatsapp}
						value={emailOrWhatsapp}
						onChange={(e) => {
							updateEmailOrWhatsapp(e.target.value);
						}}
					/>
					<div className="my-2 cursorPointer">
						<img src={PlusCircle} alt="PlusCircle" />
						<span>{currentLocal.buyerHome.addNewEmail}</span>
					</div>
				</span>

				<span>{currentLocal.buyerHome.or}</span>
				<label className="f-14 fw-500 d-flex align-items-start mx-2">
					<span>{currentLocal.buyerHome.selectFromVendors}</span>
				</label>

				<Select
					placeholder={currentLocal.buyerHome.selectFromMyFavVendors}
					className={"input-field"}
					onChange={(val) => {
						updateFavVendor(val);
					}}
				>
					{favVendorsList.map((vendor) => (
						<Option value={vendor.id} key={vendor.id}>
							{vendor.name}
						</Option>
					))}
				</Select>
			</div>
		</div>
	);
}

export default PublicTender;
