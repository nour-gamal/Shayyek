import React, { useState, useEffect } from "react";
import { Col, Radio, Row } from "antd";
import { Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { changeLocal } from "../../../../Redux/Localization";
import languages from "../../../../Resources/Assets/languages.svg";
import "./RegistrationForm.css";
function RegisterationForm() {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [checked, toggleChecked] = useState(false);
	const [checkedWhatsApp, toggleCheckedWhatsApp] = useState(false);
	const [individual, setIndividual] = useState("");
	// const [firstName, setFirstName] = useState("");
	// const [lastName, setLastName] = useState("");
	// const [mobileNumber, setMobileNumber] = useState("");
	// const [admin, setAdmin] = useState("");
	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");
	// const [confirmPassword, setConfirmPassword] = useState("");
	// const [companyName, setCompanyName] = useState("");
	// const [commercialRecord, setCommercialRecord] = useState("");
	// const [companyPhoneNumber, setCompanyPhoneNumber] = useState("");
	const [buyer, setBuyer] = useState("");
	// const [companyWebsite, setCompanyWebsite] = useState("");
	// const [companyMail, setCompanyMail] = useState("");
	// const [description, setDescription] = useState("");
	// const [country, setCountry] = useState("");
	// const [government, setGovernment] = useState("");
	// const [address, setAddress] = useState("");
	// const [uploadCompanyLogo, setUploadCompanyLogo] = useState("");
	const [work, setWork] = useState("");
	const [acceptTerms, setAcceptTerms] = useState("");
	const [whatsNumber, setWhatsNumber] = useState("");
	const sendData = () => {
		console.log(
			"hi",
			checked,
			individual,
			checkedWhatsApp,
			setWork,
			setAcceptTerms,
			setWhatsNumber
		);
	};
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
		} else if (e.target.id === "supplies") {
			setBuyer(e.target.id);
			toggleChecked(false);
			toggleCheckedWhatsApp(false);
		}
	};
	// const toggleAdmin = (e) => {
	//   if (e.target.id === "admin") {
	//     setAdmin(e.target.id);
	//   }
	//   if (e.target.id === "employee") {
	//     setAdmin(e.target.id);
	//   }
	// };
	// const handleChange = (e) => {
	//   const id = e.target.id;

	//   switch (id) {
	//     case "firstName": {
	//       setFirstName(e.target.value);
	//       break;
	//     }
	//     case "lastName": {
	//       setLastName(e.target.value);
	//       break;
	//     }
	//     case "mobileNumber": {
	//       setMobileNumber(e.target.value);
	//       break;
	//     }

	//     case "email": {
	//       setEmail(e.target.value);
	//       break;
	//     }
	//     case "password": {
	//       setPassword(e.target.value);
	//       break;
	//     }
	//     case "confirmPassword": {
	//       setConfirmPassword(e.target.value);
	//       break;
	//     }
	//     case "companyName": {
	//       setCompanyName(e.target.value);
	//       break;
	//     }
	//     case "commercialRecord": {
	//       setCommercialRecord(e.target.value);
	//       break;
	//     }
	//     case "companyPhoneNumber": {
	//       setCompanyPhoneNumber(e.target.value);
	//       break;
	//     }
	//     case "companyMail": {
	//       setCompanyMail(e.target.value);
	//       break;
	//     }
	//     case "work": {
	//       setWork(e.target.value);
	//       break;
	//     }
	//     case "country": {
	//       setCountry(e.target.value);
	//       break;
	//     }
	//     case "description": {
	//       setDescription(e.target.value);
	//       break;
	//     }
	//     case "government": {
	//       setGovernment(e.target.value);
	//       break;
	//     }
	//     case "address": {
	//       setAddress(e.target.value);
	//       break;
	//     }
	//     case "uploadCompanyLogo": {
	//       setUploadCompanyLogo(e.target.value);
	//       break;
	//     }
	//     case "companyWebsite": {
	//       setCompanyWebsite(e.target.value);
	//       break;
	//     }
	//     default: {
	//       break;
	//     }
	//   }
	// };

	useEffect(() => {
		setBuyer(currentLocal.registration.userType);
	}, [currentLocal]);

	const dispatch = useDispatch();
	console.log(work, acceptTerms, whatsNumber);
	return (
		<div className="Registration">
			<div className="container">
				<Row>
					<Col md={12} xs={24}>
						<div className="f-27">
							{currentLocal.registration.createAnAccount}
						</div>
					</Col>
					<Col md={12} xs={24}>
						<div className="dropdownmenu">
							<Dropdown>
								<Dropdown.Toggle id="dropdown-basic">{buyer}</Dropdown.Toggle>

								<Dropdown.Menu>
									<Dropdown.Item value="buyer" id="buyer" onClick={toggleKind}>
										{currentLocal.registration.buyer}
									</Dropdown.Item>
									<Dropdown.Item
										value="Contractor"
										id="Contractor"
										onClick={toggleKind}
									>
										{currentLocal.registration.Contractor}
									</Dropdown.Item>
									<Dropdown.Item
										value="supplies"
										id="supplies"
										onClick={toggleKind}
									>
										{currentLocal.registration.supplies}
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>

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

				<Row style={{ height: "100px" }}>
					<Col xs={24}>
						{buyer !== "supplies" && (
							<Radio.Group>
								<Radio
									className={
										buyer === currentLocal.registration.userType &&
										"disableRadio"
									}
									value={"456"}
									onChange={(e) => {
										setIndividual(e.target.value);
									}}
									disabled={buyer === currentLocal.registration.userType}
								>
									{currentLocal.registration.individual}
								</Radio>
								<Radio
									className={
										buyer === currentLocal.registration.userType
											? "disableRadio lastRadio"
											: "lastRadio"
									}
									val
									value={"123"}
									onChange={(e) => {
										setIndividual(e.target.value);
									}}
									disabled={buyer === currentLocal.registration.userType}
								>
									{currentLocal.registration.company}{" "}
								</Radio>
							</Radio.Group>
						)}
					</Col>
				</Row>

				<form onSubmit={sendData}>
					{/* <Row>
            <Col md={12} xs={24}>
              <input
                id="firstName"
                value={firstName}
                type="text"
                className={
                  buyer === currentLocal.registration.userType
                    ? "disableInput input-field"
                    : "input-field"
                }
                placeholder={currentLocal.registration.firstName}
                onChange={handleChange}
                disabled={buyer === currentLocal.registration.userType}
              />
            </Col>
            <Col md={12} xs={24}>
              <input
                type="text"
                className={
                  buyer === currentLocal.registration.userType
                    ? "disableInput input-field"
                    : "input-field"
                }
                placeholder={currentLocal.registration.lastName}
                id="lastName"
                value={lastName}
                onChange={handleChange}
                disabled={buyer === currentLocal.registration.userType}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xs={24}>
              <input
                className={
                  buyer === currentLocal.registration.userType
                    ? "disableInput input-field"
                    : "input-field"
                }
                placeholder={currentLocal.registration.mobileNumber}
                type="number"
                id="mobileNumber"
                value={mobileNumber}
                onChange={handleChange}
                disabled={buyer === currentLocal.registration.userType}
              />
            </Col>

            <Col md={12} xs={24}>
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className={
                    buyer === currentLocal.registration.userType
                      ? "diableRole roleDropDown"
                      : "roleDropDown"
                  }
                  disabled={buyer === currentLocal.registration.userType}
                >
                  {admin ? admin : "role"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item value="admin" id="admin" onClick={toggleAdmin}>
                    {currentLocal.registration.admin}
                  </Dropdown.Item>
                  <Dropdown.Item
                    value="employee"
                    id="employee"
                    onClick={toggleAdmin}
                  >
                    {currentLocal.registration.employee}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Row>
            <Checkbox
              id="whatsNumber"
              disabled={buyer === currentLocal.registration.userType}
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
                type="email"
                className={
                  buyer === currentLocal.registration.userType
                    ? "disableInput input-field"
                    : "input-field"
                }
                placeholder={currentLocal.registration.email}
                disabled={buyer === currentLocal.registration.userType}
                id="email"
                value={email}
                onChange={handleChange}
              />
            </Col>
            <Col md={12} xs={24}>
              <input
                className={
                  buyer === currentLocal.registration.userType
                    ? "disableInput input-field"
                    : "input-field"
                }
                placeholder={currentLocal.registration.password}
                disabled={buyer === currentLocal.registration.userType}
                type="password"
                id="password"
                value={password}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xs={24}>
              <input
                type="password"
                className={
                  buyer === currentLocal.registration.userType
                    ? "disableInput input-field"
                    : "input-field"
                }
                placeholder={currentLocal.registration.confirmPassword}
                disabled={buyer === currentLocal.registration.userType}
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
              />
            </Col>
            <Col md={12} xs={24}>
              <Dropdown>
                <Dropdown.Toggle
                  disabled={buyer === currentLocal.registration.userType}
                  id="dropdown-basic"
                  className={
                    buyer === currentLocal.registration.userType
                      ? "disableInput input-dropdown"
                      : "input-dropdown"
                  }
                >
                  {currentLocal.registration.work +
                    " / " +
                    currentLocal.registration.field}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item value="buyer" id="buyer" onClick={toggleKind}>
                    {currentLocal.registration.buyer}
                  </Dropdown.Item>
                  <Dropdown.Item
                    value="Contractor"
                    id="Contractor"
                    onClick={toggleKind}
                  >
                    {currentLocal.registration.Contractor}
                  </Dropdown.Item>
                  <Dropdown.Item
                    value="supplies"
                    id="supplies"
                    onClick={toggleKind}
                  >
                    {currentLocal.registration.supplies}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row> */}
				</form>
				{/* <Form>
          <Row>
            <Col md={12} xs={24}>
              <input
                id="firstName"
                value={firstName}
                type="text"
                className={
                  buyer === currentLocal.registration.userType
                    ? "disableInput input-field"
                    : "input-field"
                }
                placeholder={currentLocal.registration.firstName}
                onChange={handleChange}
                disabled={buyer === currentLocal.registration.userType}
              />
            </Col>
            <Col md={12} xs={24}>
              <input
                type="text"
                className={
                  buyer === currentLocal.registration.userType
                    ? "disableInput input-field"
                    : "input-field"
                }
                placeholder={currentLocal.registration.lastName}
                id="lastName"
                value={lastName}
                onChange={handleChange}
                disabled={buyer === currentLocal.registration.userType}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xs={24}>
              <input
                className={
                  buyer === currentLocal.registration.userType
                    ? "disableInput input-field"
                    : "input-field"
                }
                placeholder={currentLocal.registration.mobileNumber}
                type="number"
                id="mobileNumber"
                value={mobileNumber}
                onChange={handleChange}
                disabled={buyer === currentLocal.registration.userType}
              />
            </Col>

            <Col md={12} xs={24}>
               <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">{admin}</Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      value="admin"
                      id="admin"
                      onClick={toggleAdmin}
                    >
                      {currentLocal.registration.admin}
                    </Dropdown.Item>
                    <Dropdown.Item
                      value="employee"
                      id="employee"
                      onClick={toggleAdmin}
                    >
                      {currentLocal.registration.employee}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown> 
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className={
                    buyer === currentLocal.registration.userType
                      ? "diableRole roleDropDown"
                      : "roleDropDown"
                  }
                  disabled={buyer === currentLocal.registration.userType}
                >
                  {admin ? admin : "role"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item value="admin" id="admin" onClick={toggleAdmin}>
                    {currentLocal.registration.admin}
                  </Dropdown.Item>
                  <Dropdown.Item
                    value="employee"
                    id="employee"
                    onClick={toggleAdmin}
                  >
                    {currentLocal.registration.employee}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
             ) : (
              <Col md={12} xs={24}>
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                   
                    className={buyer === currentLocal.registration.userType?"diableRole roleDropDown":"roleDropDown"}
                    disabled={buyer === currentLocal.registration.userType}
                  >
                    {admin ? admin : "role"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      value="admin"
                      id="admin"
                      onClick={toggleAdmin}
                    >
                      {currentLocal.registration.admin}
                    </Dropdown.Item>
                    <Dropdown.Item
                      value="employee"
                      id="employee"
                      onClick={toggleAdmin}
                    >
                      {currentLocal.registration.employee}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            )} 
          </Row>
          <Row>
            <Checkbox
              id="whatsNumber"
              disabled={buyer === currentLocal.registration.userType}
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
                type="email"
                className={
                  buyer === currentLocal.registration.userType
                    ? "disableInput input-field"
                    : "input-field"
                }
                placeholder={currentLocal.registration.email}
                disabled={buyer === currentLocal.registration.userType}
                id="email"
                value={email}
                onChange={handleChange}
              />
            </Col>
            <Col md={12} xs={24}>
              <input
                className={
                  buyer === currentLocal.registration.userType
                    ? "disableInput input-field"
                    : "input-field"
                }
                placeholder={currentLocal.registration.password}
                disabled={buyer === currentLocal.registration.userType}
                type="password"
                id="password"
                value={password}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xs={24}>
              <input
                type="password"
                className={
                  buyer === currentLocal.registration.userType
                    ? "disableInput input-field"
                    : "input-field"
                }
                placeholder={currentLocal.registration.confirmPassword}
                disabled={buyer === currentLocal.registration.userType}
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
              />
            </Col>
            <Col md={12} xs={24}>
              {individual !== "456"  ?
                <input
                  className={
                    buyer === currentLocal.registration.userType
                      ? "disableInput input-field"
                      : "input-field"
                  }
                  placeholder={currentLocal.registration.companyName}
                  disabled={buyer === currentLocal.registration.userType}
                  type="text"
                  id="companyName"
                  value={companyName}
                  onChange={handleChange}
                />
                :
                <Dropdown>
                <Dropdown.Toggle
                  disabled={buyer === currentLocal.registration.userType}
                  id="dropdown-basic"
                  className={
                    buyer === currentLocal.registration.userType
                      ? "disableInput input-dropdown"
                      : "input-dropdown"
                  }
                >
                  {currentLocal.registration.work +
                    " / " +
                    currentLocal.registration.field}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    value="buyer"
                    id="buyer"
                    onClick={toggleKind}
                  >
                    {currentLocal.registration.buyer}
                  </Dropdown.Item>
                  <Dropdown.Item
                    value="Contractor"
                    id="Contractor"
                    onClick={toggleKind}
                  >
                    {currentLocal.registration.Contractor}
                  </Dropdown.Item>
                  <Dropdown.Item
                    value="supplies"
                    id="supplies"
                    onClick={toggleKind}
                  >
                    {currentLocal.registration.supplies}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              }
            </Col>
          </Row>

          {(buyer === currentLocal.registration.userType ||
            buyer === "buyer") && (
            <>
              <Row>
                <Col md={12} xs={24}>
                  <input
                    disabled={buyer === currentLocal.registration.userType}
                    className={
                      buyer === currentLocal.registration.userType
                        ? "disableInput input-field"
                        : "input-field"
                    }
                    placeholder={
                      currentLocal.registration.work +
                      " / " +
                      currentLocal.registration.field
                    }
                    type="text"
                    id="work"
                    value={work}
                    onChange={handleChange}
                  /> 
                   <Dropdown>
                    <Dropdown.Toggle
                      disabled={buyer === currentLocal.registration.userType}
                      id="dropdown-basic"
                      className={
                        buyer === currentLocal.registration.userType
                          ? "disableInput input-dropdown"
                          : "input-dropdown"
                      }
                    >
                      {currentLocal.registration.work +
                        " / " +
                        currentLocal.registration.field}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        value="buyer"
                        id="buyer"
                        onClick={toggleKind}
                      >
                        {currentLocal.registration.buyer}
                      </Dropdown.Item>
                      <Dropdown.Item
                        value="Contractor"
                        id="Contractor"
                        onClick={toggleKind}
                      >
                        {currentLocal.registration.Contractor}
                      </Dropdown.Item>
                      <Dropdown.Item
                        value="supplies"
                        id="supplies"
                        onClick={toggleKind}
                      >
                        {currentLocal.registration.supplies}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <div className="workDropDown"></div>
                </Col>

                <Col md={12} xs={24}>
                  {individual !== "456" && (
                    <input
                      disabled={buyer === currentLocal.registration.userType}
                      type="email"
                      className={
                        buyer === currentLocal.registration.userType
                          ? "disableInput input-field"
                          : "input-field"
                      }
                      placeholder={currentLocal.registration.companyMail}
                      id="companyMail"
                      value={companyMail}
                      onChange={handleChange}
                    />
                  )}
                </Col>
              </Row>
              {individual !== "456" && (
                <Row>
                  <Col md={12} xs={24}>
                    <input
                      disabled={buyer === currentLocal.registration.userType}
                      className={
                        buyer === currentLocal.registration.userType
                          ? "disableInput input-field"
                          : "input-field"
                      }
                      placeholder={
                        currentLocal.registration.commercialRecord +
                        " (" +
                        currentLocal.registration.optional +
                        ")"
                      }
                      type="text"
                      id="commercialRecord"
                      value={commercialRecord}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={12} xs={24}>
                   
                    <input
                      disabled={buyer === currentLocal.registration.userType}
                      type="number"
                      className={
                        buyer === currentLocal.registration.userType
                          ? "disableInput input-field"
                          : "input-field"
                      }
                      placeholder={currentLocal.registration.companyPhoneNumber}
                      id="companyPhoneNumber"
                      value={companyPhoneNumber}
                      onChange={handleChange}
                    />
                
                  </Col>
                </Row>
              )}
              <Row>
                {individual !== "456" && (
                  <Col md={12} xs={24}>
                    <input
                      disabled={buyer === currentLocal.registration.userType}
                      type="text"
                      className={
                        buyer === currentLocal.registration.userType
                          ? "disableInput input-field"
                          : "input-field"
                      }
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
                )}
                <Col md={12} xs={24}>
                  <Checkbox
                    disabled={buyer === currentLocal.registration.userType}
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
              </Row>
            </>
          )}
          {(buyer === "supplies" || buyer === "Contractor") && (
            <>
              <Row>
                <Col md={12} xs={24}>
                  <Dropdown>
                    <Dropdown.Toggle
                      disabled={buyer === currentLocal.registration.userType}
                      id="dropdown-basic"
                      className={
                        buyer === currentLocal.registration.userType
                          ? "disableInput input-dropdown"
                          : "input-dropdown"
                      }
                    >
                      {currentLocal.registration.work +
                        " / " +
                        currentLocal.registration.field}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        value="buyer"
                        id="buyer"
                        onClick={toggleKind}
                      >
                        {currentLocal.registration.buyer}
                      </Dropdown.Item>
                      <Dropdown.Item
                        value="Contractor"
                        id="Contractor"
                        onClick={toggleKind}
                      >
                        {currentLocal.registration.Contractor}
                      </Dropdown.Item>
                      <Dropdown.Item
                        value="supplies"
                        id="supplies"
                        onClick={toggleKind}
                      >
                        {currentLocal.registration.supplies}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>

                <Col md={12} xs={24}>
                  <input
                    disabled={buyer === currentLocal.registration.userType}
                    type="text"
                    className="input-field"
                    placeholder={currentLocal.registration.description}
                    id="description"
                    value={description}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12} xs={24}>
                  <input
                    disabled={buyer === currentLocal.registration.userType}
                    type="email"
                    className={
                      buyer === currentLocal.registration.userType
                        ? "disableInput input-field"
                        : "input-field"
                    }
                    placeholder={currentLocal.registration.country}
                    id="country"
                    value={country}
                    onChange={handleChange}
                  />
                </Col>
                <Col md={12} xs={24}>
                  <input
                    disabled={buyer === currentLocal.registration.userType}
                    type="text"
                    className="input-field"
                    placeholder={currentLocal.registration.government}
                    id="government"
                    value={government}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12} xs={24}>
                  <input
                    disabled={buyer === currentLocal.registration.userType}
                    type="text"
                    className="input-field"
                    placeholder={currentLocal.registration.address}
                    id="address"
                    value={address}
                    onChange={handleChange}
                  />
                </Col>
                <Col md={12} xs={24}>
                {individual !=="456" &&
                  <input
                    disabled={buyer === currentLocal.registration.userType}
                    type="number"
                    className="input-field"
                    placeholder={currentLocal.registration.companyPhoneNumber}
                    id="companyPhoneNumber"
                    value={companyPhoneNumber}
                    onChange={handleChange}
                  />
}
                </Col>
              </Row>
              {individual !=="456" &&
              <Row>
                <Col md={12} xs={24}>
                  <input
                    disabled={buyer === currentLocal.registration.userType}
                    className="input-field"
                    placeholder={
                      currentLocal.registration.commercialRecord +
                      " (" +
                      currentLocal.registration.optional +
                      ")"
                    }
                    type="text"
                    id="commercialRecord"
                    value={commercialRecord}
                    onChange={handleChange}
                  />
                </Col>
                <Col md={12} xs={24}>
                  <input
                    disabled={buyer === currentLocal.registration.userType}
                    type="text"
                    className="input-field"
                    placeholder={
                      currentLocal.registration.uploadCompanyLogo +
                      " (" +
                      currentLocal.registration.optional +
                      ")"
                    }
                    id="uploadCompanyLogo"
                    value={uploadCompanyLogo}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              }
              <Row>
                <Col md={12} xs={24}>
                  <Checkbox
                    disabled={buyer === currentLocal.registration.userType}
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
              </Row>
            </>
          )}
          <div className="button">
            <div>
              <button
                onClick={() => {
                  console.log(
                    "hi",
                    firstName,
                    lastName,
                    mobileNumber,
                    checkedWhatsApp,
                    email,
                    password,
                    confirmPassword,
                    companyName,
                    companyMail,
                    commercialRecord,
                    companyPhoneNumber,
                    companyWebsite,
                    individual,
                    checkedWhatsApp,
                    admin,
                    description,
                    address
                  );
                }}
                type="submit"
                className={
                  buyer === currentLocal.registration.userType
                    ? "disable button-primary"
                    : "button-primary"
                }
              >
                {currentLocal.registration.register}
              </button>
            </div>
            <div
              className={
                buyer === currentLocal.registration.userType
                  ? "disableCheck checkSignIn"
                  : "checkSignIn"
              }
            >
              {currentLocal.registration.alreadyHaveAnAccount}
              <a
                href="/"
                disabled={buyer === currentLocal.registration.userType}
                // className={buyer=== currentLocal.registration.userType&&"disableLink"}
              >
                {" "}
                {currentLocal.registration.signIn}
              </a>
            </div>
          </div>
        </Form> */}
			</div>
		</div>
	);
}

export default RegisterationForm;
