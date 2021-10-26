import React, { useEffect, useState } from "react";
import AuthHeader from "../../../Common/AuthHeader/AuthHeader";
import { useSelector } from "react-redux";
import "./RegistrationForm.css";
import { Col, Radio, Row, Checkbox, Menu, Dropdown } from "antd";
import {
  CompanyList,
  CompanyHasAdmin,
  countryList,
  governmentList,
  getWork,
  getRole,
  getCompanyType,
  getAccountType,
  register,
} from "../../Network";
import disableArrow from "../../../../Resources/Assets/disableArrow.svg";
import Arrow from "../../../../Resources/Assets/Arrow.svg";
import uploadImg from "../../../../Resources/Assets/uploadImg.svg";
import disapleUploadImg from "../../../../Resources/Assets/disapleUploadImg.svg";
import { Cascader } from "antd";
function RegistrationForm() {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const { currentLanguageId } = useSelector((state) => state.currentLocal);
  const { authorization } = useSelector((state) => state.authorization);
  const [buyer, setBuyer] = useState(currentLocal.registration.userType);
  const [individual, setIndividual] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [admin, setAdmin] = useState("");
  const [checkedWhatsApp, toggleCheckedWhatsApp] = useState(false);
  const [companyTypes, setCompanyTypes] = useState([]);
  const [companyTypeId, setCompanyTypeId] = useState("");
  const [companyTypeName, setCompanyTypeName] = useState("");
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState("");
  const [companiesName, setCompaniesName] = useState([]);
  const [companyMail, setCompanyMail] = useState("");
  const [acceptTerms, setAcceptTerms] = useState("");
  const [checked, toggleChecked] = useState("");
  // const [commercialRecord, setCommercialRecord] = useState("");
  // const [uploadCompanyLogo, setUploadCompanyLogo] = useState("");
  const [companyWebsite, setcompanyWebsite] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [governmentId, setGovernmentId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [governmentsName, setGovernmentsName] = useState([]);
  const [countriesName, setCountriesName] = useState([]);
  const [governmentName, setGovernmentName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [roleList, setRoleList] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [accountList, setAccountList] = useState([[]]);
  const [accountId, setAccountId] = useState("");
  const [roleId, setRoleId] = useState("");
  const [userTypeId, setUserTypeId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [subSubCategoryId, setSubSubCategoryId] = useState("");
  // const [alert, setAlert] = useState(false);
  const [logoName, setlogoName] = useState("");
  const [fileName, setFileName] = useState("");
  const [logoData, setLogoData] = useState("");
  const [fileData, setFileData] = useState("");
  const [options, updateOptions] = useState([]);
  const showState = true;
  const uploadCompanyLogo = "";
  const commercialRecord = "";

  //function userTypeName
  const onSelectUserType = (val) => {
    setTimeout(() => {
      setBuyer(val);
    }, 100);
  };
  //when press on any level in three level it will get id
  const handleCascaderChange = (e) => {
    console.log(e);
    console.log(e[0]);
    setCategoryId(e[0]);
    setSubCategoryId(e[1]);
    setSubSubCategoryId(e[2]);
  };
  //function userTypeId

  const sendDataToParent = (val) => {
    console.log(val);
    setTimeout(() => {
      setUserTypeId(val);
    }, 100);
    if (userTypeId === "2a9e1d5f-722e-404e-8041-a6a665149e03") {
      setAccountId("d23f2c1e-1ed3-4066-96d6-66a970e39a7f");
    }
  };

  useEffect(() => {
    CompanyList(
      currentLanguageId,
      (success) => {
        setCompaniesName(success.data);
      },
      (fail) => {},
      false
    );
    countryList(
      currentLanguageId,
      (success) => {
        setCountriesName(success.data);
      },
      (fail) => {
        console.log(fail);
      },
      false
    );
    getRole(
      currentLanguageId,
      (success) => {
        setRoleList(success.data);
      },
      (fail) => {
        console.log(fail);
      },
      false
    );
    getAccountType(
      currentLanguageId,
      (success) => {
        setAccountList(success.data);
      },
      (fail) => {
        console.log(fail);
      },
      false
    );

    getCompanyType(
      currentLanguageId,
      (success) => {
        setCompanyTypes(success.data);
      },
      (fail) => {
        console.log(fail);
      }
    );

    getWork(
      currentLanguageId,
      (success) => {
        let options = [];
        success.data.forEach((category, i) => {
          options.push({
            value: category.category.id,
            label: category.category.name,
            children: [],
          });
          category.subCategories.forEach((subCategories, j) => {
            options[i].children.push({
              value: subCategories.subCategory.id,
              label: subCategories.subCategory.name,
              children: [],
            });
            subCategories.subSubCategories.forEach((subSubCategories) => {
              options[i].children[j].children.push({
                value: subSubCategories.id,
                label: subSubCategories.name,
              });
            });
          });
        });
        updateOptions(options);
      },
      (fail) => {
        console.log(fail);
      },
      false
    );
  }, [currentLanguageId]);
  //dropdown of company
  const menu = (
    <Menu>
      {companiesName.map((company) => {
        return (
          <Menu.Item
            key="0"
            onClick={(e) => {
              setCompanyId(company.id);
              setCompanyName(company.name);
              //call api to know if company has admin or not (admin>res.data)
              CompanyHasAdmin(
                company.id,
                (success) => {
                  setAdmin(success.success);
                },
                (fail) => {},
                false
              );
            }}
          >
            {company.name}
          </Menu.Item>
        );
      })}
    </Menu>
  );
  //dropdown of country
  const countryMenu = (
    <Menu>
      {countriesName.map((country) => {
        return (
          <Menu.Item
            key="0"
            onClick={(e) => {
              setCountryName(country.name);
              //call api to know if company has admin or not (admin>res.data)
              governmentList(
                currentLanguageId,
                country.id,
                (success) => {
                  setGovernmentsName(success.data);
                },
                (fail) => {
                  console.log(fail);
                },
                false
              );
            }}
          >
            {country.name}
          </Menu.Item>
        );
      })}
    </Menu>
  );
  //dropdown of government
  const governmentMenu = (
    <Menu>
      {governmentsName.map((government) => {
        return (
          <Menu.Item
            key="0"
            onClick={(e) => {
              setGovernmentId(government.id);

              setGovernmentName(government.name); //call api to know if company has admin or not (admin>res.data)
              // CompanyHasAdmin(
              //   company.id,
              //   (success) => {
              //     setAdmin(success.success);
              //   },
              //   (fail) => {},
              //   false
              // );
            }}
          >
            {government.name}
          </Menu.Item>
        );
      })}
    </Menu>
  );
  //dropdown of role
  const roleMenu = (
    <Menu>
      {roleList.map((role) => {
        return (
          <Menu.Item
            key="0"
            onClick={(e) => {
              setRoleName(role.name);
              setRoleId(role.id);
            }}
          >
            {role.name}
          </Menu.Item>
        );
      })}
    </Menu>
  );
  //dropdown CompanyType
  const companyTypeMenu = (
    <Menu>
      {companyTypes.map((companyType) => {
        return (
          <Menu.Item
            key="0"
            onClick={(e) => {
              setCompanyTypeName(companyType.name);
              setCompanyTypeId(companyType.id);
            }}
          >
            {companyType.name}
          </Menu.Item>
        );
      })}
    </Menu>
  );
  //when press on submit button this function will be call
  const sendData = (e) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !mobileNumber ||
      !email ||
      !password ||
      !confirmPassword ||
      companyWebsite ||
      !companyMail ||
      !companyPhoneNumber ||
      !companyName ||
      !companyWebsite ||
      countryName ||
      governmentName ||
      !address ||
      !checked ||
      !acceptTerms
    ) {
      const body = new FormData();
      body.append("FirstName", firstName);
      body.append("LastName", lastName);
      body.append("MailUser", email);
      body.append("Password", password);
      body.append("MobileUser", mobileNumber);
      body.append("IsWhatsAppNumber", checkedWhatsApp);
      body.append("FirebaseToken", authorization.deviceToken);
      body.append("Logo", logoData);
      body.append("CommercialRecord", fileData);
      body.append("MailCompany", companyMail);
      body.append("MobileCompany", companyPhoneNumber);
      body.append("Website", companyWebsite);
      body.append("Address", address);
      body.append("CompanyId", companyId);
      body.append("RoleId", roleId);
      body.append("UserTypeId", userTypeId);
      body.append("AccountTypeId", accountId);
      body.append("CompanyHasData", admin ? false : true);
      body.append("GovernmentId", governmentId);
      body.append("CategoryId", categoryId);
      body.append("SubCategoryId", subCategoryId);
      body.append("SubSubCategoryId", subSubCategoryId);
      body.append("CompanyTypeId", companyTypeId);

      register(
        body,
        (success) => console.log(success),
        (fail) => console.log(fail),
        false
      );
    }
    console.log(governmentId);
    // console.log(countryId);
    setIndividual(" ");
  };
  return (
    <div className="RegistrationForm ppl ppr">
      <AuthHeader
        title={currentLocal.registration.createAnAccount}
        showState={showState}
        onSelectUserType={onSelectUserType}
        sendDataToParent={sendDataToParent}
        alert={alert}
      />
      <Row style={{ height: "100px" }}>
        <Col xs={24}>
          {buyer !== currentLocal.registration.Supplier && (
            <Radio.Group>
              {accountList.map((account) => {
                return (
                  <Radio
                    className={
                      buyer === currentLocal.registration.userType &&
                      "disableRadio"
                    }
                    onChange={(e) => {
                      setAccountId(account.id);
                      setIndividual(e.target.value);
                      if (companyName) {
                        setCompanyName("");
                        setAdmin("");
                      }
                    }}
                    disabled={buyer === currentLocal.registration.userType}
                    value={account.id}
                  >
                    {account.name}
                  </Radio>
                );
              })}
            </Radio.Group>
          )}
        </Col>
      </Row>
      <form onSubmit={sendData}>
        <Row>
          <Col md={12} xs={24}>
            <input
              id="firstName"
              value={firstName}
              type="text"
              className={
                !individual && buyer !== currentLocal.registration.Supplier
                  ? "disableInput input-field"
                  : "input-field"
              }
              placeholder={currentLocal.registration.firstName}
              disabled={
                !individual && buyer !== currentLocal.registration.Supplier
              }
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </Col>
          <Col md={12} xs={24}>
            <input
              type="text"
              className={
                !individual && buyer !== currentLocal.registration.Supplier
                  ? "disableInput input-field"
                  : "input-field"
              }
              placeholder={currentLocal.registration.lastName}
              id="lastName"
              value={lastName}
              disabled={
                !individual && buyer !== currentLocal.registration.Supplier
              }
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </Col>

          {!(individual === "436b77d6-bc46-4527-bc72-ec7fc595e16d") && (
            <Col md={12} xs={24} className="companyName">
              {/* {alert && <label>* Please Choose Company Name</label>} */}
              <Dropdown
                overlay={menu}
                trigger={["click"]}
                className={
                  !individual && buyer !== currentLocal.registration.Supplier
                    ? "disableInput input-field"
                    : "input-field"
                }
                disabled={
                  !individual && buyer !== currentLocal.registration.Supplier
                }
              >
                <a
                  href="/"
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  {companyName
                    ? companyName
                    : currentLocal.registration.companyName}
                  {!individual &&
                  buyer !== currentLocal.registration.Supplier ? (
                    <img src={disableArrow} alt="disableArrow" />
                  ) : (
                    <img src={Arrow} alt="Arrow" />
                  )}
                </a>
              </Dropdown>
            </Col>
          )}
          {!(
            individual === "436b77d6-bc46-4527-bc72-ec7fc595e16d" ||
            admin === true
          ) && (
            <Col md={12} xs={24} className="work mb-3">
              {/* {alert && <label>* Please choose Work</label>} */}
              <Cascader
                className={
                  !individual && buyer !== currentLocal.registration.Supplier
                    ? "disableInput cascaderFiled"
                    : "cascaderFiled"
                }
                options={options}
                onChange={handleCascaderChange}
                placeholder={currentLocal.registration.work}
                disabled={
                  !individual && buyer !== currentLocal.registration.Supplier
                }
                bordered={false}
                style={{ color: "red" }}
              />

              {!individual && buyer !== currentLocal.registration.Supplier ? (
                <img
                  src={disableArrow}
                  alt="disableArrow"
                  className="dropDownicon"
                />
              ) : (
                <img src={Arrow} alt="Arrow" className="dropDownicon" />
              )}
            </Col>
          )}
          <Col md={12} xs={24} className="mb-2">
            {/* {alert && <label>* Please fill mobileNumber</label>} */}
            <input
              className={
                !individual && buyer !== currentLocal.registration.Supplier
                  ? "disableInput input-field mb-0"
                  : "input-field mb-0"
              }
              placeholder={currentLocal.registration.mobileNumber}
              type="number"
              id="mobileNumber"
              value={mobileNumber}
              disabled={
                !individual && buyer !== currentLocal.registration.Supplier
              }
              onChange={(e) => {
                setMobileNumber(e.target.value);
              }}
            />
            <Checkbox
              id="whatsNumber"
              disabled={!individual}
              className={checkedWhatsApp ? "checked" : "Checkbox-field"}
              onChange={(e) => {
                toggleCheckedWhatsApp(e.target.checked);
              }}
            >
              {currentLocal.registration.whatsAppNumber}
            </Checkbox>
          </Col>
          <Col md={12} xs={24}>
            {/* {alert && <label>* Please fill email</label>} */}
            <input
              type="email"
              className={
                !individual && buyer !== currentLocal.registration.Supplier
                  ? "disableInput input-field"
                  : "input-field"
              }
              placeholder={currentLocal.registration.email}
              disabled={
                !individual && buyer !== currentLocal.registration.Supplier
              }
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Col>

          <Col md={12} xs={24}>
            {/* {alert && <label>* Please fill password</label>} */}
            <input
              className={
                !individual && buyer !== currentLocal.registration.Supplier
                  ? "disableInput input-field"
                  : "input-field"
              }
              placeholder={currentLocal.registration.password}
              disabled={
                !individual && buyer !== currentLocal.registration.Supplier
              }
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Col>

          <Col md={12} xs={24}>
            {/* {alert && <label>* Please fill confirmPassword</label>} */}
            <input
              type="password"
              className={
                !individual && buyer !== currentLocal.registration.Supplier
                  ? "disableInput input-field"
                  : "input-field"
              }
              placeholder={currentLocal.registration.confirmPassword}
              disabled={
                !individual && buyer !== currentLocal.registration.Supplier
              }
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </Col>
          {!(
            individual === "436b77d6-bc46-4527-bc72-ec7fc595e16d" ||
            admin === true
          ) && (
            <>
              <Col md={12} xs={24}>
                <Dropdown
                  overlay={roleMenu}
                  trigger={["click"]}
                  className={
                    !individual && buyer !== currentLocal.registration.Supplier
                      ? "disableInput input-dropdown"
                      : "input-dropdown"
                  }
                  disabled={
                    !individual && buyer !== currentLocal.registration.Supplier
                  }
                >
                  <a
                    href="/"
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    {roleName ? roleName : currentLocal.registration.role}
                    {!individual &&
                    buyer !== currentLocal.registration.Supplier ? (
                      <img src={disableArrow} alt="disableArrow" />
                    ) : (
                      <img src={Arrow} alt="Arrow" />
                    )}
                  </a>
                </Dropdown>
              </Col>
              <Col md={12} xs={24} className="companyType">
                {/* {alert && (
                  <label>* Please fill organisationLegalStructure</label>
                )} */}
                <Dropdown
                  overlay={companyTypeMenu}
                  trigger={["click"]}
                  className={
                    !individual && buyer !== currentLocal.registration.Supplier
                      ? "disableInput input-field"
                      : "input-field"
                  }
                  disabled={
                    !individual && buyer !== currentLocal.registration.Supplier
                  }
                >
                  <a
                    href="/"
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    {companyTypeName
                      ? companyTypeName
                      : currentLocal.registration.organisationLegalStructure}
                    {!individual &&
                    buyer !== currentLocal.registration.Supplier ? (
                      <img src={disableArrow} alt="disableArrow" />
                    ) : (
                      <img src={Arrow} alt="Arrow" />
                    )}
                  </a>
                </Dropdown>
              </Col>

              <Col md={12} xs={24}>
                {/* {alert && <label>* Please fill companyPhoneNumber</label>} */}
                <input
                  disabled={
                    !individual && buyer !== currentLocal.registration.Supplier
                  }
                  type="number"
                  className={
                    !individual && buyer !== currentLocal.registration.Supplier
                      ? "disableInput input-field"
                      : "input-field"
                  }
                  placeholder={currentLocal.registration.companyPhoneNumber}
                  id="companyPhoneNumber"
                  value={companyPhoneNumber}
                  onChange={(e) => {
                    setCompanyPhoneNumber(e.target.value);
                  }}
                />
              </Col>

              <Col md={12} xs={24}>
                {/* {alert && <label>* Please fill companyMail</label>} */}
                <input
                  disabled={
                    !individual && buyer !== currentLocal.registration.Supplier
                  }
                  type="email"
                  className={
                    !individual && buyer !== currentLocal.registration.Supplier
                      ? "disableInput input-field"
                      : "input-field"
                  }
                  placeholder={currentLocal.registration.companyMail}
                  id="companyMail"
                  value={companyMail}
                  onChange={(e) => {
                    setCompanyMail(e.target.value);
                  }}
                />
              </Col>
            </>
          )}
          {!(
            buyer === currentLocal.registration.Contractor ||
            buyer === currentLocal.registration.Supplier ||
            individual === "436b77d6-bc46-4527-bc72-ec7fc595e16d" ||
            admin === true
          ) && (
            <Col md={12} xs={24}>
              {/* {alert && <label>* Please fill companyWebsite</label>} */}
              <input
                disabled={
                  !individual && buyer !== currentLocal.registration.Supplier
                }
                type="text"
                name="myfile"
                className={
                  !individual && buyer !== currentLocal.registration.Supplier
                    ? "disableInput input-field"
                    : "input-field"
                }
                placeholder={currentLocal.registration.companyWebsite}
                id="companyWebsite"
                value={companyWebsite}
                onChange={(e) => {
                  setcompanyWebsite(e.target.value);
                }}
              />
            </Col>
          )}
          {!(
            individual === "436b77d6-bc46-4527-bc72-ec7fc595e16d" ||
            admin === true
          ) && (
            <Col md={12} xs={24}>
              <div
                className={
                  !individual && buyer !== currentLocal.registration.Supplier
                    ? "disableInput input-field d-flex justify-content-between align-items-center"
                    : "input-field d-flex justify-content-between align-items-center"
                }
              >
                <input
                  disabled={
                    !individual && buyer !== currentLocal.registration.Supplier
                  }
                  type="file"
                  id="files"
                  accept="image/png, image/gif, image/jpeg"
                  value={uploadCompanyLogo}
                  onChange={(e) => {
                    setLogoData(e.target.files[0]);
                    setlogoName(e.target.files[0].name);
                  }}
                  style={{ display: "none" }}
                />
                <label htmlFor="files" className="w-100">
                  {!individual &&
                  buyer !== currentLocal.registration.Supplier ? (
                    <>
                      <div className="d-flex justify-content-between ">
                        <div>
                          {logoName
                            ? logoName
                            : currentLocal.registration.uploadCompanyLogo}
                        </div>
                        <div>
                          <img src={disapleUploadImg} alt="disapleUploadImg" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          {logoName
                            ? logoName
                            : currentLocal.registration.uploadCompanyLogo}
                        </div>
                        <div>
                          <img src={uploadImg} alt="uploadImg" />
                        </div>
                      </div>
                    </>
                  )}
                </label>
              </div>
            </Col>
          )}
          {(buyer === currentLocal.registration.Contractor ||
            buyer === currentLocal.registration.Supplier) && (
            <>
              <Col md={12} xs={24} className="country">
                {/* {alert && <label>* Please fill country</label>} */}
                <Dropdown
                  overlay={countryMenu}
                  trigger={["click"]}
                  className={
                    !individual && buyer !== currentLocal.registration.Supplier
                      ? "disableInput input-field"
                      : "input-field"
                  }
                  disabled={
                    !individual && buyer !== currentLocal.registration.Supplier
                  }
                >
                  <a
                    href="/"
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    {countryName
                      ? countryName
                      : currentLocal.registration.country}
                    {!individual &&
                    buyer !== currentLocal.registration.Supplier ? (
                      <img src={disableArrow} alt="disableArrow" />
                    ) : (
                      <img src={Arrow} alt="Arrow" />
                    )}
                  </a>
                </Dropdown>
              </Col>
              <Col md={12} xs={24} className="government">
                {/* {alert && <label>* Please fill government</label>} */}

                <Dropdown
                  overlay={governmentMenu}
                  trigger={["click"]}
                  className={
                    !individual && buyer !== currentLocal.registration.Supplier
                      ? "disableInput input-field"
                      : "input-field"
                  }
                  disabled={
                    !individual && buyer !== currentLocal.registration.Supplier
                  }
                >
                  <a
                    href="/"
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    {governmentName
                      ? governmentName
                      : currentLocal.registration.government}
                    {!individual &&
                    buyer !== currentLocal.registration.Supplier ? (
                      <img src={disableArrow} alt="disableArrow" />
                    ) : (
                      <img src={Arrow} alt="Arrow" />
                    )}
                  </a>
                </Dropdown>
              </Col>

              <Col md={12} xs={24}>
                {/* {alert && <label>* Please fill address</label>} */}
                <input
                  disabled={
                    !individual && buyer !== currentLocal.registration.Supplier
                  }
                  type="text"
                  className={
                    !individual && buyer !== currentLocal.registration.Supplier
                      ? "disableInput input-field"
                      : "input-field"
                  }
                  placeholder={currentLocal.registration.address}
                  id="address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </Col>
            </>
          )}
          {admin !== true && (
            <Col md={12} xs={24}>
              <div
                className={
                  !individual && buyer !== currentLocal.registration.Supplier
                    ? "disableInput input-field d-flex justify-content-between align-items-center"
                    : "input-field d-flex justify-content-between align-items-center"
                }
              >
                <input
                  disabled={
                    !individual && buyer !== currentLocal.registration.Supplier
                  }
                  type="file"
                  id="file"
                  value={commercialRecord}
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                    setFileName(e.target.files[0].name);
                    setFileData(e.target.files[0]);
                    // setFileName(e.target.files[0]);
                  }}
                  style={{ display: "none" }}
                />
                <label htmlFor="file" className="w-100">
                  {!individual &&
                  buyer !== currentLocal.registration.Supplier ? (
                    <>
                      <div className="d-flex justify-content-between ">
                        <div>
                          {buyer !== currentLocal.registration.Supplier &&
                          individual === "0c3c7c93-b4ed-4980-b088-45d095b58830"
                            ? fileName
                              ? fileName
                              : currentLocal.registration
                                  .commercialRecordOptional
                            : fileName
                            ? fileName
                            : currentLocal.registration.commercialRecord}
                        </div>
                        <div>
                          <img src={disapleUploadImg} alt="disapleUploadImg" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          {fileName
                            ? fileName
                            : currentLocal.registration.commercialRecord}
                        </div>
                        <div>
                          <img src={uploadImg} alt="uploadImg" />
                        </div>
                      </div>
                    </>
                  )}
                </label>
              </div>
            </Col>
          )}
          <Col md={12} xs={24}>
            <Checkbox
              disabled={
                !individual && buyer !== currentLocal.registration.Supplier
              }
              className={
                !individual && buyer !== currentLocal.registration.Supplier
                  ? "disableFiled check-field"
                  : "check-field"
              }
              id="acceptTerms"
              onChange={(e) => {
                toggleChecked(e.target.checked);
                setAcceptTerms(e.target.value);
              }}
            >
              {currentLocal.registration.acceptTermsOfServiceAndPrivacyPolicy}
            </Checkbox>
          </Col>
          <div className="button my-3">
            <div>
              <button
                type="submit"
                className={
                  !individual && buyer !== currentLocal.registration.Supplier
                    ? "disable button-primary"
                    : "button-primary"
                }
              >
                {currentLocal.registration.register}
              </button>
            </div>
            <div
              className={
                !individual && buyer !== currentLocal.registration.Supplier
                  ? "disableCheck checkSignIn"
                  : "checkSignIn"
              }
            >
              {currentLocal.registration.alreadyHaveAnAccount}
              <a
                href="/"
                disabled={
                  !individual && buyer !== currentLocal.registration.Supplier
                }
              >
                {" "}
                {currentLocal.registration.signIn}
              </a>
            </div>
          </div>
        </Row>
      </form>
    </div>
  );
}

export default RegistrationForm;
