import React, { useState } from "react";
import { Checkbox, Col, Radio, Row } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { changeLocal } from "../../../../Redux/Localization";
import languages from "../../../../Resources/Assets/languages.svg";
import Footer from "../../../Common/Footer/Footer";
import "./RegisterationForm.css";
function RegisterationForm() {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [checked, toggleChecked] = useState(false);
	const [id, setId] = useState("buyer");
	const toggleKind = (e) => {
		e.preventDefault();
		alert(e.target.id);
		setId(e.target.id);
	};

	const dispatch = useDispatch();

	return (
		<section className="Registration">
			<div className="container">
				<Row>
					<Col md={12} xs={24}>
						<div className="f3">
							{currentLocal.registration.createAnAccount}
						</div>
					</Col>
					<Col md={12} xs={24}>
						<div className="dropdownmenu">
							<select name="Kinds" id="Kinds">
								<option value="buyer" id="buyer" onClick={toggleKind}>
									Buyer
								</option>
								<option value="Contractor" id="Contractor" onClick={toggleKind}>
									Contractor
								</option>
							</select>
							<img
								src={languages}
								alt="languages"
								onClick={() => {
									dispatch(
										changeLocal(
											currentLocal.language === "English" ? "ar" : "en"
										)
									);
								}}
								className="languages"
							/>
						</div>
					</Col>
				</Row>
				<Row>
					<Col xs={24}>
						<Radio.Group
						// onChange={onChange} value={value}
						>
							<Radio value={1}> {currentLocal.registration.individual} </Radio>
							<Radio className="lastRadio" value={2}>
								{currentLocal.registration.company}{" "}
							</Radio>
						</Radio.Group>
					</Col>
				</Row>
				{/* <input type="text" className="input-field" />
              <button className="button-primary">Click</button> */}
				<Row>
					<Col md={12} xs={24}>
						<input
							type="text"
							className="input-field"
							placeholder={currentLocal.registration.firstName}
						/>
					</Col>
					<Col md={12} xs={24}>
						<input
							type="text"
							className="input-field "
							placeholder={currentLocal.registration.lastName}
						/>
					</Col>
				</Row>
				<Row>
					<Col md={12} xs={24}>
						<input
							className="input-field"
							placeholder={currentLocal.registration.mobileNumber}
							type="number"
						/>
					</Col>
					<Col md={12} xs={24}>
						<input
							type="email"
							className="input-field"
							placeholder={currentLocal.registration.email}
						/>
					</Col>
				</Row>
				<Row>
					<Checkbox className="Checkbox-field ">
						{currentLocal.registration.whatsAppNumber}
					</Checkbox>
				</Row>
				{/* <Row>
              <Col span={12}><input type="email" className="input-field" placeholder="Email"/></Col>
        <Col span={12}><input className="input-field" placeholder="Company Name"  type="text"/></Col>
        </Row> */}
				{/* <Row>
        <Col span={12}><input className="input-field" placeholder="Password"  type="password"/></Col>
        <Col span={12}><input type="password" className="input-field" placeholder="Confirm Password"/></Col>
        </Row> */}
				{/* <Row>
        <Col span={12}><input className="input-field" placeholder="Work /Field"  type="text"/></Col>
        <Col span={12}><input type="text" className="input-field" placeholder="Description"/></Col>
        </Row> */}
				{/* <Row>
        <Col span={12}><input className="input-field" placeholder="Country"  type="text"/></Col>
        <Col span={12}><input type="text" className="input-field" placeholder="Government"/></Col>
        </Row> */}
				{/* <Row>
        <Col span={12}><input className="input-field" placeholder="Address"  type="text"/></Col>
        <Col span={12}><input type="number" className="input-field" placeholder="Company phone number"/></Col>
        </Row> */}
				{/* <Row>
        <Col span={12}><input className="input-field" placeholder="سجل تجارى ( Optional )"  type="text"/></Col>
        <Col span={12}><input type="email" className="input-field" placeholder="Upload Company logo ( Optional )"/></Col>
        </Row> */}
				{/* <Row>
  <Checkbox lassName="input-field" >Accept Terms of Service and Privacy Policy</Checkbox>	  </Row> */}
				<Row>
					<Col md={12} xs={24}>
						<input
							className="input-field"
							placeholder={currentLocal.registration.password}
							type="password"
						/>
					</Col>
					<Col md={12} xs={24}>
						<input
							type="password"
							className="input-field"
							placeholder={currentLocal.registration.confirmPassword}
						/>
					</Col>
				</Row>
				<Row>
					<Col md={12} xs={24}>
						<input
							className="input-field"
							placeholder={currentLocal.registration.companyName}
							type="text"
						/>
					</Col>
					<Col md={12} xs={24}>
						{/* <input
              type="text"
              className="input-field"
              placeholder={currentLocal.registration.role}
            /> */}
						<select name="Role" id="Role" className="input-field selsect-field">
							<option value="volvo">{currentLocal.registration.buyer}</option>
							<option value="saab">
								{currentLocal.registration.constructor}
							</option>
						</select>
					</Col>
				</Row>
				<Row>
					<Col md={12} xs={24}>
						<input
							className="input-field"
							placeholder={currentLocal.registration.commercialRecord}
							type="text"
						/>
					</Col>
					<Col md={12} xs={24}>
						<input
							type="number"
							className="input-field"
							placeholder={currentLocal.registration.companyPhoneNumber}
						/>
					</Col>
				</Row>
				<Row>
					<Col md={12} xs={24}>
						<Checkbox
							className={checked ? "checked" : "Checkbox-field "}
							onChange={(e) => {
								toggleChecked(e.target.checked);
							}}
						>
							{currentLocal.registration.acceptTermsOfServiceAndPrivacyPolicy}
						</Checkbox>
					</Col>
					<Col md={12} xs={24}>
						<input
							type="text"
							className="input-field"
							placeholder={
								currentLocal.registration.companyWebsite +
								" (" +
								currentLocal.registration.optional +
								")"
							}
						/>
					</Col>
				</Row>
				<div className="button">
					<div>
						<button className="button-primary">
							{currentLocal.registration.register}
						</button>
					</div>
					<div className="checkSignIn">
						{currentLocal.registration.alreadyHaveAnAccount}
						<a href="/"> {currentLocal.registration.signIn}</a>
					</div>
				</div>
			</div>
			<Footer />
		</section>
	);
}

export default RegisterationForm;
