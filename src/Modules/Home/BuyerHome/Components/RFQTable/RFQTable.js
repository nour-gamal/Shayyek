import React, { useState, useEffect } from "react";
import { isEqual, isObject } from "lodash";
import importIcon from "../../../../../Resources/Assets/import.svg";
import addIcon from "../../../../../Resources/Assets/addIcon.svg";
import Garbage from "../../../../../Resources/Assets/garbage.svg";
import { useSelector } from "react-redux";
import CCEmailsModal from "../CCEmailsModal/CCEmailsModal";
import datePickerSuffix from "../../../../../Resources/Assets/datePickerSuffix.svg";
import { ExcelRenderer } from "react-excel-renderer";
import PackageIcon from "../../../../../Resources/Assets/package-with-bg.jsx";
import { Alert } from "react-bootstrap";
import moment from "moment";
import { Table, Spin, Select, Checkbox, DatePicker, Radio } from "antd";
import {
  getCategories,
  getDeliverdOptions,
  AddDocumentList,
  GetBuyerRFQForEdit,
  editRFQPackage,
} from "../../../network";
import DeleteModal from "../DeleteModal/DeleteModal";
import documents from "../../../../../Resources/Assets/paperClip.svg";
import { GetImagePath } from "../../../../ProfilePage/network";
import { baseUrl } from "../../../../../Services";
import FileErrorModal from "../FileErrorModal/FileErrorModal";
import AddPackage from "../AddPackage/AddPackage";
import PostRFQSuccessModal from "../PostRFQSuccessModal/PostRFQSuccessModal";
import pdfIcon from "../../../../../Resources/Assets/pdfs.png";
import docIcon from "../../../../../Resources/Assets/doc.svg";
import excel from "../../../../../Resources/Assets/excel.svg";
import autocad from "../../../../../Resources/Assets/autocad.svg";
import close from "../../../../../Resources/Assets/tip-close.svg";
import "./RFQTable.css";
import { toast } from "react-toastify";

