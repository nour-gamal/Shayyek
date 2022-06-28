import { useEffect, useState } from "react";
import { Checkbox, Input, Select } from "antd";
import { useSelector } from "react-redux";
import { GetFavVendor } from "../../../network";
import PlusCircle from "../../../../../Resources/Assets/plusCircle.svg";
import CloseIcon from "../../../../../Resources/Assets/whiteCross.svg";
import "./PrivateTender.css";
function PrivateTender({
	getPrivateTenderData,
	privateTenderData,
	isListNotEmpty,
}) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [email, updateEmail] = useState("");
	const [emailList, updateEmailList] = useState([]);
	const [favVendorsList, updateFavVendorsList] = useState([]);
	const [favVendor, updateFavVendor] = useState([]);
	const [inviteByWhatsapp, updateInviteByWhatsapp] = useState(false);
	const [emailInsertIndex, updateEmailInsertIndex] = useState(0);
	const [isValidEmail, updateIsValidEmail] = useState(true)
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
	useEffect(() => {
		if (isListNotEmpty) {
			updateEmailList(
				privateTenderData.invitedEmails ? privateTenderData.invitedEmails : []
			);
			updateInviteByWhatsapp(privateTenderData.inviteByWhatsapp);
			updateFavVendor(privateTenderData.favouriteVendors);
		}
		// eslint-disable-next-line
	}, [isListNotEmpty]);
	useEffect(() => {
		let data = {
			invitedEmails: emailList,
			favouriteVendors: favVendor,
			inviteByWhatsapp,
			isValidEmail
		};
		getPrivateTenderData(data);
		// eslint-disable-next-line
	}, [emailList, favVendor, inviteByWhatsapp]);

	const handleAddNewEmails = (newEmail) => {
		const isValidEmailVar = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
		if (isValidEmailVar) {
			let Emails = [...emailList];
			Emails.push(newEmail);
			let uniqueEmails = [...new Set(Emails)];
			updateEmailList(uniqueEmails);
			updateEmailInsertIndex(emailInsertIndex + 1)
			updateEmail("");
		}
	};
	const handleAddEmailOnType = (email) => {
		let Emails = [...emailList]
		Emails[emailInsertIndex] = email
		const isValidEmailVar = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
		if (isValidEmailVar) {
			updateIsValidEmail(true)
		} else {
			updateIsValidEmail(false)
			if (email.length === 0) {
				updateIsValidEmail(true)
				Emails.splice(Emails.length - 1, 1)
			}
		}
		updateEmailList(Emails);
	}
	const removeEmail = (emailIndex) => {
		let Emails = [...emailList];
		Emails.splice(emailIndex, 1);
		updateEmailList(Emails);
		updateEmailInsertIndex(emailInsertIndex - 1)
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
								handleAddEmailOnType(e.target.value);
							}}
							style={{ width: "240px", maxWidth: "66%" }}
							required
							className={!isValidEmail ? "border-danger" : ""}
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
						defaultValue={favVendor}
						key={favVendor}
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
				defaultChecked={inviteByWhatsapp}
				key={inviteByWhatsapp}
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
