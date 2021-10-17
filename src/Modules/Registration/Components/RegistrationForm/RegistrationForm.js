// import React, { useEffect, useState } from "react";
// import AuthHeader from "../../../Common/AuthHeader/AuthHeader";
// import { useSelector } from "react-redux";
// import "./RegistrationForm.css";
// import { Col, Radio, Row, Checkbox, Menu, Dropdown } from "antd";
// import { CompanyList, CompanyHasAdmin } from "../../Network";
// import disableArrow from "../../../../Resources/Assets/disableArrow.svg";
// import Arrow from "../../../../Resources/Assets/Arrow.svg";
// import uploadImg from "../../../../Resources/Assets/uploadImg.svg";
// import disapleUploadImg from "../../../../Resources/Assets/disapleUploadImg.svg";
// import { Cascader } from "antd";
// function RegistrationForm() {
//   const [buyer, setBuyer] = useState("user Type");
//   const [individual, setIndividual] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [role, setRole] = useState("");
//   const [work, setWork] = useState("");
//   const [country, setCountry] = useState("");
//   const [government, setGovernment] = useState("");
//   const [address, setAddress] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [admin, setAdmin] = useState("");
//   const [whatsNumber, setWhatsNumber] = useState("");
//   const [checkedWhatsApp, toggleCheckedWhatsApp] = useState("");
//   const [organisationLegalStructure, setOrganisationLegalStructure] =
//     useState("");
//   const [companyPhoneNumber, setCompanyPhoneNumber] = useState("");
//   const [companyName, setCompanyName] = useState([]);
//   const [companyMail, setCompanyMail] = useState("");
//   const [acceptTerms, setAcceptTerms] = useState("");
//   const [checked, toggleChecked] = useState("");
//   const [commercialRecord, setCommercialRecord] = useState("");
//   const [uploadCompanyLogo, setUploadCompanyLogo] = useState("");
//   const [companyWebsite, setcompanyWebsite] = useState("");

//   const { currentLocal } = useSelector((state) => state.currentLocal);
//   const { currentLanguageId } = useSelector((state) => state.currentLocal);
//   const showState = true;
//   const options = [
//     {
//       value: "zhejiang",
//       label: "Zhejiang",
//       children: [
//         {
//           value: "hangzhou",
//           label: "Hangzhou",
//           children: [
//             {
//               value: "xihu",
//               label: "West Lake",
//             },
//           ],
//         },
//       ],
//     },
//     {
//       value: "jiangsu",
//       label: "Jiangsu",
//       children: [
//         {
//           value: "nanjing",
//           label: "Nanjing",
//           children: [
//             {
//               value: "zhonghuamen",
//               label: "Zhong Hua Men",
//             },
//           ],
//         },
//       ],
//     },
//   ];
//   function onChange(value) {
//     console.log(value);
//   }

//   const onSelectUserType = (val) => {
//     setTimeout(() => {
//       setBuyer(val);
//     }, 100);
//   };

//   useEffect(() => {
//     CompanyList(
//       currentLanguageId,
//       (success) => {
//         setCompanyName(success.data);
//         setTimeout(() => {
//           console.log(companyName);
//         }, 1000);
//       },
//       (fail) => {},
//       false
//     );
//   }, [currentLanguageId]);

//   const menu = (
//     <Menu>
//       {companyName.map((company) => {
//         return (
//           <Menu.Item
//             key="0"
//             onClick={(e) => {
//               //call api to know if company has admin or not (admin>res.data)
//               CompanyHasAdmin(
//                 company.id,
//                 (success) => {
//                   setAdmin(success.success);
//                 },
//                 (fail) => {},
//                 false
//               );
//             }}
//           >
//             {company.name}
//           </Menu.Item>
//         );
//       })}
//     </Menu>
//   );
//   const countryMenu = (
//     <Menu>
//       {companyName.map((company) => {
//         return (
//           <Menu.Item
//             key="0"
//             onClick={(e) => {
//               //call api to know if company has admin or not (admin>res.data)
//               // CompanyHasAdmin(
//               //   company.id,
//               //   (success) => {
//               //     setAdmin(success.success);
//               //   },
//               //   (fail) => {},
//               //   false
//               // );
//             }}
//           >
//             hu
//           </Menu.Item>
//         );
//       })}
//     </Menu>
//   );
//   const governmentMenu = (
//     <Menu>
//       {companyName.map((company) => {
//         return (
//           <Menu.Item
//             key="0"
//             onClick={(e) => {
//               //call api to know if company has admin or not (admin>res.data)
//               // CompanyHasAdmin(
//               //   company.id,
//               //   (success) => {
//               //     setAdmin(success.success);
//               //   },
//               //   (fail) => {},
//               //   false
//               // );
//             }}
//           >
//             bbb
//           </Menu.Item>
//         );
//       })}
//     </Menu>
//   );
//   const handleChange = (e) => {
//     const id = e.target.id;
//     switch (id) {
//       case "firstName": {
//         setFirstName(e.target.value);
//         break;
//       }
//       case "lastName": {
//         setLastName(e.target.value);
//         break;
//       }
//       default: {
//         break;
//       }
//     }
//   };

