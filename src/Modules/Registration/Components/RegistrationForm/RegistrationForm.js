import React, { useEffect, useState } from "react";
import AuthHeader from "../../../Common/AuthHeader/AuthHeader";
import { useSelector } from "react-redux";
import "./RegistrationForm.css";
import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";
import { Col, Radio, Row, Checkbox, Menu, Dropdown  } from "antd";

import 'react-dropdown-tree-select/dist/styles.css'
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
  //   const [workValue, setWorkValue] = useState("");
  const [admin, setAdmin] = useState("");
  const [checkedWhatsApp, toggleCheckedWhatsApp] = useState(false);
  const [companyTypes, setCompanyTypes] = useState([]);
  const [companyTypeId, setCompanyTypeId] = useState("");
  const [companyTypeName, setCompanyTypeName] = useState("");
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState("");
  const [companiesName, setCompaniesName] = useState([]);
  const [companyMail, setCompanyMail] = useState("");
  //   const [acceptTerms, setAcceptTerms] = useState("");
  const [checked, toggleChecked] = useState("");
  //   const [countryAlertte, setCountryAlert] = useState(false);
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
  //   const [toggleAccountType, setToggleAccountType] = useState("");
  const [roleId, setRoleId] = useState("");
  const [userTypeId, setUserTypeId] = useState("");
  //   const [categoryId, setCategoryId] = useState("");
  //   const [subCategoryId, setSubCategoryId] = useState("");
  //   const [subSubCategoryId, setSubSubCategoryId] = useState("");
  const [alert, setAlert] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [logoName, setlogoName] = useState("");
  const [fileName, setFileName] = useState("");
  const [logoData, setLogoData] = useState("");
  const [fileData, setFileData] = useState("");
  const [options, updateOptions] = useState([]);
  const [foucesItem, setFoucesItem] = useState("");
  const [mobileState, setMobileState] = useState("");
  const [emailState, setEmailState] = useState("");
  const showState = true;
  const uploadCompanyLogo = "";
  const commercialRecord = "";
  const onSelectUserType = (val) => {
    setTimeout(() => {
      setBuyer(val);
    }, 100);
  };

  const toggleValue = (val) => {
    // setToggleAccountType(val);
  };

  const sendDataToParent = (val) => {
    setTimeout(() => {
      setUserTypeId(val);
    }, 100);
    if (userTypeId === "2a9e1d5f-722e-404e-8041-a6a665149e03") {
      setAccountId("d23f2c1e-1ed3-4066-96d6-66a970e39a7f");
    }
  };

  const data = 
    [
      {
        "label": "VP Accounting",
        "tagClassName": "special",
        "children": [
          {
            "label": "iWay",
            "children": [
              {
                "label": "Universidad de Especialidades del Espíritu Santo"
              },
              {
                "label": "Marmara University"
              },
              {
                "label": "Baghdad College of Pharmacy"
              }
            ]
          },
          {
            "label": "KDB",
            "children": [
              {
                "label": "Latvian University of Agriculture"
              },
              {
                "label": "Dublin Institute of Technology"
              }
            ]
          },
          {
            "label": "Justice",
            "children": [
              {
                "label": "Baylor University"
              },
              {
                "label": "Massachusetts College of Art"
              },
              {
                "label": "Universidad Técnica Latinoamericana"
              },
              {
                "label": "Saint Louis College"
              },
              {
                "label": "Scott Christian University"
              }
            ]
          },
          {
            "label": "Utilization Review",
            "children": [
              {
                "label": "University of Minnesota - Twin Cities Campus"
              },
              {
                "label": "Moldova State Agricultural University"
              },
              {
                "label": "Andrews University"
              },
              {
                "label": "Usmanu Danfodiyo University Sokoto"
              }
            ]
          },
          {
            "label": "Norton Utilities",
            "children": [
              {
                "label": "Universidad Autónoma del Caribe"
              },
              {
                "label": "National University of Uzbekistan"
              },
              {
                "label": "Ladoke Akintola University of Technology"
              },
              {
                "label": "Kohat University of Science and Technology  (KUST)"
              },
              {
                "label": "Hvanneyri Agricultural University"
              }
            ]
          }
        ]
      },
      {
        "label": "Database Administrator III",
        "children": [
          {
            "label": "TFS",
            "children": [
              {
                "label": "University of Jazeera"
              },
              {
                "label": "Technical University of Crete"
              },
              {
                "label":
                  "Ecole Nationale Supérieure d'Agronomie et des Industries Alimentaires"
              },
              {
                "label": "Ho Chi Minh City University of Natural Sciences"
              }
            ]
          },
          {
            "label": "Overhaul",
            "children": [
              {
                "label": "Technological University (Taunggyi)"
              },
              {
                "label": "Universidad de Las Palmas de Gran Canaria"
              },
              {
                "label": "Olympia College"
              },
              {
                "label": "Franklin and Marshall College"
              },
              {
                "label":
                  "State University of New York College of Environmental Science and Forestry"
              }
            ]
          },
          {
            "label": "GTK",
            "children": [
              {
                "label": "Salisbury State University"
              },
              {
                "label":
                  "Evangelische Fachhochschule für Religionspädagogik, und Gemeindediakonie Moritzburg"
              },
              {
                "label": "Kilimanjaro Christian Medical College"
              }
            ]
          },
          {
            "label": "SRP",
            "children": [
              {
                "label": "Toyo Gakuen University"
              },
              {
                "label": "Riyadh College of Dentistry and Pharmacy"
              },
              {
                "label": "Aichi Gakusen University"
              }
            ]
          }
        ]
      },
      {
        "label": "Assistant Manager",
        "children": [
          {
            "label": "Risk Analysis",
            "children": [
              {
                "label": "Seijo University"
              },
              {
                "label": "University of Economics Varna"
              },
              {
                "label": "College of Technology at Riyadh"
              }
            ]
          },
          {
            "label": "UV Mapping",
            "children": [
              {
                "label": "Universidad de La Sabana"
              },
              {
                "label": "Pamukkale University"
              }
            ]
          }
        ]
      },
      // {
      //   "label": "Quality Engineer",
      //   "children": [
      //     {
      //       "label": "Enzyme Kinetics",
      //       "children": [
      //         {
      //           "label": "Universidad del Valle de Guatemala"
      //         },
      //         {
      //           "label":
      //             "Ecole Nationale Supérieure d'Electronique, d'Electrotechnique, d'Informatique et d'Hydraulique de Toulouse"
      //         },
      //         {
      //           "label": "Kota Bharu Polytechnic"
      //         },
      //         {
      //           "label": "College of Technology at Kharj"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "Gastroenterology",
      //       "children": [
      //         {
      //           "label":
      //             "Balochistan University of Engineering and Technology Khuzdar"
      //         },
      //         {
      //           "label": "Université de Cergy-Pontoise"
      //         },
      //         {
      //           "label": "Frederick University"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "ADP Payroll",
      //       "children": [
      //         {
      //           "label": "National University"
      //         },
      //         {
      //           "label": "Ecole de l'Air"
      //         },
      //         {
      //           "label": "Vietnam National University of Agriculture"
      //         },
      //         {
      //           "label":
      //             "St. Petersburg State University of Aerospace Instrumentation"
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   "label": "Senior Sales Associate",
      //   "children": [
      //     {
      //       "label": "RSVP",
      //       "children": [
      //         {
      //           "label": "Islamic Azad University, Ahar"
      //         },
      //         {
      //           "label": "Okinawa International University"
      //         },
      //         {
      //           "label": "Karlshochschule International University"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "IxChariot",
      //       "children": [
      //         {
      //           "label": "Cambodia University of Specialties"
      //         },
      //         {
      //           "label":
      //             "Ecole Supérieure des Techniques Industrielles et des Textiles"
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   "label": "Automation Specialist I",
      //   "children": [
      //     {
      //       "label": "Ffmpeg",
      //       "children": [
      //         {
      //           "label": "Christian Heritage College"
      //         },
      //         {
      //           "label": "Inha University"
      //         },
      //         {
      //           "label": "Khalifa University"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "Mac OS",
      //       "children": [
      //         {
      //           "label": "Prague College"
      //         },
      //         {
      //           "label": "Wakayama Medical College"
      //         },
      //         {
      //           "label": "South University of Science and Technology of China "
      //         },
      //         {
      //           "label": "Campbell University"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "Visual Communication",
      //       "children": [
      //         {
      //           "label": "University of the Cordilleras"
      //         },
      //         {
      //           "label": "University of Mohaghegh"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "PCRF",
      //       "children": [
      //         {
      //           "label": "FPT University"
      //         },
      //         {
      //           "label": "Rakuno Gakuen University"
      //         },
      //         {
      //           "label": "Xiangtan Normal University"
      //         },
      //         {
      //           "label": "Rice University"
      //         },
      //         {
      //           "label": "Sapporo Gakuin University"
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   "label": "Technical Writer",
      //   "children": [
      //     {
      //       "label": "NC-Verilog",
      //       "children": [
      //         {
      //           "label": "Etisalat University College"
      //         },
      //         {
      //           "label": "Newcastle University, Medicine Malaysia "
      //         },
      //         {
      //           "label": "University of Asia Pacific, Dhanmondi"
      //         },
      //         {
      //           "label": "Leading University"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "Water Treatment",
      //       "children": [
      //         {
      //           "label":
      //             "Gorgan University of Agricultural Sciences and Natural Resources"
      //         },
      //         {
      //           "label": "Tianjin Polytechnic University"
      //         },
      //         {
      //           "label": "Universitas Bojonegoro"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "FTO",
      //       "children": [
      //         {
      //           "label": "Université de Skikda"
      //         },
      //         {
      //           "label": "University College of Technology & Innovation (UCTI)"
      //         },
      //         {
      //           "label": "Ahmedabad University"
      //         },
      //         {
      //           "label": "Universidad Intercontinental"
      //         },
      //         {
      //           "label": "Atlantic Union College"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "Vocational Rehabilitation",
      //       "children": [
      //         {
      //           "label": "Cambodia University of Specialties"
      //         },
      //         {
      //           "label": "Universiteit Antwerpen Management School"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "DH+",
      //       "children": [
      //         {
      //           "label": "Universidad de Córdoba"
      //         },
      //         {
      //           "label": "Université Lumière de Bujumbura"
      //         },
      //         {
      //           "label": "Madonna University"
      //         },
      //         {
      //           "label": "University of Washington"
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   "label": "Software Test Engineer IV",
      //   "children": [
      //     {
      //       "label": "Zero Waste",
      //       "children": [
      //         {
      //           "label": "University of Italian Studies for Foreigners of Siena"
      //         },
      //         {
      //           "label": "Klaipeda University"
      //         },
      //         {
      //           "label": "Tallinn University"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "Fixed Assets",
      //       "children": [
      //         {
      //           "label": "North Carolina Central University"
      //         },
      //         {
      //           "label": "Universidad Nacional de San Luis"
      //         },
      //         {
      //           "label": "Baha'i Institute for Higher Education"
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   "label": "Nuclear Power Engineer",
      //   "children": [
      //     {
      //       "label": "Woodworking",
      //       "children": [
      //         {
      //           "label": "National Chiayi University"
      //         },
      //         {
      //           "label": "Tokyo Kasei University"
      //         },
      //         {
      //           "label": "Auchi Polytechnic"
      //         },
      //         {
      //           "label": "Hashemite University"
      //         },
      //         {
      //           "label": "Thomas Jefferson University"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "Psychotherapy",
      //       "children": [
      //         {
      //           "label": "Trident University"
      //         },
      //         {
      //           "label": "Université de N'Djamena"
      //         },
      //         {
      //           "label": "Parsons School of Design"
      //         },
      //         {
      //           "label": "University of San Diego"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "Credit Unions",
      //       "children": [
      //         {
      //           "label": "Tilburg University"
      //         },
      //         {
      //           "label": "Miyazaki University"
      //         },
      //         {
      //           "label": "Ohio State University - Newark"
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   "label": "Media Manager III",
      //   "children": [
      //     {
      //       "label": "BPL",
      //       "children": [
      //         {
      //           "label": "International Burch University"
      //         },
      //         {
      //           "label": "Trinity International University"
      //         },
      //         {
      //           "label": "Universidad Autónoma de Centro América"
      //         },
      //         {
      //           "label": "Evangelische Fachhochschule Nürnberg"
      //         },
      //         {
      //           "label": "Academy of Music, Dance and Fine Arts"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "NVU",
      //       "children": [
      //         {
      //           "label": "University Institute of Modern Languages"
      //         },
      //         {
      //           "label": "Kyungil University"
      //         },
      //         {
      //           "label": "Jimma University"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "Zooarchaeology",
      //       "children": [
      //         {
      //           "label": "Hebei Medical University"
      //         },
      //         {
      //           "label": "Bharath Institue Of Higher Education & Research"
      //         },
      //         {
      //           "label": "Universität Hannover"
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   "label": "Safety Technician IV",
      //   "children": [
      //     {
      //       "label": "IOT",
      //       "children": [
      //         {
      //           "label": "Belarussian National Technical University"
      //         },
      //         {
      //           "label": "Tokyo University of Pharmacy and Life Science"
      //         },
      //         {
      //           "label": "Brickfields Asia College"
      //         },
      //         {
      //           "label": "Samar State University"
      //         },
      //         {
      //           "label": "West Bengal University of Technology"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "Lymphatic Drainage",
      //       "children": [
      //         {
      //           "label": "Free University Amsterdam"
      //         },
      //         {
      //           "label": "Friedrich-Alexander Universität Erlangen-Nürnberg"
      //         },
      //         {
      //           "label": "Sinnar University"
      //         },
      //         {
      //           "label": "Okayama University of Science"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "OLAP Cube Studio",
      //       "children": [
      //         {
      //           "label": "Liaoning Technical University"
      //         },
      //         {
      //           "label": "Instituto Superior D. Afonso III - INUAF"
      //         },
      //         {
      //           "label": "Kossuth Lajos University"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "DSM-IV",
      //       "children": [
      //         {
      //           "label": "Daniel Webster College"
      //         },
      //         {
      //           "label": "University of Athens"
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   "label": "Nuclear Power Engineer",
      //   "children": [
      //     {
      //       "label": "Guest Lecturing",
      //       "children": [
      //         {
      //           "label": "National Pingtung Teachers College"
      //         },
      //         {
      //           "label": "Advance Tertiary College"
      //         },
      //         {
      //           "label":
      //             "Louisiana State University Health Sciences Center New Orleans"
      //         },
      //         {
      //           "label": "University of Shiga Prefecture"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "Ayurveda",
      //       "children": [
      //         {
      //           "label": "Paichai University"
      //         },
      //         {
      //           "label": "Universidad Sergio Arboleda"
      //         },
      //         {
      //           "label": "Lansbridge University"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "Aeronautics",
      //       "children": [
      //         {
      //           "label":
      //             "Ecole Nationale Supérieure d'Ingénieurs en Mécanique et Energétique de Valenciennes"
      //         },
      //         {
      //           "label": "Ajou University"
      //         },
      //         {
      //           "label": "Islamic Azad University, Tehran Science & Research Branch"
      //         },
      //         {
      //           "label": "University of Michigan - Flint"
      //         },
      //         {
      //           "label": "University of Ferrara"
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   "label": "Civil Engineer",
      //   "children": [
      //     {
      //       "label": "Architectural Illustration",
      //       "children": [
      //         {
      //           "label": "Detroit College of Law"
      //         },
      //         {
      //           "label": "European Carolus Magnus University"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "Teaching Writing",
      //       "children": [
      //         {
      //           "label": "Virginia Intermont College"
      //         },
      //         {
      //           "label": "Polytechnic of Namibia"
      //         },
      //         {
      //           "label": "Kigali Independent University"
      //         },
      //         {
      //           "label": "Nepal Sanskrit University"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "MS Excel Pivot Tables",
      //       "children": [
      //         {
      //           "label": "Newcastle University, Medicine Malaysia "
      //         },
      //         {
      //           "label": "National Fisheries University"
      //         },
      //         {
      //           "label": "Université d'Antsiranana"
      //         },
      //         {
      //           "label": "Shenyang Polytechnic University"
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   "label": "Senior Editor",
      //   "children": [
      //     {
      //       "label": "Semantic HTML",
      //       "children": [
      //         {
      //           "label": "Southwest University of Finance and Economics"
      //         },
      //         {
      //           "label": "Civil Aviation University of China"
      //         },
      //         {
      //           "label": "Belarussian State Technological University"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "ASP",
      //       "children": [
      //         {
      //           "label": "Kyoto Tachibana Women's University"
      //         },
      //         {
      //           "label": "Ursuline College"
      //         },
      //         {
      //           "label": "York University"
      //         },
      //         {
      //           "label": "Jewish University in Moscow"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "OCLC Connexion",
      //       "children": [
      //         {
      //           "label": "New York University"
      //         },
      //         {
      //           "label": "Pittsburg State University"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "Rural Marketing",
      //       "children": [
      //         {
      //           "label": "Universidad de Cartagena"
      //         },
      //         {
      //           "label": "Czech University of Agriculture Prague"
      //         },
      //         {
      //           "label": "Tohoku Women's College"
      //         },
      //         {
      //           "label": "Gunma University"
      //         },
      //         {
      //           "label": "Minsk State Linguistic University"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "DDI",
      //       "children": [
      //         {
      //           "label": "Voronezh State Technical University"
      //         },
      //         {
      //           "label": "University Center \"César Ritz\""
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   "label": "Media Manager IV",
      //   "children": [
      //     {
      //       "label": "Yamaha PM5D",
      //       "children": [
      //         {
      //           "label": "Mooreland University"
      //         },
      //         {
      //           "label": "Universidad de San Pablo CEU"
      //         },
      //         {
      //           "label": "Universidad Galileo"
      //         },
      //         {
      //           "label": "College of Technology at Abha"
      //         },
      //         {
      //           "label": "Cabrini College"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "HSE Management Systems",
      //       "children": [
      //         {
      //           "label": "Grinnell College"
      //         },
      //         {
      //           "label": "Chinju National University of Education"
      //         },
      //         {
      //           "label": "Dokkyo University School of Medicine"
      //         },
      //         {
      //           "label": "University of New England, Westbrook College Campus"
      //         },
      //         {
      //           "label": "Miami University of Ohio - Hamilton"
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   "label": "Product Engineer",
      //   "children": [
      //     {
      //       "label": "Multi-Unit",
      //       "children": [
      //         {
      //           "label": "Strayer University"
      //         },
      //         {
      //           "label": "National Kaohsiung University of Applied Sciences"
      //         },
      //         {
      //           "label": "Philadelphia University"
      //         },
      //         {
      //           "label": "National Institute of Mental Health and Neuro Sciences"
      //         },
      //         {
      //           "label": "Vardhaman Mahaveer Open University"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "FX Trading",
      //       "children": [
      //         {
      //           "label": "Universidade Estácio de Sá"
      //         },
      //         {
      //           "label": "Manipal University"
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   "label": "Account Coordinator",
      //   "children": [
      //     {
      //       "label": "Biostatistics",
      //       "children": [
      //         {
      //           "label": "Al-Bukhari International University"
      //         },
      //         {
      //           "label": "Technical University of Denmark"
      //         },
      //         {
      //           "label": "Postgraduate lnstitute of Medical Education and Research"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "FM",
      //       "children": [
      //         {
      //           "label": "University of Oxford"
      //         },
      //         {
      //           "label": "Lawrence University"
      //         },
      //         {
      //           "label": "Okayama University"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "Microsoft Certified Professional",
      //       "children": [
      //         {
      //           "label": "Universidade Católica de Brasília"
      //         },
      //         {
      //           "label": "Georgia Institute of Technology"
      //         },
      //         {
      //           "label": "University of Petrosani"
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   "label": "Payment Adjustment Coordinator",
      //   "children": [
      //     {
      //       "label": "Federal Grants Management",
      //       "children": [
      //         {
      //           "label": "Christ University"
      //         },
      //         {
      //           "label": "Janos Selye University"
      //         },
      //         {
      //           "label": "Zagazig University"
      //         },
      //         {
      //           "label": "Constantin Brancoveanu University Pitesti"
      //         },
      //         {
      //           "label": "Southwest University of Political Science and Law"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "Company Set-up",
      //       "children": [
      //         {
      //           "label": "Ball State University"
      //         },
      //         {
      //           "label": "Mustafa Kemal University"
      //         },
      //         {
      //           "label": "Transylvania University"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "CDMA",
      //       "children": [
      //         {
      //           "label": "College of Telecommunication & Information "
      //         },
      //         {
      //           "label": "Nagasaki Prefectural University"
      //         },
      //         {
      //           "label": "Gustav-Siewerth-Akademie"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "Overhead Cranes",
      //       "children": [
      //         {
      //           "label": "Universidad de Pamplona"
      //         },
      //         {
      //           "label": "Bindura University of Science Education"
      //         },
      //         {
      //           "label": "Daiichi University of Economics"
      //         },
      //         {
      //           "label": "Wirtschaftsuniversität Wien"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "CDO",
      //       "children": [
      //         {
      //           "label": "Design Institute of San Diego"
      //         },
      //         {
      //           "label": "Wellspring University"
      //         },
      //         {
      //           "label": "Franciscan School of Theology"
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   "label": "Assistant Manager",
      //   "children": [
      //     {
      //       "label": "SQL Server Management Studio",
      //       "children": [
      //         {
      //           "label": "University of Sudbury"
      //         },
      //         {
      //           "label":
      //             "Evangelische Fachhochschule Berlin, Fachhochschule für Sozialarbeit und Sozialpädagogik"
      //         },
      //         {
      //           "label": "Vitebsk State University"
      //         },
      //         {
      //           "label": "San Jose Christian College"
      //         },
      //         {
      //           "label": "Ivanovo State University"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "Abstracting",
      //       "children": [
      //         {
      //           "label": "Adeyemi College of Education"
      //         },
      //         {
      //           "label": "Université de Sherbrooke"
      //         },
      //         {
      //           "label": "University College of Applied Sciences"
      //         },
      //         {
      //           "label": "Johns Hopkins University, SAIS Bologna Center"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "WTL",
      //       "children": [
      //         {
      //           "label": "Universidad de Córdoba"
      //         },
      //         {
      //           "label": "Institut National Polytechnique de Grenoble"
      //         },
      //         {
      //           "label": "Kyonggi University"
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   "label": "Professor",
      //   "children": [
      //     {
      //       "label": "People Skills",
      //       "children": [
      //         {
      //           "label": "University of Calcutta"
      //         },
      //         {
      //           "label": "Universidad del Valle del Cauca"
      //         },
      //         {
      //           "label":
      //             "FAST - National University of Computer and Emerging Sciences (NUCES)"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "Workforce Development",
      //       "children": [
      //         {
      //           "label": "Shandong Medical University"
      //         },
      //         {
      //           "label": "Al Khawarizmi International College"
      //         },
      //         {
      //           "label": "Nippon Dental University"
      //         },
      //         {
      //           "label": "Komsomolsk-on-Amur State Technical University"
      //         },
      //         {
      //           "label": "Lingnan University"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "Digital Journalism",
      //       "children": [
      //         {
      //           "label": "The College of St. Scholastica"
      //         },
      //         {
      //           "label": "Universidad Autónoma de la Ciudad de México"
      //         },
      //         {
      //           "label":
      //             "University of Information Technology and Management in Rzeszow"
      //         },
      //         {
      //           "label": "Liaquat University of Medical & Health Sciences Jamshoro"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "Short Films",
      //       "children": [
      //         {
      //           "label": "Universidad Católica de Valencia"
      //         },
      //         {
      //           "label": "Columbia International University"
      //         },
      //         {
      //           "label": "Framingham State College"
      //         },
      //         {
      //           "label": "Gurukul University"
      //         },
      //         {
      //           "label": "NTI University"
      //         }
      //       ]
      //     },
      //     {
      //       "label": "XML Programming",
      //       "children": [
      //         {
      //           "label": "Victoria University"
      //         },
      //         {
      //           "label": "Andrews University"
      //         },
      //         {
      //           "label": "Centre Universitaire d'Oum El Bouaghi"
      //         },
      //         {
      //           "label": "Dilla University"
      //         }
      //       ]
      //     }
      //   ]
      // }
    ]
    
    
  const onChange = (currentNode, selectedNodes) => {
    console.log( currentNode.path);
    console.log(selectedNodes);
  };
  
  const assignObjectPaths = (obj, stack) => {
    Object.keys(obj).forEach(k => {
      const node = obj[k];
      if (typeof node === "object") {
        node.path = stack ? `${stack}.${k}` : k;
        assignObjectPaths(node, node.path);
      }
    });
  };
  
  assignObjectPaths(data);

  useEffect(() => {
    if (localStorage.getItem("redirectToRegistration")) {
      setBuyer(localStorage.getItem("redirectToRegistration"));
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
        // console.log(success.data);
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
        // console.log(success.data[0]);
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
      {companiesName.map((company, companyIndex) => {
        return (
          <Menu.Item
            key={companyIndex}
            onClick={(e) => {
              setCompanyId(company.id);
              setCompanyName(company.name);
              setTimeout(() => {
                CompanyHasAdmin(
                  company.id,
                  (success) => {
                    setAdmin(success.data);
                  },
                  (fail) => {
                    //console.log(fail);
                    // console.log("bye");
                    // setAdmin(success.data);
                  },
                  false
                );
              }, 2000);
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
      {countriesName.map((country, countryIndex) => {
        return (
          <Menu.Item
            key={countryIndex}
            onClick={(e) => {
              setCountryName(country.name);
              //   setCountryAlert(false);
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
      {governmentsName.map((government, governmentIndex) => {
        return (
          <Menu.Item
            key={governmentIndex}
            onClick={(e) => {
              setGovernmentId(government.id);

              setGovernmentName(government.name); //call api to know if company has admin or not (admin>res.data)
    
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
      {roleList.map((role, roleIndex) => {
        return (
          <Menu.Item
            key={roleIndex}
            onClick={(e) => {
              setRoleName(role.name);
              setRoleId(role.id);
              if (role.name === "Employee") {
                setAdmin(true);
              }
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
      {companyTypes.map((companyType, companyIndex) => {
        return (
          <Menu.Item
            key={companyIndex}
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

    body.append("CompanyHasData", !admin);
    body.append("GovernmentId", governmentId);
    body.append("CompanyTypeId", companyTypeId);
    body.append("CategoriesRequest", companyTypeId);
    register(
      body,
      (success) => {
        if (success.success === true) {
          localStorage.setItem("mobileNumber", mobileNumber);
          setRedirect(true);
        } else if (!success.success && success.data.errorStatus === 2) {
          //Mobile usedBefore
          setMobileState(success.message);
        } else if (!success.success && success.data.errorStatus === 1) {
          //Mobile usedBefore
          setEmailState(success.message);
        }
      },
      (fail) => console.log(fail)
    );
  };
  const sendData = (e) => {
    e.preventDefault();
    if (
      buyer === currentLocal.registration.buyer &&
      individual !== "436b77d6-bc46-4527-bc72-ec7fc595e16d" &&
      admin
    ) {
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
        setAlert(true);
      } else {
        setAlert(false);
        axioFun();
      }
    } else if (
      buyer === currentLocal.registration.buyer &&
      individual !== "436b77d6-bc46-4527-bc72-ec7fc595e16d" &&
      !admin
    ) {
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
        !roleName
        // !workValue
      ) {
        setAlert(true);
      } else {
        setAlert(false);
        axioFun();
      }
    } else if (
      buyer === currentLocal.registration.buyer &&
      individual === "436b77d6-bc46-4527-bc72-ec7fc595e16d"
    ) {
      if (
        !firstName ||
        !lastName ||
        !mobileNumber ||
        !email ||
        !password ||
        !confirmPassword ||
        !checked
      ) {
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
        setAlert(true);
      } else {
        setAlert(false);
        axioFun();
      }
    } else if (
      buyer === currentLocal.registration.Contractor &&
      individual !== "436b77d6-bc46-4527-bc72-ec7fc595e16d" &&
      !admin
    ) {
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
        !roleName ||
        !fileName ||
        !countryName ||
        !governmentName ||
        !address ||
        !checked
        // !workValue
      ) {
        setAlert(true);
      } else {
        setAlert(false);
        axioFun();
      }
    } else if (
      buyer === currentLocal.registration.Contractor &&
      individual === "436b77d6-bc46-4527-bc72-ec7fc595e16d"
    ) {
      if (
        !firstName ||
        !lastName ||
        !mobileNumber ||
        !email ||
        !password ||
        !confirmPassword ||
        !address ||
        !countryName ||
        !governmentName ||
        !checked
      ) {
        setAlert(true);
      } else {
        setAlert(false);
        axioFun();
      }
    } else if (buyer === currentLocal.registration.Supplier && admin) {
      if (
        !firstName ||
        !lastName ||
        !mobileNumber ||
        !companyId ||
        !email ||
        !password ||
        !confirmPassword ||
        !address ||
        !countryName ||
        !governmentName ||
        !checked
      ) {
        setAlert(true);
      } else {
        setAlert(false);
        axioFun();
      }
    } else if (buyer === currentLocal.registration.Supplier && !admin) {
      if (
  
        !firstName ||
        !lastName ||
        !companyId ||
        !roleName ||
        !mobileNumber ||
        !email ||
        !password ||
        !confirmPassword ||
        !companyTypeId ||
        !companyPhoneNumber ||
        !countryName ||
        !governmentName ||
        !address ||
        !fileName ||
        !checked
        // !workValue
      ) {
        setAlert(true);
      } else {
        setAlert(false);
        axioFun();
      }
    }
  };


  // const onAction = (node, action) => {
  //   // console.log("onAction::", action, node);
  // };
  // function searchPredicate(node, searchTerm) {
  //   return (
  //     node.customData && node.customData.toLower().indexOf(searchTerm) >= 0
  //   );
  // }
  // const onNodeToggle = (currentNode) => {
  //   // console.log("onNodeToggle::", currentNode);
  // };












  if (redirect) {
    return <Redirect to="/verifyByEmail" />;
  }

  // if (!
  //   (buyer !== currentLocal.registration.userType &&
  //     admin === true &&
  //     individual === "d23f2c1e-1ed3-4066-96d6-66a970e39a7f") ||
  //   !(individual === "436b77d6-bc46-4527-bc72-ec7fc595e16d" &&
  //     buyer === currentLocal.registration.buyer)
  // ) {
  //   console.log("bye");
  // }

  if (
    (admin === false &&
      individual === "d23f2c1e-1ed3-4066-96d6-66a970e39a7f") ||
    (admin === "" && individual === "d23f2c1e-1ed3-4066-96d6-66a970e39a7f") ||
    buyer === currentLocal.registration.userType ||
    (individual === "436b77d6-bc46-4527-bc72-ec7fc595e16d" &&
      buyer === currentLocal.registration.Contractor) ||
    (individual === "436b77d6-bc46-4527-bc72-ec7fc595e16d" &&
      buyer === currentLocal.registration.Supplier)
  ) {
  }

  // (admin === false &&
  //   individual === "d23f2c1e-1ed3-4066-96d6-66a970e39a7f") ||
  //   (admin === "" && individual === "d23f2c1e-1ed3-4066-96d6-66a970e39a7f") ||
  //   buyer === currentLocal.registration.userType ||
  //   (individual === "436b77d6-bc46-4527-bc72-ec7fc595e16d" &&
  //     buyer === currentLocal.registration.Contractor) ||
  //   (individual === "436b77d6-bc46-4527-bc72-ec7fc595e16d" &&
  //     buyer === currentLocal.registration.Supplier &&
  //     console.log("hi"));
  // console.log(
  //   (individual === "d23f2c1e-1ed3-4066-96d6-66a970e39a7f" &&
  //     admin === false) ||
  //     (individual === "436b77d6-bc46-4527-bc72-ec7fc595e16d" &&
  //       buyer === currentLocal.registration.Contractor)
  // );
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
              {accountList.map((account, accoundIndex) => {
                return (
                  <Radio
                    key={accoundIndex}
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
              {alert && !firstName && (
                <>{currentLocal.registration.pleaseFillFirstName}</>
              )}
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
              {alert && !lastName && (
                <>{currentLocal.registration.pleaseFillLastName}</>
              )}
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
                {alert && !companyName && (
                  <>{currentLocal.registration.pleaseChooseCompanyName}</>
                )}
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
                onClick={(e) => {
                  setFoucesItem(e.target.id);
                  setFocusIcon(true);
                }}
                onBlur={() => setFocusIcon(false)}
              >
                <a
                  href="/"
                  id="companyName"
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
                    <img
                      src={
                        focusIcon && foucesItem === "companyName"
                          ? foucesArrow
                          : Arrow
                      }
                      alt="Arrow"
                    />
                  )}
                </a>
              </Dropdown>
            </Col>
          )}
          {individual !== "436b77d6-bc46-4527-bc72-ec7fc595e16d" && !admin && (
            <>
              <Col md={12} xs={24}>
                <p className="alertMsg">
                  {alert && !roleName && (
                    <>{currentLocal.registration.pleaseChooseYourRole}</>
                  )}
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
                  onClick={(e) => {
                    setFoucesItem(e.target.id);
                    setFocusIcon(true);
                  }}
                  onBlur={() => setFocusIcon(false)}
                >
                  <a
                    href="/"
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                    id="role"
                  >
                    {roleName ? roleName : currentLocal.registration.role}
                    {!individual &&
                    buyer !== currentLocal.registration.Supplier ? (
                      <img src={disableArrow} alt="disableArrow" />
                    ) : (
                      <img
                        src={
                          focusIcon && foucesItem === "role"
                            ? foucesArrow
                            : Arrow
                        }
                        alt="Arrow"
                      />
                    )}
                  </a>
                </Dropdown>
              </Col>
            </>
          )}
          {((individual === "436b77d6-bc46-4527-bc72-ec7fc595e16d" &&
            buyer === currentLocal.registration.Contractor) ||
            (individual !== "436b77d6-bc46-4527-bc72-ec7fc595e16d" &&
              !admin)) && (
            <Col md={12} xs={24} className="work">
              <p className="alertMsg">
                {alert && <>{currentLocal.registration.PleaseChooseWork}</>}
              </p>
              {/* <DropdownTreeSelect
                data={options}
                onChange={(currentNode, selectedNodes) => {
                  console.log("onChange::", currentNode, selectedNodes);
                }}
                // searchPredicate={searchPredicate}
                // onChange={onChangeOption}
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
              /> */}
              {!individual && buyer !== currentLocal.registration.Supplier ? (
                <img
                  src={disableArrow}
                  alt="disableArrow"
                  className={
                    currentLanguageId === "46f4621f-9f96-46c7-a2d4-94b4c3393914"
                      ? "rightIcon "
                      : "dropDownicon"
                  }
                />
              ) : (
                <img
                  src={focusIcon ? foucesArrow : Arrow}
                  alt="Arrow"
                  className={
                    currentLanguageId === "46f4621f-9f96-46c7-a2d4-94b4c3393914"
                      ? "rightIcon "
                      : "dropDownicon"
                  }
                />
              )}
            </Col>
          )}
          <Col md={12} xs={24}>
            <p className="alertMsg">
              {alert && !mobileNumber && (
                <>{currentLocal.registration.pleaseFillmobileNumber}</>
              )}
              {mobileState && mobileState}
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
                setMobileState("");
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
              {alert && !email && (
                <>{currentLocal.registration.pleaseFillEmail}</>
              )}
              {emailState && emailState}
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
                setEmailState("");
              }}
            />
          </Col>

          <Col md={12} xs={24}>
            <p className="alertMsg">
              {alert && !password && (
                <>{currentLocal.registration.pleaseFillPassword}</>
              )}
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
              {alert && !confirmPassword && (
                <>{currentLocal.registration.pleaseFillConfirmPassword}</>
              )}
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
          {individual !== "436b77d6-bc46-4527-bc72-ec7fc595e16d" && !admin && (
            <>
              <Col md={12} xs={24} className="companyType">
                <p className="alertMsg">
                  {alert && !companyTypeName && (
                    <>{currentLocal.registration.pleaseChooseCompanyType}</>
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
                  onClick={(e) => {
                    setFoucesItem(e.target.id);
                    setFocusIcon(true);
                  }}
                  onBlur={() => setFocusIcon(false)}
                >
                  <a
                    href="/"
                    id="organisationLegalStructure"
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
                      <img
                        src={
                          focusIcon &&
                          foucesItem === "organisationLegalStructure"
                            ? foucesArrow
                            : Arrow
                        }
                        alt="Arrow"
                      />
                    )}
                  </a>
                </Dropdown>
              </Col>

              <Col md={12} xs={24}>
                <p className="alertMsg">
                  {alert && !companyPhoneNumber && (
                    <>
                      {currentLocal.registration.pleaseFillCompanyPhoneNumber}
                    </>
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
            admin === true
          ) && (
            <Col md={12} xs={24}>
              <p className="alertMsg">
                {(alert && !companyWebsite && !individual) ||
                  buyer === currentLocal.registration.buyer ||
                  (buyer !== currentLocal.registration.userType && (
                    <>{currentLocal.registration.pleaseFillCompanyWebsite}</>
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
            admin === true
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
          {((admin === false &&
            individual === "d23f2c1e-1ed3-4066-96d6-66a970e39a7f") ||
            individual === "d23f2c1e-1ed3-4066-96d6-66a970e39a7f" ||
            (buyer === currentLocal.registration.Contractor &&
              individual === "436b77d6-bc46-4527-bc72-ec7fc595e16d") ||
            buyer === currentLocal.registration.userType) && (
            <>
              <Col md={12} xs={24} className="country">
                <p className="alertMsg">
                  {alert && !countryName && (
                    <>{currentLocal.registration.pleaseFillCountry}</>
                  )}
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
                  onClick={(e) => {
                    setFoucesItem(e.target.id);
                    setFocusIcon(true);
                  }}
                  onBlur={() => setFocusIcon(false)}
                >
                  <a
                    id="country"
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
                      <img
                        src={
                          focusIcon && foucesItem === "country"
                            ? foucesArrow
                            : Arrow
                        }
                        alt="Arrow"
                      />
                    )}
                  </a>
                </Dropdown>
              </Col>
              <Col md={12} xs={24} className="government">
                <p className="alertMsg">
                  {alert && !governmentName && (
                    <>{currentLocal.registration.pleaseChooseGovernorate}</>
                  )}
                </p>
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
                  onClick={(e) => {
                    setFoucesItem(e.target.id);
                    setFocusIcon(true);
                  }}
                  onBlur={() => setFocusIcon(false)}
                >
                  <a
                    id="government"
                    href="/"
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    {governmentName
                      ? governmentName
                      : currentLocal.registration.governorate}
                    {!individual &&
                    buyer !== currentLocal.registration.Supplier ? (
                      <img src={disableArrow} alt="disableArrow" />
                    ) : (
                      // <img src={Arrow} alt="Arrow" />
                      <img
                        src={
                          focusIcon && foucesItem === "government"
                            ? foucesArrow
                            : Arrow
                        }
                        alt="Arrow"
                      />
                    )}
                  </a>
                </Dropdown>
              </Col>

              <Col md={12} xs={24}>
                <p className="alertMsg">
                  {alert && !address && (
                    <>{currentLocal.registration.pleaseFillAddress}</>
                  )}
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
          {admin === false && (
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
                    <>
                      {currentLocal.registration.pleaseUploadCommercialRecord}
                    </>
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
                // setAcceptTerms(e.target.value);
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
          <Col>
          <DropdownTreeSelect
      data={data}
      onChange={onChange}
      className="bootstrap-demo"
    />
           </Col>
        </Row>
      </form>
    </div>
  );
}

export default RegistrationForm;
