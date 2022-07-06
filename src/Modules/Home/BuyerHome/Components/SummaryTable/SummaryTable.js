import React, { useState, createRef, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { useSelector } from "react-redux";
import { PDFExport } from "@progress/kendo-react-pdf";
import { Table, Menu, Dropdown, Radio } from "antd";
import { EmailShareButton, WhatsappShareButton } from "react-share";
import {
  BuyerAcceptPackageItems,
  FilterPackageOffer,
  GetImagePath,
  GetItemOffers,
  GetSummaryFilter,
} from "../../../../ProfilePage/network";
import Whatsapp from "../../../../../Resources/Assets/whatsapp.svg";
import CopyLink from "../../../../../Resources/Assets/copyLink.svg";
import Email from "../../../../../Resources/Assets/email.svg";
import share from "../../../../../Resources/Assets/share (5).svg";
import filterIcon from "../../../../../Resources/Assets/filterIcon.svg";
import exclamationIcon from "../../../../../Resources/Assets/exclamation-mark.svg";
import arrowDropdown from "../../../../../Resources/Assets/arrowDropDown.svg";
import { useScreenshot } from "use-react-screenshot";
import download from "../../../../../Resources/Assets/direct-download.svg";
import { baseUrl } from "../../../../../Services";
import moment from "moment";
import SingleRFQModal from "../../../../ProfilePage/Components/SubComponents/SingleRFQModal/SingleRFQModal";
import { toast } from "react-toastify";

import "./SummaryTable.css";

function SummaryTable({ dataSourceList, currentPackageId }) {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  // eslint-disable-next-line
  const [loading, updateLoading] = useState(false);
  const [imageURL, updateImageURL] = useState(null);
  const [dataSource, updateDataSource] = useState([]);
  const [image, takeScreenshot] = useScreenshot();
  const [otherVendorsItems, updateOtherVendorsItems] = useState([]);
  const [hoveredRow, updateHoveredRow] = useState(null);
  const [filterListItems, updateFilterListItems] = useState([]);
  const [ViewQuotationModal, updateViewQuotationModal] = useState(false);
  const [rfqDetailId, updateRfqDetailId] = useState(null);
  const ref = createRef(null);
  const getBlobImg = async (image) => {
    const blob = await fetch(image).then((res) => res.blob());
    // const blobUrl = window.URL.createObjectURL(blob);
    var file = new File([blob], `${new Date().getTime()}.png`);
    const data = new FormData();
    data.append("image", file);
    GetImagePath(
      data,
      (success) => {
        updateImageURL(baseUrl + success.data);
      },
      (fail) => {
        console.log(fail);
      }
    );
  };

  useEffect(() => {
    updateDataSource([...dataSourceList]);
    GetSummaryFilter(
      (success) => {
        updateFilterListItems(success.data);
      },
      (fail) => {
        console.log(fail);
      }
    );
  }, [dataSourceList]);
  useEffect(() => {
    if (image) {
      getBlobImg(image);
    }
  }, [image]);

  const filterMenu = (
    <Menu>
      <Radio.Group
        defaultValue={0}
        onChange={(e) => {
          let data = {
            PackageId: currentPackageId,
            FilterId: filterListItems[e.target.value].id,
          };
          FilterPackageOffer(
            data,
            (success) => {
              updateDataSource(success.data);
            },
            (fail) => {
              console.log(fail);
            }
          );
        }}
      >
        {filterListItems.map((item, itemIndex) => {
          return (
            <Menu.Item key={itemIndex}>
              <div className="d-flex">
                <Radio value={itemIndex}>
                  <div className="fliter-menu-item">{item.name}</div>
                </Radio>
              </div>
            </Menu.Item>
          );
        })}
      </Radio.Group>
    </Menu>
  );

  const shareMenu = (
    <Menu>
      <Menu.Item key="1">
        <WhatsappShareButton
          url={imageURL}
          children={
            <div className="d-flex">
              <img src={Whatsapp} alt="Whatsapp" />
              <div className="mx-2">{currentLocal.profilePage.whatsapp}</div>
            </div>
          }
        />
      </Menu.Item>
      <Menu.Item key="2">
        <EmailShareButton
          url={imageURL}
          children={
            <div className="d-flex">
              <img src={Email} alt="email" />
              <div className="mx-2">{currentLocal.profilePage.email}</div>
            </div>
          }
        />
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={() => {
          navigator.clipboard.writeText(imageURL);
        }}
      >
        <div className="d-flex">
          <img src={CopyLink} alt="CopyLink" />
          <div className="mx-2">{currentLocal.profilePage.copyLink}</div>
        </div>
      </Menu.Item>
    </Menu>
  );
  const handleAddItemToSummary = (itemIndex, newItem) => {
    let newDataSource = [...dataSource];
    newDataSource[itemIndex].unitPrice = newItem.unitPrice;
    newDataSource[itemIndex].totalPrice = newItem.totalPrice;
    newDataSource[itemIndex].paymentTerms = newItem.paymentTerms;
    newDataSource[itemIndex].rfqPackageDetailId = newItem.filledDetailedId;
    updateDataSource(newDataSource);
  };

  const columns = [
    {
      title: currentLocal.buyerHome.item,
      dataIndex: "item",
      key: "item",
      render: (item, record, index) => {
        return (
          <div
            className="itemContainer cursorPointer"
            onMouseEnter={() => {
              updateHoveredRow(index);
              let data = { ItemId: record.rfqPackageDetailId };
              GetItemOffers(
                data,
                (success) => {
                  updateOtherVendorsItems(success.data);
                },
                (fail) => {
                  console.log(fail);
                }
              );
            }}
            onMouseLeave={() => {
              updateHoveredRow(null);
            }}
          >
            <div>{item}</div>
            {hoveredRow === index && otherVendorsItems?.length > 0 && (
              <div className="overlayedItemPage">
                {otherVendorsItems.map((item, newItemIndex) => {
                  return (
                    <div className="item">
                      <div className="name">{item.companyOrIndvidualName}</div>
                      <div className="d-flex justify-content-between info">
                        <div className="price mx-2">
                          {currentLocal.offerTable.price}: {item.totalPrice}LE
                        </div>
                        <div className="deliveryDate mx-2">
                          {currentLocal.offerTable.deliveryDate}:
                          {moment(item.deliveryDate).format('DD-MM-YYYY')}
                        </div>
                        <div className="paymentTerms mx-2">
                          {currentLocal.offerTable.paymentTerms}:
                          {item.paymentTerms}
                        </div>
                      </div>
                      <div className="d-flex justify-content-between my-2">
                        <div>
                          {item.includeVat ?
                            currentLocal.offerTable.includeVat :
                            currentLocal.offerTable.notIncludeVat}
                        </div>
                        <div>
                          <button
                            className="button-secondary mx-2"
                            onClick={() => {
                              updateViewQuotationModal(true);
                              updateRfqDetailId(item.filledDetailedId);
                            }}
                          >
                            {currentLocal.rfqSummary.viewQuotation}
                          </button>
                          <button
                            className="button-primary mx-2"
                            onClick={() => {
                              handleAddItemToSummary(
                                index,
                                otherVendorsItems[newItemIndex]
                              );
                            }}
                          >
                            {currentLocal.rfqSummary.AddToMySummary}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      },
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
      title: currentLocal.rfqSummary.vendorNotes,
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: currentLocal.offerTable.unitPrice,
      dataIndex: "unitPrice",
      key: "unitPrice",
    },
    {
      title: currentLocal.offerTable.totalPrice,
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: currentLocal.offerTable.deliveryDate,
      dataIndex: "deliveryDate",
      key: "deliveryDate",
      render: (deliveryDate) => {
        return moment(deliveryDate).format("DD-MM-YYYY");
      },
    },
    {
      title: currentLocal.offerTable.paymentTerms,
      dataIndex: "paymentTerms",
      key: "paymentTerms",
    },
  ];

  const getImage = () => takeScreenshot(ref.current);

  const shareOffer = () => {
    getImage();
  };

  const pdfExportComponent = React.useRef(null);

  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };
  const acceptOffer = () => {
    let itemIds = [];

    dataSource.forEach((item) => {
      itemIds.push(item.filledRFQPackageDetailId);
    });

    let data = {
      filledItemIds: itemIds,
    };
    BuyerAcceptPackageItems(
      data,
      (success) => {
        if (success.success) {
          toast.success("Offer accepted!", {
            position: "bottom-right",
            rtl: true,
          });
        }
      },
      (fail) => {
        console.log(fail);
      }
    );
  };

  return (
    <div className="pps ppe summaryTable mb-3" ref={ref}>
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <div className="title fw-500 mx-3 f-18">
            <div>{currentLocal.rfqSummary.mySummary}</div>
          </div>
          <img
            className="ms-2"
            data-tip="You can use a quick filter for your summary or check each individual quotation below"
            src={exclamationIcon}
            alt="exclamation icon"
          />
          <ReactTooltip place="top" effect="solid" />
        </div>

        <div>
          <div className="py-4 d-flex justify-content-end mx-4 align-items-center">
            <Dropdown
              overlay={filterMenu}
              trigger={["click"]}
              placement={"bottomCenter"}
            >
              <button className="filterDropdown d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <img className="me-2" src={filterIcon} alt="share" />
                  <div>{currentLocal.suppliers.suppliersFilter.filter}</div>
                </div>
                <div>
                  <img src={arrowDropdown} alt="dropdown arrow icon" />
                </div>
              </button>
            </Dropdown>

            <Dropdown.Button
              overlay={shareMenu}
              trigger={["click"]}
              onClick={(e) => e.preventDefault()}
              icon={<img src={share} alt="share" onClick={shareOffer} />}
            ></Dropdown.Button>
            <img
              src={download}
              alt="download"
              onClick={exportPDFWithComponent}
              className="mx-2 download"
            />
          </div>
        </div>
      </div>
      <PDFExport
        ref={pdfExportComponent}
        paperSize="auto"
        margin={40}
        fileName={`RFQ ProjectName Response`}
        author="shayyek"
      >
        <Table
          key={dataSource}
          indentSize={300}
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          className="my-4"
        />
      </PDFExport>
      {dataSource.length > 0 &&
        <div className="text-center">
          <button className="button-primary flat my-2" onClick={acceptOffer}>
            {currentLocal.rfqSummary.acceptAndNotifyVendors}
          </button>
        </div>}
      {ViewQuotationModal && (
        <SingleRFQModal
          isModalVisible={ViewQuotationModal}
          onCancel={() => {
            updateViewQuotationModal(false);
          }}
          mode={"ViewRFQDetails"}
          rfqDetailId={rfqDetailId}
        />
      )}

    </div>
  );
}

export default SummaryTable;