//   const sendData = (e) => {
//     e.preventDefault();
//     setIndividual(" ");
//   };
//   console.log(companyName);

//   return (
//     <div className="RegistrationForm ppl ppr">
//       <AuthHeader
//         title={currentLocal.registration.createAnAccount}
//         showState={showState}
//         onSelectUserType={onSelectUserType}
//       />
//       <Row style={{ height: "100px" }}>
//         <Col xs={24}>
//           {buyer !== "Supplies" && (
//             <Radio.Group>
//               <Radio
//                 className={
//                   buyer === currentLocal.registration.userType && "disableRadio"
//                 }
//                 value={"456"}
//                 onChange={(e) => {
//                   setIndividual(e.target.value);
//                 }}
//                 disabled={buyer === currentLocal.registration.userType}
//               >
//                 {currentLocal.registration.individual}
//               </Radio>
//               <Radio
//                 className={
//                   buyer === currentLocal.registration.userType
//                     ? "disableRadio lastRadio"
//                     : "lastRadio"
//                 }
//                 value={"123"}
//                 onChange={(e) => {
//                   setIndividual(e.target.value);
//                 }}
//                 disabled={buyer === currentLocal.registration.userType}
//               >
//                 {currentLocal.registration.company}{" "}
//               </Radio>
//             </Radio.Group>
//           )}
//         </Col>
//       </Row>
//       <form onSubmit={sendData}>
//         <Row>
//           <Col md={12} xs={24}>
//             <input
//               id="firstName"
//               value={firstName}
//               type="text"
//               className={
//                 !individual ? "disableInput input-field" : "input-field"
//               }
//               placeholder={currentLocal.registration.firstName}
//               onChange={handleChange}
//               disabled={!individual}
//             />
//           </Col>
//           <Col md={12} xs={24}>
//             <input
//               type="text"
//               className={
//                 !individual ? "disableInput input-field" : "input-field"
//               }
//               placeholder={currentLocal.registration.lastName}
//               id="lastName"
//               value={lastName}
//               onChange={handleChange}
//               disabled={!individual}
//             />
//           </Col>

//           {!(
//             buyer === currentLocal.registration.buyer && individual === "456"
//           ) && (
//             <Col md={12} xs={24} className="companyName">
//               <Dropdown
//                 overlay={menu}
//                 trigger={["click"]}
//                 className={
//                   !individual ? "disableInput input-field" : "input-field"
//                 }
//                 disabled={!individual}
//               >
//                 <a
//                   href="/"
//                   className="ant-dropdown-link"
//                   onClick={(e) => e.preventDefault()}
//                 >
//                   {currentLocal.registration.companyName}
//                   {!individual ? (
//                     <img src={disableArrow} alt="disableArrow" />
//                   ) : (
//                     <img src={Arrow} alt="Arrow" />
//                   )}
//                 </a>
//               </Dropdown>
//             </Col>
//           )}
//           {!(individual === "456" || admin === true) && (
//             <Col md={12} xs={24}>
//               {/* <input
//                 type="text"
//                 className={
//                   !individual ? "disableInput input-field" : "input-field"
//                 }
//                 placeholder={currentLocal.registration.work}
//                 id="work"
//                 value={work}
//                 onChange={handleChange}
//                 disabled={!individual}
//               />{" "} */}
//               <Cascader
//                 className={
//                   !individual ? "disableInput input-field" : "input-field"
//                 }
//                 options={options}
//                 onChange={onChange}
//                 placeholder="Please select"
//               />
//               ,
//             </Col>
//           )}
//           <Col md={12} xs={24} className="mb-2">
//             <input
//               className={
//                 !individual
//                   ? "disableInput input-field mb-0"
//                   : "input-field mb-0"
//               }
//               placeholder={currentLocal.registration.mobileNumber}
//               type="number"
//               id="mobileNumber"
//               value={mobileNumber}
//               onChange={handleChange}
//               disabled={!individual}
//             />
//             <Checkbox
//               id="whatsNumber"
//               disabled={!individual}
//               className={checkedWhatsApp ? "checked" : "Checkbox-field"}
//               onChange={(e) => {
//                 toggleCheckedWhatsApp(e.target.checked);
//                 setWhatsNumber(e.target.value);
//               }}
//             >
//               {currentLocal.registration.whatsAppNumber}
//             </Checkbox>
//           </Col>
//           <Col md={12} xs={24}>
//             <input
//               type="email"
//               className={
//                 !individual ? "disableInput input-field" : "input-field"
//               }
//               placeholder={currentLocal.registration.email}
//               disabled={!individual}
//               id="email"
//               value={email}
//               onChange={handleChange}
//             />
//           </Col>

