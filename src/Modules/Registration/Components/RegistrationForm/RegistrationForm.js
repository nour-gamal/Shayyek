import React, { useState } from "react";
import { Form, Checkbox, Col, Radio, Row } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { changeLocal } from "../../../../Redux/Localization";
import languages from "../../../../Resources/Assets/languages.svg";
import "./RegistrationForm.css";
function RegisterationForm() {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const [checked, toggleChecked] = useState(false);
  const [checkedWhatsApp, toggleCheckedWhatsApp] = useState(false);
  const [individual, setIndividual] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [admin, setAdmin] = useState("");
  const [employee, setEmployee] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [commercialRecord, setCommercialRecord] = useState("");
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState("");
  const [buyer, setBuyer] = useState("buyer");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyMail, setCompanyMail] = useState("");
  const [jop, setJop] = useState("");
  const [work, setWork] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [government, setGovernment] = useState("");
  const [address, setAddress] = useState("");
  const [uploadCompanyLogo, setUploadCompanyLogo] = useState("");
  const [acceptTerms, setAcceptTerms] = useState("");
  const [whatsNumber, setWhatsNumber] = useState("");

  const toggleKind = (e) => {
    e.preventDefault();

    if (e.target.id === "buyer") {
      setBuyer(e.target.id);
      toggleChecked(false);
      toggleCheckedWhatsApp(false);
    } else if (e.target.id === "Contractor") {
      setBuyer(e.target.id);
      toggleChecked(false);
      toggleCheckedWhatsApp(false);
    }
  };
  const handleChange = (e) => {
    const id = e.target.id;

    switch (id) {
      case "firstName": {
        setFirstName(e.target.value);
        break;
      }
      case "lastName": {
        setLastName(e.target.value);
        break;
      }
      case "mobileNumber": {
        setMobileNumber(e.target.value);
        break;
      }
      case "admin": {
        setAdmin(e.target.value);
        break;
      }
      case "employee": {
        setEmployee(e.target.value);
        break;
      }
      case "email": {
        setEmail(e.target.value);
        break;
      }
      case "password": {
        setPassword(e.target.value);
        break;
      }
      case "confirmPassword": {
        setConfirmPassword(e.target.value);
        break;
      }
      case "companyName": {
        setCompanyName(e.target.value);
        break;
      }
      case "commercialRecord": {
        setCommercialRecord(e.target.value);
        break;
      }
      case "companyPhoneNumber": {
        setCompanyPhoneNumber(e.target.value);
        break;
      }
      case "companyMail": {
        setCompanyMail(e.target.value);
        break;
      }
      case "jop": {
        setJop(e.target.value);
        break;
      }
      case "work": {
        setWork(e.target.value);
        break;
      }
      case "country": {
        setCountry(e.target.value);
        break;
      }
      case "description": {
        setDescription(e.target.value);
        break;
      }
      case "government": {
        setGovernment(e.target.value);
        break;
      }
      case "address": {
        setAddress(e.target.value);
        break;
      }
      case "uploadCompanyLogo": {
        setUploadCompanyLogo(e.target.value);
        break;
      }
      case "companyWebsite": {
        setCompanyWebsite(e.target.value);
        break;
      }
      default: {
        break;
      }
    }

  };
  console.log(individual,whatsNumber,acceptTerms);
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
                  {currentLocal.registration.buyer}
                </option>
                <option value="Contractor" id="Contractor" onClick={toggleKind}>
                  {currentLocal.registration.Contractor}
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
            <Radio.Group>
              <Radio
                value={"456"}
                onChange={(e) => {
                  setIndividual(e.target.value);
                }}
              >
                {currentLocal.registration.individual}
              </Radio>
              <Radio
                className="lastRadio"
                value={"123"}
                onChange={(e) => {
                  setIndividual(e.target.value);
                }}
              >
                {currentLocal.registration.company}{" "}
              </Radio>
            </Radio.Group>
          </Col>
        </Row>
        <Form>
          <Row>
            <Col md={12} xs={24}>
              <input
                id="firstName"
                value={firstName}
                type="text"
                className="input-field"
                placeholder={currentLocal.registration.firstName}
                onChange={handleChange}
              />
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
              id="whatsNumber"
              className={checkedWhatsApp ? "checked" : "Checkbox-field"}
              onChange={(e) => {
                toggleCheckedWhatsApp(e.target.checked);
                setWhatsNumber(e.target.value);
              }}
            >
              {currentLocal.registration.whatsAppNumber}
            </Checkbox>
          </Row>
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
                <option id="admin" value={admin} onChange={handleChange}>
                  {currentLocal.registration.admin}
                </option>
                <option id="employee" value={employee} onChange={handleChange}>
                  {currentLocal.registration.employee}
                </option>
              </select>
            </Col>
          </Row>
          {buyer === "buyer" ? (
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
          ) : (
            <Row>
              <Col md={12} xs={24}>
                <input
                  className="input-field"
                  placeholder={currentLocal.registration.work}
                  type="text"
                  id="work"
                  value={work}
                  onChange={handleChange}
                />
              </Col>
              <Col md={12} xs={24}>
                <input
                  type="email"
                  className="input-field"
                  placeholder={currentLocal.registration.country}
                  id="country"
                  value={country}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          )}

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
          {buyer === "buyer" ? (
            <Row>
              <Col md={12} xs={24}>
                <Checkbox
                  className={checked ? "checked" : "Checkbox-field "}
                  id="acceptTerms"
                  onChange={(e) => {
                    toggleChecked(e.target.checked);
                    setAcceptTerms(e.target.value);
                  }}
                >
                  {
                    currentLocal.registration
                      .acceptTermsOfServiceAndPrivacyPolicy
                  }
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
          ) : (
            <Row>
              <Col md={12} xs={24}>
                <input
                  type="text"
                  className="input-field"
                  placeholder={currentLocal.registration.description}
                  id="description"
                  value={description}
                  onChange={handleChange}
                />
              </Col>
              <Col md={12} xs={24}>
                <input
                  type="text"
                  className="input-field"
                  placeholder={currentLocal.registration.government}
                  id="government"
                  value={government}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          )}
          {buyer === "Contractor" && (
            <Row>
              <Col md={12} xs={24}>
                <input
                  type="text"
                  className="input-field"
                  placeholder={currentLocal.registration.address}
                  id="address"
                  value={address}
                  onChange={handleChange}
                />
              </Col>
              <Col md={12} xs={24}>
                <input
                  type="text"
                  className="input-field"
                  placeholder={currentLocal.registration.uploadCompanyLogo}
                  id="uploadCompanyLogo"
                  value={uploadCompanyLogo}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          )}
          {buyer === "Contractor" && (
            <Row>
              <Col md={12} xs={24}>
                <Checkbox
                  className={checked ? "checked" : "Checkbox-field "}
                  id="acceptTerms"
                  onChange={(e) => {
                    toggleChecked(e.target.checked);
                  }}
                >
                  {
                    currentLocal.registration
                      .acceptTermsOfServiceAndPrivacyPolicy
                  }
                </Checkbox>
              </Col>
            </Row>
          )}
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
