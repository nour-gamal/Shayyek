import React, { useState, createRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { useScreenshot } from "use-react-screenshot";
import { Table, Menu, Dropdown } from "antd";
import {
  BuyerAcceptPackageItems,
  GetImagePath,
} from "../../../../ProfilePage/network";
import { PDFExport } from "@progress/kendo-react-pdf";
import addIcon from "../../../../../Resources/Assets/plusGray.svg";
import heartIcon from "../../../../../Resources/Assets/heartGray.svg";
import heartRemoveIcon from "../../../../../Resources/Assets/heartRemove.svg";
import acceptOfferIcon from "../../../../../Resources/Assets/acceptOffer.svg";
import viewIcon from "../../../../../Resources/Assets/View.svg";
import chatIcon from "../../../../../Resources/Assets/chat.svg";
import deleteIcon from "../../../../../Resources/Assets/deletee.svg";
import CreateOnlineSessionModal from "../../../../Messages/CreateOnlineSessionModal/CreateOnlineSessionModal"
import { setDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../../../firebase";

import { baseUrl } from "../../../../../Services";
import actionListIcon from "../../../../../Resources/Assets/actionList.svg";
import "./AllQuotationsRecievedTable.css";
import SingleRFQModal from "../../../../ProfilePage/Components/SubComponents/SingleRFQModal/SingleRFQModal";
import {
  addDeleteFavVendors,
  deletePackage,
  ViewPackageQuotationForSupplier,
} from "./../../../network";

function AllQuotaionsRecievedForRFQ({
  quotaionsDataSource,
  setQuotationsDataSource,
  updateSummaryDataSource,
}) {
  // eslint-disable-next-line
  const [loading, updateLoading] = useState(false);
  // eslint-disable-next-line
  const [imageURL, updateImageURL] = useState(null);
  const [image, takeScreenshot] = useScreenshot();
  const [hideTable, setHideTable] = useState(false);
  const [viewQuotationModal, setViewQuotationModal] = useState(false);
  const [selectedFilledPackageId, setSelectedFilledPackageId] = useState(null);
  const [redirectState, updateRedirectState] = useState(null);
  const [
    selectedVendorForConversation,
    setSelectedVendorForConversation,
  ] = useState(null);

  const { currentLocal } = useSelector((state) => state.currentLocal);
  const { authorization } = useSelector((state) => state.authorization);
  const [isSessionModalVisible, toggleIsSessionModalVisible] = useState(false)
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
    if (image) {
      getBlobImg(image);
    }
  }, [image]);

  function addFavVendor(vendorId, isFav) {
    addDeleteFavVendors(
      vendorId,
      isFav,
      (success) => {
        if (success.success) {
          setQuotationsDataSource(() => {
            const data = quotaionsDataSource.map((item) => {
              if (item.vendorId === vendorId) {
                item.isFavourite = isFav;
              }
              return item;
            });
            console.log(data);
            return data;
          });
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
  }

  const addNewChat = async (roomId, friendId) => {
    const roomsDocRef = doc(db, "rooms", roomId);
    await setDoc(roomsDocRef, {
      messages: [],
    });

    const userDocRef = doc(db, "users", authorization.id);
    await updateDoc(userDocRef, {
      friends: arrayUnion({
        roomId,
        friendId,
      }),
    });
    setSelectedVendorForConversation(friendId);
    updateRedirectState("/chat");
  };

  const acceptOffer = (filledPackageDetailsIds, item) => {
    let data = {
      filledItemIds: filledPackageDetailsIds,
    };
    BuyerAcceptPackageItems(
      data,
      (success) => {
        if (success.success) {
          toast.success(success.message, {
            position: "bottom-right",
            rtl: true,
          });
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
  };

  function removePackage(filledPackageId) {
    deletePackage(
      filledPackageId,
      (success) => {
        if (success.success) {
          setQuotationsDataSource((prevState) =>
            prevState.filter((item) => item.filledPackageId !== filledPackageId)
          );
          toast.success(success.message, {
            position: "bottom-right",
            rtl: true,
          });
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
  }

  function addToMySummary(filledPackageId) {
    ViewPackageQuotationForSupplier(
      filledPackageId,
      (success) => {
        if (success.success) {
          const { data } = success;
          console.log(data.rfqPackageDetails);
          updateSummaryDataSource((prevState) => [...data.rfqPackageDetails]);
          toast.success(success.message, {
            position: "bottom-right",
            rtl: true,
          });
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
  }
  const actionMenu = (data) => {
    return (
      <Menu>
        <Menu.Item>
          <div
            className="d-flex"
            role={"button"}
            onClick={() => {
              setSelectedFilledPackageId(data.filledPackageId);
              setViewQuotationModal(true);
            }}
          >
            <img src={viewIcon} alt="CopyLink" />
            <div className="mx-2">{currentLocal.profilePage.view}</div>
          </div>
        </Menu.Item>
        <Menu.Item>
          <div
            className="d-flex"
            role={"button"}
            onClick={() => {
              addFavVendor(data.vendorId, !data.isFavourite);
            }}
          >
            {!data.isFavourite ? (
              <>
                <img src={heartIcon} alt="heart icon" />
                <div className="mx-2">
                  {currentLocal.profilePage.addToFavVendors}
                </div>
              </>
            ) : (
              <>
                <img src={heartRemoveIcon} alt="delte icon" />
                <div className="mx-2">
                  {currentLocal.profilePage.deleteFavVendors}
                </div>
              </>
            )}
          </div>
        </Menu.Item>
        <Menu.Item>
          <div
            className="d-flex"
            role={"button"}
            onClick={() => {
              acceptOffer(data.filledPackageDetailsIds);
            }}
          >
            <img src={acceptOfferIcon} alt="accept offer" />
            <div className="mx-2">{currentLocal.profilePage.acceptOffer}</div>
          </div>
        </Menu.Item>
        <Menu.Item>
          <div
            className="d-flex"
            role={"button"}
            onClick={() => {
              addToMySummary(data.filledPackageId);
            }}
          >
            <img src={addIcon} alt="add icon" />
            <div className="mx-2">
              {currentLocal.profilePage.addToMySummary}
            </div>
          </div>
        </Menu.Item>
        <Menu.Item>
          <div
            className="d-flex"
            role={"button"}
            onClick={() => {
              const roomId = `${authorization.id}-${data.vendorId}`;
              addNewChat(roomId, data.vendorId);
            }}
          >
            <img src={chatIcon} alt="conversation icon" />
            <div className="mx-2">
              {currentLocal.offerTable.startConversation}
            </div>
          </div>
        </Menu.Item>
        <Menu.Item>
          <div
            className="d-flex"
            role={"button"}
            onClick={() => removePackage(data.filledPackageId)}
          >
            <img src={deleteIcon} alt="delete icon" />
            <div className="mx-2">{currentLocal.offerTable.delete}</div>
          </div>
        </Menu.Item>
      </Menu>
    );
  };
  const columns = [
    {
      title: currentLocal.suppliers.name,
      dataIndex: "name",
      key: "name",
    },
    {
      title: currentLocal.registration.company,
      dataIndex: "company",
      key: "company",
    },
    {
      title: currentLocal.offerTable.city,
      dataIndex: "city",
      key: "city",
    },
    {
      title: currentLocal.offerTable.paymentConditions,
      dataIndex: "paymentConditions",
      key: "paymentConditions",
    },
    {
      title: currentLocal.offerTable.rating,
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: currentLocal.offerTable.volumeOfWorkFromShyeek,
      dataIndex: "volumeOfWork",
      key: "volumeOfWork",
    },
    {
      title: currentLocal.offerTable.notes,
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: currentLocal.profilePage.actionList,
      dataIndex: "actionList",
      key: "actionList",
      render: (none, data) => {
        return (
          <Dropdown.Button
            overlay={() => actionMenu(data)}
            trigger={["click"]}
            icon={<img src={actionListIcon} alt="share" onClick={shareOffer} />}
          ></Dropdown.Button>
        );
      },
    },
  ];

  const getImage = () => takeScreenshot(ref.current);

  const shareOffer = () => {
    getImage();
  };

  const pdfExportComponent = React.useRef(null);

  // eslint-disable-next-line
  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };
  function handleHideTable() {
    setHideTable((prevState) => !prevState);
  }

  if (redirectState)
    return (
      <Redirect
        to={{
          pathname: redirectState,
          state: selectedVendorForConversation,
        }}
      />
    );
  return (
    <div className="pps ppe summaryTable mb-3" ref={ref}>
      <div className="d-flex justify-content-between align-items-end">
        <div className="title f-18 fw-500 mx-3">
          {currentLocal.offerTable.allQuotationsRecivedForThisRFQ}
        </div>
        <button className="hideTableBtn" onClick={handleHideTable}>
          {hideTable ? (
            <>{currentLocal.offerTable.show}</>
          ) : (
            <>{currentLocal.offerTable.hide}</>
          )}
        </button>
      </div>
      <PDFExport
        ref={pdfExportComponent}
        paperSize="auto"
        margin={40}
        fileName={`RFQ ProjectName Response`}
        author="shayyek"
      >
        <Table
          dataSource={quotaionsDataSource}
          style={{
            display: `${hideTable ? "none" : "block"}`,
          }}
          indentSize={300}
          columns={columns}
          loading={loading}
          className="my-4"
        />
      </PDFExport>
      <div
        className="text-center"
        style={{
          display: `${hideTable ? "none" : "block"}`,
        }}
      >
        <button className="button-primary flat my-2" onClick={() => { toggleIsSessionModalVisible(true) }}>
          {currentLocal.rfqSummary.covertToReverseAuction}
        </button>
      </div>
      {viewQuotationModal && (
        <SingleRFQModal
          isModalVisible={viewQuotationModal}
          onCancel={() => {
            setViewQuotationModal(false);
          }}
          mode={"ViewRFQDetails"}
          filledPackageId={selectedFilledPackageId}
        />
      )}
      {isSessionModalVisible &&
        <CreateOnlineSessionModal
          isModalVisible={isSessionModalVisible}
          onCancel={() => {
            toggleIsSessionModalVisible(false);
          }}
          rfqId={null}
          rfqDetails={null}
        />}
    </div>
  );
}

export default AllQuotaionsRecievedForRFQ;
