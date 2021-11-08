import React, { useEffect, useState } from "react";
import AuthHeader from "../../../Common/AuthHeader/AuthHeader";
import { useSelector } from "react-redux";
import "./RegistrationForm.css";
import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";
import { Col, Radio, Row, Checkbox, Menu, Dropdown, Alert } from "antd";
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
import Arrow from "../../../../Resources/Assets/dropdown arrow icn.svg";
import foucesArrow from "../../../../Resources/Assets/blue dropdown arrow.svg";
import uploadImg from "../../../../Resources/Assets/Attach icn.svg";
import disapleUploadImg from "../../../../Resources/Assets/disapleUploadImg.svg";
import { Redirect } from "react-router";
function RegistrationForm() {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const { currentLanguageId } = useSelector((state) => state.currentLocal);
  const { authorization } = useSelector((state) => state.authorization);
  const [buyer, setBuyer] = useState(currentLocal.registration.userType);
  const [individual, setIndividual] = useState("");
  const [firstName, setFirstName] = useState("");
  const [focusIcon, setFocusIcon] = useState(false);
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [workValue, setWorkValue] = useState("");
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
  const [countryAlertte, setCountryAlert] = useState(false);
  const [confirmationState, setConfirmationState] = useState("");
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
  const [toggleAccountType, setToggleAccountType] = useState("");
  const [roleId, setRoleId] = useState("");
  const [userTypeId, setUserTypeId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [subSubCategoryId, setSubSubCategoryId] = useState("");
  const [alert, setAlert] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [logoName, setlogoName] = useState("");
  const [fileName, setFileName] = useState("");
  const [logoData, setLogoData] = useState("");
  const [fileData, setFileData] = useState("");
  const [options, updateOptions] = useState([]);
  const showState = true;
  const uploadCompanyLogo = "";
  const commercialRecord = "";
  const onSelectUserType = (val) => {
    setTimeout(() => {
      setBuyer(val);
    }, 100);
  };

  const toggleValue = (val) => {
    setToggleAccountType(val);
  };
  console.log(
    countryAlertte,
    acceptTerms,
    Alert,
    toggleAccountType,
    setSubCategoryId,
    setSubSubCategoryId,
    setCategoryId,
    setWorkValue
  );
  const sendDataToParent = (val) => {
    setTimeout(() => {
      setUserTypeId(val);
    }, 100);
    if (userTypeId === "2a9e1d5f-722e-404e-8041-a6a665149e03") {
      setAccountId("d23f2c1e-1ed3-4066-96d6-66a970e39a7f");
    }
  };

  useEffect(() => {
    if(localStorage.getItem("redirectToRegistration")){
      setBuyer(localStorage.getItem("redirectToRegistration"))
    }
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
      (fail) => {},
      false
    );
    getRole(
      currentLanguageId,
      (success) => {
        setRoleList(success.data);
      },
      (fail) => {},
      false
    );
    getAccountType(
      currentLanguageId,
      (success) => {
        setAccountList(success.data);
      },
      (fail) => {},
      false
    );

    getCompanyType(
      currentLanguageId,
      (success) => {
        setCompanyTypes(success.data);
      },
      (fail) => {}
    );

    getWork(
      currentLanguageId,
      (success) => {
        console.log(success.data[0]);
        const data = [];
        success.data.forEach((category, i) => {
          // console.log(category);
          data.push({
            value: category.category.id,
            label: category.category.name,
            children: [],
          });
          category.subCategories.forEach((subCategories, j) => {
            data[i].children.push({
              subvalue: subCategories.subCategory.id,
              label: subCategories.subCategory.name,
              children: [],
            });
            subCategories.subSubCategories.forEach((subSubCategories) => {
              data[i].children[j].children.push({
                subsubvalue: subSubCategories.id,
                label: subSubCategories.name,
              });
            });
          });
        });

        updateOptions(data);
      },
      (fail) => {},
      false
    );
  }, [currentLanguageId, updateOptions]);
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
                  setAdmin(success.data);
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
              setCountryAlert(false);
              //call api to know if company has admin or not (admin>res.data)
              governmentList(
                currentLanguageId,
                country.id,
                (success) => {
                  setGovernmentsName(success.data);
                },
                (fail) => {},
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
              console.log(role.id);
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
  const axioFun = () => {
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

    body.append(roleId && "RoleId", roleId);

    body.append("UserTypeId", userTypeId);

    body.append(
      "AccountTypeId",
      accountId ? accountId : "d23f2c1e-1ed3-4066-96d6-66a970e39a7f"
    );

    body.append("CompanyHasData", admin ? true : false);
    body.append("GovernmentId", governmentId);
    body.append("CategoryId", categoryId);
    body.append("SubCategoryId", subCategoryId);
    body.append("SubSubCategoryId", subSubCategoryId);
    body.append("CompanyTypeId", companyTypeId);
    body.append("CategoriesRequest", companyTypeId);
    register(
      body,
      (success) => {
        console.log(success.data);
        if (success.data === true) {
          localStorage.setItem("mobileNumber", mobileNumber);
          setRedirect(true);
        }
      },
      (fail) => console.log(fail),
      false
    );
  };
  const sendData = (e) => {
    e.preventDefault();
    if (
      buyer === currentLocal.registration.buyer &&
      individual !== "436b77d6-bc46-4527-bc72-ec7fc595e16d" &&
      !admin
    ) {
      console.log("employee");
      if (
        !firstName ||
        !lastName ||
        !mobileNumber ||
        !email ||
        !password ||
        !confirmPassword ||
        !companyId ||
        !checked
      ) {
        console.log("empty");
        setAlert(true);
      } else {
        setAlert(false);
        axioFun();
      }
    } else if (
      buyer === currentLocal.registration.buyer &&
      individual !== "436b77d6-bc46-4527-bc72-ec7fc595e16d" &&
      admin
    ) {
      console.log("admin");
      if (
        !firstName ||
        !lastName ||
        !mobileNumber ||
        !email ||
        !password ||
        !confirmPassword ||
        !companyId ||
        !checked ||
        !fileName ||
        !companyPhoneNumber ||
        !companyTypeId ||
        !roleName||
        !workValue
      ) {
        console.log("empty");
        setAlert(true);
      } else {
        setAlert(false);
        axioFun();
      }
    } else if (
      buyer === currentLocal.registration.buyer &&
      individual === "436b77d6-bc46-4527-bc72-ec7fc595e16d"
    ) {
      console.log("indeven");
      if (
        !firstName ||
        !lastName ||
        !mobileNumber ||
        !email ||
        !password ||
        !confirmPassword ||
        !checked
      ) {
        console.log("empty");
        setAlert(true);
      } else {
        setAlert(false);
        axioFun();
      }
    } else if (buyer === currentLocal.registration.Contractor &&individual !== "436b77d6-bc46-4527-bc72-ec7fc595e16d" &&!admin) {
      console.log("con employee");
      if (
        !firstName ||
        !lastName ||
        !mobileNumber ||
        !email ||
        !password ||
        !confirmPassword ||
        !companyId ||
        !checked ||
        !countryName ||
        !governmentName ||
        !address
      ) {
        console.log("empty");
        setAlert(true);
      } else {
        setAlert(false);
        axioFun();
      }
    } else if (
      buyer === currentLocal.registration.Contractor &&
      individual !== "436b77d6-bc46-4527-bc72-ec7fc595e16d" &&
      admin
    ) {
      console.log("con admin");
      if (
        !firstName ||
        !lastName ||
        !mobileNumber ||
        !email ||
        !password ||
        !confirmPassword ||
        !companyId ||
        !companyPhoneNumber ||
        !companyTypeId ||
        !roleName||
        !fileName ||
        !countryName||
        !governmentName||
        !address||
        !checked ||
        !workValue
      ) {
        console.log("empty");
        setAlert(true);
      } else {
        setAlert(false);
        axioFun();
      }
    }
     else if (buyer === currentLocal.registration.Contractor &&individual === "436b77d6-bc46-4527-bc72-ec7fc595e16d") {
      console.log("con ind");
      if (
        !firstName ||
        !lastName ||
        !mobileNumber ||
        !email ||
        !password ||
        !confirmPassword ||
        !address ||
        !countryName ||
        !governmentName||
        !checked 

      ) {
        console.log("empty");
        setAlert(true);
      } else {
        setAlert(false);
        axioFun();
      }
    } else if (buyer === currentLocal.registration.Supplier && !admin) {
      console.log("sup employee");
      if (
        !firstName ||
        !lastName ||
        !mobileNumber ||
        !companyId||
        !email ||
        !password ||
        !confirmPassword ||
        !address ||
        !countryName ||
        !governmentName||
        !checked 

      ) {
        console.log("empty");
        setAlert(true);
      } else {
        setAlert(false);
        axioFun();
      }
    } else if (buyer === currentLocal.registration.Supplier && admin) {
      console.log("sup admin");
      if (
        !firstName ||
        !lastName ||
        !mobileNumber ||
        !email ||
        !password ||
        !confirmPassword ||
        !address ||
        !countryName ||
        !governmentName||
        !checked ||
        !fileName||
        !companyPhoneNumber||
        !companyTypeName||
        !companyId||
        !roleName||
        !workValue


      ) {
        console.log("empty");
        setAlert(true);
      } else {
        setAlert(false);
        axioFun();
      }

    }

    if (
      !firstName ||
      !lastName ||
      !companyId ||
      !mobileNumber ||
      !email ||
      !password ||
      !confirmPassword ||
      // !companyTypeId ||
      // !companyPhoneNumber ||
      // fileName === false ||
      !checked
    ) {
      setAlert(true);
    }else{
      setAlert(false);
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

      body.append(roleId && "RoleId", roleId);

      body.append("UserTypeId", userTypeId);

      body.append(
        "AccountTypeId",
        accountId ? accountId : "d23f2c1e-1ed3-4066-96d6-66a970e39a7f"
      );

      body.append("CompanyHasData", admin ? true : false);
      body.append("GovernmentId", governmentId);
      body.append("CategoryId", categoryId);
      body.append("SubCategoryId", subCategoryId);
      body.append("SubSubCategoryId", subSubCategoryId);
      body.append("CompanyTypeId", companyTypeId);
      body.append("CategoriesRequest", companyTypeId);
      register(
        body,
        (success) => {
          console.log(success.data);
          if(success.data===true){
            localStorage.setItem("mobileNumber",mobileNumber)
            setRedirect(true)
          }
        },
        (fail) => console.log(fail),
        false
      );
    };
  };

  // const onChangeOption = (e, i) => {
  //   setWorkValue(e.value)
  //   console.log("suphi", e);
  // };
  function onChangeOption(currentNode, selectedNodes) {
    console.log(currentNode);
    console.log(selectedNodes);
    // currentNode: { label, value, children, expanded, checked, className, ...extraProps }
    // selectedNodes: [{ label, value, children, expanded, checked, className, ...extraProps }]
  }
  const onAction = (node, action) => {
    // console.log("onAction::", action, node);
    console.log("bye");
  };
  function searchPredicate(node, searchTerm) {
    console.log(
      node.customData && node.customData.toLower().indexOf(searchTerm)
    );
    return (
      node.customData && node.customData.toLower().indexOf(searchTerm) >= 0
    );
  }
  const onNodeToggle = (currentNode) => {
    // console.log("onNodeToggle::", currentNode);
    console.log("hello");
  };
  if (redirect) {
    return <Redirect to="/verifyByEmail" />;
  }

  return (
    <div className="RegistrationForm ppl ppr">
      <AuthHeader
        title={currentLocal.registration.createAnAccount}
        showState={showState}
        onSelectUserType={onSelectUserType}
        sendDataToParent={sendDataToParent}
        toggleValue={toggleValue}
        alert={alert}
        fistName={firstName}
        lastName={lastName}
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
            <p className="alertMsg">
              {alert && !firstName && <>* Please fill firstName</>}
            </p>
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
            <p className="alertMsg">
              {alert && !lastName && <>* Please fill LastName</>}
            </p>
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
              <p className="alertMsg">
                {alert && !companyName && <>* Please Choose CompanyName</>}
              </p>
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
                onClick={() => setFocusIcon(true)}
                onBlur={() => setFocusIcon(false)}
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
                    <img src={focusIcon ? foucesArrow : Arrow} alt="Arrow" />
                  )}
                </a>
              </Dropdown>
            </Col>
          )}
          {!(
            individual === "436b77d6-bc46-4527-bc72-ec7fc595e16d" ||
            admin === false
          ) && (
            <Col md={12} xs={24} className="work">
              <p className="alertMsg">{alert && <>* Please Choose Work</>}</p>
              <DropdownTreeSelect
                data={options}
                searchPredicate={searchPredicate}
                onChange={onChangeOption}
                onAction={onAction}
                onNodeToggle={onNodeToggle}
                className={
                  !individual && buyer !== currentLocal.registration.Supplier
                    ? "disableInput cascaderFiled"
                    : "cascaderFiled"
                }
                texts={{ placeholder: currentLocal.registration.work }}
                disabled={
                  !individual && buyer !== currentLocal.registration.Supplier
                }
                onClick={() => setFocusIcon(true)}
                onBlur={() => setFocusIcon(false)}
              />
              {!individual && buyer !== currentLocal.registration.Supplier ? (
                <img
                  src={disableArrow}
                  alt="disableArrow"
                  className={currentLanguageId==="46f4621f-9f96-46c7-a2d4-94b4c3393914"?"rightIcon ":"dropDownicon"}
                />
              ) : (
                <img
                  src={focusIcon ? foucesArrow : Arrow}
                  alt="Arrow"
                  className={currentLanguageId==="46f4621f-9f96-46c7-a2d4-94b4c3393914"?"rightIcon ":"dropDownicon"}
                />
              )}
            </Col>
          )}
          <Col md={12} xs={24}>
            <p className="alertMsg">
              {alert && !mobileNumber && <>* Please Choose mobileNumber</>}
            </p>
            <input
              className={
                !individual && buyer !== currentLocal.registration.Supplier
                  ? "disableInput input-field mb-2"
                  : "input-field mb-3"
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
              disabled={
                !individual && buyer !== currentLocal.registration.Supplier
              }
              className={
                checkedWhatsApp ? "disableFiled check-field" : "check-field"
              }
              onChange={(e) => {
                toggleCheckedWhatsApp(e.target.checked);
              }}
            >
              {currentLocal.registration.whatsAppNumber}
            </Checkbox>
          </Col>
          <Col md={12} xs={24}>
            <p className="alertMsg">
              {alert && !email && <>* Please Choose email</>}
            </p>
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
            <p className="alertMsg">
              {alert && !password && <>* Please Choose password</>}
            </p>
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
            <p className="alertMsg">
              {alert && !confirmPassword && <>* Please ConfirmPassword</>}
              {confirmationState && <> * password confirmation doesn't match</>}
            </p>

            <input
              onBlur={() => {
                password !== confirmPassword
                  ? setConfirmationState(true)
                  : setConfirmationState(false);
              }}
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
            admin === false
          ) && (
            <>
              <Col md={12} xs={24}>
                <p className="alertMsg">
                  {alert && !roleName && <>* Please Choose Your Role</>}
                </p>
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
                  onClick={() => setFocusIcon(true)}
                  onBlur={() => setFocusIcon(false)}
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
                      <img src={focusIcon ? foucesArrow : Arrow} alt="Arrow" />
                    )}
                  </a>
                </Dropdown>
              </Col>
              <Col md={12} xs={24} className="companyType">
                <p className="alertMsg">
                  {alert && !companyTypeName && (
                    <>* Please Choose CompanyType</>
                  )}
                </p>
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
                  onClick={() => setFocusIcon(true)}
                  onBlur={() => setFocusIcon(false)}
                >
                  <a
                    href="/"
                    className={
                      !individual &&
                      buyer !== currentLocal.registration.Supplier
                        ? "disableInput ant-dropdown-link"
                        : "ant-dropdown-link"
                    }
                    onClick={(e) => e.preventDefault()}
                  >
                    {companyTypeName
                      ? companyTypeName
                      : currentLocal.registration.organisationLegalStructure}
                    {!individual &&
                    buyer !== currentLocal.registration.Supplier ? (
                      <img src={disableArrow} alt="disableArrow" />
                    ) : (
                      <img src={focusIcon ? foucesArrow : Arrow} alt="Arrow" />
                    )}
                  </a>
                </Dropdown>
              </Col>

              <Col md={12} xs={24}>
                <p className="alertMsg">
                  {alert && !companyPhoneNumber && (
                    <>* Please fill companyPhoneNumber</>
                  )}
                </p>
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
                <p className="alertMsg"></p>
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
            admin === false
          ) && (
            <Col md={12} xs={24}>
              <p className="alertMsg">
                {(alert && !companyWebsite && !individual) ||
                  buyer === currentLocal.registration.buyer ||
                  (buyer !== currentLocal.registration.userType && (
                    <>* Please fill companyWebsite</>
                  ))}
              </p>
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
                placeholder={
                  !individual || buyer === currentLocal.registration.buyer
                    ? currentLocal.registration.companyWebsiteOptional
                    : currentLocal.registration.companyWebsite
                }
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
            admin === false
          ) && (
            <Col md={12} xs={24}>
              <p className="alertMsg"></p>
              <div
                className={
                  !individual && buyer !== currentLocal.registration.Supplier
                    ? "disableInput input-field d-flex justify-content-between align-items-center"
                    : "input-field d-flex justify-content-between align-items-center "
                }
                onClick={() => {
                  // setChangeBorder(true)
                }}
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
                <p className="alertMsg">
                  {alert && !countryName && <>* Please fill country</>}
                </p>
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
                  onClick={() => setFocusIcon(true)}
                  onBlur={() => setFocusIcon(false)}
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
                <p className="alertMsg">
                  {alert && !governmentName && (
                    <>* Please fill governmentName</>
                  )}
                </p>
                <Dropdown
                  onClick={() => {
                    if (!countryName) {
                      setCountryAlert(true);
                    }
                  }}
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
                <p className="alertMsg">
                  {alert && !address && <>* Please fill address</>}
                </p>{" "}
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
          {admin !== false && (
            <Col md={12} xs={24}>
              {/* <p className="alertMsg">
                {(alert &&
                  !fileName &&
                  individual === "436b77d6-bc46-4527-bc72-ec7fc595e16d") ||
                  buyer !== currentLocal.registration.Supplier ||
                  (buyer !== currentLocal.registration.userType && (
                    <>* Please fill commercialRecord </>
                  ))}
              </p> */}
              <p className="alertMsg">
                {alert &&
                  !fileName &&
                  individual !== "436b77d6-bc46-4527-bc72-ec7fc595e16d" && (
                    <>please upload commer</>
                  )}
              </p>
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
                    setFileName(e.target.files[0].name);
                    setFileData(e.target.files[0]);
                    // setFileName(e.target.files[0]);
                  }}
                  style={{ display: "none" }}
                />
                <label htmlFor="file" className="w-100">
                  {buyer !== currentLocal.registration.Supplier &&
                  individual === "436b77d6-bc46-4527-bc72-ec7fc595e16d" ? (
                    <>
                      <div className="d-flex justify-content-between ">
                        <div>
                          {fileName
                            ? fileName
                            : currentLocal.registration
                                .commercialRecordOptional}
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
                          <img src={uploadImg} alt="uploadImg" />{" "}
                        </div>
                      </div>
                    </>
                  )}
                </label>
              </div>
            </Col>
          )}
          <Col md={12} xs={24} className={alert && !checked && "requird"}>
            <p className="alertMsg"></p>
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
                disabled={
                  !individual && buyer !== currentLocal.registration.Supplier
                }
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
