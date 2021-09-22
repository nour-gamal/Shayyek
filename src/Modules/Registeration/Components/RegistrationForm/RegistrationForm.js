import React, { useState } from "react";
import { Form, Checkbox, Col, Radio, Row } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { changeLocal } from "../../../../Redux/Localization";
import languages from "../../../../Resources/Assets/languages.svg";
import "./RegisterationForm.css";
function RegisterationForm() {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const [checked, toggleChecked] = useState(false);
  // const [id, setId] = useState("buyer");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  // const [whatsAppNumber, setWhatsAppNumber] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [commercialRecord, setCommercialRecord] = useState("");
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState("");
//   const [constructor, setConstructor] = useState("");
  const [buyer, setBuyer] = useState("buyer");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyMail, setCompanyMail] = useState("");
  const [jop, setJop] = useState("");
  const toggleKind = (e) => {
    e.preventDefault();

    if (e.target.id === "buyer") {
	  setBuyer(e.target.id)
    } else if (e.target.id === "Contractor") {
		setBuyer(e.target.id)
    }
  };
  const handleChange = (e) => {
    const id = e.target.id;
    if (id === "firstName") {
      setFirstName(e.target.value);
    } else if (id === "lastName") {
      setLastName(e.target.value);
    } else if (id === "mobileNumber") {
      setMobileNumber(e.target.value);
    } else if (id === "email") {
      setEmail(e.target.value);
    }
    // else if (id === "whatsAppNumber") {
    // 	setWhatsAppNumber(e.target.value);
    // }
    else if (id === "password") {
      setPassword(e.target.value);
    } else if (id === "confirmPassword") {
      setConfirmPassword(e.target.value);
    } else if (id === "companyName") {
      setCompanyName(e.target.value);
    } else if (id === "commercialRecord") {
      setCommercialRecord(e.target.value);
    } else if (id === "companyPhoneNumber") {
      setCompanyPhoneNumber(e.target.value);
    
    } else if (id === "companyMail") {
      setCompanyMail(e.target.value);
    } 
	
     else if (id === "jop") {
      setJop(e.target.value);
    } 
	
	// else if (id === "buyer") {
    //   setBuyer(e.target.value);
    // } else if (id === "Constructor") {
    //   setConstructor(e.target.value);
    // } 
	else if (id === "companyWebsite") {
      setCompanyWebsite(e.target.value);
    }
  };

  const dispatch = useDispatch();

  return (
    <section className="Registration">
      <div className="container">
        <Row>
          <Col md={12} xs={24}>
            <div className="f-27">
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
        <Form>
          <Row>
            <Col md={12} xs={24}>
				{buyer==="buyer"&&
              <input
                id="firstName"
                value={firstName}
                type="text"
                className="input-field"
                placeholder={currentLocal.registration.firstName}
                onChange={handleChange}
              />
			}
            </Col>
            <Col md={12} xs={24}>
              <input
                type="text"
                className="input-field "
                placeholder={currentLocal.registration.lastName}
                id="lastName"
                value={lastName}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xs={24}>
              <input
                className="input-field"
                placeholder={currentLocal.registration.mobileNumber}
                type="number"
                id="mobileNumber"
                value={mobileNumber}
                onChange={handleChange}
              />
            </Col>
            <Col md={12} xs={24}>
              <input
                type="email"
                className="input-field"
                placeholder={currentLocal.registration.email}
                id="email"
                value={email}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Checkbox
              className="Checkbox-field "
              // id="whatsAppNumber"
              // value={whatsAppNumber}
              // onChange={handleChange}
            >
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
                id="password"
                value={password}
                onChange={handleChange}
              />
            </Col>
            <Col md={12} xs={24}>
              <input
                type="password"
                className="input-field"
                placeholder={currentLocal.registration.confirmPassword}
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xs={24}>
              <input
                className="input-field"
                placeholder={currentLocal.registration.companyName}
                type="text"
                id="companyName"
                value={companyName}
                onChange={handleChange}
              />
            </Col>
            <Col md={12} xs={24}>
              <select
                name="Role"
                id="Role"
                className="input-field selsect-field"
              >
                <option id="buyer" value={buyer} onChange={handleChange}>
                  {currentLocal.registration.buyer}
                </option>
                <option
                  id="constructor"
                  value={constructor}
                  onChange={handleChange}
                >
                  {currentLocal.registration.constructor}
                </option>
              </select>
            </Col>
          </Row>
		  {buyer==="buyer"&&
		  <Row>
            <Col md={12} xs={24}>
              <input
                className="input-field"
                placeholder={currentLocal.registration.job}
                type="text"
                id="jop"
                value={jop}
                onChange={handleChange}
              />
            </Col>
            <Col md={12} xs={24}>
              <input
                type="email"
                className="input-field"
                placeholder={currentLocal.registration.companyMail}
                id="companyMail"
                value={companyMail}
                onChange={handleChange}
              />
            </Col>
          </Row>
		}
          <Row>
            <Col md={12} xs={24}>
              <input
                className="input-field"
                placeholder={currentLocal.registration.commercialRecord}
                type="text"
                id="commercialRecord"
                value={commercialRecord}
                onChange={handleChange}
              />
            </Col>
            <Col md={12} xs={24}>
              <input
                type="number"
                className="input-field"
                placeholder={currentLocal.registration.companyPhoneNumber}
                id="companyPhoneNumber"
                value={companyPhoneNumber}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xs={24}>
              <Checkbox
                className={checked ? "checked" : "Checkbox-field "}
                id="acceptTerms"
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
                id="companyWebsite"
                value={companyWebsite}
                onChange={handleChange}
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
        </Form>
      </div>
    </section>
  );
}

export default RegisterationForm;