function CreateRFQ({ getRFQPageName, rfqId }) {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const { currentLanguageId } = useSelector((state) => state.currentLocal);
  const [categoriesOption, setCategoriesOption] = useState([]);
  const [dataSource, updateDataSource] = useState([]);
  const [allCategoryName, setAllCategoryName] = useState(null);
  const [deliveredTo, updateDeliveredTo] = useState(
    "a9c83c89-4aeb-46b8-b245-a144276d927f"
  );
  const [notes, updateNotes] = useState("");
  const [isAddPackModalVis, updateIsAddPackModalVis] = useState(false);
  const [alert, setAlert] = useState(false);
  const [selectedRow, updateSelectedRow] = useState(null);
  const [address, updateAddress] = useState("");
  const [recievingOffersDate, setOffersDate] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newItemAdded, updateItemAdded] = useState(false);
  const [isModalVisible, toggleModal] = useState(false);
  const [notContainCategory, updateNotContainCategory] = useState(false);
  const [installAll, updateInstallAll] = useState(false);
  const [deliveredToOptions, updateDeliveryOptions] = useState([]);
  const [hoveredRow, updateHoveredRow] = useState(null);
  const [isDeleteRowModal, updateDeleteRowModal] = useState(false);
  const [deletedIndex, updateDeletedIndex] = useState(null);
  const [deletedRowsList, updateDeleteRowsList] = useState([]);
  const [indexState, updateIndexState] = useState(false);
  const [fileErrorModalState, updateFileErrorModalState] = useState(false);
  const [packageName, updatePackageName] = useState("");
  const [ccEmails, updateCCEmails] = useState([]);
  const [ccEmailsIDs, updateCCEmailsIDs] = useState([]);
  const [isSuccessModalvis, updateSuccessModalVis] = useState(false);
  const [documentsList, updateDocumentsList] = useState([]);
  const [packageFiles, updatePackageFiles] = useState([]);
  const [docLoadingState, updateDocLoadingState] = useState(false);
  const [rfqDetails, updateRFQDetails] = useState({});
  const [activePackgeId, setActivePackgeId] = useState(null);
  const [rfqForEdit, setRfqForEdit] = useState(null);
  const [filledPackagesForEdit, setFilledPackagesForEdit] = useState([]);
  const { rfqData } = useSelector((state) => state.rfq);

  // edit rfq
  useEffect(() => {
    if (rfqId) {
      GetBuyerRFQForEdit(
        rfqId,
        (success) => {
          if (success.success) {
            setRfqForEdit(success.data);
            const rfqPackages = success.data?.rfqPackageRequests;
            let arr = new Array(rfqPackages.length);
            setFilledPackagesForEdit(arr);
            setActivePackgeId(rfqPackages[0]?.packageId);
          }
        },
        (fail) => {}
      );
    }
  }, [rfqId]);

  useEffect(() => {
    if (!rfqId) {
      let options = [];
      getDeliverdOptions(
        currentLanguageId,
        (success) => {
          success.data.forEach((data) => {
            options.push({
              label: data.name,
              value: data.id,
            });
          });
          updateDeliveryOptions(options);
        },
        (fail) => {
          console.log(fail);
        }
      );
    }
  }, [currentLanguageId, rfqId]);

  var index = {
    item: null,
    notes: null,
    description: null,
    quantity: null,
    unit: null,
    categoryId: null,
  };

  const { Option } = Select;

  const onDeleteRow = () => {
    let tableData = dataSource;

    if (tableData[deletedIndex].rfqDetailId) {
      updateDeleteRowsList([
        ...deletedRowsList,
        tableData[deletedIndex].rfqDetailId,
      ]);
    }
    tableData.splice(deletedIndex, 1);

    updateDataSource(tableData);
    updateDeleteRowModal(false);
    updateIndexState(true);
  };

  function handleCategoriesChange(optionId, rowIndex) {
    let data = [...dataSource];
    data[rowIndex].categoryId = optionId;
    updateDataSource(data);
  }

  function changeCategoryForAll(optionId, optionName) {
    let data = [...dataSource];
    data.forEach((row) => {
      row.categoryId = optionId;
    });

    updateDataSource(data);
    setAllCategoryName(optionName);
  }

  function handleIncludeInstallation(e, rowIndex) {
    let data = [...dataSource];
    if (installAll && !e.target.checked) {
      updateInstallAll(false);
    }

    data[rowIndex].isInstallSupplierAndContructor = e.target.checked;
    updateDataSource(data);
  }
  function handleInstallAll(e) {
    updateInstallAll(!installAll);

    let data = [...dataSource];
    data.forEach((row, rowIndex) => {
      data[rowIndex].isInstallSupplierAndContructor = e.target.checked;
      updateDataSource(data);
    });
    updateDataSource(data);
  }
  function handleDeliveredTo(e) {
    updateDeliveredTo(e.target.value);
  }
  const addNewItem = () => {
    const key = Math.ceil(Math.random() * 999999999);
    updateDataSource([
      ...dataSource,
      {
        key,
        item: null,
        description: "",
        quantity: 1,
        unit: "",
        preferredBrands: "",
        isInstallSupplierAndContructor: false,
        actionStatus: 1,
        filePath: "",
      },
    ]);
    updateIndexState(true);
    updateItemAdded(true);
    setTimeout(() => {
      updateItemAdded(false);
    }, 3000);
  };

  function disabledOffersDate(current) {
    return current && current.valueOf() < Date.now();
  }

  function disabledDeliveryDate(current) {
    return (
      current && current.valueOf() < new Date(recievingOffersDate).valueOf()
    );
  }

  function handleConfirm() {
    const hasNoCat = dataSource.every((data) => {
      return data.categoryId === undefined;
    });
    if (hasNoCat) {
      updateNotContainCategory(true);
    } else {
      updateNotContainCategory(false);
    }
    if (
      address.length === 0 ||
      recievingOffersDate === null ||
      deliveryDate === null ||
      hasNoCat
    ) {
      setAlert(true);
    } else {
      let allData = {
        ...rfqData,
        rfqPackages: [
          ...rfqData.rfqPackages,
          {
            rfqPackageDetailsRequests: [...dataSource],
            packageName: packageName.length ? packageName : "Default",
            notes: notes,
            receivingOffersDeadline: recievingOffersDate,
            deliveryDate: deliveryDate,
            address: address,
            deliveryToId: deliveredTo,
            packageCCColleagues: [...ccEmailsIDs],
            packageFiles,
          },
        ],
      };

      updateRFQDetails(allData);
      updateSuccessModalVis(!isSuccessModalvis);
    }
  }

  function openCCModal() {
    toggleModal(true);
  }

  const fileHandler = (event) => {
    let fileObj = event.target.files[0];
    setLoading(true);
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        //Loop to indicate the index of each row
        resp.rows[0].forEach((item, itemIndex) => {
          switch (item.toLowerCase().trim()) {
            // case "item":
            // case "Item No.":
            // case "code":
            // case "code No.":
            // case "section":
            // case "section No.":
            // case "رقم":
            // case "الرقم":
            // case "البند":
            // case "بند":
            // case "رقم البند": {
            // 	index.item = itemIndex;
            // 	break;
            // }
            case "description":
            case "specifications":
            case "specs":
            case "specs.":
            case "وصف الاعمال":
            case "المواصفة":
            case "الوصف":
            case "وصف الأعمال":
            case "المواصفه":
            case "الأعمال":
            case "الاعمال": {
              index.description = itemIndex;
              break;
            }
            case "unit":
            case "الوحده":
            case "الوحد": {
              index.unit = itemIndex;
              break;
            }
            case "qty":
            case "quantity":
            case "qty.":
            case "العدد":
            case "الكمية": {
              index.quantity = itemIndex;
              break;
            }

            default: {
              break;
            }
          }

          if (resp.rows[0].length - 1 === itemIndex) {
            setLoading(false);
          }
        });

        resp.rows[0].forEach((item) => {
          columns.forEach((col, colIndex) => {
            if (item.toLowerCase() === col.dataIndex && colIndex === 0) {
              resp.rows.forEach((name, rowIndex) => {
                if (rowIndex !== 0) {
                  updateDataSource((oldDataSource) => [
                    ...oldDataSource,
                    {
                      key: Math.ceil(Math.random() * 111111111),
                      item: name[index.item],
                      description: name[index.description],
                      unit: name[index.unit],
                      quantity:
                        typeof name[index.quantity] === "string" ||
                        name[index.quantity] === undefined
                          ? 1
                          : name[index.quantity],
                      isInstallSupplierAndContructor: false,
                      preferredBrands: null,
                      filePath: "",
                    },
                  ]);
                }
              });
            }
          });
        });
        updateIndexState(true);
      }
    });
  };

  useEffect(() => {
    let data = [];
    for (let index = 0; index <= 4; index++) {
      data.push({
        key: index,
        item: "",
        description: "",
        quantity: 1,
        unit: "",
        preferredBrands: "",
        isInstallSupplierAndContructor: false,
        filePath: "",
      });
    }
    updateIndexState(true);
    updateDataSource(data);

    getCategories(
      currentLanguageId,
      (success) => {
        setCategoriesOption(success.data);
      },
      (fail) => {
        console.log(fail);
      }
    );
  }, [currentLanguageId]);

  useEffect(() => {
    if (indexState) {
      updateIndexState(false);
      let tableData = dataSource;
      tableData.forEach((data, dataIndex) => {
        data.item = dataIndex.toString();
      });
      updateDataSource(tableData);
    }
  }, [indexState, dataSource]);

  const handleUploadItemDoc = (e) => {
    console.log(e.target.files[0]);
    var isValidExtensions = /xlsx|xlsm|xlsb|xltx|xltm|xls|xlt|xls|xml|xlam|xlw|xlr|xla|ms-excel|dwg|DWG|DOC|doc|PDF|pdf/.test(
      e.target.files[0].type || e.target.files[0].name
    );

    if (!isValidExtensions) {
      updateFileErrorModalState(true);
      return 0;
    }

    setLoading(true);
    const documentfile = e.target.files[0];
    let file = new FormData();
    file.append("image", documentfile);
    file.append("status", 4);
    GetImagePath(
      file,
      (success) => {
        setLoading(false);
        let tableData = [...dataSource];
        tableData[hoveredRow].filePath = success.data;
        updateDataSource(tableData);
      },
      (fail) => {
        console.log(fail);
      }
    );
  };

  const handleAddProjectFiles = (e) => {
    let files = [...e.target.files];
    let regex = /xlsx|xlsm|xlsb|xltx|xltm|xls|xlt|xls|xml|xlam|xlw|xlr|xla|ms-excel|dwg|DWG|DOC|doc|PDF|pdf/;
    var validFiles = files.filter((file) => regex.test(file.type || file.name));

    if (!validFiles.length) {
      updateFileErrorModalState(true);
      return 0;
    } else {
      updateDocLoadingState(true);
      let filesData = new FormData();
      files.forEach((file, index) => {
        console.log(file);
        filesData.append(`documents`, file);
      });
      AddDocumentList(
        filesData,
        (success) => {
          updatePackageFiles(success.data);
          updateDocumentsList(files);
          updateDocLoadingState(false);
        },
        (fail) => {
          console.log(fail);
        }
      );
    }
  };

  const columns = [
    {
      title: currentLocal.buyerHome.item,
      dataIndex: "item",
      key: "item",
      render: (item, record, index) => {
        return (
          <div className="d-flex">
            <img
              src={Garbage}
              alt="Garbage"
              className={
                index === hoveredRow
                  ? "cursorPointer showshowGarbage"
                  : "cursorPointer hideGarbage"
              }
              onClick={() => {
                updateDeleteRowModal(true);
                updateDeletedIndex(index);
              }}
            />
            {/* <textarea
							type="text"
							onChange={(e) => {
								let data = [...dataSource];
								data[selectedRow].item = e.target.value;
								updateDataSource(data);
							}}
							className="form-control"
							value={item}
							disabled={
								id !== "new" && record.actionStatus !== 1 ? true : false
							}
						/> */}
            <div>{item}</div>
          </div>
        );
      },
    },
    {
      title: currentLocal.buyerHome.description,
      dataIndex: "description",
      key: "description",
      render: (description, record) => {
        return (
          <textarea
            disabled={rfqId}
            onChange={(e) => {
              let data = [...dataSource];
              data[selectedRow].description = e.target.value;
              updateDataSource(data);
            }}
            className="form-control"
            value={description}
          />
        );
      },
    },
    {
      title: currentLocal.buyerHome.unit,
      dataIndex: "unit",
      key: "unit",
      render: (unit, record) => {
        return (
          <textarea
            disabled={rfqId}
            type="text"
            onChange={(e) => {
              let data = [...dataSource];
              data[selectedRow].unit = e.target.value;
              updateDataSource(data);
            }}
            className="form-control"
            value={unit}
          />
        );
      },
    },
    {
      title: currentLocal.buyerHome.quantity,
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => {
        return (
          <input
            disabled={rfqId}
            type="number"
            alt="quantity"
            onChange={(e) => {
              let data = [...dataSource];
              data[selectedRow].quantity = e.target.value;
              updateDataSource(data);
            }}
            className={"form-control"}
            value={quantity}
          />
        );
      },
    },
    {
      title: currentLocal.buyerHome.preferredBrands,
      dataIndex: "preferredBrands",
      key: "preferredBrands",
      render: (preferredBrands, record) => {
        return (
          <textarea
            disabled={rfqId}
            type="text"
            onChange={(e) => {
              let data = [...dataSource];
              data[selectedRow].preferredBrands = e.target.value;
              updateDataSource(data);
            }}
            className="form-control"
            value={preferredBrands}
          />
        );
      },
    },
    {
      title: currentLocal.buyerHome.categories,
      dataIndex: "categoryId",
      key: "categoryId",
      render: (categoryId, record, rowIndex) => {
        const props = {};
        if (rfqId) props.value = categoryId;
        else props.defaultValue = categoryId;
        return (
          <Select
            disabled={rfqId}
            style={{ width: "100%" }}
            {...props}
            placeholder={
              allCategoryName
                ? allCategoryName
                : currentLocal.buyerHome.selectCategory
            }
            onChange={(optionId, x) => {
              handleCategoriesChange(optionId, rowIndex);
            }}
            className="selectCategory"
          >
            {categoriesOption.map((category, key) => {
              return (
                <Option value={category.id} key={key}>
                  {category.name}
                </Option>
              );
            })}
          </Select>
        );
      },
    },
    {
      title: currentLocal.buyerHome.includeInstallation,
      dataIndex: "isInstallSupplierAndContructor",
      key: "isInstallSupplierAndContructor",
      render: (isInstallSupplierAndContructor, record, rowIndex) => {
        return (
          <Checkbox
            disabled={rfqId}
            checked={isInstallSupplierAndContructor}
            onChange={(checkVal) => {
              handleIncludeInstallation(checkVal, rowIndex);
            }}
          />
        );
      },
    },
    {
      title: currentLocal.buyerHome.itemDocuments,
      dataIndex: "filePath",
      key: "filePath",
      render: (filePath, item) => {
        return (
          <div>
            {filePath.length ? (
              <a href={baseUrl + filePath}>{filePath.split(" ")[1]}</a>
            ) : (
              <div>
                <input
                  disabled={rfqId}
                  type={"file"}
                  className="d-none"
                  id="itemDocument"
                  onChange={(e) => {
                    handleUploadItemDoc(e);
                  }}
                />
                <label
                  className={`d-flex ${rfqId ? "" : "cursorPointer"}`}
                  htmlFor="itemDocument"
                >
                  <div className="mx-2">{currentLocal.buyerHome.addFile}</div>
                  <img src={documents} alt="documents" />
                </label>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  const handleDeleteDoc = (deletedIndex) => {
    let documentsListArr = [...documentsList];
    let packageFilesArr = [...packageFiles];

    documentsListArr.splice(deletedIndex, 1);
    packageFilesArr.splice(deletedIndex, 1);
    updateDocumentsList(documentsListArr);
    updatePackageFiles(packageFilesArr);
    // const [documentsList, updateDocumentsList] = useState([]);
    // const [packageFiles, updatePackageFiles] = useState([]);
  };

  function selectPackageToEdit(packageId) {
    let selectedPackage = rfqForEdit?.rfqPackageRequests?.filter(
      (item) => item.packageId === packageId
    );

    setActivePackgeId(packageId);
    updateDataSource(selectedPackage[0].rfqPackageDetailsRequests);
    setDeliveryDate(selectedPackage[0].deliveryDate);
    setOffersDate(selectedPackage[0].receivingOffersDeadline);
    updateNotes(selectedPackage[0].notes);
    updateAddress(selectedPackage[0].address);
    updateDeliveredTo(selectedPackage[0].deliveryToId);
    updateDocumentsList(selectedPackage[0].packageFiles);
    updatePackageFiles(selectedPackage[0].packageFiles);
    updatePackageName(selectedPackage[0].packageName);
    updateCCEmails(selectedPackage[0].packageCCColleagues);
  }

  useEffect(() => {
    if (activePackgeId !== null) {
      selectPackageToEdit(activePackgeId);
    }
  }, [activePackgeId]);

  function saveEditInPackage() {
    let sentPackageFiles = packageFiles.map((item) =>
      isObject(item) ? item.path : item
    );

    const payload = {
      rfqPackage: {
        rfqPackageDetailsRequests: dataSource,
        packageName,
        notes,
        receivingOffersDeadline: recievingOffersDate,
        deliveryDate,
        address,
        deliveryToId: deliveredTo,
        packageCCColleagues: [...ccEmails],
        packageFiles: sentPackageFiles,
        packageId: activePackgeId,
        DeletedRFQPackageDetails: [],
      },
    };

    editRFQPackage(
      payload,
      (success) => {
        if (success.success) {
          toast.success(success.message, {
            position: "bottom-right",
          });
          GetBuyerRFQForEdit(
            rfqId,
            (success) => {
              if (success.success) {
                setRfqForEdit(success.data);
              }
            },
            (fail) => {}
          );
        } else {
          toast.error(success.message, {
            position: "bottom-right",
          });
        }
      },
      (fail) => {
        toast.error(fail.data.message, {
          position: "bottom-right",
        });
      }
    );
  }

  function discardEditPackage(packageId) {
    GetBuyerRFQForEdit(
      rfqId,
      (success) => {
        if (success.success) {
          setRfqForEdit(success.data);
          const rfqPackages = success.data?.rfqPackageRequests;
          let arr = new Array(rfqPackages.length);
          setFilledPackagesForEdit(arr);
          selectPackageToEdit(activePackgeId);
        } else {
        }
      },
      (fail) => {}
    );
  }

  return (
    <div className="ppl ppr my-4 RFQTable">
      <div className="actionsContainer">
        <div>
          {!rfqId ? (
            <>
              <div className="mb-3">
                <input
                  type="file"
                  id="actual-btn"
                  onChange={fileHandler}
                  className="d-none"
                />
                <label htmlFor="actual-btn" className="primary-color">
                  <img src={importIcon} alt="importIcon" className="mx-3" />
                </label>
                <label>{currentLocal.buyerHome.importExcelFile}</label>
              </div>
              <div className="mb-3">
                <img
                  src={addIcon}
                  alt="addIcon"
                  className="mx-3"
                  onClick={() => {
                    updateIsAddPackModalVis(!isAddPackModalVis);
                  }}
                />
                <label className="primary-color">
                  {currentLocal.buyerHome.addNewPackage}
                </label>
              </div>
            </>
          ) : (
            <>
              <div className="d-flex align-items-center projectPackages">
                <h5 className="projectPackages-header">project Packages</h5>
                <div className="d-flex">
                  {rfqForEdit?.rfqPackageRequests?.map((item, index) => (
                    <button
                      className={"btn packageBtnContainer"}
                      disabled={filledPackagesForEdit.includes(item.packageId)}
                      key={index}
                      onClick={() => selectPackageToEdit(item.packageId)}
                    >
                      <div className="item">
                        <PackageIcon
                          fill={
                            activePackgeId === item.packageId
                              ? "#003B6B"
                              : undefined
                          }
                        />
                        <h6
                          style={{
                            color:
                              activePackgeId === item.packageId
                                ? "#003B6B"
                                : "#C2C2C2",
                            borderColor:
                              activePackgeId === item.packageId
                                ? "#003B6B"
                                : "#C2C2C2",
                          }}
                        >
                          {item.packageName}
                        </h6>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="mb-3">
            <img
              src={addIcon}
              alt="addIcon"
              className="mx-3"
              onClick={addNewItem}
            />
            <label className="primary-color">
              {currentLocal.buyerHome.addNewItem}
            </label>
          </div>
        </div>

        {!rfqId ? (
          <div>
            <div className="mb-2">
              <label className="mx-2 primary-color">
                {currentLocal.buyerHome.category}
              </label>
              <Select
                placeholder={currentLocal.buyerHome.selectCategory}
                onChange={(optionId, record) => {
                  changeCategoryForAll(optionId, record.children);
                }}
                className={notContainCategory ? "alertSign" : ""}
              >
                {categoriesOption.map((category, key) => {
                  return (
                    <Option value={category.id} key={key}>
                      {category.name}
                    </Option>
                  );
                })}
              </Select>
            </div>
            <div>
              <label className="mx-2 primary-color">
                {currentLocal.buyerHome.installAll}
              </label>
              <Checkbox onChange={handleInstallAll} checked={installAll} />
            </div>
          </div>
        ) : null}
      </div>
      {newItemAdded && (
        <Alert className="text-center">
          {currentLocal.buyerHome.newItemAdded}
        </Alert>
      )}
      <Table
        key={dataSource}
        indentSize={300}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        className="my-4"
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              updateSelectedRow(rowIndex);
            },
            onMouseEnter: (event) => {
              updateHoveredRow(rowIndex);
            },
            onMouseLeave: (event) => {
              updateHoveredRow(null);
            },
          };
        }}
        scroll={{ x: true }}
      />
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-12">
            <div className="d-flex">
              <label className="mx-2 my-3 primary-color">
                {currentLocal.buyerHome.notes}
              </label>
              <textarea
                className="form-control notes-bar"
                onChange={(e) => {
                  updateNotes(e.target.value);
                }}
                value={notes}
              />
            </div>
            <div>
              <label className="mx-2 my-3 primary-color">
                {currentLocal.buyerHome.deliveredTo}
              </label>
              <Radio.Group
                options={deliveredToOptions}
                onChange={handleDeliveredTo}
                value={deliveredTo}
                className={"secondary-color"}
              />
            </div>
            <div className="d-flex align-items-center">
              <label className="mx-2 my-3 primary-color">
                {currentLocal.buyerHome.address}
              </label>
              <input
                type="text"
                className={
                  alert && address.length === 0
                    ? "form-control address-bar  alertSign"
                    : "form-control address-bar border"
                }
                onChange={(e) => {
                  updateAddress(e.target.value);
                }}
                value={address}
              />
            </div>
          </div>
          <div className="col-md-4 col-12 ">
            <div className="my-3 datePickerContainer">
              <label className="primary-color">
                {currentLocal.buyerHome.deadlineRecievingOffers}
              </label>
              <DatePicker
                suffixIcon={<img src={datePickerSuffix} alt="suffixIcon" />}
                onChange={(date, dateString) => {
                  setOffersDate(dateString);
                }}
                disabledDate={disabledOffersDate}
                placeholder={currentLocal.buyerHome.selectDate}
                className={
                  alert && recievingOffersDate === null
                    ? "alertSign "
                    : "datePicker"
                }
                allowClear={false}
                value={recievingOffersDate && moment(recievingOffersDate)}
                defaultPickerValue={
                  recievingOffersDate && moment(recievingOffersDate)
                }
              />
            </div>
            <div className="my-3 datePickerContainer">
              <label className=" primary-color">
                {currentLocal.buyerHome.deliveryDate}
              </label>
              {moment(deliveryDate) && (
                <DatePicker
                  suffixIcon={<img src={datePickerSuffix} alt="suffixIcon" />}
                  onChange={(date, dateString) => setDeliveryDate(dateString)}
                  disabledDate={disabledDeliveryDate}
                  placeholder={currentLocal.buyerHome.selectDate}
                  className={
                    alert && deliveryDate === null ? "alertSign" : "datePicker"
                  }
                  allowClear={false}
                  value={deliveryDate && moment(deliveryDate)}
                  defaultPickerValue={deliveryDate && moment(deliveryDate)}
                />
              )}
            </div>
            <div className="my-3 datePickerContainer">
              <label className=" primary-color">
                {currentLocal.buyerHome.attachProjectDocument}
              </label>
              <input
                type={"file"}
                className="d-none"
                id="projectFilesUploader"
                onChange={handleAddProjectFiles}
                multiple
              />
              <label
                htmlFor="projectFilesUploader"
                className="uploadContainer d-flex justify-content-end align-items-center p-2 cursorPointer"
              >
                <img src={documents} alt="documents" />
              </label>
            </div>
            <div className="documents-list-area d-flex justify-content-center">
              {docLoadingState ? (
                <div className="example">
                  <Spin />
                </div>
              ) : (
                documentsList?.map((doc, docIndex) => {
                  let fileType = !doc.type ? doc.contentType : doc.type;
                  let fileName = !doc.name ? doc.fileName : doc.name;
                  let type = fileType.includes("pdf")
                    ? pdfIcon
                    : fileType.includes("dwg")
                    ? autocad
                    : fileType.includes("doc")
                    ? docIcon
                    : excel;
                  return (
                    <div className="d-flex m-2">
                      <img src={type} alt="pdf" className="mx-2" />
                      <div>
                        <div className="fileName">{fileName}</div>
                        <div className="fileSizeBox d-flex align-items-center justify-content-between">
                          <div>
                            <span className="fileSize">
                              {(doc.size / (1024 * 1024)).toFixed(3)}
                            </span>
                            <span>MB</span>
                          </div>
                          <img
                            src={close}
                            alt="close"
                            className="cursorPointer"
                            onClick={() => {
                              handleDeleteDoc(docIndex);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="my-3 cursorPointer">
              <img
                src={addIcon}
                alt="addIcon"
                className="mx-3"
                onClick={openCCModal}
              />
              <label>{currentLocal.buyerHome.ccCollugues}</label>
            </div>
          </div>
          <div className="text-center">
            {!rfqId ? (
              <>
                {rfqData?.rfqPackages?.length < 1 && (
                  <button
                    className="button-secondary native"
                    onClick={() => {
                      getRFQPageName("addRFQDetails");
                    }}
                  >
                    {currentLocal.buyerHome.back}
                  </button>
                )}
                <button
                  className="button-primary native"
                  onClick={handleConfirm}
                >
                  {currentLocal.buyerHome.postRFQ}
                </button>
              </>
            ) : (
              <div className="d-flex justify-content-center align-items-center">
                <button
                  className="button-primary native"
                  style={{
                    backgroundColor: "#FC6B5E",
                  }}
                  onClick={discardEditPackage}
                >
                  {currentLocal.supplierHome.discardChanges}
                </button>
                <button
                  className="button-primary native"
                  onClick={saveEditInPackage}
                >
                  {currentLocal.supplierHome.saveChanges}
                </button>
              </div>
            )}
          </div>
          {isModalVisible && (
            <CCEmailsModal
              isModalVisible={isModalVisible}
              onCancel={() => toggleModal(!isModalVisible)}
              getCCEmails={(val) => {
                updateCCEmails(val);
              }}
              ccEmails={ccEmails}
              getCCEmailsIds={(val) => {
                updateCCEmailsIDs(val);
              }}
            />
          )}
          {isDeleteRowModal && (
            <DeleteModal
              isModalVisible={isDeleteRowModal}
              onCancel={() => {
                updateDeleteRowModal(false);
              }}
              onDeleteRow={onDeleteRow}
            />
          )}
          <FileErrorModal
            isModalVisible={fileErrorModalState}
            onCancel={() => {
              updateFileErrorModalState(!fileErrorModalState);
            }}
          />
          <AddPackage
            isModalVisible={isAddPackModalVis}
            onCancel={() => {
              updateIsAddPackModalVis(!isAddPackModalVis);
            }}
            getPackageName={(val) => {
              updatePackageName(val);
            }}
          />
          <PostRFQSuccessModal
            isModalVisible={isSuccessModalvis}
            onCancel={() => {
              updateSuccessModalVis(!isSuccessModalvis);
            }}
            alreadyHasPackage={
              packageName?.length || rfqData?.rfqPackages?.length > 0
                ? true
                : false
            }
            rfqDetails={rfqDetails}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateRFQ;
