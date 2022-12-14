import React, { useState, useEffect } from "react";
import { isObject } from "lodash";
import importIcon from "../../../../../Resources/Assets/import.svg";
import addIcon from "../../../../../Resources/Assets/addIcon.svg";
import Garbage from "../../../../../Resources/Assets/garbage.svg";
import { useSelector } from "react-redux";
import CCEmailsModal from "../CCEmailsModal/CCEmailsModal";
import datePickerSuffix from "../../../../../Resources/Assets/datePickerSuffix.svg";
import PackageIcon from "../../../../../Resources/Assets/package-with-bg.jsx";
import { Alert } from "react-bootstrap";
import moment from "moment";
import { DELETERFQ, UPDATEPACKAGE, DELETEPACKAGE } from "../../../../../Redux/RFQ";
import { useDispatch } from "react-redux";
import { Table, Spin, Checkbox, DatePicker, Radio } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import {
  getDeliverdOptions,
  AddDocumentList,
  GetBuyerRFQForEdit,
  editRFQPackage,
  postRFQAsDraft,
} from "../../../network";
import closeIcon from "../../../../../Resources/Assets/tip-close.svg";
import PackageEnabled from "../../../../../Resources/Assets/PackageEnabled_Dark.svg";
import PackageDisabled from "../../../../../Resources/Assets/packageDisabled.svg";
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
import imageIcon from "../../../../../Resources/Assets/images.png";
import close from "../../../../../Resources/Assets/tip-close.svg";
import { getCategoriesWithSubCategories } from '../../../network';
import { toast } from "react-toastify";
import CategoriesList from "../CategoriesList/CategoriesList";
import ChangeCatConfirmationModal from "../ChangeCatConfirmationModal/ChangeCatConfirmationModal";
import "./RFQTable.css";

