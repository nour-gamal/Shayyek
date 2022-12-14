import { useEffect, useState } from "react";
import {
  Input,
  Modal,
  Row,
  Col,
  Table,
  Radio,
  DatePicker,
  Menu,
  Dropdown,
  Select
} from "antd";
import { useSelector } from "react-redux";
import closeIcon from "../../../../../Resources/Assets/closeIcon.svg";
import {
  AddToMyFavVendors,
  BuyerAcceptPackageItems,
  getDeliveryPeriod,
  GetImagePath,
  ViewPackageQuotation,
} from "../../../../ProfilePage/network";
import Lottie from "react-lottie-player";
import questionImg from "../../../../../Resources/Assets/questions.json";
import download from "../../../../../Resources/Assets/direct-download.svg";
import documents from "../../../../../Resources/Assets/paperClip.svg";
import { saveAs } from "file-saver";
import { baseUrl } from "../../../../../Services";
import moment from "moment";
import {
  getQuestionsList,
  AddQuestion,
  GetRFQPackageToFill,
  fillRFQ,
} from "../../../network";
import { ViewPackageQuotationForSupplier } from "../../../../Home/network";
import FileErrorModal from "../../../../Home/BuyerHome/Components/FileErrorModal/FileErrorModal";
import pdfIcon from "../../../../../Resources/Assets/pdfs.png";
import docIcon from "../../../../../Resources/Assets/doc.svg";
import excel from "../../../../../Resources/Assets/excel.svg";
import autocad from "../../../../../Resources/Assets/autocad.svg";
import plus from "../../../../../Resources/Assets/plus (2).svg";
import { Alert } from "react-bootstrap";
import heart from "../../../../../Resources/Assets/heart.svg";
import { toast } from "react-toastify";
import "./SingleRFQModal.css";
import { Link } from "react-router-dom";