//           <Col md={12} xs={24}>
//             <input
//               className={
//                 !individual ? "disableInput input-field" : "input-field"
//               }
//               placeholder={currentLocal.registration.password}
//               disabled={!individual}
//               type="password"
//               id="password"
//               value={password}
//               onChange={handleChange}
//             />
//           </Col>

//           <Col md={12} xs={24}>
//             <input
//               type="password"
//               className={
//                 !individual ? "disableInput input-field" : "input-field"
//               }
//               placeholder={currentLocal.registration.confirmPassword}
//               disabled={!individual}
//               id="confirmPassword"
//               value={confirmPassword}
//               onChange={handleChange}
//             />
//           </Col>
//           {!(individual === "456" || admin === true) && (
//             <>
//               <Col md={12} xs={24}>
//                 <input
//                   type="text"
//                   className={
//                     !individual ? "disableInput input-field" : "input-field"
//                   }
//                   placeholder={currentLocal.registration.role}
//                   id="role"
//                   value={role}
//                   onChange={handleChange}
//                   disabled={!individual}
//                 />
//               </Col>
//               <Col md={12} xs={24}>
//                 <input
//                   className={
//                     !individual ? "disableInput input-field" : "input-field"
//                   }
//                   placeholder={
//                     currentLocal.registration.organisationLegalStructure
//                   }
//                   // placeholder={currentLocal.registration.companyName}
//                   disabled={!individual}
//                   type="text"
//                   id="Organization Legal Structure"
//                   value={organisationLegalStructure}
//                   onChange={handleChange}
//                 />
//               </Col>

//               <Col md={12} xs={24}>
//                 <input
//                   disabled={!individual}
//                   type="number"
//                   className={
//                     !individual ? "disableInput input-field" : "input-field"
//                   }
//                   placeholder={currentLocal.registration.companyPhoneNumber}
//                   id="companyPhoneNumber"
//                   value={companyPhoneNumber}
//                   onChange={handleChange}
//                 />
//               </Col>

//               <Col md={12} xs={24}>
//                 <input
//                   disabled={!individual}
//                   type="email"
//                   className={
//                     !individual ? "disableInput input-field" : "input-field"
//                   }
//                   placeholder={currentLocal.registration.companyMail}
//                   id="companyMail"
//                   value={companyMail}
//                   onChange={handleChange}
//                 />
//               </Col>
//             </>
//           )}
//           {!(
//             buyer === currentLocal.registration.Contractor ||
//             buyer === currentLocal.registration.supplies ||
//             individual === "456" ||
//             admin === true
//           ) && (
//             <Col md={12} xs={24}>
//               <input
//                 disabled={!individual}
//                 type="text"
//                 name="myfile"
//                 className={
//                   !individual ? "disableInput input-field" : "input-field"
//                 }
//                 placeholder={currentLocal.registration.companyWebsite}
//                 id="companyWebsite"
//                 value={companyWebsite}
//                 onChange={handleChange}
//               />
//             </Col>
//           )}
//           {!(individual === "456" || admin === true) && (
//             <Col md={12} xs={24}>
//               <div
//                 className={
//                   !individual
//                     ? "disableInput input-field d-flex justify-content-between align-items-center"
//                     : "input-field d-flex justify-content-between align-items-center"
//                 }
//               >
//                 <input
//                   disabled={!individual}
//                   type="file"
//                   id="files"
//                   // id="uploadCompanyLogo"
//                   value={uploadCompanyLogo}
//                   onChange={handleChange}
//                   style={{ display: "none" }}
//                 />
//                 <label htmlFor="files" className="w-100">
//                   {!individual ? (
//                     <>
//                       <div className="d-flex justify-content-between ">
//                         <div>{currentLocal.registration.uploadCompanyLogo}</div>
//                         <div>
//                           <img src={disapleUploadImg} alt="disapleUploadImg" />
//                         </div>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div className="d-flex justify-content-between align-items-center">
//                         <div>{currentLocal.registration.uploadCompanyLogo}</div>
//                         <div>
//                           <img src={uploadImg} alt="uploadImg" />
//                         </div>
//                       </div>
//                     </>
//                   )}
//                 </label>
//               </div>
//             </Col>
//           )}
//           {(buyer === currentLocal.registration.Contractor ||
//             buyer === currentLocal.registration.supplies) && (
//             <>
//               <Col md={12} xs={24} className="country">
//                 <Dropdown
//                   overlay={countryMenu}
//                   trigger={["click"]}
//                   className={
//                     !individual ? "disableInput input-field" : "input-field"
//                   }
//                   disabled={!individual}
//                 >
//                   <a
//                     href="/"
//                     className="ant-dropdown-link"
//                     onClick={(e) => e.preventDefault()}
//                   >
//                     {currentLocal.registration.country}
//                     {!individual ? (
//                       <img src={disableArrow} alt="disableArrow" />
//                     ) : (
//                       <img src={Arrow} alt="Arrow" />
//                     )}
//                   </a>
//                 </Dropdown>
//               </Col>
//               <Col md={12} xs={24} className="government">
//                 {/* <input
//                   disabled={!individual}
//                   type="text"
//                   className={
//                     !individual ? "disableInput input-field" : "input-field"
//                   }
//                   placeholder={currentLocal.registration.government}
//                   id="government"
//                   value={government}
//                   onChange={handleChange}
//                 /> */}
//                 <Dropdown
//                   overlay={governmentMenu}
//                   trigger={["click"]}
//                   className={
//                     !individual ? "disableInput input-field" : "input-field"
//                   }
//                   disabled={!individual}
//                 >
//                   <a
//                     href="/"
//                     className="ant-dropdown-link"
//                     onClick={(e) => e.preventDefault()}
//                   >
//                     {currentLocal.registration.government}
//                     {!individual ? (
//                       <img src={disableArrow} alt="disableArrow" />
//                     ) : (
//                       <img src={Arrow} alt="Arrow" />
//                     )}
//                   </a>
//                 </Dropdown>
//               </Col>

