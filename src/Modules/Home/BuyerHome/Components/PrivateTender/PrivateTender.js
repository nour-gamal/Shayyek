import { useEffect, useState } from "react";
import { Checkbox, Input, Select } from "antd";
import { useSelector } from "react-redux";
import { GetFavVendor } from "../../../network";
import PlusCircle from "../../../../../Resources/Assets/plusCircle.svg";
import CloseIcon from "../../../../../Resources/Assets/whiteCross.svg";
import "./PrivateTender.css";
function PrivateTender() {
	const [email, updateEmail] = useState("");
	const [emailList, updateEmailList] = useState([]);
	const [favVendorsList, updateFavVendorsList] = useState([]);
	// eslint-disable-next-line
	const [favVendor, updateFavVendor] = useState("");
	const [inviteByWhatsapp, updateInviteByWhatsapp] = useState(false);
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
	const removeEmail = (emailIndex) => {
		let Emails = [...emailList];
		Emails.splice(emailIndex, 1);
		updateEmailList(Emails);
	};
	return (
		<div className="privateTender">
			<div className="d-flex justify-content-between privateTender-container">
				<div className="d-flex inviteByEmailContainer ">
					<label className="f-14 fw-500 d-flex align-items-start f-14 my-2">
						<span className="label">
							{currentLocal.buyerHome.inviteByEmail}
						</span>
					</label>
					<form
						className="mx-2"
						onSubmit={(e) => {
							e.preventDefault();
							handleAddNewEmails(email);
						}}
					>
						<Input
							type="email"
							placeholder={currentLocal.buyerHome.enterEmail}
							value={email}
							onChange={(e) => {
								updateEmail(e.target.value);
							}}
							style={{ width: "240px", maxWidth: "66%" }}
							required
						/>
						<button
							type={"submit"}
							className="my-2 cursorPointer addMailSumbitBtn"
						>
							<img src={PlusCircle} alt="PlusCircle" />
							<span className="mx-2">{currentLocal.buyerHome.addNewEmail}</span>
						</button>
						<div
							className="capsulesContainer"
							style={{ width: "300px", maxWidth: "66%" }}
						>
							{emailList.map((email, emailIndex) => (
								<span
									key={emailIndex}
									className="orangeCapsule m-2 d-flex justify-content-between align-items-center"
								>
									<span> {email}</span>
									<img
										src={CloseIcon}
										alt="CloseIcon"
										className="mx-2 cursorPointer"
										onClick={() => {
											removeEmail(emailIndex);
										}}
									/>
								</span>
							))}
						</div>
					</form>
				</div>
				<span className="f-18 fw-500  orTitle mx-2">
					{currentLocal.buyerHome.or}
				</span>
				<div className="d-flex selectFavVendorsContainer">
					<label className="f-14 fw-500 d-flex align-items-start mx-2 f-14 my-2">
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
			<span className="f-18 fw-500 mx-4 ">{currentLocal.buyerHome.or}</span>
			<Checkbox
				className="m-4"
				onChange={() => {
					updateInviteByWhatsapp(!inviteByWhatsapp);
				}}
			>
				{currentLocal.buyerHome.inviteByWhatsapp}
				<div className="f-12 inviteByWhatsappNote">
					*{currentLocal.buyerHome.inviteByWhatsappNote}
				</div>
			</Checkbox>
		</div>
	);
}

export default PrivateTender;