function SingleRFQModal({
  isModalVisible,
  onCancel,
  rfqPackageId,
  mode,
  rfqDetailId,
  filledPackageId,
}) {
  const [loading, setLoading] = useState(false);
  const [radioValue, setRadioValue] = useState(true);
  const { currentLocal, currentLanguageId } = useSelector((state) => state.currentLocal);
  const [documentsList, updateDocumentsList] = useState([]);
  const [fileErrorModalState, updateFileErrorModalState] = useState(false);
  const [paymentTerms, updatePaymentTerms] = useState("");
  const [rfqDetails, updateRFQDetails] = useState([]);
  const [deliveryPeriodId, updateDeliveryPeriodId] = useState(null);
  const [validityOfferDate, updateValidityOfferDate] = useState("");
  const [question, updateQuestion] = useState("");
  const [questionsList, updateQuestionsList] = useState([]);
  const [addQuestBtnState, updateAddQuestBtnState] = useState(true);
  const [packageDetails, updatePackageDetails] = useState({});
  const [alertState, updateAlert] = useState(false);
  const [vendorNotes, updateVendorNotes] = useState("");
  const [address, updateAddress] = useState("");
  const [packageName, updatePackageName] = useState("");
  const [includeVat, updateIncludeVat] = useState("");
  const [vendorId, updateVendorId] = useState(null);
  const [vendorName, updateVendorName] = useState(null)
  const [deliveryPeriodList, updateDeliveryPeriodList] = useState([])
  const [isAddedToFavVendor, updateIsAddedToFavVendor] = useState(true);
  const { Option } = Select;

  useEffect(() => {
    if (mode === "ViewRFQDetails" && rfqDetailId) {
      let data = { FilledItemId: rfqDetailId };
      ViewPackageQuotation(
        data,
        (success) => {
          updateVendorNotes(success.data.notes);
          updateAddress(success.data.address);
          updatePackageName(success.data.packageName);
          updateDeliveryPeriodId(success.data.deliveryPeriod);
          updateRFQDetails(success.data.rfqPackageDetails);
          updateValidityOfferDate(success.data.receivingOffersDeadline);
          updateDocumentsList(success.data.packageFiles);
          updatePaymentTerms(success.data.paymentTerms);
          updateIncludeVat(success.data.includingVAT ? "Yes" : "No");
          updateVendorId(success.data.vendorId);
          updateIsAddedToFavVendor(!success.data.isFavourite);
        },
        (fail) => {
          console.log(fail);
        }
      );
    } else if (mode === "ViewRFQDetails" && filledPackageId) {
      ViewPackageQuotationForSupplier(
        filledPackageId,
        (success) => {
          if (success.success) {
            const { data } = success;
            updateAddress(data.address);
            updateDeliveryPeriodId(data.deliveryDate);
            updateVendorNotes(data.notes);
            updateAddress(data.address);
            updatePackageName(data.packageName);
            updateRFQDetails(data.rfqPackageDetails);
            updateValidityOfferDate(data.receivingOffersDeadline);
            updateDocumentsList(data.packageFiles);
            updatePaymentTerms(data.paymentTerms);
            updateIncludeVat(data.includeVat ? "Yes" : "No");
            updateVendorId(data.vendorId);
            updateVendorName(success.data.vendorName);
          } else {
            toast.error(success.message, {
              position: "bottom-right",
              rtl: true,
            });
          }
        },
        (fail) => {
          toast.error(fail.data.message, {
            position: "bottom-right",
            rtl: true,
          });
        }
      );
    } else {
      let data = { rfqPackageId };
      getQuestionsList(
        data,
        (success) => {
          updateQuestionsList(success.data);
        },
        (fail) => {
          console.log(fail);
        }
      );
      GetRFQPackageToFill(
        data,
        (success) => {
          updatePackageDetails(success.data);
          updateRFQDetails(success.data.rfqDetails);
          updateDocumentsList(success.data.packageFiles);
        },
        (fail) => {
          console.log(fail);
        }
      );
    }
    // eslint-disable-next-line
  }, [rfqPackageId, mode, rfqDetailId]);


  useEffect(() => {
    if (mode !== "ViewRFQDetails") {
      getDeliveryPeriod(
        currentLanguageId,
        success => {
          updateDeliveryPeriodList(success.data)
        }, fail => {
          console.log(fail)
        })
    }
  }, [currentLanguageId, mode])


  const handleDeliveryPeriod = (value) => {
    updateDeliveryPeriodId(value)
  }
  const handleAddToMyFavVend = () => {
    let data = {
      vendorId,
      isAdded: isAddedToFavVendor,
    };
    AddToMyFavVendors(
      data,
      (success) => {
        if (success.success) {
          updateIsAddedToFavVendor(!isAddedToFavVendor);
          // onCancel();
        }
      },
      (fail) => {
        console.log(fail);
      }
    );
  };

  const acceptOffer = () => {
    let itemIds = [];

    rfqDetails.forEach((item) => {
      itemIds.push(item.rfqPackageDetailId);
    });

    let data = {
      filledItemIds: itemIds,
    };
    BuyerAcceptPackageItems(
      data,
      (success) => {
        if (success.success) {
          onCancel();
        }
      },
      (fail) => {
        console.log(fail);
      }
    );
  };

  const onRadioChange = (e) => {
    setRadioValue(e.target.value);
  };
  const handleAddQuestion = () => {
    if (question.length) {
      updateAddQuestBtnState(true);
      let data = { question, rfqPackageId };
      AddQuestion(
        data,
        (success) => {
          if (success.success) {
            getQuestionsList(
              data,
              (success) => {
                updateQuestionsList(success.data);
              },
              (fail) => {
                console.log(fail);
              }
            );
          }
        },
        (fail) => {
          console.log(fail);
        }
      );
    }
  };

  const QAndAMenu = (
    <Menu className="px-2 py-4">
      <Menu.Item disabled={true}>
        <div className="d-flex flex-column">
          <button
            className={
              addQuestBtnState ? "button-primary" : "button-primary disabled"
            }
            onClick={() => {
              updateAddQuestBtnState(false);
            }}
          >
            <img src={plus} alt="plus" className="mx-2" />{" "}
            {currentLocal.buyerHome.addNewQuestion}
          </button>
          <div
            className={
              addQuestBtnState ? "d-none" : "questionArea form-control m-2"
            }
          >
            <textarea
              value={question}
              onChange={(e) => {
                updateQuestion(e.target.value);
              }}
            />
            <div className="addQuestionBtn f-14" onClick={handleAddQuestion}>
              {currentLocal.buyerHome.addQuestion}
            </div>
          </div>
          <div className="questionsList">
            {questionsList.map((question, index) => {
              return (
                <div
                  className={
                    index % 2 === 0
                      ? "questionBlock my-2 p-2"
                      : "questionBlock my-2 grayBackground p-2"
                  }
                >
                  <div className="f-14 fw-600 question">
                    {question.question}
                  </div>
                  <div className="info d-flex">
                    <div>
                      {question.isYourQuestion
                        ? currentLocal.buyerHome.me
                        : currentLocal.buyerHome.otherVendor}{" "}
                      {currentLocal.buyerHome.asked}{" "}
                    </div>
                    <div className="date">
                      {moment(question.questionDate).format("LLL")}
                    </div>
                  </div>
                  {question.answer && (
                    <div>
                      <div className="questionAnswer">{question.answer}</div>
                      <div className="info d-flex">
                        <div>Ahmed {currentLocal.buyerHome.answered} </div>
                        <div className="date">
                          {moment(question.asnwerDate).format("LLL")}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Menu.Item>
    </Menu>
  );

  var columns = [
    {
      title: currentLocal.buyerHome.item,
      dataIndex: "item",
      key: "item",
    },
    {
      title: currentLocal.buyerHome.description,
      dataIndex: "description",
      key: "description",
    },
    {
      title: currentLocal.buyerHome.quantity,
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: currentLocal.buyerHome.preferredBrands,
      dataIndex: "preferredBrands",
      key: "preferredBrands",
    },
    {
      title: currentLocal.offerTable.unitPrice,
      dataIndex: "unitPrice",
      key: "unitPrice",
      render: (unitPrice, record, index) => {
        return (
          <>
            {mode === "ViewRFQDetails" ? (
              <>{unitPrice}</>
            ) : (

              <Input
                type="text"
                onChange={(e) => {
                  let rfqDetailss = [...rfqDetails];
                  const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");
                  const decodedNum = num => parseInt(num.toString().replace(/(,)/g, ""))
                  rfqDetails[index].unitPrice = addCommas(removeNonNumeric(e.target.value));
                  rfqDetails[index].totalPrice =
                    decodedNum(e.target.value) * rfqDetails[index].quantity;
                  rfqDetails[index].totalPrice = addCommas(rfqDetails[index].totalPrice)
                  updateRFQDetails(rfqDetailss);
                }}
                value={rfqDetails[index].unitPrice}
                defaultValue={0}
                className="text-center"
              />

            )}

          </>
        );
      },
    },
    {
      title: currentLocal.offerTable.totalPrice,
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice, record) => {
        return (
          <>
            {record.unitPrice ? (
              <>{totalPrice}</>
            ) : (
              <>0</>
            )}
          </>
        );
      },
    },
    {
      title: currentLocal.offerTable.itemDocuments,
      dataIndex: "itemDocument",
      key: "itemDocument",
      render: (itemDocument, record) => {
        return (
          <>
            {mode === "ViewRFQDetails" ? (
              <>
                {record.itemFilePath ? (
                  <img
                    src={download}
                    alt="download"
                    onClick={() => {
                      saveAs(`${baseUrl}${record.itemFilePath}`);
                    }}
                    className="cursorPointer"
                  />
                ) : (
                  <>{currentLocal.offerTable.noAvailbleDocument}</>
                )}
              </>
            ) : (
              <>
                {itemDocument ? (
                  <img
                    src={download}
                    alt="download"
                    onClick={() => {
                      saveAs(`${baseUrl}${itemDocument}`);
                    }}
                    className="cursorPointer"
                  />
                ) : (
                  <>{currentLocal.offerTable.noAvailbleDocument}</>
                )}
              </>
            )}
          </>
        );
      },
    },
    {
      title: currentLocal.offerTable.uploadDocuments,
      dataIndex: "filePath",
      key: "filePath",
      render: (filePath, record, index) => {
        return (
          <div>
            {mode === "ViewRFQDetails" ? (
              <div>
                {record.filledFilePath && record.filledFilePath.length ? (
                  <a href={baseUrl + record.filledFilePath}>
                    {record.filledFilePath.split(" ")[1]}
                  </a>
                ) : (
                  <>{currentLocal.offerTable.noAvailbleDocument}</>
                )}
              </div>
            ) : (
              <div>
                {filePath && filePath.length ? (
                  <a href={baseUrl + filePath}>{filePath.split(" ")[1]}</a>
                ) : (
                  <div className="text-center">
                    <input
                      type={"file"}
                      className="d-none"
                      id="itemDocument"
                      onChange={(e) => {
                        handleUploadItemDoc(e, index);
                      }}
                    />
                    <label
                      className="d-flex cursorPointer"
                      htmlFor="itemDocument"
                    >
                      <div className="mx-2">
                        {currentLocal.buyerHome.addFile}
                      </div>
                      <img src={documents} alt="documents" />
                    </label>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: currentLocal.buyerHome.notes,
      dataIndex: "notes",
      key: "notes",
      render: (notes, record, index) => {
        return (
          <>
            {mode === "ViewRFQDetails" ? (
              <>{notes}</>
            ) : (
              <Input
                type="text"
                onChange={(e) => {
                  let rfqDetailss = [...rfqDetails];
                  rfqDetailss[index].notes = e.target.value;
                  updateRFQDetails(rfqDetailss);
                }}
              />
            )}
          </>
        );
      },
    },
  ];

  function disabledOfferValidityDate(current) {
    return current?.valueOf() < Date.now()

  }
  const handleFillRFQ = (isDrafted) => {
    if (deliveryPeriodId) {

      let rfqDetailsVar = [...rfqDetails]
      const decodedNum = num => parseInt(num.toString().replace(/(,)/g, ""))
      rfqDetailsVar.forEach((detail, index) => {
        rfqDetailsVar[index].unitPrice = decodedNum(rfqDetailsVar[index].unitPrice)
        rfqDetailsVar[index].totalPrice = decodedNum(rfqDetailsVar[index].totalPrice)
      })
      updateAlert(false);
      let data = {
        isDraft: isDrafted,
        rfqPackageId,
        paymentTerms,
        offerValidty: validityOfferDate,
        deliveryPeriodId,
        includeVat: radioValue,
        rfqPackageDetailsRequests: rfqDetails,
      };
      fillRFQ(
        data,
        (success) => {
          if (success.data) {
            onCancel();
          }
        },
        (fail) => {
          console.log(fail);
        }
      );
    } else {
      updateAlert(true);
    }
  };
  const handleUploadItemDoc = (e, index) => {
    var isValidExtensions = /xlsx|xlsm|xlsb|xltx|xltm|xls|xlt|xls|xml|xlam|xlw|xlr|xla|dwg|DOC|PDF/.test(
      e.target.files[0].type
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
        let tableData = [...rfqDetails];
        tableData[index].filePath = success.data;
        updateRFQDetails(tableData);
      },
      (fail) => {
        console.log(fail);
      }
    );
  };

  const onOfferValidityChange = (date, dateString) => {
    updateValidityOfferDate(dateString);
  };

  return (
    <Modal
      title="Basic Modal"
      visible={isModalVisible}
      onCancel={onCancel}
      className="modal-lg singleRFQContainer"
    >
      {alertState && (
        <Alert variant={"danger"} className="text-center">
          {currentLocal.registration.pleaseFillAllRequiredFields}
        </Alert>
      )}
      <figure className="closeIconFigure">
        <img
          src={closeIcon}
          alt="closeIcon"
          className="cursorPointer"
          onClick={onCancel}
        />
      </figure>
      <div className="d-flex singleRFQModal flex-1">
        <div className="d-flex infoContainer">
          {mode === "ViewRFQDetails" ? (
            <div className="d-flex justify-content-between flex-1">
              <div className="d-flex">
                <div className="mx-4">
                  {vendorNotes && (
                    <div>
                      {currentLocal.offerTable.vendorNotes}:{vendorNotes}
                    </div>
                  )}
                  <div>
                    <span>{currentLocal.offerTable.vandorName}:</span>
                    <Link to={`/suppliercontractorprofiles?userId=${vendorId}`}
                      style={{ textDecoration: "underline" }}>
                      {vendorName}
                    </Link>
                  </div>
                  <div>
                    {currentLocal.offerTable.package}:{packageName}
                  </div>
                </div>
                <div className="mx-4">
                  <div>
                    {currentLocal.offerTable.deliveryDate}:
                    {deliveryPeriodId}
                  </div>
                  <div>
                    {currentLocal.offerTable.deliveryAddress}:{address}
                  </div>
                </div>
              </div>
              <button
                className="button-secondary favVendorBtn"
                onClick={handleAddToMyFavVend}
              >
                <img src={heart} alt="heart" />
                <span>
                  {isAddedToFavVendor
                    ? currentLocal.profilePage.addToFavVendors
                    : currentLocal.profilePage.deleteFavVendors}
                </span>
              </button>
            </div>
          ) : (
            <div className="info d-flex align-items-center">
              <div className="mx-4">
                {currentLocal.offerTable.buyerName} : {packageDetails.buyerName}
              </div>
              {packageDetails.projectOwner && (
                <div className="mx-4">
                  {currentLocal.offerTable.projectOwner} :{" "}
                  {packageDetails.projectOwner}
                </div>
              )}
              {packageDetails.supplierOrContractorName && (
                <div className="mx-4">
                  {currentLocal.offerTable.projectContractor} :{" "}
                  {packageDetails.supplierOrContractorName}
                </div>
              )}
              <div className="mx-4">
                {currentLocal.offerTable.projectName} :{" "}
                {packageDetails.projectName}
              </div>
              {packageDetails.projectConsultant && (
                <div className="mx-4">
                  {currentLocal.offerTable.projectConsultant} :{" "}
                  {packageDetails.projectConsultant}
                </div>
              )}
              <div className="mx-4">
                {currentLocal.offerTable.deliveryDate}*:{" "}
                {moment(packageDetails.deliveryDate).format("LL")}
              </div>
              <div className="mx-4">
                {currentLocal.offerTable.deliveryAddress} :{" "}
                {packageDetails.address}
              </div>
            </div>
          )}

          {mode !== "ViewRFQDetails" && (
            <Dropdown
              overlay={QAndAMenu}
              placement="bottomLeft"
              trigger={["click"]}
              overlayClassName={"QAndAMenu"}
            >
              <div className="qAndAWall d-flex justify-content-end">
                <figure>
                  <Lottie loop animationData={questionImg} play />
                </figure>
                <div className="text">{currentLocal.offerTable.QANDAWALL}</div>
                <div className="invitations_number mx-2">
                  {questionsList.length}
                </div>
              </div>
            </Dropdown>
          )}
        </div>

        <div>
          <Table
            key={rfqDetails}
            indentSize={300}
            columns={columns}
            dataSource={rfqDetails}
            className="my-4"
            scroll={{ x: true }}
            pagination={{
              total: rfqDetails.length,
              pageSize: 5,
              hideOnSinglePage: true,
            }}
            loading={loading}
          />
          <Row>
            <Col xs={24} md={16}>
              {packageDetails.notes && (
                <div className="d-flex my-4">
                  <label className="label">
                    {currentLocal.offerTable.notes}
                  </label>
                  <div className="mx-2">{packageDetails.notes}</div>
                </div>
              )}
              <div className="d-flex my-4">
                <label className="label">
                  {currentLocal.offerTable.priceIncludingVAT}
                  {mode !== "ViewRFQDetails" && <span className='text-danger'>*</span>}
                </label>
                {mode === "ViewRFQDetails" ? (
                  <div className="mx-2">{includeVat}</div>
                ) : (
                  <div className="mx-2">
                    <Radio.Group onChange={onRadioChange} value={radioValue}>
                      <Radio value={true} className="mx-2">
                        {currentLocal.offerTable.yes}
                      </Radio>
                      <Radio value={false} className="mx-2">
                        {currentLocal.offerTable.no}
                      </Radio>
                    </Radio.Group>
                  </div>
                )}
              </div>
              <div className="d-flex my-4">
                <label className="label">
                  {currentLocal.offerTable.paymentTerms}
                </label>
                {mode === "ViewRFQDetails" ? (
                  <div className="mx-2">{paymentTerms}</div>
                ) : (
                  <Input
                    className="mx-2 paymentTermsField"
                    type={"text"}
                    onChange={(e) => {
                      updatePaymentTerms(e.target.value);
                    }}
                    value={paymentTerms}
                  />
                )}
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="d-flex align-items-center my-2">
                <label className="label">
                  {currentLocal.offerTable.offerValidity}
                </label>
                {mode === "ViewRFQDetails" ? (
                  <div className="mx-2">
                    {moment(validityOfferDate).format("DD-MM-YYYY")}
                  </div>
                ) : (
                  <div className="mx-2 flex-1">
                    <DatePicker
                      onChange={onOfferValidityChange}
                      className="form-control"
                      disabledDate={disabledOfferValidityDate}
                    />
                  </div>
                )}
              </div>
              <div className="d-flex align-items-center my-2">
                <label className="label">
                  {currentLocal.offerTable.deliveryDate}
                  {mode !== "ViewRFQDetails" && <span className='text-danger'>*</span>}
                </label>
                {mode === "ViewRFQDetails" ? (
                  <div className="mx-2">
                    {deliveryPeriodId}
                  </div>
                ) : (
                  <div className="mx-2 flex-1">
                    <Select
                      onChange={handleDeliveryPeriod}
                      style={{
                        width: '100%',
                      }}
                    >{deliveryPeriodList.map((period) => {
                      return <Option value={period.id}>{period.name}</Option>

                    })
                      }
                    </Select>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </div>
        <div className="d-flex align-items-center">
          {documentsList.length > 0 && (
            <label className="label">
              {currentLocal.offerTable.projectDocuments}
            </label>
          )}
          <div className="documents-list-area d-flex px-2">
            {documentsList.map((doc, docIndex) => {
              let type = doc.contentType.includes("pdf")
                ? pdfIcon
                : doc.contentType.includes("dwg")
                  ? autocad
                  : doc.contentType.includes("doc")
                    ? docIcon
                    : excel;
              return (
                <div className="d-flex m-2">
                  <img src={type} alt="pdf" className="mx-2" />
                  <div>
                    <div className="fileName">{doc.fileName}</div>
                    <div className="fileSizeBox d-flex align-items-center justify-content-between">
                      <div>
                        <span className="fileSize">
                          {(doc.size / (1024 * 1024)).toFixed(3)}
                        </span>
                        <span>MB</span>
                      </div>
                      <img
                        src={download}
                        alt="download"
                        className="cursorPointer mx-1"
                        onClick={() => {
                          saveAs(`${baseUrl}${doc.path}`);
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          {mode === "ViewRFQDetails" ? (
            <div className="btn-container  d-flex">
              <button
                className="button-secondary mx-1 favVendorBtn"
                onClick={handleAddToMyFavVend}
              >
                {isAddedToFavVendor
                  ? currentLocal.profilePage.addToFavVendors
                  : currentLocal.profilePage.deleteFavVendors}
              </button>
              <button className="button-primary mx-1" onClick={acceptOffer}>
                {currentLocal.offerTable.acceptOffer}
              </button>
            </div>
          ) : (
            <div className="btn-container  d-flex">
              <button
                className="button-secondary mx-1"
                onClick={() => {
                  handleFillRFQ(true);
                }}
              >
                {currentLocal.offerTable.saveAsDraft}
              </button>
              <button
                className="button-primary mx-1"
                onClick={() => {
                  handleFillRFQ(false);
                }}
              >
                {currentLocal.offerTable.submit}
              </button>
            </div>
          )}
        </div>
      </div>
      <FileErrorModal
        isModalVisible={fileErrorModalState}
        onCancel={() => {
          updateFileErrorModalState(!fileErrorModalState);
        }}
      />
    </Modal>
  );
}

export default SingleRFQModal;