//               <Col md={12}>
//                 <input
//                   disabled={!individual}
//                   type="text"
//                   className={
//                     !individual ? "disableInput input-field" : "input-field"
//                   }
//                   placeholder={currentLocal.registration.address}
//                   id="address"
//                   value={address}
//                   onChange={handleChange}
//                 />
//               </Col>
//             </>
//           )}
//           {admin !== true && (
//             <Col md={12} xs={24}>
//               {/* <input
//                 disabled={!individual}
//                 type="text"
//                 className={
//                   !individual ? "disableInput input-field" : "input-field"
//                 }
//                 placeholder={currentLocal.registration.commercialRecord}
//                 id="commercialRecord"
//                 value={commercialRecord}
//                 onChange={handleChange}
//               /> */}
//               <div
//                 className={
//                   !individual
//                     ? "disableInput input-field d-flex justify-content-between align-items-center"
//                     : "input-field d-flex justify-content-between align-items-center"
//                 }
//               >
//                 <input
//                   disabled={!individual}
//                   type="file"
//                   id="files"
//                   // id="uploadCompanyLogo"
//                   value={commercialRecord}
//                   onChange={handleChange}
//                   style={{ display: "none" }}
//                 />
//                 <label htmlFor="files" className="w-100">
//                   {!individual ? (
//                     <>
//                       <div className="d-flex justify-content-between ">
//                         <div>{currentLocal.registration.commercialRecord}</div>
//                         <div>
//                           <img src={disapleUploadImg} alt="disapleUploadImg" />
//                         </div>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div className="d-flex justify-content-between align-items-center">
//                         <div>{currentLocal.registration.commercialRecord}</div>
//                         <div>
//                           <img src={uploadImg} alt="uploadImg" />
//                         </div>
//                       </div>
//                     </>
//                   )}
//                 </label>
//               </div>
//             </Col>
//           )}
//           <Col md={12} xs={24}>
//             <Checkbox
//               disabled={!individual}
//               className={
//                 !individual ? "disableFiled check-field" : "check-field"
//               }
//               id="acceptTerms"
//               onChange={(e) => {
//                 toggleChecked(e.target.checked);
//                 setAcceptTerms(e.target.value);
//               }}
//             >
//               {currentLocal.registration.acceptTermsOfServiceAndPrivacyPolicy}
//             </Checkbox>
//           </Col>
//           <div className="button my-3">
//             <div>
//               <button
//                 type="submit"
//                 className={
//                   !individual ? "disable button-primary" : "button-primary"
//                 }
//               >
//                 {currentLocal.registration.register}
//               </button>
//             </div>
//             <div
//               className={
//                 !individual ? "disableCheck checkSignIn" : "checkSignIn"
//               }
//             >
//               {currentLocal.registration.alreadyHaveAnAccount}
//               <a href="/" disabled={!individual}>
//                 {" "}
//                 {currentLocal.registration.signIn}
//               </a>
//             </div>
//           </div>
//         </Row>
//       </form>
//     </div>
//   );
// }

// export default RegistrationForm;
