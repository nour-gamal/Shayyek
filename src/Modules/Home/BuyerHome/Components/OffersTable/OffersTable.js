import React, { useState, useEffect, createRef } from "react";
import { Redirect } from "react-router-dom";
import { Table, Dropdown, Menu } from "antd";
import { PDFExport } from "@progress/kendo-react-pdf";
import acceptOffer from "../../../../../Resources/Assets/acceptOffer.svg";
import deletee from "../../../../../Resources/Assets/deletee.svg";
import chat from "../../../../../Resources/Assets/chat.svg";
import star from "../../../../../Resources/Assets/star (1).svg";
import eye from "../../../../../Resources/Assets/eye.svg";
import download from "../../../../../Resources/Assets/direct-download.svg";
import share from "../../../../../Resources/Assets/share (5).svg";
import ReactTooltip from "react-tooltip";
import { useSelector } from "react-redux";
import { setDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../../../firebase";
import { GetImagePath } from "../../../../ProfilePage/network";
import Whatsapp from "../../../../../Resources/Assets/whatsapp.svg";
import CopyLink from "../../../../../Resources/Assets/copyLink.svg";
import Email from "../../../../../Resources/Assets/email.svg";
import { EmailShareButton, WhatsappShareButton } from "react-share";
import CreateOnlineSessionModal from "../../../../Messages/CreateOnlineSessionModal/CreateOnlineSessionModal";
import {
  GetBuyerAddedRFQOffers,
  BuyerAcceptRFQ,
  BuyerRejectOffer,
} from "../../../network";
import { useScreenshot } from "use-react-screenshot";
import { baseUrl } from "../../../../../Services";
import Navbar from "../../../../Common/Navbar/Navbar";
import Footer from "../../../../Common/Footer/Footer";
import SingleRFQModal from "../../../../ProfilePage/Components/SubComponents/SingleRFQModal/SingleRFQModal";
import StartOnlineSessionModal from "../../../../Messages/StartOnlineSession/StartOnlineSession";
import "./OffersTable.css";

function OfferTable(props) {
  const { currentLocal, currentLanguageId } = useSelector(
    (state) => state.currentLocal
  );
  const { authorization } = useSelector((state) => state.authorization);
  const [currentPage, setCurrentPage] = useState(1);
  const [rfqDetails, updateRFQDetails] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isRFQModalVisible, toggleRFQModal] = useState(false);
  const [redirectState, updateRedirectState] = useState(null);
  const [isSessionModalVisible, toggleIsSessionModalVisible] = useState(false);
  const [startModalSessionVisible, updateStartModalSessionVisible] = useState(
    true
  );
  const [image, takeScreenshot] = useScreenshot();

  const getImage = () => takeScreenshot(ref.current);

  const ref = createRef(null);

  const [imageURL, updateImageURL] = useState(null);

  const { id } = props.match.params;

  const shareOffer = () => {
    getImage();
  };
  useEffect(() => {
    if (image) {
      getBlobImg(image);
    }
  }, [image]);
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

  useEffect(() => {
    GetBuyerAddedRFQOffers(
      id,
      currentLanguageId,
      (success) => {
        updateRFQDetails(success.data);
      },
      (fail) => {
        console.log(fail);
      }
    );
  }, [id, currentLanguageId]);

  const getBuyerAddedRFQs = () => {
    GetBuyerAddedRFQOffers(
      id,
      currentLanguageId,
      (success) => {
        updateRFQDetails(success.data);
      },
      (fail) => {
        console.log(fail);
      }
    );
  };

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
    updateRedirectState("/chat");
  };

  const bottom = "bottomRight";
  const menu = (
    <Menu>
      <Menu.Item
        key="0"
        onClick={(e) => {
          toggleRFQModal(true);
        }}
      >
        <img src={eye} alt="acceptOffer" />
        <span className="acceptOffer">{currentLocal.offerTable.view}</span>
      </Menu.Item>
      <Menu.Item
        key="1"
        onClick={(e) => {
          let body = {
            RFQId: selectedRow.rfqId,
            filledRFQId: selectedRow.fillRFQId,
          };
          BuyerAcceptRFQ(
            body,
            (success) => {
              if (success.success) {
                getBuyerAddedRFQs();
              }
            },
            (fail) => {
              console.log(fail);
            }
          );
        }}
      >
        <img src={acceptOffer} alt="acceptOffer" />
        <span className="acceptOffer">
          {currentLocal.offerTable.acceptOffer}
        </span>
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => {
          let roomId = `${authorization.id}-${selectedRow.applicantId}`;
          addNewChat(roomId, selectedRow.applicantId);
        }}
      >
        <img src={chat} alt="chat" />
        <span className="chat">
          {currentLocal.offerTable.startConversation}
        </span>
      </Menu.Item>
      <Menu.Item
        key="3"
        className={currentLocal.language !== "English" && "delete"}
        onClick={() => {
          let body = {
            supplierOrContractorId: selectedRow.applicantId,
          };
          BuyerRejectOffer(body, (success) => {
            if (success.success) {
              getBuyerAddedRFQs();
            }
          });
        }}
      >
        <img src={deletee} alt="deletee" />
        <span className="delete">{currentLocal.offerTable.delete}</span>
      </Menu.Item>{" "}
    </Menu>
  );

  const columns = [
    {
      title: currentLocal.offerTable.name,
      dataIndex: "applicantName",
      key: "applicantName",
      className: "bordercol bottomBorderCol nameEmp",
    },

    {
      title: currentLocal.offerTable.company,
      dataIndex: "applicantCompany",
      key: "applicantCompany",
      className: "bordercol bottomBorderCol company",
      render: (company) => {
        return (
          <div className="shortText" data-tip={company}>
            {company}
          </div>
        );
      },
    },
    {
      title: currentLocal.offerTable.price,
      dataIndex: "totalPrice",
      key: "totalPrice",
      className: "bordercol bottomBorderCol price",
    },
    {
      title: currentLocal.offerTable.city,
      dataIndex: "applicantCity",
      key: "applicantCity",
      className: "bordercol bottomBorderCol city",
      render: (city) => {
        return (
          <div className="shortText" data-tip={city}>
            {city}
          </div>
        );
      },
    },
    {
      title: currentLocal.offerTable.rating,
      dataIndex: "applicantRate",
      key: "applicantRate",
      className: "bordercol bottomBorderCol rating",
      render: (rate) => (
        <div className="d-flex align-items-center justify-content-center">
          <span>{rate}</span>
          <img src={star} alt="star" className="mx-1" />
        </div>
      ),
    },
    {
      title: currentLocal.offerTable.volumeOfWorkFromShyeek,
      dataIndex: "applicantWorkVolumeOnShayyek",
      key: "applicantWorkVolumeOnShayyek",
      className: "bordercol bottomBorderCol valum",
    },
    {
      title: currentLocal.offerTable.actionList,
      dataIndex: "list",
      key: "list",
      className: "bottomBorderCol",
      render: (list, _) => {
        return (
          <Dropdown.Button
            overlay={menu}
            trigger={["click"]}
            onClick={(e) => {
              e.preventDefault();
            }}
            onMouseEnter={() => {
              setSelectedRow(_);
            }}
          ></Dropdown.Button>
        );
      },
    },
  ];
  const pdfExportComponent = React.useRef(null);

  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };
  if (redirectState)
    return (
      <Redirect
        to={{
          pathname: redirectState,
          state: selectedRow.applicantId,
        }}
      />
    );

  return (
    <section className="OfferTable">
      <Navbar />
      <div className="ppr ppl" ref={ref}>
        <div className="py-4 d-flex justify-content-end mx-4 align-items-center">
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
        <PDFExport
          ref={pdfExportComponent}
          paperSize="auto"
          margin={40}
          fileName={`RFQ ProjectName Response`}
          author="shayyek"
        >
          <Table
            className="table-striped-rows"
            dataSource={rfqDetails}
            columns={columns}
            scroll={{ x: "calc(100wh - 4em)" }}
            pagination={{
              position: [bottom],
              total: rfqDetails.length,
              current: currentPage,
              pageSize: 5,
              hideOnSinglePage: true,
              onChange: (page, pageSize) => {
                setCurrentPage(page);
              },
            }}
          />
        </PDFExport>
        <div className="text-center">
          <ReactTooltip />
          <button
            className="button-primary my-2"
            onClick={() => toggleIsSessionModalVisible(true)}
          >
            {currentLocal.offerTable.makeOnlineSession}
          </button>
        </div>
      </div>
      <Footer />
      {isRFQModalVisible && selectedRow && (
        <SingleRFQModal
          isModalVisible={isRFQModalVisible}
          onCancel={() => {
            toggleRFQModal(false);
          }}
          rfqId={selectedRow.rfqId}
          fillRFQId={selectedRow.fillRFQId}
          rfqDetails
          parent="offersTable"
        />
      )}
      {isSessionModalVisible && (
        <CreateOnlineSessionModal
          isModalVisible={isSessionModalVisible}
          onCancel={() => {
            toggleIsSessionModalVisible(false);
          }}
          rfqId={rfqDetails.length ? rfqDetails[0].rfqId : null}
          rfqDetails={rfqDetails}
        />
      )}
      {startModalSessionVisible && (
        <StartOnlineSessionModal
          isModalVisible={true}
          // ={true}
          onCancel={() => updateStartModalSessionVisible(false)}
        />
      )}
    </section>
  );
}

export default OfferTable;
