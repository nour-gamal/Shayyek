import { useEffect, useState } from "react";
import { Input, Select } from "antd";
import { useSelector } from "react-redux";
import { GetFavVendor } from "../../../network";
import PlusCircle from "../../../../../Resources/Assets/plusCircle.svg";
import "./PublicTender.css";
function PublicTender() {
	const [emailOrWhatsapp, updateEmailOrWhatsapp] = useState("");
	// eslint-disable-next-line
	const [favVendorsList, updateFavVendorsList] = useState([]);
	// eslint-disable-next-line
	const [favVendor, updateFavVendor] = useState("");
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { Option } = Select;
	useEffect(() => {
		GetFavVendor(
			(success) => {
				console.log(success);
			},
			(fail) => {
				console.log(fail);
			}
		);
	}, []);
	return (
		<div className="publicTender d-flex justify-content-between">
			<div className="d-flex  my-4 ">
				<label className="f-14 fw-500 d-flex align-items-start my-2 f-14">
					<span>{currentLocal.buyerHome.inviteByEmailOrWhatsapp}</span>
				</label>
				<span className="mx-2">
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
						<span className="mx-2">{currentLocal.buyerHome.addNewEmail}</span>
					</div>
				</span>
			</div>
			<span className="f-18 fw-500 mt-4 orTitle">
				{currentLocal.buyerHome.or}
			</span>
			<div className="d-flex  my-4 ">
				<label className="f-14 fw-500 d-flex align-items-start m-2 f-14">
					<span>{currentLocal.buyerHome.selectFromVendors}</span>
				</label>

				<Select
					placeholder={currentLocal.buyerHome.selectFromMyFavVendors}
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
