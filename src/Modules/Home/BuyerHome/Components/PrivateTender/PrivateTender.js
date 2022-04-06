import { useEffect, useState } from "react";
import { Input, Select } from "antd";
import { useSelector } from "react-redux";
import { GetFavVendor } from "../../../network";
import PlusCircle from "../../../../../Resources/Assets/plusCircle.svg";
import "./PrivateTender.css";
function PrivateTender() {
	const [email, updateEmail] = useState("");
	const [emailList, updateEmailList] = useState([]);
	const [favVendorsList, updateFavVendorsList] = useState([]);
	// eslint-disable-next-line
	const [favVendor, updateFavVendor] = useState("");
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { Option } = Select;
	useEffect(() => {
		GetFavVendor(
			(success) => {
				updateFavVendorsList(success.data);
			},
			(fail) => {
				console.log(fail);
			}
		);
	}, []);
	const handleAddNewEmails = (newEmail) => {
		let Emails = [...emailList];
		Emails.push(newEmail);
		updateEmailList(Emails);
		updateEmail("");
	};
	return (
		<div className="privateTender d-flex justify-content-between align-items-center">
			<div className="d-flex  my-4 inviteByEmailContainer">
				<label className="f-14 fw-500 d-flex align-items-start my-2 f-14">
					<span>{currentLocal.buyerHome.inviteByEmail}</span>
				</label>
				<div className="mx-2">
					<Input
						type="email"
						placeholder={currentLocal.buyerHome.enterEmail}
						value={email}
						onChange={(e) => {
							updateEmail(e.target.value);
						}}
						style={{ width: "240px" }}
					/>
					<div
						className="my-2 cursorPointer"
						onClick={() => {
							handleAddNewEmails(email);
						}}
					>
						<img src={PlusCircle} alt="PlusCircle" />
						<span className="mx-2">{currentLocal.buyerHome.addNewEmail}</span>
					</div>

					<div className="capsulesContainer">
						{emailList.map((email) => (
							<span className="orangeCapsule">{email}</span>
						))}
					</div>
				</div>
			</div>
			<span className="f-18 fw-500  orTitle mx-2">
				{currentLocal.buyerHome.or}
			</span>
			<div className="d-flex   my-4 align-items-center">
				<label className="f-14 fw-500 d-flex align-items-start mx-2 f-14">
					<span>{currentLocal.buyerHome.selectFromVendors}</span>
				</label>

				<Select
					placeholder={currentLocal.buyerHome.selectFromMyFavVendors}
					onChange={(val) => {
						updateFavVendor(val);
					}}
					mode="multiple"
					allowClear
					style={{ width: "240px" }}
				>
					{favVendorsList.map((vendor) => (
						<Option value={vendor.userId} key={vendor.userId}>
							{vendor.email}
						</Option>
					))}
				</Select>
			</div>
		</div>
	);
}

export default PrivateTender;