function CreateRFQ({ getRFQPageName, rfqId }) {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const { currentLanguageId } = useSelector((state) => state.currentLocal);
  const [dataSource, updateDataSource] = useState([]);
  const [deliveredTo, updateDeliveredTo] = useState(
    "a9c83c89-4aeb-46b8-b245-a144276d927f"
  );
  const [ImportedSheet, updateImportedSheet] = useState(null);
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
  const [installAll, updateInstallAll] = useState(false);
  const [deliveredToOptions, updateDeliveryOptions] = useState([]);
  const [hoveredRow, updateHoveredRow] = useState(null);
  const [isDeleteRowModal, updateDeleteRowModal] = useState(false);
  const [deletedIndex, updateDeletedIndex] = useState(null);
  const [deletedRowsList, updateDeleteRowsList] = useState([]);
  const [fileErrorModalState, updateFileErrorModalState] = useState(false);
  const [packageName, updatePackageName] = useState("");
  const [ccEmails, updateCCEmails] = useState([]);
  const [ccEmailsIDs, updateCCEmailsIDs] = useState([]);
  const [isSuccessModalvis, updateSuccessModalVis] = useState(false);
  const [documentsList, updateDocumentsList] = useState([]);
  const [packageFiles, updatePackageFiles] = useState([]);
  const [docLoadingState, updateDocLoadingState] = useState(false);
  const [excelLoadingState, updateExcelLoadingState] = useState(false)
  const [rfqDetails, updateRFQDetails] = useState(null);
  const [activePackgeId, setActivePackgeId] = useState(null);
  const { rfqData } = useSelector((state) => state.rfq);
  const [createdActivePackId, updateCreatedActivePackId] = useState(rfqData.rfqPackages?.length ? rfqData.rfqPackages[rfqData.rfqPackages.length - 1].packageTempId : null)
  const [createdActivePackIndex, updateCreatedActivePackIndex] = useState(rfqData.rfqPackages?.length ? rfqData.rfqPackages.length - 1 : 0)
  const [rfqForEdit, setRfqForEdit] = useState(null);
  const [filledPackagesForEdit, setFilledPackagesForEdit] = useState([]);
  const [addPackageAlert, updateAddPackageAlert] = useState(false);
  const [deleteMode, updateDeleteMode] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  const [categoriesListArr, updateCategoriesListArr] = useState({})
  const [allSubCategoriesList, updateAllSubCategoriesList] = useState([])
  const [notContainCategory, updateNotContainCategory] = useState(false)
  const [isCheckCatModalVis, updateCheckCatModalVis] = useState({ status: false })
  const dispatch = useDispatch();
  const hasOldPackages = rfqData.rfqPackages?.length > 0;
  const search = useLocation().search;
  const draftedRfqId = new URLSearchParams(search).get('draftedRfqId');
  let history = useHistory();
  useEffect(() => {
    getCategoriesWithSubCategories(currentLanguageId,
      success => {
        var allCategories = [];
        var frequentlyUsedCategories = [];
        success.data.allCategories.forEach((category, index) => {
          allCategories.push({
            title: category.categoryName,
            key: category.categoryId,
            checkable: false,
            originalChildren: [],
            children: []
          })
          category.subCategories.forEach((subCat, subIndex) => {
            allCategories[index].originalChildren.push({
              title: subCat.name,
              key: subCat.id
            })

            allCategories[index].children.push({
              title: subCat.name,
              key: subCat.id
            })
            if (subCat.name === category.categoryName) {
              allCategories[index].originalChildren[subIndex].disabled = true
              allCategories[index].children[subIndex].disabled = true
            }
          })
        })

        success.data.mostFrequentlyUsedCategories.forEach((category, index) => {
          frequentlyUsedCategories.push({
            title: category.categoryName,
            key: category.categoryId,
            checkable: false,
            originalChildren: [],
            children: []
          })
          category.subCategories.forEach((subCat, subIndex) => {
            frequentlyUsedCategories[index].originalChildren.push({
              title: subCat.name,
              key: subCat.id
            })
            frequentlyUsedCategories[index].children.push({
              title: subCat.name,
              key: subCat.id
            })
            if (subCat.name === category.categoryName) {
              allCategories[index].originalChildren[subIndex].disabled = true
              allCategories[index].children[subIndex].disabled = true
            }
          })
        })
        updateCategoriesListArr({ allCategories, frequentlyUsedCategories })
      }, fail => {
        console.log(fail)
      })
  }, [currentLanguageId])
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
        (fail) => { }
      );
    }
  }, [rfqId]);


  useEffect(() => {
    if (hasOldPackages) {
      const currentPackageData = rfqData.rfqPackages[createdActivePackIndex]
      updateDataSource(currentPackageData.rfqPackageDetailsRequests);
      updateAddress(currentPackageData.address);
      updateNotes(currentPackageData.notes);
      updateDeliveredTo(currentPackageData.deliveryToId);
      setDeliveryDate(currentPackageData.deliveryDate);
      updateCCEmails(currentPackageData.packageCCColleagues);
      updatePackageFiles(currentPackageData.packageFiles);
      updateDocumentsList(currentPackageData.documentsList);
      setOffersDate(currentPackageData.receivingOffersDeadline);
      updateImportedSheet(currentPackageData.ImportedSheet);
      updateAllSubCategoriesList(currentPackageData.allSubCategoriesList);
    }
  }, [createdActivePackId, createdActivePackIndex, hasOldPackages, rfqData.rfqPackages])

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


  const onDeleteRow = () => {
    let tableData = [...dataSource];

    if (tableData[deletedIndex].rfqDetailId) {
      updateDeleteRowsList([
        ...deletedRowsList,
        tableData[deletedIndex].rfqDetailId,
      ]);
    }
    tableData.splice(deletedIndex, 1);
    updateDataSource(tableData);
    updateDeleteRowModal(false);
  };



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
      var newRow = JSON.parse(JSON.stringify(row));
      newRow.isInstallSupplierAndContructor = e.target.checked;
      data[rowIndex] = newRow
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
        item: dataSource.length,
        description: "",
        quantity: 1,
        unit: "",
        preferredBrands: "",
        isInstallSupplierAndContructor: false,
        actionStatus: 1,
        filePath: "",
      },
    ]);
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

  const isValidRFQ = () => {
    const hasNoCat = dataSource.every((data) => !data.subCategories || data.subCategories.length === 0);
    const hasAtLeastEmptyDescription = dataSource.some((data) => data.description.length === 0)
    if (hasNoCat) {
      updateNotContainCategory(true);
    } else {
      updateNotContainCategory(false);
    }
    if (hasAtLeastEmptyDescription) {
      updateErrorMessage(currentLocal.buyerHome.fillDescriptionError)
    } else {
      updateErrorMessage(null)
    }
    if (
      address.length === 0 ||
      recievingOffersDate === null ||
      deliveryDate === null ||
      hasNoCat ||
      hasAtLeastEmptyDescription
    ) {
      return false
    } else {
      return true;
    }
  }
  function handleConfirm(mode) {
    const isValidRFQVar = isValidRFQ()
    if (!isValidRFQVar) {
      setAlert(true);
      if (mode === 'addPackage') {
        updateAddPackageAlert(true)
      }
    } else {
      updateAddPackageAlert(false)
      setAlert(false)
      let allData = {
        ...rfqData,
        rfqPackages: [
          ...rfqData.rfqPackages,
          {
            rfqPackageDetailsRequests: [...dataSource],
            packageName: rfqData.nextPackageName ? rfqData.nextPackageName : rfqData.projectName,
            notes: notes,
            receivingOffersDeadline: recievingOffersDate,
            deliveryDate: deliveryDate,
            address: address,
            deliveryToId: deliveredTo,
            packageCCColleagues: [...ccEmailsIDs],
            packageFiles,
            ImportedSheet,
            packageTempId: new Date().getTime()
          },
        ],
      };
      let data = {
        index: createdActivePackIndex,
        dataSource,
        address,
        notes,
        receivingOffersDeadline: recievingOffersDate,
        deliveryDate,
        deliveryToId: deliveredTo,
        packageCCColleagues: ccEmails,
        documentsList,
        packageFiles,
        ImportedSheet,
        allSubCategoriesList
      }
      if (rfqData.rfqPackages.length) {
        dispatch(UPDATEPACKAGE(data))
      }
      updateRFQDetails(allData);
      if (mode === 'addPackage') {
        updateIsAddPackModalVis(!isAddPackModalVis);
      } else {
        updateSuccessModalVis(!isSuccessModalvis);
      }
    }
  }

  function openCCModal() {
    toggleModal(true);
  }
  const handleChangeAllCategories = (selectedCategories) => {
    let data = [];
    let dataSourceVar = [...dataSource];
    dataSourceVar.forEach((obj) => {
      data.push({ ...obj, subCategories: [...selectedCategories] })
    })
    updateDataSource(data);
    updateAllSubCategoriesList([...selectedCategories])
  }
  const checkIfAnyHasCategory = (selectedCategories) => {
    let dataSourceVar = [...dataSource];
    const hasAnyCategory = dataSourceVar.some(item => item.subCategories)
    if (hasAnyCategory) {
      updateCheckCatModalVis({ status: true, selectedCategories })
    } else {
      handleChangeAllCategories(selectedCategories)
    }
  }

  useEffect(() => {
    let data = [];
    if (!hasOldPackages) {
      for (let index = 0; index <= 4; index++) {
        data.push({
          key: index,
          item: index,
          description: "",
          quantity: 1,
          unit: "",
          preferredBrands: "",
          isInstallSupplierAndContructor: false,
          filePath: "",
        });
      }
      updateDataSource(data);
    }
  }, [currentLanguageId, hasOldPackages]);


  const handleUploadItemDoc = (e) => {
    var isValidExtensions = /xlsx|xlsm|xlsb|xltx|xltm|xls|xlt|xls|xml|xlam|xlw|xlr|xla|png|jpg|jpeg|ms-excel|dwg|DWG|DOC|doc|PDF|pdf/.test(
      e.target.files[0].type || e.target.files[0].name
    );
    if (!isValidExtensions) {
      updateFileErrorModalState({ message: ' PDF, Word, Excel , AutoCAD,JPG,JPEG,PNG', state: true });
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
    let regex = /xlsx|xlsm|xlsb|jpg|jpeg|png|xltx|xltm|xls|xlt|xls|xml|xlam|xlw|xlr|xla|ms-excel|dwg|DWG|DOC|doc|PDF|pdf/;
    var validFiles = files.filter((file) => regex.test(file.type || file.name));

    if (!validFiles.length) {
      updateFileErrorModalState({ message: 'PDF, Word, Excel , AutoCAD, JPG, JPEG, PNG', state: true });
      return 0;
    } else {
      updateDocLoadingState(true);
      let filesData = new FormData();
      files.forEach((file, index) => {
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
  const handleSelectCategories = (rowIndex, selectedCategories) => {
    let data = [];
    let dataSourceVar = [...dataSource]
    dataSourceVar.forEach((obj) => {
      data.push({ ...obj })
    })
    data[selectedRow].subCategories = [...selectedCategories]
    updateDataSource(data);
  }

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
                updateDeleteMode('row')
                updateDeleteRowModal(true);
                updateDeletedIndex(index);
              }}
            />
            <div>{index + 1}</div>
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
              let data = [];
              let dataSourceVar = [...dataSource]
              dataSourceVar.forEach((obj) => {
                data.push({ ...obj })
              })
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
              let data = [];
              dataSource.forEach((obj) => {
                data.push({ ...obj })
              })
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
              let data = [];
              dataSource.forEach((obj) => {
                data.push({ ...obj })
              })
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
              let data = [];
              dataSource.forEach((obj) => {
                data.push({ ...obj })
              })
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
      dataIndex: "subCategories",
      key: "subCategories",
      render: (subCategories, record, rowIndex) => {
        return (<>
          <CategoriesList
            categoriesListArr={categoriesListArr}
            getSelectedCategories={(selectedCategories) => { handleSelectCategories(rowIndex, selectedCategories) }}
            selectedCategories={subCategories}
          />
        </>
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
            {filePath?.length ? (
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
    // eslint-disable-next-line
  }, [activePackgeId]);

  const importExcelFile = (e) => {
    const ImportedSheet = e.target.files[0];
    var isValidExtensions = /xlsx|xlsm|xlsb|xltx|xltm|xls|xlt|xls|xml|xlam|xlw|xlr|xla|ms-excel|DOC|doc|PDF|pdf/.test(
      e.target.files[0].type || e.target.files[0].name
    );

    if (!isValidExtensions) {
      updateFileErrorModalState({ message: ' PDF, Word , Excel', state: true });
      return 0;
    }
    updateExcelLoadingState(true);

    let file = new FormData();
    file.append("image", ImportedSheet);
    file.append("status", 5)
    GetImagePath(
      file,
      (success) => {
        updateImportedSheet(success.data)
        updateExcelLoadingState(false);
      },
      (fail) => {
        console.log(fail);
      }
    );
  };



  const handleSwitchPackage = (rfq, index) => {
    const isValidRFQVar = isValidRFQ();
    if (isValidRFQVar) {
      let data = {
        index: createdActivePackIndex,
        dataSource,
        address,
        notes,
        receivingOffersDeadline: recievingOffersDate,
        deliveryDate,
        deliveryToId: deliveredTo,
        packageCCColleagues: ccEmails,
        packageFiles,
        documentsList,
        ImportedSheet: ImportedSheet,
        allSubCategoriesList
      }
      dispatch(UPDATEPACKAGE({ ...data }))
      updateCreatedActivePackId(rfq.packageTempId)
      updateCreatedActivePackIndex(index);
      setAlert(false);
      updateAddPackageAlert(false);
    } else {
      setAlert(true);
      updateAddPackageAlert(true);
    }
  }

  const handleDeletePackage = () => {
    if (rfqData.rfqPackages.length > 1) {
      var nextIndex = rfqData.rfqPackages.length - 2
      if (nextIndex < 0) {
        nextIndex = 0
      }
      updateCreatedActivePackId(rfqData.rfqPackages[nextIndex].packageTempId)
      updateCreatedActivePackIndex(nextIndex)
      dispatch(DELETEPACKAGE(deletedIndex))
    } else {
      dispatch(DELETERFQ())
      history.push("/")
    }
  }
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
            (fail) => { }
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
      (fail) => { }
    );
  }
  const handleSaveAsDraft = () => {
    let allData = {
      ...rfqData,
      rfqPackages: [
        ...rfqData.rfqPackages,
      ],
    };
    const currentPackageName = rfqData.nextPackageName ? rfqData.nextPackageName : rfqData.projectName;
    var packIndex = null;
    allData.rfqPackages.forEach((packageData, index) => {
      if (packageData.packageName === currentPackageName) {
        packIndex = index
      }
    })
    if (packIndex !== null) {
      allData.rfqPackages[packIndex] = {
        rfqPackageDetailsRequests: [...dataSource],
        packageName: rfqData.nextPackageName ? rfqData.nextPackageName : rfqData.projectName,
        notes: notes,
        receivingOffersDeadline: recievingOffersDate,
        deliveryDate: deliveryDate,
        address: address,
        deliveryToId: deliveredTo,
        packageCCColleagues: [...ccEmailsIDs],
        packageFiles,
        ImportedSheet,
        packageTempId: new Date().getTime()
      }
    } else {
      allData.rfqPackages.push({
        rfqPackageDetailsRequests: [...dataSource],
        packageName: rfqData.nextPackageName ? rfqData.nextPackageName : rfqData.projectName,
        notes: notes,
        receivingOffersDeadline: recievingOffersDate,
        deliveryDate: deliveryDate,
        address: address,
        deliveryToId: deliveredTo,
        packageCCColleagues: [...ccEmailsIDs],
        packageFiles,
        ImportedSheet,
        packageTempId: new Date().getTime()
      })
    }

    if (draftedRfqId) {
      allData.RfqId = draftedRfqId
    }
    postRFQAsDraft(allData, success => {
      if (success.success) {
        toast.success(success.message, {
          position: "bottom-right",
        });
        dispatch(DELETERFQ())
        history.push("/")
      }
    }, fail => {
      console.log(fail)
    })
  }
  return (
    <div className="ppl ppr my-4 RFQTable">
      {addPackageAlert &&
        <Alert variant="danger" className="text-center">
          {currentLocal.buyerHome.addPackAlert}
        </Alert>}
      {errorMessage && <Alert variant="danger" className="text-center">
        {errorMessage}
      </Alert>}
      <div className="actionsContainer">
        <div>
          {!rfqId ? (
            <>
              {excelLoadingState ? (
                <div className="example text-center">
                  <Spin />
                </div>
              ) : (
                <div className="mb-3">
                  <input
                    type="file"
                    id="actual-btn"
                    onChange={importExcelFile}
                    className="d-none"
                  />
                  <label htmlFor={ImportedSheet ? "" : "actual-btn"} className="primary-color">
                    <img src={importIcon} alt="importIcon" className="mx-3" />
                  </label>
                  {ImportedSheet ? <>
                    <a href={baseUrl + ImportedSheet} rel="noreferrer" target={'_blank'}>
                      {ImportedSheet.split(" ")[1]}
                    </a>
                    <img
                      src={closeIcon}
                      alt='closeIcon'
                      className={'closeIcon mx-2'}
                      onClick={() => {
                        updateImportedSheet(null)
                      }} />
                  </> : <label>
                    {currentLocal.buyerHome.importExcelFile}
                  </label>}
                </div>)}
              {rfqData.rfqPackages?.length === 0 && <div className="mb-3">
                <img
                  src={addIcon}
                  alt="addIcon"
                  className="mx-3"
                  onClick={() => {
                    handleConfirm('addPackage')
                  }}
                />
                <label className="primary-color">
                  {currentLocal.buyerHome.addNewPackage}
                </label>
              </div>}
            </>
          ) : (
            <>
              <div className="d-flex align-items-center projectPackages">
                <h5 className="projectPackages-header">{currentLocal.buyerHome.projectPackages}</h5>
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

          {rfqData.rfqPackages?.length > 0 && <div className="m-3 d-flex align-items-center">
            <label className="secondary-color-light fw-600">
              {currentLocal.buyerHome.projectPackages}
            </label>
            {rfqData.rfqPackages.map((rfq, index) => {
              return <div className='mx-4 packageContainer' key={index}>
                <img src={closeIcon} alt='closeIcon' className='closeIcon' onClick={
                  () => {
                    updateDeleteMode('package')
                    updateDeletedIndex(index)
                    updateDeleteRowModal(true);
                  }} />
                <div onClick={() => handleSwitchPackage(rfq, index)}>
                  {createdActivePackId === rfq.packageTempId ?
                    <img src={PackageEnabled} alt='PackageEnabled' /> :
                    <img src={PackageDisabled} alt='PackageDisabled' />}
                  <div className={`text-center ${createdActivePackId === rfq.packageTempId ? `packageName` : `packageNameDisabled`}  my-2 fw-600 f-14`}>{rfq.packageName}</div>
                </div>
              </div>
            })}
          </div>}
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
              <CategoriesList
                categoriesListArr={categoriesListArr}
                getSelectedCategories={(selectedCategories) => { checkIfAnyHasCategory(selectedCategories) }}
                selectedCategories={allSubCategoriesList}
                dangerClass={notContainCategory ? "alertSign" : ""}
              />
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
      {
        newItemAdded && (
          <Alert className="text-center">
            {currentLocal.buyerHome.newItemAdded}
          </Alert>
        )
      }
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
                        ? docIcon : fileType.includes("image") ? imageIcon
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
              <div className='d-flex justify-content-center align-items-center flex-1 buttonContainer'>
                <span
                  className='backBtn mx-4 cursorPointer'
                  onClick={() => {
                    getRFQPageName("addRFQDetails");
                  }}>
                  {currentLocal.buyerHome.back}
                </span>
                <button
                  className="button-secondary native button-orange"
                  onClick={handleSaveAsDraft}
                >
                  {currentLocal.offerTable.saveAsDraft}
                </button>
                <button
                  className="button-primary native"
                  onClick={handleConfirm}
                >
                  {currentLocal.buyerHome.postRFQ}
                </button>
              </div>
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
              onDeletePackage={handleDeletePackage}
              deleteMode={deleteMode}
            />
          )}
          <FileErrorModal
            isModalVisible={fileErrorModalState}
            onCancel={() => {
              updateFileErrorModalState({ state: false, message: "" });
            }}
          />
          <AddPackage
            isModalVisible={isAddPackModalVis}
            onCancel={() => {
              updateIsAddPackModalVis(!isAddPackModalVis);
            }}
            switchToLastPack={(packId, packIndex) => {
              updateCreatedActivePackId(packId)
              updateCreatedActivePackIndex(packIndex)
            }}
            getPackageName={(val) => {
              updatePackageName(val);
            }}
            rfqDetails={!hasOldPackages && rfqDetails ? rfqDetails.rfqPackages[0] : null}
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
            handleAddAnotherPackage={() => {
              updateSuccessModalVis(!isSuccessModalvis);
              updateIsAddPackModalVis(!isAddPackModalVis);
            }}
          />
          <ChangeCatConfirmationModal
            isModalVisible={isCheckCatModalVis}
            onCancel={() => {
              updateCheckCatModalVis({ status: false })
            }}
            onSubmit={(selectedCategories) => {
              handleChangeAllCategories(selectedCategories);
            }}
          />
        </div>
      </div>
    </div >
  );
}

export default CreateRFQ;
