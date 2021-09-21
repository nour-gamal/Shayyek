import React from "react";
import { Checkbox, Col, Radio, Row } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { changeLocal } from "../../../../Redux/Localization";
import languages from "../../../../Resources/Assets/languages.svg";
import "./RegisterationForm.css";

function RegisterationForm() {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const dispatch = useDispatch();
	return (
		<div className="Registration">
			<div className="constainer">
				<div className="content">
					<div className="f3">{currentLocal.registration.createAnAccount}</div>
					<div className="dropdownmenu">
						<select name="Kinds" id="Kinds">
							<option value="volvo">Buyer</option>
							<option value="saab">Contractor</option>
						</select>
						<img
							src={languages}
							alt="languages"
							onClick={() => {
								dispatch(
									changeLocal(currentLocal.language === "English" ? "ar" : "en")
								);
							}}
						/>
					</div>
				</div>
				<Row>
					<Col xs={24}>
						<Radio.Group
						// onChange={onChange} value={value}
						>
							<Radio value={1}>Individual</Radio>
							<Radio className="lastRadio" value={2}>
								Company
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
							placeholder="First Name"
						/>
					</Col>
					<Col md={12} xs={24}>
						<input
							type="text"
							className="input-field "
							placeholder="Last Name"
						/>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<input
							className="input-field"
							placeholder="Mobile Number"
							type="number"
						/>
					</Col>
					<Col span={12}>
						<input type="text" className="input-field" placeholder="Role" />
					</Col>
				</Row>
				<Row>
					<Checkbox className="Checkbox-field ">WhatsApp Number</Checkbox>
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
					<Col span={12}>
						<input
							className="input-field"
							placeholder="Password"
							type="password"
						/>
					</Col>
					<Col span={12}>
						<input type="email" className="input-field" placeholder="Email" />
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<input
							className="input-field"
							placeholder="Company Name"
							type="text"
						/>
					</Col>
					<Col span={12}>
						<input
							type="password"
							className="input-field"
							placeholder="Confirm Password"
						/>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<input
							className="input-field"
							placeholder="سجل تجارى"
							type="text"
						/>
					</Col>
					<Col span={12}>
						<input
							type="password"
							className="input-field"
							placeholder="Company Mobile Number"
						/>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<Checkbox className="Checkbox-field ">
							Accept Terms of Service and Privacy Policy
						</Checkbox>
					</Col>
					<Col span={12}>
						<input
							type="text"
							className="input-field"
							placeholder="Company Webdite (Optional)"
						/>
					</Col>
				</Row>
				<div className="button">
					<div>
						<button className="button-primary">Register</button>
					</div>
					<div className="checkSignIn">
						Already Have An Account?
						<a href="/"> Sign In</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RegisterationForm;
